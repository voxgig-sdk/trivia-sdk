# Trivia SDK configuration

module TriviaConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Trivia",
        "slug" => "trivia",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://opentdb.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "api" => {},
          "api_category" => {},
        },
      },
      "entity" => {
        "api" => {
          "fields" => [
            {
              "name" => "category",
              "req" => true,
              "short" => "The category of the question",
              "type" => "`$STRING`",
            },
            {
              "name" => "correct_answer",
              "req" => true,
              "short" => "The correct answer to the question",
              "type" => "`$STRING`",
            },
            {
              "name" => "difficulty",
              "req" => true,
              "short" => "The difficulty level of the question",
              "type" => "`$STRING`",
            },
            {
              "name" => "incorrect_answers",
              "req" => true,
              "short" => "Array of incorrect answers",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "question",
              "req" => true,
              "short" => "The question text (may contain HTML entities)",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
              "short" => "The type of question",
              "type" => "`$STRING`",
            },
          ],
          "name" => "api",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "amount",
                        "orig" => "amount",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "difficulty",
                        "orig" => "difficulty",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "encode",
                        "orig" => "encode",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api.php",
                  "segments" => [
                    {
                      "lit" => "api.php",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "amount",
                      "category",
                      "difficulty",
                      "encode",
                      "type",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "parts" => [
                    "api.php",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "api_category" => {
          "fields" => [
            {
              "name" => "id",
              "req" => true,
              "short" => "The unique identifier for the category",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "The name of the category",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "api_category",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api_category.php",
                  "segments" => [
                    {
                      "lit" => "api_category.php",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.trivia_categories`",
                  },
                  "parts" => [
                    "api_category.php",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    TriviaFeatures.make_feature(name)
  end
end
