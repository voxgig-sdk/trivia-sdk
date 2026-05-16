<?php
declare(strict_types=1);

// Trivia SDK exists test

require_once __DIR__ . '/../trivia_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TriviaSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
