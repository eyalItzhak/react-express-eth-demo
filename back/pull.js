const axios = require("axios");

const base = "http://localhost:8080";

axios.get(base + "/thsirt").then((res) => {
  console.log(res.data);
});
