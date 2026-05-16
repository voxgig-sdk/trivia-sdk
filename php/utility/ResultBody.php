<?php
declare(strict_types=1);

// Trivia SDK utility: result_body

class TriviaResultBody
{
    public static function call(TriviaContext $ctx): ?TriviaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
