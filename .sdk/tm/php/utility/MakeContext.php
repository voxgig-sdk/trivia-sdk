<?php
declare(strict_types=1);

// Trivia SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TriviaMakeContext
{
    public static function call(array $ctxmap, ?TriviaContext $basectx): TriviaContext
    {
        return new TriviaContext($ctxmap, $basectx);
    }
}
