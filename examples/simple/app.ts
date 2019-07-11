import axios from "../../src/index";

axios({
  url: '/simple/get',
  params: {
    a: 3, b: 4
  }
});
