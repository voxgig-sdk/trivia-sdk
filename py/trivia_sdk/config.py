# Trivia SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Trivia",
            "slug": "trivia",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://opentdb.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "api": {},
                "api_category": {},
            },
        },
        "entity": {
      "api": {
        "fields": [
          {
            "name": "category",
            "req": True,
            "short": "The category of the question",
            "type": "`$STRING`",
          },
          {
            "name": "correct_answer",
            "req": True,
            "short": "The correct answer to the question",
            "type": "`$STRING`",
          },
          {
            "name": "difficulty",
            "req": True,
            "short": "The difficulty level of the question",
            "type": "`$STRING`",
          },
          {
            "name": "incorrect_answers",
            "req": True,
            "short": "Array of incorrect answers",
            "type": "`$ARRAY`",
          },
          {
            "name": "question",
            "req": True,
            "short": "The question text (may contain HTML entities)",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
            "short": "The type of question",
            "type": "`$STRING`",
          },
        ],
        "name": "api",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "amount",
                      "orig": "amount",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "difficulty",
                      "orig": "difficulty",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "encode",
                      "orig": "encode",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api.php",
                "segments": [
                  {
                    "lit": "api.php",
                  },
                ],
                "select": {
                  "exist": [
                    "amount",
                    "category",
                    "difficulty",
                    "encode",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
                "parts": [
                  "api.php",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "api_category": {
        "fields": [
          {
            "name": "id",
            "req": True,
            "short": "The unique identifier for the category",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "req": True,
            "short": "The name of the category",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "api_category",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api_category.php",
                "segments": [
                  {
                    "lit": "api_category.php",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.trivia_categories`",
                },
                "parts": [
                  "api_category.php",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
