# Typed models for the Trivia SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Api:
    category: str
    correct_answer: str
    difficulty: str
    incorrect_answer: list
    question: str
    type: str


@dataclass
class ApiListMatch:
    category: Optional[str] = None
    correct_answer: Optional[str] = None
    difficulty: Optional[str] = None
    incorrect_answer: Optional[list] = None
    question: Optional[str] = None
    type: Optional[str] = None


@dataclass
class ApiCategory:
    id: int
    name: str


@dataclass
class ApiCategoryListMatch:
    id: Optional[int] = None
    name: Optional[str] = None

