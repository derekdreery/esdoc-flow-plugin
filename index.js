const fs = require('fs');
const babel = require('babel-core');

let babelOpts = {
  plugins: ['transform-flow-strip-types', 'syntax-jsx']
};

try {
  fs.accessSync('./.babelrc', fs.F_OK);
  babelOpts = JSON.parse(fs.readFileSync('./.babelrc'));
} catch (e) {}

exports.onHandleCode = (event) => {
  try {
    const result = babel.transform(event.data.code, babelOpts);
    event.data.code = result.code;
  } catch (error) {
    console.error(error);
  }
};
