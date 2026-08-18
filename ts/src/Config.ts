
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


  main = {
    name: 'Trivia',
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
          "type": "`$STRING`"
        },
        {
          "name": "correct_answer",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "difficulty",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "incorrect_answers",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "question",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "type",
          "req": true,
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
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "req": true,
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

