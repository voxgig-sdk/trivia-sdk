<?php
declare(strict_types=1);

// Trivia SDK utility: result_headers

class TriviaResultHeaders
{
    public static function call(TriviaContext $ctx): ?TriviaResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
