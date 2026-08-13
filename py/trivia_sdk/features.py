# Trivia SDK feature factory

from trivia_sdk.feature.base_feature import TriviaBaseFeature
from trivia_sdk.feature.test_feature import TriviaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: TriviaBaseFeature(),
        "test": lambda: TriviaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
