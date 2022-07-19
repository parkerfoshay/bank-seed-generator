db.accounts.updateMany({},
    [
       {
          $set: {
             balance: { $toDecimal: "$balance" },
          }
       }
    ]
 )

 db.transfers.updateMany({},
    [
       {
          $set: {
             amount: { $toDecimal: "$amount" },
          }
       }
    ]
 )