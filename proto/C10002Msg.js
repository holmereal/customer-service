/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.addJSON({
  Platform: {
    nested: {
      ModelC10002: {
        options: {
          java_package: "com.cp.im.proto.c10002msg",
          java_outer_classname: "C10002"
        },
        nested: {
          ESUserInfo: {
            fields: {
              userId: {
                rule: "required",
                type: "int64",
                id: 1
              },
              mobile: {
                rule: "required",
                type: "string",
                id: 2
              },
              alias: {
                rule: "required",
                type: "string",
                id: 3
              },
              iconURL: {
                rule: "required",
                type: "string",
                id: 4
              }
            }
          },
          ESEmojiInfo: {
            fields: {
              emName: {
                rule: "required",
                type: "string",
                id: 1
              },
              animURL: {
                rule: "required",
                type: "string",
                id: 2
              }
            }
          },
          ESImageInfo: {
            fields: {
              width: {
                rule: "required",
                type: "int32",
                id: 1
              },
              height: {
                rule: "required",
                type: "int32",
                id: 2
              },
              imageFile: {
                type: "bytes",
                id: 3
              },
              imageExt: {
                type: "string",
                id: 4
              },
              imageURL: {
                type: "string",
                id: 5
              },
              litimg: {
                type: "string",
                id: 6
              }
            }
          },
          ESVoiceInfo: {
            fields: {
              duration: {
                rule: "required",
                type: "int32",
                id: 1
              },
              voiceFile: {
                type: "bytes",
                id: 2
              },
              voiceExt: {
                type: "string",
                id: 3
              },
              voiceURL: {
                type: "string",
                id: 4
              }
            }
          },
          ESVideoInfo: {
            fields: {
              width: {
                rule: "required",
                type: "int32",
                id: 1
              },
              height: {
                rule: "required",
                type: "int32",
                id: 2
              },
              duration: {
                rule: "required",
                type: "int32",
                id: 3
              },
              videoFile: {
                type: "bytes",
                id: 4
              },
              videoExt: {
                type: "string",
                id: 5
              },
              coverFile: {
                type: "bytes",
                id: 6
              },
              coverExt: {
                type: "string",
                id: 7
              },
              videoURL: {
                type: "string",
                id: 8
              },
              coverURL: {
                type: "string",
                id: 9
              }
            }
          },
          C100020c2s: {
            fields: {
              sort: {
                rule: "required",
                type: "int32",
                id: 1
              },
              targetId: {
                type: "int64",
                id: 2
              },
              groupId: {
                type: "int64",
                id: 3
              }
            }
          },
          C100020s2c: {
            fields: {
              errCode: {
                rule: "required",
                type: "int32",
                id: 1
              },
              userInfo: {
                rule: "repeated",
                type: "ESUserInfo",
                id: 2
              },
              errMsg: {
                type: "string",
                id: 3
              }
            }
          },
          C100021c2s: {
            fields: {
              sort: {
                rule: "required",
                type: "int32",
                id: 1
              },
              targetId: {
                type: "int64",
                id: 2
              },
              groupId: {
                type: "int64",
                id: 3
              },
              messageType: {
                rule: "required",
                type: "int32",
                id: 4
              },
              message: {
                type: "string",
                id: 5
              },
              messageId: {
                rule: "required",
                type: "string",
                id: 6
              },
              imageInfo: {
                type: "ESImageInfo",
                id: 7
              },
              voiceInfo: {
                type: "ESVoiceInfo",
                id: 8
              },
              videoInfo: {
                type: "ESVideoInfo",
                id: 9
              },
              emojiInfo: {
                type: "ESEmojiInfo",
                id: 10
              }
            }
          },
          C100021s2c: {
            fields: {
              errCode: {
                rule: "required",
                type: "int32",
                id: 1
              },
              recordId: {
                rule: "required",
                type: "int64",
                id: 2
              },
              messageId: {
                rule: "required",
                type: "string",
                id: 3
              },
              targetId: {
                rule: "required",
                type: "int64",
                id: 4
              },
              errMsg: {
                type: "string",
                id: 5
              }
            }
          },
          C100022s2c: {
            fields: {
              sort: {
                rule: "required",
                type: "int32",
                id: 1
              },
              recordId: {
                rule: "required",
                type: "int64",
                id: 2
              },
              groupId: {
                type: "int64",
                id: 3
              },
              userId: {
                rule: "required",
                type: "int64",
                id: 4
              },
              message: {
                type: "string",
                id: 5
              },
              messageId: {
                rule: "required",
                type: "string",
                id: 6
              },
              messageSort: {
                type: "int32",
                id: 7
              },
              messageType: {
                rule: "required",
                type: "int32",
                id: 8
              },
              imageInfo: {
                type: "ESImageInfo",
                id: 9
              },
              voiceInfo: {
                type: "ESVoiceInfo",
                id: 10
              },
              videoInfo: {
                type: "ESVideoInfo",
                id: 11
              },
              emojiInfo: {
                type: "ESEmojiInfo",
                id: 12
              },
              isAction: {
                rule: "required",
                type: "int32",
                id: 13
              },
              createTime: {
                rule: "required",
                type: "string",
                id: 14
              }
            }
          },
          C100023c2s: {
            fields: {
              sort: {
                rule: "required",
                type: "int32",
                id: 1
              },
              targetId: {
                type: "int64",
                id: 2
              },
              groupId: {
                type: "int64",
                id: 3
              }
            }
          },
          C100024c2s: {
            fields: {
              sort: {
                rule: "required",
                type: "int32",
                id: 1
              },
              targetId: {
                type: "int64",
                id: 2
              },
              groupId: {
                type: "int64",
                id: 3
              },
              recordId: {
                rule: "required",
                type: "int64",
                id: 4
              }
            }
          },
          C100025s2c: {
            fields: {
              sort: {
                rule: "required",
                type: "int32",
                id: 1
              },
              targetId: {
                type: "int64",
                id: 2
              },
              groupId: {
                type: "int64",
                id: 3
              },
              recordId: {
                rule: "required",
                type: "int64",
                id: 4
              }
            }
          }
        }
      }
    }
  }
});

module.exports = $root;
