# Trivia SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$STRING`",
          },
          {
            "name": "correct_answer",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "difficulty",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "incorrect_answers",
            "req": True,
            "type": "`$ARRAY`",
          },
          {
            "name": "question",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "req": True,
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
                "parts": [
                  "api.php",
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
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
          },
        ],
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
                "parts": [
                  "api_category.php",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.trivia_categories`",
                },
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
