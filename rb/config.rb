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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "correct_answer",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "difficulty",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "incorrect_answers",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "question",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "req" => true,
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
                  "parts" => [
                    "api.php",
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "api_category.php",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.trivia_categories`",
                  },
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
