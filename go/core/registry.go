package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiEntityFunc func(client *TriviaSDK, entopts map[string]any) TriviaEntity

var NewApiCategoryEntityFunc func(client *TriviaSDK, entopts map[string]any) TriviaEntity

