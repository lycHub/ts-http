import axios from "../../src/index";

axios({
  url: '/base/get',
  params: {
    a: 3, b: 4
  }
});
