const assert = require("assert"); //for the tests
const ganache = require("ganache"); //provider local network with 10 accounts

const Web3 = require("web3");

const provider = ganache.provider();
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
};
const web3 = new Web3(provider, null, OPTIONS);

const { abi, evm } = require("../ethereum/build/Inbox.json");
const { json } = require("mocha/lib/reporters");
const { finished } = require("stream");

let inbox;
let accounts;

let manager;
let peer;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  manager = accounts[0];
  peer = accounts[1];
  console.log("Attempting to deploy from account", manager);
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [peer] })
    .send({ from: manager, gas: 5000000 });
});

describe("Simple tests", () => {
  const amaunt_whi = 100;
  const amaunt_eth = 2;
  const gas = "1000000";

  it("deploy a inbox", () => {
    assert.ok(inbox.options.address);
  });

  //from peer to contact
  it("sent money to contract", async () => {
    await inbox.methods.getMoneyFrom().send({
      value: "" + amaunt_whi,
      from: peer,
      gas: gas,
    });

    let lastMoneySender = await inbox.methods.lastSender().call();
    assert.equal(peer, lastMoneySender);
    let value = await inbox.methods.getTotalBalance().call();
    assert.equal(amaunt_whi, value);

    //from manger to contract
    await inbox.methods.getMoneyFrom().send({
      value: "" + amaunt_whi,
      from: manager,
      gas: gas,
    });
    lastMoneySender = await inbox.methods.lastSender().call();
    assert.equal(manager, lastMoneySender);
    value = await inbox.methods.getTotalBalance().call();
    assert.equal(amaunt_whi * 2, value);
  });

  it("sent money from contract ", async () => {
    let sendingAmunt = web3.utils.toWei("" + amaunt_eth, "ether");

    await inbox.methods.getMoneyFrom().send({
      value: "" + sendingAmunt,
      from: manager,
      gas: gas,
    });

    await inbox.methods.sentMoneyto(1, sendingAmunt).send({
      from: manager,
      gas: gas,
    });

    let accaunt_balance = await web3.eth.getBalance(peer);
    accaunt_balance = await web3.utils.fromWei(accaunt_balance, "ether");

    assert(accaunt_balance > 1000);
  });
});
