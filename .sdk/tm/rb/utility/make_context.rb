# Trivia SDK utility: make_context
require_relative '../core/context'
module TriviaUtilities
  MakeContext = ->(ctxmap, basectx) {
    TriviaContext.new(ctxmap, basectx)
  }
end
