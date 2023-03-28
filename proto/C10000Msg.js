/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  C100001c2s: {
    fields: {
      identity: {
        rule: "required",
        type: "int32",
        id: 1
      },
      deviceId: {
        rule: "required",
        type: "string",
        id: 2
      },
      token: {
        rule: "required",
        type: "string",
        id: 3
      }
    }
  },
  C100001s2c: {
    fields: {
      errCode: {
        rule: "required",
        type: "int32",
        id: 1
      },
      errMsg: {
        type: "string",
        id: 2
      }
    }
  }
});

module.exports = $root;
