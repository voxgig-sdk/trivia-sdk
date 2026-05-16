package = "voxgig-sdk-trivia"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/trivia-sdk.git"
}
description = {
  summary = "Trivia SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["trivia_sdk"] = "trivia_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
