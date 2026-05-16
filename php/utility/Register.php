<?php
declare(strict_types=1);

// Trivia SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

TriviaUtility::setRegistrar(function (TriviaUtility $u): void {
    $u->clean = [TriviaClean::class, 'call'];
    $u->done = [TriviaDone::class, 'call'];
    $u->make_error = [TriviaMakeError::class, 'call'];
    $u->feature_add = [TriviaFeatureAdd::class, 'call'];
    $u->feature_hook = [TriviaFeatureHook::class, 'call'];
    $u->feature_init = [TriviaFeatureInit::class, 'call'];
    $u->fetcher = [TriviaFetcher::class, 'call'];
    $u->make_fetch_def = [TriviaMakeFetchDef::class, 'call'];
    $u->make_context = [TriviaMakeContext::class, 'call'];
    $u->make_options = [TriviaMakeOptions::class, 'call'];
    $u->make_request = [TriviaMakeRequest::class, 'call'];
    $u->make_response = [TriviaMakeResponse::class, 'call'];
    $u->make_result = [TriviaMakeResult::class, 'call'];
    $u->make_point = [TriviaMakePoint::class, 'call'];
    $u->make_spec = [TriviaMakeSpec::class, 'call'];
    $u->make_url = [TriviaMakeUrl::class, 'call'];
    $u->param = [TriviaParam::class, 'call'];
    $u->prepare_auth = [TriviaPrepareAuth::class, 'call'];
    $u->prepare_body = [TriviaPrepareBody::class, 'call'];
    $u->prepare_headers = [TriviaPrepareHeaders::class, 'call'];
    $u->prepare_method = [TriviaPrepareMethod::class, 'call'];
    $u->prepare_params = [TriviaPrepareParams::class, 'call'];
    $u->prepare_path = [TriviaPreparePath::class, 'call'];
    $u->prepare_query = [TriviaPrepareQuery::class, 'call'];
    $u->result_basic = [TriviaResultBasic::class, 'call'];
    $u->result_body = [TriviaResultBody::class, 'call'];
    $u->result_headers = [TriviaResultHeaders::class, 'call'];
    $u->transform_request = [TriviaTransformRequest::class, 'call'];
    $u->transform_response = [TriviaTransformResponse::class, 'call'];
});
