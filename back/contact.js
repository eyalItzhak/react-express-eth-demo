const web3 = require("./web3.js");
const Inbox = require("../front/src/contactsData/ethereum/build/Inbox.json");

const instance = new web3.eth.Contract(
  Inbox.abi,
  "0x2a45d7911a9f973D8960D3c2d2984781c392EfF3"
);

module.exports = instance;
