<?php
declare(strict_types=1);

// Trivia SDK base feature

class TriviaBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(TriviaContext $ctx, array $options): void {}
    public function PostConstruct(TriviaContext $ctx): void {}
    public function PostConstructEntity(TriviaContext $ctx): void {}
    public function SetData(TriviaContext $ctx): void {}
    public function GetData(TriviaContext $ctx): void {}
    public function GetMatch(TriviaContext $ctx): void {}
    public function SetMatch(TriviaContext $ctx): void {}
    public function PrePoint(TriviaContext $ctx): void {}
    public function PreSpec(TriviaContext $ctx): void {}
    public function PreRequest(TriviaContext $ctx): void {}
    public function PreResponse(TriviaContext $ctx): void {}
    public function PreResult(TriviaContext $ctx): void {}
    public function PreDone(TriviaContext $ctx): void {}
    public function PreUnexpected(TriviaContext $ctx): void {}
}
