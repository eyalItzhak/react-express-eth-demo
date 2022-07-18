const Web3 = require("./web3.js");
const contact = require("./contact.js");

const express = require("express");
const app = express();
const PORT = 8080;

var cors = require("cors"); //can acess from localhost!

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`it's alive on http://localhost:${PORT}`));

let accounts;
const myAccount = 1; //0 is the one not in the back end
let account_address;

const getUsers = async () => {
  const retrun_Account = await Web3.eth.getAccounts();
  return retrun_Account;
};

app.patch("/accounts", async (req, res) => {
  console.log("refreash");
  accounts = await getUsers();
  account_address = accounts[myAccount];
  res.send({ success: true });
});

app.get("/accounts", async (req, res) => {
  let balance = await Web3.eth.getBalance(account_address);
  balance = parseFloat(Web3.utils.fromWei(balance, "ether"));
  balance = balance.toFixed(3);
  res
    .status(200)
    .send({ account_peer: accounts[myAccount], balance_peer: balance });
});

app.post("/sentMoney", async (req, res) => {
  const { value } = req.body;
  await contact.methods.getMoneyFrom().send({
    from: account_address,
    value: Web3.utils.toWei(value, "ether"),
  });
  res.send({ success: true });
});
