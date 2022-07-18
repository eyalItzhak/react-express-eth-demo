//from backend user to contract
import axios from "axios";
const http = "http://localhost:8080";

async function getUserInfo() {
  await axios.patch(http + "/accounts").then((res) => {
    //need to deleat after fix
    console.log(res.data);
  });

  const data = await axios.get(http + "/accounts").then((res) => {
    // const account=res.data.account;
    // const balance=res.data.balance;
    return res.data;
  });
  return data;
}

export default getUserInfo;
