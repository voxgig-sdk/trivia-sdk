-- ProjectName SDK exists test

local sdk = require("trivia_sdk")

describe("TriviaSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
