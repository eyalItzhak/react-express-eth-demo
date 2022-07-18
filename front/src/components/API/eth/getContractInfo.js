//from main user to contract

import factory from "../../../contactsData/ethereum/factory";
import web3 from "../../../contactsData/ethereum/web3";

async function getUserInfo(value) {
  let contract_ammunt = await factory.methods.getTotalBalance().call();
  contract_ammunt = parseFloat(web3.utils.fromWei(contract_ammunt, "ether"));
  contract_ammunt = contract_ammunt.toFixed(3);
  return contract_ammunt;
}

export default getUserInfo;
