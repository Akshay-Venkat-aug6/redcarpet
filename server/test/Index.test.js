function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}


describe("top", function () {
  it('Test', function() {
    importTest("user", './user.test.js');
    importTest("agent", './agent.test.js');
    importTest("admin", './admin.test.js');
  })
});