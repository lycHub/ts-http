import axios from "../../src/index";

axios({
  url: '/simple/get',
  params: {
    a: 1, b: 2
  }
});
