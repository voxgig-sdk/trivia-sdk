<?php
declare(strict_types=1);

// Trivia SDK utility: prepare_body

class TriviaPrepareBody
{
    public static function call(TriviaContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
