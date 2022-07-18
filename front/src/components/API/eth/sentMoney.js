//from main user to contract

import factory from "../../../contactsData/ethereum/factory";
import web3 from "../../../contactsData/ethereum/web3";

async function sentMoney(value) {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  try {
    await factory.methods.getMoneyFrom().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
    return true;
  } catch {
    return false;
  }
}

export default sentMoney;
