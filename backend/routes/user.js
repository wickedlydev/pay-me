const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../api/db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../api/config");
const { authMiddleware} = require("../api/authmiddleware")
const bycrpt = require('bcrypt')
const SALT_ROUNDS = 10;

const signupBody = zod.object({
    username:zod.string().email(),
    firstname: zod.string(),
    password:zod.string(),
    lastname :zod.string()
})

router.post("/signup",async(req,res)=>{
    console.log("Body received:", req.body);

    const result = signupBody.safeParse(req.body);
    if(!result.success){
        console.log("Zod Validation Errors:", result.error.format());
        return res.status(411).json({
            message:"user already taken/incorrect input",
            detail:result.error.errors
        })
    }
    const existinguser = await User.findOne({
        username:req.body.username
    })
    if(existinguser){
        return res.status(411).json({
            message:"email already been taken"
        })
    }

    const hashedpassword = await bycrpt.hash(req.body.password,SALT_ROUNDS)


    const user = await User.create({
        username : req.body.username,
        password : hashedpassword,
        firstname :req.body.firstname,
        lastname:req.body.lastname,
    })
    const userId = user._id
    await Account.create({
        userId,
        balance:1+Math.random()*1000
    })

    const token = jwt.sign({
        userId:user._id
    },JWT_SECRET)

    res.json({
        message:"user created sucesfully",
        token:token
    })
})





const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post("/signin",async(req,res)=>{
     const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: req.body.username,
       
})
if(user){
    const token = jwt.sign({
        userId : user._id
    },JWT_SECRET)
    res.json({
        token:token
    })
    return;
}
 res.status(401).json({
        message: "Invalid Credientials"
    })
})




const updateBody = zod.object({
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    password:zod.string().optional()
})
router.put("/",authMiddleware,async(req,res)=>{
    const { success }= updateBody.safeParse(req.body)
    if(!success){
        res.status(400).json({
            message:"Error while updating the information "
        })
    }
    await User.updateOne({_id:req.body.Id},req.body)
       res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk",async(req,res)=>{
    const filter = req.query.filter|| ""
    const users = await User.find({
          $or: [{
            firstname: {
                "$regex": filter,
                "$options": "i"
            }
        }, {
            lastname: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    })
      res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router