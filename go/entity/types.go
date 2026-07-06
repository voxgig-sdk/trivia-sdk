// Typed models for the Trivia SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Api is the typed data model for the api entity.
type Api struct {
	Category string `json:"category"`
	CorrectAnswer string `json:"correct_answer"`
	Difficulty string `json:"difficulty"`
	IncorrectAnswer []any `json:"incorrect_answer"`
	Question string `json:"question"`
	Type string `json:"type"`
}

// ApiListMatch is the typed request payload for Api.ListTyped.
type ApiListMatch struct {
	Category *string `json:"category,omitempty"`
	CorrectAnswer *string `json:"correct_answer,omitempty"`
	Difficulty *string `json:"difficulty,omitempty"`
	IncorrectAnswer *[]any `json:"incorrect_answer,omitempty"`
	Question *string `json:"question,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ApiCategory is the typed data model for the api_category entity.
type ApiCategory struct {
	Id int `json:"id"`
	Name string `json:"name"`
}

// ApiCategoryListMatch is the typed request payload for ApiCategory.ListTyped.
type ApiCategoryListMatch struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
