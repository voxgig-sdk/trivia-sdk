# Trivia SDK configuration

module TriviaConfig
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
              "active" => true,
              "name" => "category",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "correct_answer",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "difficulty",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "incorrect_answer",
              "req" => true,
              "type" => "`$ARRAY`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "question",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "type",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 5,
            },
          ],
          "name" => "api",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => 10,
                        "kind" => "query",
                        "name" => "amount",
                        "orig" => "amount",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "category",
                        "orig" => "category",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "difficulty",
                        "orig" => "difficulty",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "encode",
                        "orig" => "encode",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "type",
                        "orig" => "type",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
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
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "api_category" => {
          "fields" => [
            {
              "active" => true,
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 1,
            },
          ],
          "name" => "api_category",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "method" => "GET",
                  "orig" => "/api_category.php",
                  "parts" => [
                    "api_category.php",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
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
