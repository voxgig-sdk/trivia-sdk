# Trivia SDK configuration


def make_config():
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
            "active": True,
            "name": "category",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "correct_answer",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "difficulty",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "incorrect_answer",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "question",
            "req": True,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "type",
            "req": True,
            "type": "`$STRING`",
            "index$": 5,
          },
        ],
        "name": "api",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": 10,
                      "kind": "query",
                      "name": "amount",
                      "orig": "amount",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "difficulty",
                      "orig": "difficulty",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "encode",
                      "orig": "encode",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
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
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "api_category": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": True,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "api_category",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/api_category.php",
                "parts": [
                  "api_category.php",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
