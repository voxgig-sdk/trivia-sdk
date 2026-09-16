# Trivia SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TriviaFeatures
  def self.make_feature(name)
    case name
    when "base"
      TriviaBaseFeature.new
    when "ratelimit"
      TriviaRatelimitFeature.new
    when "retry"
      TriviaRetryFeature.new
    when "test"
      TriviaTestFeature.new
    when "timeout"
      TriviaTimeoutFeature.new
    else
      TriviaBaseFeature.new
    end
  end
end
