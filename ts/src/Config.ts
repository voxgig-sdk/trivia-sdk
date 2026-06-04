
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://opentdb.com',

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
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "correct_answer",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "difficulty",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "incorrect_answer",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 3
        },
        {
          "name": "question",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        }
      ],
      "name": "api",
      "op": {
        "list": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "difficulty",
                    "orig": "difficulty",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "encode",
                    "orig": "encode",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "api_category",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/api_category.php",
              "parts": [
                "api_category.php"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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

