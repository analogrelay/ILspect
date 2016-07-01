System.config({
  baseURL: ".",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "npm:*": "jspm_packages/npm/*",
    "github:*": "jspm_packages/github/*",
    "*": "src/*"
  },

  map: {
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.2.0.1",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "redux": "npm:redux@3.5.2",
    "redux-logger": "npm:redux-logger@2.6.1",
    "redux-thunk": "npm:redux-thunk@2.1.0",
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.22"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:aurelia-binding@1.0.0-beta.2.0.7": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.1"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.2.0.1": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.2.0.1",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.2.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.2.0.1",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.2.0.1",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.2.0.1",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.3.0.1",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.2.0.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.2.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.3.0.3",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.2.0.2",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.3.0.4",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.2.0.2"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.2.1.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.2.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1"
    },
    "npm:aurelia-framework@1.0.0-beta.2.0.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.2.0.7",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.2.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.3.0.3"
    },
    "npm:aurelia-history-browser@1.0.0-beta.2.0.1": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-loader-default@1.0.0-beta.2.0.1": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.2.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-loader@1.0.0-beta.2.0.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1"
    },
    "npm:aurelia-logging-console@1.0.0-beta.2.0.1": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1"
    },
    "npm:aurelia-metadata@1.0.0-beta.2.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.3.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-polyfills@1.0.0-beta.2.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.2.0.1": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1"
    },
    "npm:aurelia-router@1.0.0-beta.2.0.1": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.1",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.2.0.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.2.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.2.0.1"
    },
    "npm:aurelia-task-queue@1.0.0-beta.2.0.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.2.0.2": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.2.0.7",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.3.0.3"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.3.0.4": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.2.0.7",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.2.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.3.0.3"
    },
    "npm:aurelia-templating-router@1.0.0-beta.2.0.2": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.2.0.1",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.3.0.3"
    },
    "npm:aurelia-templating@1.0.0-beta.3.0.3": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.2.0.7",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.2.1.1",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.2.0.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.2.0.1",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.2.0.1",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.2.0.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.2.0.1",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.2.0.1"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:lodash@4.13.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:loose-envify@1.2.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@1.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:redux@3.5.2": {
      "lodash": "npm:lodash@4.13.1",
      "lodash-es": "npm:lodash-es@4.13.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
