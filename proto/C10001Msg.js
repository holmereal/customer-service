/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  Platform: {
    nested: {
      ModelC10001: {
        options: {
          java_package: "com.cp.im.proto.c10001msg",
          java_outer_classname: "C10001"
        },
        nested: {
          C100011s2c: {
            fields: {
              noticeType: {
                rule: "required",
                type: "int32",
                id: 1
              },
              title: {
                rule: "required",
                type: "string",
                id: 2
              },
              content: {
                rule: "required",
                type: "string",
                id: 3
              }
            }
          },
          C100012s2c: {
            fields: {
              alias: {
                rule: "required",
                type: "string",
                id: 1
              },
              thumbIconURL: {
                rule: "repeated",
                type: "string",
                id: 2
              },
              sort: {
                rule: "required",
                type: "int32",
                id: 3
              },
              attachId: {
                rule: "required",
                type: "int64",
                id: 4
              },
              message: {
                type: "string",
                id: 5
              },
              messageType: {
                rule: "required",
                type: "int32",
                id: 6
              }
            }
          }
        }
      }
    }
  }
});

module.exports = $root;
