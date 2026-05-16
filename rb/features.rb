# Trivia SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TriviaFeatures
  def self.make_feature(name)
    case name
    when "base"
      TriviaBaseFeature.new
    when "test"
      TriviaTestFeature.new
    else
      TriviaBaseFeature.new
    end
  end
end
