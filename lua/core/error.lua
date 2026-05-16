-- Trivia SDK error

local TriviaError = {}
TriviaError.__index = TriviaError


function TriviaError.new(code, msg, ctx)
  local self = setmetatable({}, TriviaError)
  self.is_sdk_error = true
  self.sdk = "Trivia"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TriviaError:error()
  return self.msg
end


function TriviaError:__tostring()
  return self.msg
end


return TriviaError
