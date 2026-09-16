

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


describe('ApiCategoryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TRIVIA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TRIVIA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TriviaSDK.test()
    const ent = testsdk.ApiCategory()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TRIVIA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_category.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":true,"short":"The unique identifier for the category","type":"`$INTEGER`","index$":0},{"active":true,"name":"name","req":true,"short":"The name of the category","type":"`$STRING`","index$":1}],"id":{"field":"id","name":"id"},"name":"api_category","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /api_category.php","json":"{\"operationId\":\"getTriviaCategories\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"trivia_categories\":{\"items\":{\"properties\":{\"id\":{\"description\":\"The unique identifier for the category\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the category\",\"type\":\"string\"}},\"required\":[\"id\",\"name\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with category list\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api_category.php","segments":[{"lit":"api_category.php"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.trivia_categories`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api_category","name__orig":"api_category","Name":"ApiCategory","name_":"api_category","name-":"api-category","NAME":"API_CATEGORY","index$":1}, {"active":true,"entity":"api_category","key$":"BasicApiCategoryFlow","kind":"basic","name":"BasicApiCategoryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"api_category_ref01"}}],"index$":0}]}, 'ApiCategory')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_category_ref01_data = Object.values(setup.data.existing.api_category)[0] as any

    // LIST
    const api_category_ref01_ent = client.ApiCategory()
    const api_category_ref01_match: any = {}

    const api_category_ref01_list = (await api_category_ref01_ent.list(api_category_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api_category/ApiCategoryTestData.json')

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
    ['api_category01','api_category02','api_category03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TRIVIA_TEST_API_CATEGORY_ENTID': idmap,
    'TRIVIA_TEST_LIVE': 'FALSE',
    'TRIVIA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TRIVIA_TEST_API_CATEGORY_ENTID']

  const live = 'TRUE' === env.TRIVIA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TRIVIA_TEST_API_CATEGORY_ENTID']
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
  
