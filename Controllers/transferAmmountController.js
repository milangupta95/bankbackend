const userModel = require('../Models/userModel');
async function transferAmmount(req,res) {
    try {
        let transferData = req.body;
        let senderUserId = transferData.senderId;
        let recieverUserId = transferData.recieverId;
        let ammountToBeTransfer = transferData.ammount;
        let sender = await userModel.findById(senderUserId);
        let reciever = await userModel.findById(recieverUserId);
        if(sender && reciever){
            if(sender.Balance < ammountToBeTransfer) {
                res.status(500).json({
                    message: "Insufficient Balance"
                })
            } else {
                let oldSenderBalance = sender.Balance;
                let newSenderBalance = oldSenderBalance - Number(ammountToBeTransfer);
                let oldReciverBalance = reciever.Balance;
                let newReciverBalance = oldReciverBalance + Number(ammountToBeTransfer);
                sender.Balance = newSenderBalance;
                reciever.Balance = newReciverBalance;
                await sender.save();
                await reciever.save();
                res.status(200).json({
                    message: "Updated SuccessFully",
                    sender: sender,
                    reciever: reciever
                })
            }
        } else {
            res.status(400).json({
                message: "Sender or Reciever Not Found"
            })
        }
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = transferAmmount;