"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApiEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TRIVIA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TRIVIA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TriviaSDK.test();
        const ent = testsdk.Api();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TRIVIA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "category", "req": true, "short": "The category of the question", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "correct_answer", "req": true, "short": "The correct answer to the question", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "difficulty", "req": true, "short": "The difficulty level of the question", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "incorrect_answers", "req": true, "short": "Array of incorrect answers", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "question", "req": true, "short": "The question text (may contain HTML entities)", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "type", "req": true, "short": "The type of question", "type": "`$STRING`", "index$": 5 }], "name": "api", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 10, "kind": "query", "name": "amount", "orig": "amount", "reqd": true, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "category", "orig": "category", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "kind": "query", "name": "difficulty", "orig": "difficulty", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "encode", "orig": "encode", "reqd": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "kind": "query", "name": "type", "orig": "type", "reqd": false, "type": "`$STRING`", "index$": 4 }] }, "contract": { "id": "GET /api.php", "json": "{\"operationId\":\"getTriviaQuestions\",\"parameters\":[{\"description\":\"The number of questions to retrieve (1-50)\",\"in\":\"query\",\"name\":\"amount\",\"required\":true,\"schema\":{\"default\":10,\"maximum\":50,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"The category ID of questions\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"The difficulty level of questions\",\"in\":\"query\",\"name\":\"difficulty\",\"required\":false,\"schema\":{\"enum\":[\"easy\",\"medium\",\"hard\"],\"type\":\"string\"}},{\"description\":\"The type of questions\",\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"enum\":[\"multiple\",\"boolean\"],\"type\":\"string\"}},{\"description\":\"Encoding type for the response\",\"in\":\"query\",\"name\":\"encode\",\"required\":false,\"schema\":{\"enum\":[\"url3986\",\"base64\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"response_code\":0,\"results\":[{\"category\":\"Entertainment: Film\",\"correct_answer\":\"Vangelis\",\"difficulty\":\"medium\",\"incorrect_answers\":[\"Kitaro\",\"Yanni\",\"Enya\"],\"question\":\"Who did the score to the original Blade Runner?\",\"type\":\"multiple\"}]},\"schema\":{\"properties\":{\"response_code\":{\"description\":\"Response code indicating the status of the request (0 = Success, 1 = No Results, 2 = Invalid Parameter, 3 = Token Not Found, 4 = Token Empty)\",\"enum\":[0,1,2,3,4],\"type\":\"integer\"},\"results\":{\"items\":{\"properties\":{\"category\":{\"description\":\"The category of the question\",\"type\":\"string\"},\"correct_answer\":{\"description\":\"The correct answer to the question\",\"type\":\"string\"},\"difficulty\":{\"description\":\"The difficulty level of the question\",\"enum\":[\"easy\",\"medium\",\"hard\"],\"type\":\"string\"},\"incorrect_answers\":{\"description\":\"Array of incorrect answers\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"question\":{\"description\":\"The question text (may contain HTML entities)\",\"type\":\"string\"},\"type\":{\"description\":\"The type of question\",\"enum\":[\"multiple\",\"boolean\"],\"type\":\"string\"}},\"required\":[\"type\",\"difficulty\",\"category\",\"question\",\"correct_answer\",\"incorrect_answers\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"response_code\",\"results\"],\"type\":\"object\"}}},\"description\":\"Successful response with trivia questions\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api.php", "segments": [{ "lit": "api.php" }], "select": { "exist": ["amount", "category", "difficulty", "encode", "type"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "api", "name__orig": "api", "Name": "Api", "name_": "api", "name-": "api", "NAME": "API", "index$": 0 }, { "active": true, "entity": "api", "key$": "BasicApiFlow", "kind": "basic", "name": "BasicApiFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "api_ref01" } }], "index$": 0 }] }, 'Api');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_ref01_data = Object.values(setup.data.existing.api)[0];
        // LIST
        const api_ref01_ent = client.Api();
        const api_ref01_match = {};
        const api_ref01_list = (await api_ref01_ent.list(api_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api/ApiTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TriviaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api01', 'api02', 'api03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TRIVIA_TEST_API_ENTID': idmap,
        'TRIVIA_TEST_LIVE': 'FALSE',
        'TRIVIA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TRIVIA_TEST_API_ENTID'];
    const live = 'TRUE' === env.TRIVIA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TRIVIA_TEST_API_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TriviaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ApiEntity.test.js.map