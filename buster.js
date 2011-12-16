var config = module.exports;

config["Server tests"] = {
  tests: ["test/shared/**/*-test.js"],
  environment: "node"
};

config["Browser tests"] = {
  libs: ["client_dependencies/**/*.js"],
  sources: ["lib/shared/**/*.js", "lib/client/**/*.js"],
  tests: ["test/shared/**/*-test.js", "test/client/**/*-test.js"],
  environment: "browser"
};
