<?php
declare(strict_types=1);

// Typed models for the Trivia SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Api entity data model. */
class Api
{
    public string $category;
    public string $correct_answer;
    public string $difficulty;
    public array $incorrect_answer;
    public string $question;
    public string $type;
}

/** Request payload for Api#list. */
class ApiListMatch
{
    public ?string $category = null;
    public ?string $correct_answer = null;
    public ?string $difficulty = null;
    public ?array $incorrect_answer = null;
    public ?string $question = null;
    public ?string $type = null;
}

/** ApiCategory entity data model. */
class ApiCategory
{
    public int $id;
    public string $name;
}

/** Request payload for ApiCategory#list. */
class ApiCategoryListMatch
{
    public ?int $id = null;
    public ?string $name = null;
}

