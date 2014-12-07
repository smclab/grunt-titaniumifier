
require('ti-mocha');

require('should');

describe("Requiring", function () {
  it("should work", function () {
    require('renamed-module');
  });
});

mocha.run(function (failures) {
  if (failures > 0) {
    Ti.API.error('[TESTS WITH FAILURES]');
  }
  else {
    Ti.API.error('[TESTS ALL OK]');
  }
});
