//from main user to contract

import factory from "../../../contactsData/ethereum/factory";
import web3 from "../../../contactsData/ethereum/web3";

async function getMoneyFromContract(to, value) {
  const accounts = await web3.eth.getAccounts();
  value = web3.utils.toWei(value, "ether");
  const number_to = parseInt(to);
  console.log(to + " " + value);
  await factory.methods.sentMoneyto(number_to, value).send({
    from: accounts[0],
  });
}

export default getMoneyFromContract;
