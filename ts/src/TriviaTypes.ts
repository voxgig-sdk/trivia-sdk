// Typed models for the Trivia SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Api {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answer: any[]
  question: string
  type: string
}

export type ApiListMatch = Partial<Api>

export interface ApiCategory {
  id: number
  name: string
}

export type ApiCategoryListMatch = Partial<ApiCategory>

