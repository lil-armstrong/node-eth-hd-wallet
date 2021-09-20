const Exchange = artifacts.require("Exchange");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Exchange", function (/* accounts */) {
  it("should assert true", async function () {
    await Exchange.deployed();
    return assert.isTrue(true);
  });
});
