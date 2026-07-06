-- Typed models for the Trivia SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Api
---@field category string
---@field correct_answer string
---@field difficulty string
---@field incorrect_answer table
---@field question string
---@field type string

---@class ApiListMatch
---@field category? string
---@field correct_answer? string
---@field difficulty? string
---@field incorrect_answer? table
---@field question? string
---@field type? string

---@class ApiCategory
---@field id number
---@field name string

---@class ApiCategoryListMatch
---@field id? number
---@field name? string

local M = {}

return M
