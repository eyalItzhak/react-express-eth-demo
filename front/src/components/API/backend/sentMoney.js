//from backend user to contract
import axios from "axios";
const http = "http://localhost:8080";

async function sentMoney(value) {
  console.log(http);
  axios.patch(http + "/accounts").then((res) => {
    //need to deleat after fix
    console.log(res.data);
  });
  console.log("patch sccead");
  await axios
    .post(http + "/sentMoney", {
      value: "" + value,
    })
    .then((res) => {
      console.log(res.data);
    });
}

export default sentMoney;
