# ProjectName SDK exists test

import pytest
from trivia_sdk import TriviaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TriviaSDK.test(None, None)
        assert testsdk is not None
