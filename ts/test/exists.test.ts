
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TriviaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await TriviaSDK.test()
    equal(null !== testsdk, true)
  })

})
