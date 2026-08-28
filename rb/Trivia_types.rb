# frozen_string_literal: true

# Typed models for the Trivia SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Api entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] correct_answer
#   @return [String]
#
# @!attribute [rw] difficulty
#   @return [String]
#
# @!attribute [rw] incorrect_answers
#   @return [Array]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] type
#   @return [String]
Api = Struct.new(
  :category,
  :correct_answer,
  :difficulty,
  :incorrect_answers,
  :question,
  :type,
  keyword_init: true
)

# Request payload for Api#list.
#
# @!attribute [rw] amount
#   @return [Integer]
#
# @!attribute [rw] category
#   @return [Integer, nil]
#
# @!attribute [rw] difficulty
#   @return [String, nil]
#
# @!attribute [rw] encode
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
ApiListMatch = Struct.new(
  :amount,
  :category,
  :difficulty,
  :encode,
  :type,
  keyword_init: true
)

# ApiCategory entity data model.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] name
#   @return [String]
ApiCategory = Struct.new(
  :id,
  :name,
  keyword_init: true
)

# Request payload for ApiCategory#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
ApiCategoryListMatch = Struct.new(
  :id,
  :name,
  keyword_init: true
)

