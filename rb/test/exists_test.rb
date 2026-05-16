# Trivia SDK exists test

require "minitest/autorun"
require_relative "../Trivia_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TriviaSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
