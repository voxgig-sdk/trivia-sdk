
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Trivia',
        slug: "trivia",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://opentdb.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      api: {
      },

      api_category: {
      },

    }
  }


  entity = {
    "api": {
      "fields": [
        {
          "name": "category",
          "req": true,
          "short": "The category of the question",
          "type": "`$STRING`"
        },
        {
          "name": "correct_answer",
          "req": true,
          "short": "The correct answer to the question",
          "type": "`$STRING`"
        },
        {
          "name": "difficulty",
          "req": true,
          "short": "The difficulty level of the question",
          "type": "`$STRING`"
        },
        {
          "name": "incorrect_answers",
          "req": true,
          "short": "Array of incorrect answers",
          "type": "`$ARRAY`"
        },
        {
          "name": "question",
          "req": true,
          "short": "The question text (may contain HTML entities)",
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
          "short": "The type of question",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "difficulty",
                    "orig": "difficulty",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "encode",
                    "orig": "encode",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api.php",
              "parts": [
                "api.php"
              ],
              "select": {
                "exist": [
                  "amount",
                  "category",
                  "difficulty",
                  "encode",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "api_category": {
      "fields": [
        {
          "name": "id",
          "req": true,
          "short": "The unique identifier for the category",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "req": true,
          "short": "The name of the category",
          "type": "`$STRING`"
        }
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
                "api_category.php"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.trivia_categories`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

