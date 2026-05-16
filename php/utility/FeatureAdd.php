<?php
declare(strict_types=1);

// Trivia SDK utility: feature_add

class TriviaFeatureAdd
{
    public static function call(TriviaContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
