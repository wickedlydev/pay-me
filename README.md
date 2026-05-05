
# Pay-Me

A functional digital wallet application where users can securely sign up, manage a virtual wallet, and transfer funds to other users in real-time.

**Live Demo:** https://pay-me-anything-you-like.vercel.app/


## Features

•User Authentication: Secure Sign Up and Sign In functionality using JWT.
•Dashboard: View your current wallet balance and search for other registered users.
•Peer-to-Peer Transfers: Send money to any user instantly using an atomic transaction system.
•Real-time Search: Filter through the user database to find recipients easily.
•Dynamic Balancing: Currently, new accounts are initialized with a random balance (using Math.random()) to simulate an existing account state.

## Tech Stack

•Frontend: React.js, Tailwind CSS (for styling), Axios (for API calls).

•Backend: Node.js, Express.js.

•Database: MongoDB with Mongoose (modeling and transactions).

•Security: JSON Web Tokens (JWT) for session management and Zod for input validation.


## Getting Started

### Prerequisites

•Node.js (v16 or higher)
•MongoDB Atlas account or local MongoDB instance

### Installation

1.Clone the repository
```
git clone https://github.com/yourusername/paytm-clone.git
cd paytm-clone
```
2.Backend Setup 
```
cd backend
npm install
```
Create a .env file in the backend folder:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
Start the server:
```
node index.js
```

3.Frontend Setup
```
cd ../frontend
npm install
```
Start the development server:
```
npm run dev
```

## 🔧 Application Logic

#### Wallet Initialization

In the current version, when a user signs up, the application assigns a starting balance using:

```
// Backend logic snippet
const balance = Math.random() * 10000;
await Account.create({
    userId,
    balance
});
```
#### Secure Transactions
To ensure money is never "lost" during a transfer, the app uses MongoDB Transactions. This ensures that if the deduction from the sender fails, the credit to the receiver is never executed (and vice-versa).
## Roadmap (Future Enhancements)

•[ ] Payment Gateway Integration: Connect with Razorpay or Stripe to add real money to the wallet.

•[ ] Transaction History: A dedicated page to view all past debits and credits.

•[ ] Profile Management: Allow users to update their details and upload profile pictures.

•[ ] Input Verification: Better error handling and toast notifications for failed transactions.

•[ ] QR Code Scanning: Generate and scan QR codes for even faster payments.
## License

Distributed under the MIT License. See LICENSE for more information.

[MIT](https://choosealicense.com/licenses/mit/)


## Contact

Dev Sharma - <https://x.com/wickedlydev>-    <dev.sharma.bis@gmail.com>

Project Link: <https://github.com/wickedlydev/pay-me>
