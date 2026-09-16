

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TriviaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TRIVIA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TRIVIA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TriviaSDK.test()
    const ent = testsdk.Api()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TRIVIA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"category","req":true,"short":"The category of the question","type":"`$STRING`","index$":0},{"active":true,"name":"correct_answer","req":true,"short":"The correct answer to the question","type":"`$STRING`","index$":1},{"active":true,"name":"difficulty","req":true,"short":"The difficulty level of the question","type":"`$STRING`","index$":2},{"active":true,"name":"incorrect_answers","req":true,"short":"Array of incorrect answers","type":"`$ARRAY`","index$":3},{"active":true,"name":"question","req":true,"short":"The question text (may contain HTML entities)","type":"`$STRING`","index$":4},{"active":true,"name":"type","req":true,"short":"The type of question","type":"`$STRING`","index$":5}],"name":"api","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"amount","orig":"amount","reqd":true,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"category","orig":"category","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"difficulty","orig":"difficulty","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"encode","orig":"encode","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /api.php","json":"{\"operationId\":\"getTriviaQuestions\",\"parameters\":[{\"description\":\"The number of questions to retrieve (1-50)\",\"in\":\"query\",\"name\":\"amount\",\"required\":true,\"schema\":{\"default\":10,\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The category ID of questions\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The difficulty level of questions\",\"in\":\"query\",\"name\":\"difficulty\",\"required\":false,\"schema\":{\"enum\":[\"easy\",\"medium\",\"hard\"],\"type\":\"string\"}},{\"description\":\"The type of questions\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"multiple\",\"boolean\"],\"type\":\"string\"}},{\"description\":\"Encoding type for the response\",\"in\":\"query\",\"name\":\"encode\",\"required\":false,\"schema\":{\"enum\":[\"url3986\",\"base64\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"response_code\":0,\"results\":[{\"category\":\"Entertainment: Film\",\"correct_answer\":\"Vangelis\",\"difficulty\":\"medium\",\"incorrect_answers\":[\"Kitaro\",\"Yanni\",\"Enya\"],\"question\":\"Who did the score to the original Blade Runner?\",\"type\":\"multiple\"}]},\"schema\":{\"properties\":{\"response_code\":{\"description\":\"Response code indicating the status of the request (0 = Success, 1 = No Results, 2 = Invalid Parameter, 3 = Token Not Found, 4 = Token Empty)\",\"enum\":[0,1,2,3,4],\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"category\":{\"description\":\"The category of the question\",\"type\":\"string\"},\"correct_answer\":{\"description\":\"The correct answer to the question\",\"type\":\"string\"},\"difficulty\":{\"description\":\"The difficulty level of the question\",\"enum\":[\"easy\",\"medium\",\"hard\"],\"type\":\"string\"},\"incorrect_answers\":{\"description\":\"Array of incorrect answers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"question\":{\"description\":\"The question text (may contain HTML entities)\",\"type\":\"string\"},\"type\":{\"description\":\"The type of question\",\"enum\":[\"multiple\",\"boolean\"],\"type\":\"string\"}},\"required\":[\"type\",\"difficulty\",\"category\",\"question\",\"correct_answer\",\"incorrect_answers\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"response_code\",\"results\"],\"type\":\"object\"}}},\"description\":\"Successful response with trivia questions\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api.php","segments":[{"lit":"api.php"}],"select":{"exist":["amount","category","difficulty","encode","type"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api","name__orig":"api","Name":"Api","name_":"api","name-":"api","NAME":"API","index$":0}, {"active":true,"entity":"api","key$":"BasicApiFlow","kind":"basic","name":"BasicApiFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"api_ref01"}}],"index$":0}]}, 'Api')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_ref01_data = Object.values(setup.data.existing.api)[0] as any

    // LIST
    const api_ref01_ent = client.Api()
    const api_ref01_match: any = {}

    const api_ref01_list = (await api_ref01_ent.list(api_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api/ApiTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TriviaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['api01','api02','api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TRIVIA_TEST_API_ENTID': idmap,
    'TRIVIA_TEST_LIVE': 'FALSE',
    'TRIVIA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TRIVIA_TEST_API_ENTID']

  const live = 'TRUE' === env.TRIVIA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TRIVIA_TEST_API_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TriviaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TRIVIA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
