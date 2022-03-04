const { fetchAPI, accountId, rndAmount, typeOfAccount } = require("./utils");
const fs = require("fs");

async function createData() {
  let dataArray = [];
  let transfersArray = [];
  let numberOfUsers = 50;
  let getUserInfo = await fetchAPI(
    `https://randomuser.me/api/?results=${numberOfUsers}`
  );

  for (let i = 0; i < numberOfUsers; i++) {
    console.log(`${i + 1}/${numberOfUsers} users created`);

    let dataObj = {
      account_id: `MDB${accountId()}`,
      account_holder: `${getUserInfo.results[i].name.first} ${getUserInfo.results[i].name.last}`,
      account_type: typeOfAccount(),
      balance: rndAmount(),
      transfers_complete: [],
    };

    dataArray.push(dataObj);
  }

  for (let i = 0; i < 100; i++) {
    let toAccount = Math.floor(Math.random() * (numberOfUsers - 1));

    let fromAccount = Math.floor(Math.random() * (numberOfUsers - 1));

    while(toAccount === fromAccount){
      fromAccount = Math.round(Math.random() * (numberOfUsers - 1));
   }

    let toAccountBalance = dataArray[toAccount].balance;
    let fromAccountBalance = dataArray[fromAccount].balance;

    let amount = Math.floor(Math.random() * (fromAccountBalance - 5) + 5);

    let transferObj = {
      transfer_id: `TR${accountId()}`,
      to_account: dataArray[toAccount].account_id,
      from_account: dataArray[fromAccount].account_id,
      amount: amount,
      memo: 'Show me the money!',
    };

    dataArray[toAccount].balance = dataArray[toAccount].balance + amount
    dataArray[fromAccount].balance = dataArray[fromAccount].balance - amount
    dataArray[toAccount].transfers_complete.push(transferObj.transfer_id);
    dataArray[fromAccount].transfers_complete.push(transferObj.transfer_id);
    transfersArray.push(transferObj);
  }

  let dictstring = JSON.stringify(dataArray);

  fs.writeFile("generated-accounts.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });

  let transferString = JSON.stringify(transfersArray);

  fs.writeFile(
    "generated-transfers.json",
    transferString,
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
}

createData();
