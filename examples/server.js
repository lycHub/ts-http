const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get('/simple/get', function (req, res) {
  res.json({
    msg: 'hello world'
  });
});

router.get('/base/get', function (req, res) {
  res.json(req.query);
});
router.post('/base/post', function (req, res) {
  res.json(req.body);
});
router.post('/base/buffer', function (req, res) {
  const msg = [];
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk);
    }
  });
  req.on('end', () => {
    const buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
});
app.use(router);
const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log('Example app listening http://localhost:' + port);
});
