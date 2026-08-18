<?php
declare(strict_types=1);

// Trivia SDK configuration

class TriviaConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Trivia",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://opentdb.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "api" => [],
                    "api_category" => [],
                ],
            ],
            "entity" => [
        'api' => [
          'fields' => [
            [
              'name' => 'category',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'correct_answer',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'difficulty',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'incorrect_answers',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'question',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'type',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'api',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 10,
                        'kind' => 'query',
                        'name' => 'amount',
                        'orig' => 'amount',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'difficulty',
                        'orig' => 'difficulty',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'encode',
                        'orig' => 'encode',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'type',
                        'orig' => 'type',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api.php',
                  'parts' => [
                    'api.php',
                  ],
                  'select' => [
                    'exist' => [
                      'amount',
                      'category',
                      'difficulty',
                      'encode',
                      'type',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'api_category' => [
          'fields' => [
            [
              'name' => 'id',
              'req' => true,
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'api_category',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api_category.php',
                  'parts' => [
                    'api_category.php',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.trivia_categories`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return TriviaFeatures::make_feature($name);
    }
}
