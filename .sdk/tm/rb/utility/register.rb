# Trivia SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TriviaUtility.registrar = ->(u) {
  u.clean = TriviaUtilities::Clean
  u.done = TriviaUtilities::Done
  u.make_error = TriviaUtilities::MakeError
  u.feature_add = TriviaUtilities::FeatureAdd
  u.feature_hook = TriviaUtilities::FeatureHook
  u.feature_init = TriviaUtilities::FeatureInit
  u.fetcher = TriviaUtilities::Fetcher
  u.make_fetch_def = TriviaUtilities::MakeFetchDef
  u.make_context = TriviaUtilities::MakeContext
  u.make_options = TriviaUtilities::MakeOptions
  u.make_request = TriviaUtilities::MakeRequest
  u.make_response = TriviaUtilities::MakeResponse
  u.make_result = TriviaUtilities::MakeResult
  u.make_point = TriviaUtilities::MakePoint
  u.make_spec = TriviaUtilities::MakeSpec
  u.make_url = TriviaUtilities::MakeUrl
  u.param = TriviaUtilities::Param
  u.prepare_auth = TriviaUtilities::PrepareAuth
  u.prepare_body = TriviaUtilities::PrepareBody
  u.prepare_headers = TriviaUtilities::PrepareHeaders
  u.prepare_method = TriviaUtilities::PrepareMethod
  u.prepare_params = TriviaUtilities::PrepareParams
  u.prepare_path = TriviaUtilities::PreparePath
  u.prepare_query = TriviaUtilities::PrepareQuery
  u.result_basic = TriviaUtilities::ResultBasic
  u.result_body = TriviaUtilities::ResultBody
  u.result_headers = TriviaUtilities::ResultHeaders
  u.transform_request = TriviaUtilities::TransformRequest
  u.transform_response = TriviaUtilities::TransformResponse
}
