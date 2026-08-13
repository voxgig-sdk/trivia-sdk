# Trivia SDK utility: make_context

from trivia_sdk.core.context import TriviaContext


def make_context_util(ctxmap, basectx):
    return TriviaContext(ctxmap, basectx)
