//from main user to contract

import factory from "../../../contactsData/ethereum/factory";
import web3 from "../../../contactsData/ethereum/web3";

async function getUserInfo(value) {
  const owner = await factory.methods.owner().call();
  let owner_ammunt = await web3.eth.getBalance(owner);
  owner_ammunt = parseFloat(web3.utils.fromWei(owner_ammunt, "ether"));
  owner_ammunt = owner_ammunt.toFixed(3);
  return { account_owner: owner, balance_owner: owner_ammunt };
}

export default getUserInfo;
