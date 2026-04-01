import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
    const [amount, setamount] = useState(0);
    const [searchparam] = useSearchParams();
    const [message, setMessage] = useState(""); // State for success/error message
    const [loading, setLoading] = useState(false); // State to prevent double clicks

    const id = searchparam.get("id");
    const name = searchparam.get("name");

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{name ? name[0].toUpperCase() : "U"}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name || "User"}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setamount(e.target.value)}
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                            </div>
                            
                            
                            {message && (
                                <div className={`text-sm font-semibold p-2 rounded ${message.includes("Success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                    {message}
                                </div>
                            )}

                            <button 
                                onClick={async () => {
                                    setLoading(true);
                                    try {
                                        await axios.post("https://paytm-clone-nu.vercel.app/api/v1/account/transfer", {
                                            to: id,
                                            amount,
                                        }, {
                                            headers: {
                                                Authorization: "Bearer " + localStorage.getItem("token")
                                            }
                                        });
                                        setMessage("Transfer Successful!");
                                    } catch (e) {
                                        setMessage("Transfer failed. Please try again.");
                                    }
                                    setLoading(false);
                                }} 
                                disabled={loading}
                                className={`justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full text-white transition-colors ${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                            >
                                {loading ? "Processing..." : "Initiate Transfer"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}