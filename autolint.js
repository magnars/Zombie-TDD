module.exports = {
  paths: [
    "lib/**/*.js",
    "test/**/*.js"
  ],
  linter: "jslint",
  linterOptions: {
    indent: 2,
    vars: true,
    maxlen: 85,
    sloppy: false,
    regexp: true,
    browser: true,
    node: true,
    predef: [ "ZOMBIE", "buster", "$", "assert", "refute", "EventEmitter", "jQuery" ]
  }
};
