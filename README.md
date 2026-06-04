# Trivia SDK

Fetch free, user-contributed multiple-choice and true/false trivia questions from the Open Trivia Database

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Trivia API

The [Open Trivia Database](https://opentdb.com) is a free, community-curated collection of over 5,000 verified trivia questions maintained by Pixeltail Games LLC. The JSON API at `https://opentdb.com` lets applications pull random questions for quizzes, games, and learning tools without an API key.

What you get from the API:

- Random questions via `GET /api.php` with parameters for `amount` (max 50 per call), `category`, `difficulty` (easy / medium / hard), and `type` (`multiple` or `boolean`).
- A category lookup endpoint that returns the full list of available category IDs (General Knowledge, Science, Geography, History, Sports, Film, Music, Video Games, Anime, Mythology, and more).
- Per-category and global question-count helpers.
- Optional session tokens that remember which questions you have already received so the same question is not returned twice; tokens expire after 6 hours of inactivity and can be reset.
- Selectable response encodings: default HTML entities, legacy URL encoding, RFC 3986, or Base64.

Operational notes: no authentication is required, CORS is enabled, and the service enforces a 5-second cooldown per IP (response code 5 indicates rate limiting). Other documented response codes include 0 (success), 1 (no results), 2 (invalid parameter), 3 (token not found), and 4 (token exhausted).

## Try it

**TypeScript**
```bash
npm install trivia
```

**Python**
```bash
pip install trivia-sdk
```

**PHP**
```bash
composer require voxgig/trivia-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/trivia-sdk/go
```

**Ruby**
```bash
gem install trivia-sdk
```

**Lua**
```bash
luarocks install trivia-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { TriviaSDK } from 'trivia'

const client = new TriviaSDK({})

// List all apis
const apis = await client.Api().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o trivia-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "trivia": {
      "command": "/abs/path/to/trivia-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Api** | Core question-retrieval and helper endpoints, including `GET /api.php` for random questions and the global question-count helper. | `/api.php` |
| **ApiCategory** | Category metadata: `GET /api_category.php` returns the list of available categories and their IDs, and `GET /api_count.php` returns the question count for a given category. | `/api_category.php` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from trivia_sdk import TriviaSDK

client = TriviaSDK({})

# List all apis
apis, err = client.Api(None).list(None, None)
```

### PHP

```php
<?php
require_once 'trivia_sdk.php';

$client = new TriviaSDK([]);

// List all apis
[$apis, $err] = $client->Api(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/trivia-sdk/go"

client := sdk.NewTriviaSDK(map[string]any{})

// List all apis
apis, err := client.Api(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Trivia_sdk"

client = TriviaSDK.new({})

# List all apis
apis, err = client.Api(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("trivia_sdk")

local client = sdk.new({})

-- List all apis
local apis, err = client:Api(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = TriviaSDK.test()
const result = await client.Api().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = TriviaSDK.test(None, None)
result, err = client.Api(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = TriviaSDK::test(null, null);
[$result, $err] = $client->Api(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Api(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = TriviaSDK.test(nil, nil)
result, err = client.Api(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Api(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Trivia API

- Upstream: [https://opentdb.com](https://opentdb.com)
- API docs: [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php)

- Trivia content is published by Pixeltail Games LLC under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- You must credit the Open Trivia Database when redistributing questions.
- Derivative works (e.g. modified question sets) must be shared under the same licence.
- The API itself requires no key, but the licence terms apply to the question data you retrieve.

---

Generated from the Trivia API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
