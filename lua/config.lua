-- Trivia SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Trivia",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://opentdb.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["api"] = {},
        ["api_category"] = {},
      },
    },
    entity = {
      ["api"] = {
        ["fields"] = {
          {
            ["name"] = "category",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "correct_answer",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "difficulty",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "incorrect_answers",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "question",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "api",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "amount",
                      ["orig"] = "amount",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "difficulty",
                      ["orig"] = "difficulty",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "encode",
                      ["orig"] = "encode",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api.php",
                ["parts"] = {
                  "api.php",
                },
                ["select"] = {
                  ["exist"] = {
                    "amount",
                    "category",
                    "difficulty",
                    "encode",
                    "type",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["api_category"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "api_category",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api_category.php",
                ["parts"] = {
                  "api_category.php",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.trivia_categories`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
