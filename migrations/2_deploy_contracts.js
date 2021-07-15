const DocAgreements = artifacts.require("DocAgreements");

module.exports = function(deployer) {
  deployer.deploy(DocAgreements);
};
