package voxgigtriviasdk

import (
	"github.com/voxgig-sdk/trivia-sdk/core"
	"github.com/voxgig-sdk/trivia-sdk/entity"
	"github.com/voxgig-sdk/trivia-sdk/feature"
	_ "github.com/voxgig-sdk/trivia-sdk/utility"
)

// Type aliases preserve external API.
type TriviaSDK = core.TriviaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TriviaEntity = core.TriviaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TriviaError = core.TriviaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewApiEntityFunc = func(client *core.TriviaSDK, entopts map[string]any) core.TriviaEntity {
		return entity.NewApiEntity(client, entopts)
	}
	core.NewApiCategoryEntityFunc = func(client *core.TriviaSDK, entopts map[string]any) core.TriviaEntity {
		return entity.NewApiCategoryEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTriviaSDK = core.NewTriviaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
