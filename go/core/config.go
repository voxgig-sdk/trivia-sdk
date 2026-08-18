package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Trivia",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://opentdb.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"api": map[string]any{},
				"api_category": map[string]any{},
			},
		},
		"entity": map[string]any{
			"api": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "correct_answer",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "difficulty",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "incorrect_answers",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "question",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "api",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "amount",
											"orig": "amount",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "difficulty",
											"orig": "difficulty",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "encode",
											"orig": "encode",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api.php",
								"parts": []any{
									"api.php",
								},
								"select": map[string]any{
									"exist": []any{
										"amount",
										"category",
										"difficulty",
										"encode",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"api_category": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "api_category",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api_category.php",
								"parts": []any{
									"api_category.php",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.trivia_categories`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
