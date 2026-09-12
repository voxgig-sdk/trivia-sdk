
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
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
      },
      "transport": "base"
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
              "segments": [
                {
                  "lit": "api.php"
                }
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
              },
              "parts": [
                "api.php"
              ]
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
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "api_category.php"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.trivia_categories`"
              },
              "parts": [
                "api_category.php"
              ]
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
  config,
  FEATURE_PLUGINS,
}

