const { fetchAPI, accountId, rndAmount, typeOfAccount } = require("./utils");
const fs = require("fs");


async function createData() {
  let dataArray = [];
  let transfersArray = [];
  let numberOfUsers = 50;
  let numberOfTransfers = 150;
  let getUserInfo = await fetchAPI(
    `https://randomuser.me/api/?results=${numberOfUsers}`
  );

  for (let i = 0; i < numberOfUsers; i++) {
    console.log(`${i + 1}/${numberOfUsers} users created`);

    let balance = rndAmount()

    let dataObj = {
      account_id: `MDB${accountId()}`,
      account_holder: `${getUserInfo.results[i].name.first} ${getUserInfo.results[i].name.last}`,
      account_type: typeOfAccount(),
      balance: parseFloat(parseFloat(Math.random() * 5000).toFixed(2)),
      transfers_complete: [],
    };

    dataArray.push(dataObj);
  }

  for (let i = 0; i < numberOfTransfers; i++) {
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
      amount: parseFloat(parseFloat(amount).toFixed(2))
    };

    toAccountBalance = dataArray[toAccount].balance + amount
    fromAccountBalance = dataArray[fromAccount].balance - amount
    dataArray[toAccount].transfers_complete.push(transferObj.transfer_id);
    dataArray[fromAccount].transfers_complete.push(transferObj.transfer_id);
    transfersArray.push(transferObj);
  }

  let dictstring = JSON.stringify(dataArray);
  let transferString = JSON.stringify(transfersArray);

  fs.writeFile("generated-accounts.json", dictstring, function (err, result) {
    if (err) console.log("error", err);
  });

  fs.writeFile(
    "generated-transfers.json",
    transferString,
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
}

createData();
