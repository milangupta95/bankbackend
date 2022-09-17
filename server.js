const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
const createuserController = require('./Controllers/createUserController');
const viewAllCustomer = require('./Controllers/viewAllController');
const viewOneCustomer = require('./Controllers/viewOneCustomer');
const transferAmmount = require('./Controllers/transferAmmountController');
app.post("/signup",createuserController);
app.get("/viewAllCustomer",viewAllCustomer);
app.get("/viewOneCustomer/:id",viewOneCustomer);
app.post("/transferAmmount",transferAmmount);
const PORT = process.env.PORT || 3000;

app.listen(PORT,function() {
    console.log("SuccessFully Connected to 3000 Port");
});
