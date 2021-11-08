(function(global, factory) {
  return factory();
}(this, (function() {

  var sd = {};

  (function() {
    var objectTypes = {
      "function": true,
      "object": true
    };
    var root = objectTypes[typeof window] && window || this;

    function runInContext(context, exports) {
      context || (context = root.Object());
      exports || (exports = root.Object());

      var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

      if (typeof nativeJSON == "object" && nativeJSON) {
        exports.stringify = nativeJSON.stringify;
        exports.parse = nativeJSON.parse;
      }

      var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined$1;

      function attempt(func, errorFunc) {
        try {
          func();
        } catch (exception) {
          if (errorFunc) {
            errorFunc();
          }
        }
      }

      var isExtended = new Date(-3509827334573292);
      attempt(function() {
        isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
          isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
      });

      function has(name) {
        if (has[name] != null) {
          return has[name];
        }
        var isSupported;
        if (name == "bug-string-char-index") {
          isSupported = "a" [0] != "a";
        } else if (name == "json") {
          isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
        } else if (name == "date-serialization") {
          isSupported = has("json-stringify") && isExtended;
          if (isSupported) {
            var stringify = exports.stringify;
            attempt(function() {
              isSupported =
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            });
          }
        } else {
          var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
          if (name == "json-stringify") {
            var stringify = exports.stringify,
              stringifySupported = typeof stringify == "function";
            if (stringifySupported) {
              (value = function() {
                return 1;
              }).toJSON = value;
              attempt(function() {
                stringifySupported =
                  stringify(0) === "0" &&
                  stringify(new Number()) === "0" &&
                  stringify(new String()) == '""' &&
                  stringify(getClass) === undefined$1 &&
                  stringify(undefined$1) === undefined$1 &&
                  stringify() === undefined$1 &&
                  stringify(value) === "1" &&
                  stringify([value]) == "[1]" &&
                  stringify([undefined$1]) == "[null]" &&
                  stringify(null) == "null" &&
                  stringify([undefined$1, getClass, null]) == "[null,null,null]" &&
                  stringify({
                    "a": [value, true, false, null, "\x00\b\n\f\r\t"]
                  }) == serialized &&
                  stringify(null, value) === "1" &&
                  stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
              }, function() {
                stringifySupported = false;
              });
            }
            isSupported = stringifySupported;
          }
          if (name == "json-parse") {
            var parse = exports.parse,
              parseSupported;
            if (typeof parse == "function") {
              attempt(function() {
                if (parse("0") === 0 && !parse(false)) {
                  value = parse(serialized);
                  parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                  if (parseSupported) {
                    attempt(function() {
                      parseSupported = !parse('"\t"');
                    });
                    if (parseSupported) {
                      attempt(function() {
                        parseSupported = parse("01") !== 1;
                      });
                    }
                    if (parseSupported) {
                      attempt(function() {
                        parseSupported = parse("1.") !== 1;
                      });
                    }
                  }
                }
              }, function() {
                parseSupported = false;
              });
            }
            isSupported = parseSupported;
          }
        }
        return has[name] = !!isSupported;
      }
      has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

      if (!has("json")) {
        var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

        var charIndexBuggy = has("bug-string-char-index");

        var forOwn = function(object, callback) {
          var size = 0,
            Properties, dontEnums, property;

          (Properties = function() {
            this.valueOf = 0;
          }).prototype.valueOf = 0;

          dontEnums = new Properties();
          for (property in dontEnums) {
            if (isProperty.call(dontEnums, property)) {
              size++;
            }
          }
          Properties = dontEnums = null;

          if (!size) {
            dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
            forOwn = function(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                property, length;
              var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
              for (property in object) {
                if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                  callback(property);
                }
              }
              for (length = dontEnums.length; property = dontEnums[--length];) {
                if (hasProperty.call(object, property)) {
                  callback(property);
                }
              }
            };
          } else {
            forOwn = function(object, callback) {
              var isFunction = getClass.call(object) == functionClass,
                property, isConstructor;
              for (property in object) {
                if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                  callback(property);
                }
              }
              if (isConstructor || isProperty.call(object, (property = "constructor"))) {
                callback(property);
              }
            };
          }
          return forOwn(object, callback);
        };

        if (!has("json-stringify") && !has("date-serialization")) {
          var Escapes = {
            92: "\\\\",
            34: '\\"',
            8: "\\b",
            12: "\\f",
            10: "\\n",
            13: "\\r",
            9: "\\t"
          };

          var leadingZeroes = "000000";
          var toPaddedString = function(width, value) {
            return (leadingZeroes + (value || 0)).slice(-width);
          };

          var serializeDate = function(value) {
            var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
            if (!isExtended) {
              var floor = Math.floor;
              var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
              var getDay = function(year, month) {
                return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
              };
              getData = function(value) {
                date = floor(value / 864e5);
                for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                date = 1 + date - getDay(year, month);
                time = (value % 864e5 + 864e5) % 864e5;
                hours = floor(time / 36e5) % 24;
                minutes = floor(time / 6e4) % 60;
                seconds = floor(time / 1e3) % 60;
                milliseconds = time % 1e3;
              };
            } else {
              getData = function(value) {
                year = value.getUTCFullYear();
                month = value.getUTCMonth();
                date = value.getUTCDate();
                hours = value.getUTCHours();
                minutes = value.getUTCMinutes();
                seconds = value.getUTCSeconds();
                milliseconds = value.getUTCMilliseconds();
              };
            }
            serializeDate = function(value) {
              if (value > -1 / 0 && value < 1 / 0) {
                getData(value);
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  "." + toPaddedString(3, milliseconds) + "Z";
                year = month = date = hours = minutes = seconds = milliseconds = null;
              } else {
                value = null;
              }
              return value;
            };
            return serializeDate(value);
          };

          if (has("json-stringify") && !has("date-serialization")) {
            function dateToJSON(key) {
              return serializeDate(this);
            }

            var nativeStringify = exports.stringify;
            exports.stringify = function(source, filter, width) {
              var nativeToJSON = Date.prototype.toJSON;
              Date.prototype.toJSON = dateToJSON;
              var result = nativeStringify(source, filter, width);
              Date.prototype.toJSON = nativeToJSON;
              return result;
            };
          } else {
            var unicodePrefix = "\\u00";
            var escapeChar = function(character) {
              var charCode = character.charCodeAt(0),
                escaped = Escapes[charCode];
              if (escaped) {
                return escaped;
              }
              return unicodePrefix + toPaddedString(2, charCode.toString(16));
            };
            var reEscape = /[\x00-\x1f\x22\x5c]/g;
            var quote = function(value) {
              reEscape.lastIndex = 0;
              return '"' +
                (
                  reEscape.test(value) ?
                  value.replace(reEscape, escapeChar) :
                  value
                ) +
                '"';
            };

            var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
              var value, type, className, results, element, index, length, prefix, result;
              attempt(function() {
                value = object[property];
              });
              if (typeof value == "object" && value) {
                if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                  value = serializeDate(value);
                } else if (typeof value.toJSON == "function") {
                  value = value.toJSON(property);
                }
              }
              if (callback) {
                value = callback.call(object, property, value);
              }
              if (value == undefined$1) {
                return value === undefined$1 ? value : "null";
              }
              type = typeof value;
              if (type == "object") {
                className = getClass.call(value);
              }
              switch (className || type) {
                case "boolean":
                case booleanClass:
                  return "" + value;
                case "number":
                case numberClass:
                  return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                case "string":
                case stringClass:
                  return quote("" + value);
              }
              if (typeof value == "object") {
                for (length = stack.length; length--;) {
                  if (stack[length] === value) {
                    throw TypeError();
                  }
                }
                stack.push(value);
                results = [];
                prefix = indentation;
                indentation += whitespace;
                if (className == arrayClass) {
                  for (index = 0, length = value.length; index < length; index++) {
                    element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                    results.push(element === undefined$1 ? "null" : element);
                  }
                  result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
                } else {
                  forOwn(properties || value, function(property) {
                    var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                    if (element !== undefined$1) {
                      results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                    }
                  });
                  result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
                }
                stack.pop();
                return result;
              }
            };

            exports.stringify = function(source, filter, width) {
              var whitespace, callback, properties, className;
              if (objectTypes[typeof filter] && filter) {
                className = getClass.call(filter);
                if (className == functionClass) {
                  callback = filter;
                } else if (className == arrayClass) {
                  properties = {};
                  for (var index = 0, length = filter.length, value; index < length;) {
                    value = filter[index++];
                    className = getClass.call(value);
                    if (className == "[object String]" || className == "[object Number]") {
                      properties[value] = 1;
                    }
                  }
                }
              }
              if (width) {
                className = getClass.call(width);
                if (className == numberClass) {
                  if ((width -= width % 1) > 0) {
                    if (width > 10) {
                      width = 10;
                    }
                    for (whitespace = ""; whitespace.length < width;) {
                      whitespace += " ";
                    }
                  }
                } else if (className == stringClass) {
                  whitespace = width.length <= 10 ? width : width.slice(0, 10);
                }
              }
              return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
            };
          }
        }

        if (!has("json-parse")) {
          var fromCharCode = String.fromCharCode;

          var Unescapes = {
            92: "\\",
            34: '"',
            47: "/",
            98: "\b",
            116: "\t",
            110: "\n",
            102: "\f",
            114: "\r"
          };

          var Index, Source;

          var abort = function() {
            Index = Source = null;
            throw SyntaxError();
          };

          var lex = function() {
            var source = Source,
              length = source.length,
              value, begin, position, isSigned, charCode;
            while (Index < length) {
              charCode = source.charCodeAt(Index);
              switch (charCode) {
                case 9:
                case 10:
                case 13:
                case 32:
                  Index++;
                  break;
                case 123:
                case 125:
                case 91:
                case 93:
                case 58:
                case 44:
                  value = charIndexBuggy ? source.charAt(Index) : source[Index];
                  Index++;
                  return value;
                case 34:
                  for (value = "@", Index++; Index < length;) {
                    charCode = source.charCodeAt(Index);
                    if (charCode < 32) {
                      abort();
                    } else if (charCode == 92) {
                      charCode = source.charCodeAt(++Index);
                      switch (charCode) {
                        case 92:
                        case 34:
                        case 47:
                        case 98:
                        case 116:
                        case 110:
                        case 102:
                        case 114:
                          value += Unescapes[charCode];
                          Index++;
                          break;
                        case 117:
                          begin = ++Index;
                          for (position = Index + 4; Index < position; Index++) {
                            charCode = source.charCodeAt(Index);
                            if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                              abort();
                            }
                          }
                          value += fromCharCode("0x" + source.slice(begin, Index));
                          break;
                        default:
                          abort();
                      }
                    } else {
                      if (charCode == 34) {
                        break;
                      }
                      charCode = source.charCodeAt(Index);
                      begin = Index;
                      while (charCode >= 32 && charCode != 92 && charCode != 34) {
                        charCode = source.charCodeAt(++Index);
                      }
                      value += source.slice(begin, Index);
                    }
                  }
                  if (source.charCodeAt(Index) == 34) {
                    Index++;
                    return value;
                  }
                  abort();
                default:
                  begin = Index;
                  if (charCode == 45) {
                    isSigned = true;
                    charCode = source.charCodeAt(++Index);
                  }
                  if (charCode >= 48 && charCode <= 57) {
                    if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                      abort();
                    }
                    isSigned = false;
                    for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                    if (source.charCodeAt(Index) == 46) {
                      position = ++Index;
                      for (; position < length; position++) {
                        charCode = source.charCodeAt(position);
                        if (charCode < 48 || charCode > 57) {
                          break;
                        }
                      }
                      if (position == Index) {
                        abort();
                      }
                      Index = position;
                    }
                    charCode = source.charCodeAt(Index);
                    if (charCode == 101 || charCode == 69) {
                      charCode = source.charCodeAt(++Index);
                      if (charCode == 43 || charCode == 45) {
                        Index++;
                      }
                      for (position = Index; position < length; position++) {
                        charCode = source.charCodeAt(position);
                        if (charCode < 48 || charCode > 57) {
                          break;
                        }
                      }
                      if (position == Index) {
                        abort();
                      }
                      Index = position;
                    }
                    return +source.slice(begin, Index);
                  }
                  if (isSigned) {
                    abort();
                  }
                  var temp = source.slice(Index, Index + 4);
                  if (temp == "true") {
                    Index += 4;
                    return true;
                  } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
                    Index += 5;
                    return false;
                  } else if (temp == "null") {
                    Index += 4;
                    return null;
                  }
                  abort();
              }
            }
            return "$";
          };

          var get = function(value) {
            var results, hasMembers;
            if (value == "$") {
              abort();
            }
            if (typeof value == "string") {
              if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                return value.slice(1);
              }
              if (value == "[") {
                results = [];
                for (;;) {
                  value = lex();
                  if (value == "]") {
                    break;
                  }
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "]") {
                        abort();
                      }
                    } else {
                      abort();
                    }
                  } else {
                    hasMembers = true;
                  }
                  if (value == ",") {
                    abort();
                  }
                  results.push(get(value));
                }
                return results;
              } else if (value == "{") {
                results = {};
                for (;;) {
                  value = lex();
                  if (value == "}") {
                    break;
                  }
                  if (hasMembers) {
                    if (value == ",") {
                      value = lex();
                      if (value == "}") {
                        abort();
                      }
                    } else {
                      abort();
                    }
                  } else {
                    hasMembers = true;
                  }
                  if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                    abort();
                  }
                  results[value.slice(1)] = get(lex());
                }
                return results;
              }
              abort();
            }
            return value;
          };

          var update = function(source, property, callback) {
            var element = walk(source, property, callback);
            if (element === undefined$1) {
              delete source[property];
            } else {
              source[property] = element;
            }
          };

          var walk = function(source, property, callback) {
            var value = source[property],
              length;
            if (typeof value == "object" && value) {
              if (getClass.call(value) == arrayClass) {
                for (length = value.length; length--;) {
                  update(getClass, forOwn, value, length, callback);
                }
              } else {
                forOwn(value, function(property) {
                  update(value, property, callback);
                });
              }
            }
            return callback.call(source, property, value);
          };

          exports.parse = function(source, callback) {
            var result, value;
            Index = 0;
            Source = "" + source;
            result = get(lex());
            if (lex() != "$") {
              abort();
            }
            Index = Source = null;
            return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
          };
        }
      }

      exports.runInContext = runInContext;
      return exports;
    }


    var nativeJSON = root.JSON,
      previousJSON = root.JSON3,
      isRestored = false;

    var JSON3 = runInContext(root, (root.JSON3 = {
      "noConflict": function() {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root.JSON3 = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };

  }).call(window);


  (function(root, factory) {
    factory(root);
  })(window, function(root) {
    if (root.atob) {
      try {
        root.atob(' ');
      } catch (e) {
        root.atob = (function(atob) {
          var func = function(string) {
            return atob(String(string).replace(/[\t\n\f\r ]+/g, ''));
          };
          func.original = atob;
          return func;
        })(root.atob);
      }
      return;
    }

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;

    root.btoa = function(string) {
      string = String(string);
      var bitmap, a, b, c,
        result = '',
        i = 0,
        rest = string.length % 3;

      for (; i < string.length;) {
        if ((a = string.charCodeAt(i++)) > 255 ||
          (b = string.charCodeAt(i++)) > 255 ||
          (c = string.charCodeAt(i++)) > 255) {
          return '';
        }

        bitmap = (a << 16) | (b << 8) | c;
        result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
          b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
      }

      return rest ? result.slice(0, rest - 3) + '==='.substring(rest) : result;
    };

    root.atob = function(string) {
      string = String(string).replace(/[\t\n\f\r ]+/g, '');
      if (!b64re.test(string)) {
        return '';
      }
      string += '=='.slice(2 - (string.length & 3));
      var bitmap, result = '',
        r1, r2, i = 0;
      for (; i < string.length;) {
        bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
          (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));

        result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
          r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
          String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
      }
      return result;
    };
  });

  (function() {
    if (!String.prototype.replaceAll) {
      String.prototype.replaceAll = function(str, newStr) {
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
          return this.replace(str, newStr);
        }
        return this.replace(new RegExp(str, 'g'), newStr);
      };
    }
  })();

  var ArrayProto = Array.prototype;
  var nativeForEach = ArrayProto.forEach;
  var slice = ArrayProto.slice;
  var nativeIsArray = Array.isArray;
  var ObjProto = Object.prototype;
  var toString = ObjProto.toString;
  var hasOwnProperty = ObjProto.hasOwnProperty;
  var breaker = {};

  var isArray =
    nativeIsArray ||
    function(obj) {
      return toString.call(obj) === '[object Array]';
    };

  var getRandomBasic = (function() {
    var today = new Date();
    var seed = today.getTime();

    function rnd() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280.0;
    }
    return function rand(number) {
      return Math.ceil(rnd() * number);
    };
  })();

  var now =
    Date.now ||
    function() {
      return new Date().getTime();
    };

  function each(obj, iterator, context) {
    if (obj == null) {
      return false;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (isArray(obj) && obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
          return false;
        }
      }
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) {
            return false;
          }
        }
      }
    }
  }

  function map(obj, iterator) {
    var results = [];
    if (obj == null) {
      return results;
    }
    if (Array.prototype.map && obj.map === Array.prototype.map) {
      return obj.map(iterator);
    }
    each(obj, function(value, index, list) {
      results.push(iterator(value, index, list));
    });
    return results;
  }

  function extend(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (hasOwnProperty.call(source, prop) && source[prop] !== void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  function extend2Lev(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0) {
          if (isObject(source[prop]) && isObject(obj[prop])) {
            extend(obj[prop], source[prop]);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
    });
    return obj;
  }

  function coverExtend(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (source[prop] !== void 0 && obj[prop] === void 0) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  function isFunction(f) {
    if (!f) {
      return false;
    }
    var type = toString.call(f);
    return type == '[object Function]' || type == '[object AsyncFunction]';
  }

  function isArguments(obj) {
    return !!(obj && hasOwnProperty.call(obj, 'callee'));
  }

  function toArray(iterable) {
    if (!iterable) {
      return [];
    }
    if (iterable.toArray) {
      return iterable.toArray();
    }
    if (isArray(iterable)) {
      return slice.call(iterable);
    }
    if (isArguments(iterable)) {
      return slice.call(iterable);
    }
    return values(iterable);
  }

  function values(obj) {
    var results = [];
    if (obj == null) {
      return results;
    }
    each(obj, function(value) {
      results[results.length] = value;
    });
    return results;
  }

  function indexOf(arr, target) {
    var indexof = arr.indexOf;
    if (indexof) {
      return indexof.call(arr, target);
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (target === arr[i]) {
          return i;
        }
      }
      return -1;
    }
  }

  function filter(arr, fn, self) {
    var hasOwn = Object.prototype.hasOwnProperty;
    if (arr.filter) {
      return arr.filter(fn);
    }
    var ret = [];
    for (var i = 0; i < arr.length; i++) {
      if (!hasOwn.call(arr, i)) {
        continue;
      }
      var val = arr[i];
      if (fn.call(self, val, i, arr)) {
        ret.push(val);
      }
    }
    return ret;
  }

  function inherit(subclass, superclass) {
    subclass.prototype = new superclass();
    subclass.prototype.constructor = subclass;
    subclass.superclass = superclass.prototype;
    return subclass;
  }

  function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }

  function isObject(obj) {
    if (obj == null) {
      return false;
    } else {
      return toString.call(obj) == '[object Object]';
    }
  }

  function isEmptyObject(obj) {
    if (isObject(obj)) {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function isUndefined(obj) {
    return obj === void 0;
  }

  function isString(obj) {
    return toString.call(obj) == '[object String]';
  }

  function isDate(obj) {
    return toString.call(obj) == '[object Date]';
  }

  function isBoolean(obj) {
    return toString.call(obj) == '[object Boolean]';
  }

  function isNumber(obj) {
    return toString.call(obj) == '[object Number]' && /[\d\.]+/.test(String(obj));
  }

  function isElement(obj) {
    return !!(obj && obj.nodeType === 1);
  }

  function isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  function safeJSONParse(str) {
    var val = null;
    try {
      val = JSON.parse(str);
    } catch (e) {
      return false;
    }
    return val;
  }

  function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var nowtime = now();
      if (!previous && options.leading === false) previous = nowtime;
      var remaining = wait - (nowtime - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = nowtime;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  function hashCode(str) {
    if (typeof str !== 'string') {
      return 0;
    }
    var hash = 0;
    var char = null;
    if (str.length == 0) {
      return hash;
    }
    for (var i = 0; i < str.length; i++) {
      char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  function getRandom() {
    if (typeof Uint32Array === 'function') {
      var cry = '';
      if (typeof crypto !== 'undefined') {
        cry = crypto;
      } else if (typeof msCrypto !== 'undefined') {
        cry = msCrypto;
      }
      if (isObject(cry) && cry.getRandomValues) {
        var typedArray = new Uint32Array(1);
        var randomNumber = cry.getRandomValues(typedArray)[0];
        var integerLimit = Math.pow(2, 32);
        return randomNumber / integerLimit;
      }
    }
    return getRandomBasic(10000000000000000000) / 10000000000000000000;
  }

  function formatJsonString(obj) {
    try {
      return JSON.stringify(obj, null, '  ');
    } catch (e) {
      return JSON.stringify(obj);
    }
  }

  function unique(ar) {
    var temp,
      n = [],
      o = {};
    for (var i = 0; i < ar.length; i++) {
      temp = ar[i];
      if (!(temp in o)) {
        o[temp] = true;
        n.push(temp);
      }
    }
    return n;
  }

  function base64Encode(data) {
    return btoa(
      encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
      })
    );
  }

  function base64Decode(data) {
    var arr = map(atob(data).split(''), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    });
    return decodeURIComponent(arr.join(''));
  }

  function rot13obfs(str, key) {
    str = String(str);
    key = typeof key === 'number' ? key : 13;
    var n = 126;

    var chars = str.split('');

    for (var i = 0, len = chars.length; i < len; i++) {
      var c = chars[i].charCodeAt(0);

      if (c < n) {
        chars[i] = String.fromCharCode((chars[i].charCodeAt(0) + key) % n);
      }
    }

    return chars.join('');
  }

  function rot13defs(str) {
    var key = 13,
      n = 126;
    str = String(str);

    return rot13obfs(str, n - key);
  }

  function strToUnicode(str, logger) {
    if (typeof str !== 'string') {
      logger('转换unicode错误', str);
      return str;
    }
    var nstr = '';
    for (var i = 0; i < str.length; i++) {
      nstr += '\\' + str.charCodeAt(i).toString(16);
    }
    return nstr;
  }

  var sdPara = {};

  var defaultPara = {
    preset_properties: {
      search_keyword_baidu: false,
      latest_utm: true,
      latest_traffic_source_type: true,
      latest_search_keyword: true,
      latest_referrer: true,
      latest_referrer_host: false,
      latest_landing_page: false,
      latest_wx_ad_click_id: undefined,
      url: true,
      title: true
    },
    encrypt_cookie: false,
    img_use_crossorigin: false,

    name: 'sa',
    max_referrer_string_length: 200,
    max_string_length: 500,
    cross_subdomain: true,
    show_log: false,
    is_debug: false,
    debug_mode: false,
    debug_mode_upload: false,

    source_channel: [],
    sdk_id: '',

    send_type: 'image',

    vtrack_ignore: {},

    auto_init: true,

    is_track_single_page: false,

    is_single_page: false,

    batch_send: false,

    source_type: {},
    callback_timeout: 200,
    datasend_timeout: 8000,
    is_track_device_id: false,
    ignore_oom: true,
    app_js_bridge: false
  };

  function isSessionStorgaeSupport() {
    var supported = true;

    var supportName = '__sensorsdatasupport__';
    var val = 'testIsSupportStorage';
    try {
      if (sessionStorage && sessionStorage.setItem) {
        sessionStorage.setItem(supportName, val);
        sessionStorage.removeItem(supportName, val);
        supported = true;
      } else {
        supported = false;
      }
    } catch (e) {
      supported = false;
    }
    return supported;
  }

  function sdLog() {
    if ((isSessionStorgaeSupport() && sessionStorage.getItem('sensorsdata_jssdk_debug') === 'true') || sdPara.show_log) {
      if (isObject(arguments[0]) && (sdPara.show_log === true || sdPara.show_log === 'string' || sdPara.show_log === false)) {
        arguments[0] = formatJsonString(arguments[0]);
      }

      if (typeof console === 'object' && console.log) {
        try {
          return console.log.apply(console, arguments);
        } catch (e) {
          console.log(arguments[0]);
        }
      }
    }
  }

  function hasAttributes(ele, attrs) {
    if (typeof attrs === 'string') {
      return hasAttribute(ele, attrs);
    } else if (isArray(attrs)) {
      var result = false;
      for (var i = 0; i < attrs.length; i++) {
        var testResult = hasAttribute(ele, attrs[i]);
        if (testResult) {
          result = true;
          break;
        }
      }
      return result;
    }
  }

  function hasAttribute(ele, attr) {
    if (ele.hasAttribute) {
      return ele.hasAttribute(attr);
    } else if (ele.attributes) {
      return !!(ele.attributes[attr] && ele.attributes[attr].specified);
    }
  }

  function getElementContent(target, tagName) {
    var textContent = '';
    var element_content = '';
    if (target.textContent) {
      textContent = trim(target.textContent);
    } else if (target.innerText) {
      textContent = trim(target.innerText);
    }
    if (textContent) {
      textContent = textContent
        .replace(/[\r\n]/g, ' ')
        .replace(/[ ]+/g, ' ')
        .substring(0, 255);
    }
    element_content = textContent || '';

    if (tagName === 'input' || tagName === 'INPUT') {
      if (target.type === 'button' || target.type === 'submit') {
        element_content = target.value || '';
      } else if (sdPara.heatmap && typeof sdPara.heatmap.collect_input === 'function' && sdPara.heatmap.collect_input(target)) {
        element_content = target.value || '';
      }
    }
    return element_content;
  }

  function loadScript(para) {
    para = extend({
        success: function() {},
        error: function() {},
        appendCall: function(g) {
          document.getElementsByTagName('head')[0].appendChild(g);
        }
      },
      para
    );

    var g = null;
    if (para.type === 'css') {
      g = document.createElement('link');
      g.rel = 'stylesheet';
      g.href = para.url;
    }
    if (para.type === 'js') {
      g = document.createElement('script');
      g.async = 'async';
      g.setAttribute('charset', 'UTF-8');
      g.src = para.url;
      g.type = 'text/javascript';
    }
    g.onload = g.onreadystatechange = function() {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        para.success();
        g.onload = g.onreadystatechange = null;
      }
    };
    g.onerror = function() {
      para.error();
      g.onerror = null;
    };
    para.appendCall(g);
  }

  function ry(dom) {
    return new ry.init(dom);
  }
  ry.init = function(dom) {
    this.ele = dom;
  };
  ry.init.prototype = {
    addClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') === -1) {
        this.ele.className = this.ele.className + (this.ele.className === '' ? '' : ' ') + para;
      }
      return this;
    },
    removeClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        this.ele.className = classes.replace(' ' + para + ' ', ' ').slice(1, -1);
      }
      return this;
    },
    hasClass: function(para) {
      var classes = ' ' + this.ele.className + ' ';
      if (classes.indexOf(' ' + para + ' ') !== -1) {
        return true;
      } else {
        return false;
      }
    },
    attr: function(key, value) {
      if (typeof key === 'string' && isUndefined(value)) {
        return this.ele.getAttribute(key);
      }
      if (typeof key === 'string') {
        value = String(value);
        this.ele.setAttribute(key, value);
      }
      return this;
    },
    offset: function() {
      var rect = this.ele.getBoundingClientRect();
      if (rect.width || rect.height) {
        var doc = this.ele.ownerDocument;
        var docElem = doc.documentElement;

        return {
          top: rect.top + window.pageYOffset - docElem.clientTop,
          left: rect.left + window.pageXOffset - docElem.clientLeft
        };
      } else {
        return {
          top: 0,
          left: 0
        };
      }
    },
    getSize: function() {
      if (!window.getComputedStyle) {
        return {
          width: this.ele.offsetWidth,
          height: this.ele.offsetHeight
        };
      }
      try {
        var bounds = this.ele.getBoundingClientRect();
        return {
          width: bounds.width,
          height: bounds.height
        };
      } catch (e) {
        return {
          width: 0,
          height: 0
        };
      }
    },
    getStyle: function(value) {
      if (this.ele.currentStyle) {
        return this.ele.currentStyle[value];
      } else {
        return this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(value);
      }
    },
    wrap: function(elementTagName) {
      var ele = document.createElement(elementTagName);
      this.ele.parentNode.insertBefore(ele, this.ele);
      ele.appendChild(this.ele);
      return ry(ele);
    },
    getCssStyle: function(prop) {
      var result = this.ele.style.getPropertyValue(prop);
      if (result) {
        return result;
      }
      var rules = null;
      if (typeof window.getMatchedCSSRules === 'function') {
        rules = window.getMatchedCSSRules(this.ele);
      }
      if (!rules || !isArray(rules)) {
        return null;
      }
      for (var i = rules.length - 1; i >= 0; i--) {
        var r = rules[i];
        result = r.style.getPropertyValue(prop);
        if (result) {
          return result;
        }
      }
    },
    sibling: function(cur, dir) {
      while ((cur = cur[dir]) && cur.nodeType !== 1) {}
      return cur;
    },
    next: function() {
      return this.sibling(this.ele, 'nextSibling');
    },
    prev: function() {
      return this.sibling(this.ele, 'previousSibling');
    },
    siblings: function() {
      return this.siblings((this.ele.parentNode || {}).firstChild, this.ele);
    },
    children: function() {
      return this.siblings(this.ele.firstChild);
    },
    parent: function() {
      var parent = this.ele.parentNode;
      parent = parent && parent.nodeType !== 11 ? parent : null;
      return ry(parent);
    },
    previousElementSibling: function() {
      var el = this.ele;
      if ('previousElementSibling' in document.documentElement) {
        return ry(el.previousElementSibling);
      } else {
        while ((el = el.previousSibling)) {
          if (el.nodeType === 1) {
            return ry(el);
          }
        }
        return ry(null);
      }
    },
    getSameTypeSiblings: function() {
      var element = this.ele;
      var parentNode = element.parentNode;
      var tagName = element.tagName.toLowerCase();
      var arr = [];
      for (var i = 0; i < parentNode.children.length; i++) {
        var child = parentNode.children[i];
        if (child.nodeType === 1 && child.tagName.toLowerCase() === tagName) {
          arr.push(parentNode.children[i]);
        }
      }
      return arr;
    },
    getParents: function() {
      try {
        var element = this.ele;
        if (!isElement(element)) {
          return [];
        }
        var pathArr = [element];
        if (element === null || element.parentElement === null) {
          return [];
        }
        while (element.parentElement !== null) {
          element = element.parentElement;
          pathArr.push(element);
        }
        return pathArr;
      } catch (err) {
        return [];
      }
    }
  };

  function setCssStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(css));
    } catch (e) {
      style.styleSheet.cssText = css;
    }
    var head = document.getElementsByTagName('head')[0];
    var firstScript = document.getElementsByTagName('script')[0];
    if (head) {
      if (head.children.length) {
        head.insertBefore(style, head.children[0]);
      } else {
        head.appendChild(style);
      }
    } else {
      firstScript.parentNode.insertBefore(style, firstScript);
    }
  }

  function getDomBySelector(selector) {
    if (!isString(selector)) {
      return null;
    }
    var arr = selector.split('>');
    var el = null;

    function getDom(selector, parent) {
      selector = trim(selector);
      var node;
      if (selector === 'body') {
        return document.getElementsByTagName('body')[0];
      }
      if (selector.indexOf('#') === 0) {
        selector = selector.slice(1);
        node = document.getElementById(selector);
      } else if (selector.indexOf(':nth-of-type') > -1) {
        var arr = selector.split(':nth-of-type');
        if (!(arr[0] && arr[1])) {
          return null;
        }
        var tagname = arr[0];
        var indexArr = arr[1].match(/\(([0-9]+)\)/);
        if (!(indexArr && indexArr[1])) {
          return null;
        }
        var num = Number(indexArr[1]);
        if (!(isElement(parent) && parent.children && parent.children.length > 0)) {
          return null;
        }
        var child = parent.children;

        for (var i = 0; i < child.length; i++) {
          if (isElement(child[i])) {
            var name = child[i].tagName.toLowerCase();
            if (name === tagname) {
              num--;
              if (num === 0) {
                node = child[i];
                break;
              }
            }
          }
        }
        if (num > 0) {
          return null;
        }
      }
      if (!node) {
        return null;
      }
      return node;
    }

    function get(parent) {
      var tagSelector = arr.shift();
      var element;
      if (!tagSelector) {
        return parent;
      }
      try {
        element = getDom(tagSelector, parent);
      } catch (error) {
        sdLog(error);
      }
      if (!(element && isElement(element))) {
        return null;
      } else {
        return get(element);
      }
    }
    el = get();
    if (!(el && isElement(el))) {
      return null;
    } else {
      return el;
    }
  }

  var urlCheck = {
    isHttpUrl: function(str) {
      if (typeof str !== 'string') return false;
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(str) === false) {
        sdLog('Invalid URL');
        return false;
      }
      return true;
    },
    removeScriptProtocol: function(str) {
      if (typeof str !== 'string') return '';
      var _regex = /^\s*javascript/i;
      while (_regex.test(str)) {
        str = str.replace(_regex, '');
      }
      return str;
    }
  };

  var urlSafeBase64 = (function() {
    var ENC = {
      '+': '-',
      '/': '_',
      '=': '.'
    };
    var DEC = {
      '-': '+',
      _: '/',
      '.': '='
    };

    var encode = function(base64) {
      return base64.replace(/[+/=]/g, function(m) {
        return ENC[m];
      });
    };

    var decode = function(safe) {
      return safe.replace(/[-_.]/g, function(m) {
        return DEC[m];
      });
    };

    var trim = function(string) {
      return string.replace(/[.=]{1,2}$/, '');
    };

    var isBase64 = function(string) {
      return /^[A-Za-z0-9+/]*[=]{0,2}$/.test(string);
    };

    var isUrlSafeBase64 = function(string) {
      return /^[A-Za-z0-9_-]*[.]{0,2}$/.test(string);
    };

    return {
      encode: encode,
      decode: decode,
      trim: trim,
      isBase64: isBase64,
      isUrlSafeBase64: isUrlSafeBase64
    };
  })();

  function _decodeURIComponent(val) {
    var result = val;
    try {
      result = decodeURIComponent(val);
    } catch (e) {
      result = val;
    }
    return result;
  }

  function _decodeURI(val) {
    var result = val;
    try {
      result = decodeURI(val);
    } catch (e) {
      result = val;
    }
    return result;
  }

  function getQueryParam(url, param) {
    param = param.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    url = decodeURIComponent(url);
    var regexS = '[\\?&]' + param + '=([^&#]*)',
      regex = new RegExp(regexS),
      results = regex.exec(url);
    if (results === null || (results && typeof results[1] !== 'string' && results[1].length)) {
      return '';
    } else {
      return decodeURIComponent(results[1]);
    }
  }

  function urlParse(para) {
    var URLParser = function(a) {
      this._fields = {
        Username: 4,
        Password: 5,
        Port: 7,
        Protocol: 2,
        Host: 6,
        Path: 8,
        URL: 0,
        QueryString: 9,
        Fragment: 10
      };
      this._values = {};
      this._regex = null;
      this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

      if (typeof a != 'undefined') {
        this._parse(a);
      }
    };
    URLParser.prototype.setUrl = function(a) {
      this._parse(a);
    };
    URLParser.prototype._initValues = function() {
      for (var a in this._fields) {
        this._values[a] = '';
      }
    };
    URLParser.prototype.addQueryString = function(queryObj) {
      if (typeof queryObj !== 'object') {
        return false;
      }
      var query = this._values.QueryString || '';
      for (var i in queryObj) {
        if (new RegExp(i + '[^&]+').test(query)) {
          query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
        } else {
          if (query.slice(-1) === '&') {
            query = query + i + '=' + queryObj[i];
          } else {
            if (query === '') {
              query = i + '=' + queryObj[i];
            } else {
              query = query + '&' + i + '=' + queryObj[i];
            }
          }
        }
      }
      this._values.QueryString = query;
    };
    URLParser.prototype.getUrl = function() {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      url += this._values.Fragment ? '#' + this._values.Fragment : '';
      return url;
    };

    URLParser.prototype.getUrl = function() {
      var url = '';
      url += this._values.Origin;
      url += this._values.Port ? ':' + this._values.Port : '';
      url += this._values.Path;
      url += this._values.QueryString ? '?' + this._values.QueryString : '';
      return url;
    };
    URLParser.prototype._parse = function(a) {
      this._initValues();
      var b = this._regex.exec(a);
      if (!b) {
        sdLog('DPURLParser::_parse -> Invalid URL');
      }
      for (var c in this._fields) {
        if (typeof b[this._fields[c]] != 'undefined') {
          this._values[c] = b[this._fields[c]];
        }
      }
      this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
      this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];
    };
    return new URLParser(para);
  }

  function getURLSearchParams(queryString) {
    queryString = queryString || '';
    var decodeParam = function(str) {
      return decodeURIComponent(str);
    };
    var args = {};
    var query = queryString.substring(1);
    var pairs = query.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if (pos === -1) continue;
      var name = pairs[i].substring(0, pos);
      var value = pairs[i].substring(pos + 1);
      name = decodeParam(name);
      value = decodeParam(value);
      args[name] = value;
    }
    return args;
  }

  function _URL(url) {
    var result = {};
    var isURLAPIWorking = function() {
      var url;
      try {
        url = new URL('http://modernizr.com/');
        return url.href === 'http://modernizr.com/';
      } catch (e) {
        return false;
      }
    };
    if (typeof window.URL === 'function' && isURLAPIWorking()) {
      result = new URL(url);
      if (!result.searchParams) {
        result.searchParams = (function() {
          var params = getURLSearchParams(result.search);
          return {
            get: function(searchParam) {
              return params[searchParam];
            }
          };
        })();
      }
    } else {
      var _regex = /^https?:\/\/.+/;
      if (_regex.test(url) === false) {
        sdLog('Invalid URL');
      }
      var instance = urlParse(url);
      result.hash = '';
      result.host = instance._values.Host ? instance._values.Host + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.href = instance._values.URL;
      result.password = instance._values.Password;
      result.pathname = instance._values.Path;
      result.port = instance._values.Port;
      result.search = instance._values.QueryString ? '?' + instance._values.QueryString : '';
      result.username = instance._values.Username;
      result.hostname = instance._values.Hostname;
      result.protocol = instance._values.Protocol ? instance._values.Protocol + ':' : '';
      result.origin = instance._values.Origin ? instance._values.Origin + (instance._values.Port ? ':' + instance._values.Port : '') : '';
      result.searchParams = (function() {
        var params = getURLSearchParams('?' + instance._values.QueryString);
        return {
          get: function(searchParam) {
            return params[searchParam];
          }
        };
      })();
    }
    return result;
  }

  function getHostname(url, defaultValue) {
    if (!defaultValue || typeof defaultValue !== 'string') {
      defaultValue = 'hostname解析异常';
    }
    var hostname = null;
    try {
      hostname = _URL(url).hostname;
    } catch (e) {
      sdLog('getHostname传入的url参数不合法！');
    }
    return hostname || defaultValue;
  }

  function getQueryParamsFromUrl(url) {
    var result = {};
    var arr = url.split('?');
    var queryString = arr[1] || '';
    if (queryString) {
      result = getURLSearchParams('?' + queryString);
    }
    return result;
  }

  function getURL(para) {
    if (isString(para)) {
      return _decodeURI(para);
    } else {
      return _decodeURI(location.href);
    }
  }

  function encodeDates(obj) {
    each(obj, function(v, k) {
      if (isDate(v)) {
        obj[k] = formatDate(v);
      } else if (isObject(v)) {
        obj[k] = encodeDates(v);
      }
    });
    return obj;
  }

  function formatDate(d) {
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }

    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.' + pad(d.getMilliseconds());
  }

  function searchObjDate(o) {
    if (isObject(o)) {
      each(o, function(a, b) {
        if (isObject(a)) {
          searchObjDate(o[b]);
        } else {
          if (isDate(a)) {
            o[b] = formatDate(a);
          }
        }
      });
    }
  }

  var debug = {
    distinct_id: function() {},
    jssdkDebug: function() {},
    _sendDebug: function(debugString) {},
    apph5: function(obj) {
      var name = 'app_h5打通失败-';
      var relation = {
        1: name + 'use_app_track为false',
        2: name + 'Android或者iOS，没有暴露相应方法',
        3.1: name + 'Android校验server_url失败',
        3.2: name + 'iOS校验server_url失败',
        4.1: name + 'H5 校验 iOS server_url 失败',
        4.2: name + 'H5 校验 Android server_url 失败'
      };
      var output = obj.output;
      var step = obj.step;
      var data = obj.data || '';
      if (output === 'all' || output === 'console') {
        sdLog(relation[step]);
      }
      if ((output === 'all' || output === 'code') && isObject(sdPara.is_debug) && sdPara.is_debug.apph5) {
        if (!data.type || data.type.slice(0, 7) !== 'profile') {
          data.properties._jssdk_debug_info = 'apph5-' + String(step);
        }
      }
    },
    defineMode: function(type) {
      var debugList = {
        1: {
          title: '当前页面无法进行可视化全埋点',
          message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 App SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        },
        2: {
          title: '当前页面无法进行可视化全埋点',
          message: 'App SDK 与 Web JS SDK 没有进行打通，请联系贵方技术人员修正 Web JS SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        },
        3: {
          title: '当前页面无法进行可视化全埋点',
          message: 'Web JS SDK 没有开启全埋点配置，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_web_all-1573964.html'
        },
        4: {
          title: '当前页面无法进行可视化全埋点',
          message: 'Web JS SDK 配置的数据校验地址与 App SDK 配置的数据校验地址不一致，请联系贵方工作人员修正 SDK 的配置，详细信息请查看文档。',
          link_text: '配置文档',
          link_url: 'https://manual.sensorsdata.cn/sa/latest/tech_sdk_client_link-1573913.html'
        }
      };
      if (type && debugList[type]) {
        return debugList[type];
      } else {
        return false;
      }
    },
    protocol: {
      protocolIsSame: function(url1, url2) {
        try {
          if (_URL(url1).protocol !== _URL(url2).protocol) {
            return false;
          }
        } catch (error) {
          sdLog('不支持 _.URL 方法');
          return false;
        }
        return true;
      },
      serverUrl: function() {
        if (isString(sdPara.server_url) && sdPara.server_url !== '' && !this.protocolIsSame(sdPara.server_url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。\n因为：1、https 下面发送 http 的图片请求会失败。2、http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      },
      ajax: function(url) {
        if (url === sdPara.server_url) {
          return false;
        }
        if (isString(url) && url !== '' && !this.protocolIsSame(url, location.href)) {
          sdLog('SDK 检测到您的数据发送地址和当前页面地址的协议不一致，建议您修改成一致的协议。因为 http 页面使用 https + ajax 方式发数据，在 ie9 及以下会丢失数据。');
        }
      }
    }
  };

  var source_channel_standard = 'utm_source utm_medium utm_campaign utm_content utm_term';
  var sdkversion_placeholder = '1.19.8';

  function searchZZAppStyle(data) {
    if (typeof data.properties.$project !== 'undefined') {
      data.project = data.properties.$project;
      delete data.properties.$project;
    }
    if (typeof data.properties.$token !== 'undefined') {
      data.token = data.properties.$token;
      delete data.properties.$token;
    }
  }

  function formatString(str, maxLen) {
    if (isNumber(maxLen) && str.length > maxLen) {
      sdLog('字符串长度超过限制，已经做截取--' + str);
      return str.slice(0, maxLen);
    } else {
      return str;
    }
  }

  function searchObjString(o) {
    var white_list = ['$element_selector', '$element_path'];
    var infinite_list = ['sensorsdata_app_visual_properties'];
    if (isObject(o)) {
      each(o, function(a, b) {
        if (isObject(a)) {
          searchObjString(o[b]);
        } else {
          if (isString(a)) {
            if (indexOf(infinite_list, b) > -1) {
              return;
            }
            o[b] = formatString(a, indexOf(white_list, b) > -1 ? 1024 : sdPara.max_string_length);
          }
        }
      });
    }
  }

  function strip_sa_properties(p) {
    if (!isObject(p)) {
      return p;
    }
    each(p, function(v, k) {
      if (isArray(v)) {
        var temp = [];
        each(v, function(arrv) {
          if (isString(arrv)) {
            temp.push(arrv);
          } else {
            sdLog('您的数据-', k, v, '的数组里的值必须是字符串,已经将其删除');
          }
        });
        p[k] = temp;
      }
      if (!(isString(v) || isNumber(v) || isDate(v) || isBoolean(v) || isArray(v) || isFunction(v) || k === '$option')) {
        sdLog('您的数据-', k, v, '-格式不满足要求，我们已经将其删除');
        delete p[k];
      }
    });
    return p;
  }

  function parseSuperProperties(data) {
    var obj = data.properties;
    var copyData = JSON.parse(JSON.stringify(data));
    if (isObject(obj)) {
      each(obj, function(value, key) {
        if (isFunction(value)) {
          try {
            obj[key] = value(copyData);
            if (isFunction(obj[key])) {
              sdLog('您的属性- ' + key + ' 格式不满足要求，我们已经将其删除');
              delete obj[key];
            }
          } catch (e) {
            delete obj[key];
            sdLog('您的属性- ' + key + ' 抛出了异常，我们已经将其删除');
          }
        }
      });
      strip_sa_properties(obj);
    }
  }

  function filterReservedProperties(obj) {
    var reservedFields = ['distinct_id', 'user_id', 'id', 'date', 'datetime', 'event', 'events', 'first_id', 'original_id', 'device_id', 'properties', 'second_id', 'time', 'users'];
    if (!isObject(obj)) {
      return;
    }
    each(reservedFields, function(key, index) {
      if (!(key in obj)) {
        return;
      }
      if (index < 3) {
        delete obj[key];
        sdLog('您的属性- ' + key + '是保留字段，我们已经将其删除');
      } else {
        sdLog('您的属性- ' + key + '是保留字段，请避免其作为属性名');
      }
    });
  }

  function searchConfigData(data) {
    if (typeof data === 'object' && data.$option) {
      var data_config = data.$option;
      delete data.$option;
      return data_config;
    } else {
      return {};
    }
  }

  function strip_empty_properties(p) {
    var ret = {};
    each(p, function(v, k) {
      if (v != null) {
        ret[k] = v;
      }
    });
    return ret;
  }

  var UUID = (function() {
    var T = function() {
      var d = 1 * new Date(),
        i = 0;
      while (d == 1 * new Date()) {
        i++;
      }
      return d.toString(16) + i.toString(16);
    };
    var R = function() {
      return getRandom().toString(16).replace('.', '');
    };
    var UA = function() {
      var ua = navigator.userAgent,
        i,
        ch,
        buffer = [],
        ret = 0;

      function xor(result, byte_array) {
        var j,
          tmp = 0;
        for (j = 0; j < byte_array.length; j++) {
          tmp |= buffer[j] << (j * 8);
        }
        return result ^ tmp;
      }

      for (i = 0; i < ua.length; i++) {
        ch = ua.charCodeAt(i);
        buffer.unshift(ch & 0xff);
        if (buffer.length >= 4) {
          ret = xor(ret, buffer);
          buffer = [];
        }
      }

      if (buffer.length > 0) {
        ret = xor(ret, buffer);
      }

      return ret.toString(16);
    };

    return function() {
      var se = String(screen.height * screen.width);
      if (se && /\d{5,}/.test(se)) {
        se = se.toString(16);
      } else {
        se = String(getRandom() * 31242)
          .replace('.', '')
          .slice(0, 8);
      }
      var val = T() + '-' + R() + '-' + UA() + '-' + se + '-' + T();
      if (val) {
        return val;
      } else {
        return (String(getRandom()) + String(getRandom()) + String(getRandom())).slice(2, 15);
      }
    };
  })();

  function getCurrentDomain(url) {
    var sdDomain = sdPara.current_domain;
    switch (typeof sdDomain) {
      case 'function':
        var resultDomain = sdDomain();
        if (resultDomain === '' || trim(resultDomain) === '') {
          return 'url解析失败';
        } else if (resultDomain.indexOf('.') !== -1) {
          return resultDomain;
        } else {
          return 'url解析失败';
        }
        case 'string':
          if (sdDomain === '' || trim(sdDomain) === '') {
            return 'url解析失败';
          } else if (sdDomain.indexOf('.') !== -1) {
            return sdDomain;
          } else {
            return 'url解析失败';
          }
          default:
            var cookieTopLevelDomain = getCookieTopLevelDomain();
            if (url === '') {
              return 'url解析失败';
            } else if (cookieTopLevelDomain === '') {
              return 'url解析失败';
            } else {
              return cookieTopLevelDomain;
            }
    }
  }

  function getEleInfo(obj) {
    if (!obj.target) {
      return false;
    }

    var target = obj.target;
    var tagName = target.tagName.toLowerCase();

    var props = {};

    props.$element_type = tagName;
    props.$element_name = target.getAttribute('name');
    props.$element_id = target.getAttribute('id');
    props.$element_class_name = typeof target.className === 'string' ? target.className : null;
    props.$element_target_url = target.getAttribute('href');
    props.$element_content = getElementContent(target, tagName);
    props = strip_empty_properties(props);
    props.$url = getURL();
    props.$url_path = location.pathname;
    props.$title = document.title;
    props.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;

    return props;
  }

  function isBaiduTraffic() {
    var referer = document.referrer;
    var endsWith = 'baidu.com';
    if (!referer) {
      return false;
    }

    try {
      var hostname = _URL(referer).hostname;
      return hostname && hostname.substring(hostname.length - endsWith.length) === endsWith;
    } catch (e) {
      return false;
    }
  }

  function getReferrerEqid() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      return UUID().replace(/-/g, '');
    }
    return query.eqid;
  }

  function getReferrerEqidType() {
    var query = getQueryParamsFromUrl(document.referrer);
    if (isEmptyObject(query) || !query.eqid) {
      return 'baidu_sem_keyword_id';
    }
    return 'baidu_seo_keyword_id';
  }

  var getBaiduKeyword = {
    data: {},
    id: function() {
      if (this.data.id) {
        return this.data.id;
      } else {
        this.data.id = getReferrerEqid();
        return this.data.id;
      }
    },
    type: function() {
      if (this.data.type) {
        return this.data.type;
      } else {
        this.data.type = getReferrerEqidType();
        return this.data.type;
      }
    }
  };

  function getCookieTopLevelDomain(hostname) {
    hostname = hostname || location.hostname;

    function validHostname(value) {
      if (value) {
        return value;
      } else {
        return false;
      }
    }
    var new_hostname = validHostname(hostname);
    if (!new_hostname) {
      return '';
    }
    var splitResult = new_hostname.split('.');
    if (isArray(splitResult) && splitResult.length >= 2 && !/^(\d+\.)+\d+$/.test(new_hostname)) {
      var domainStr = '.' + splitResult.splice(splitResult.length - 1, 1);
      while (splitResult.length > 0) {
        domainStr = '.' + splitResult.splice(splitResult.length - 1, 1) + domainStr;
        document.cookie = 'sensorsdata_domain_test=true; path=/; domain=' + domainStr;

        if (document.cookie.indexOf('sensorsdata_domain_test=true') !== -1) {
          var now = new Date();
          now.setTime(now.getTime() - 1000);

          document.cookie = 'sensorsdata_domain_test=true; expires=' + now.toGMTString() + '; path=/; domain=' + domainStr;

          return domainStr;
        }
      }
    }
    return '';
  }

  function isReferralTraffic(refererstring) {
    refererstring = refererstring || document.referrer;
    if (refererstring === '') {
      return true;
    }

    return getCookieTopLevelDomain(getHostname(refererstring)) !== getCookieTopLevelDomain();
  }

  function getReferrer(referrer) {
    referrer = referrer || document.referrer;
    if (typeof referrer !== 'string') {
      return '取值异常_referrer异常_' + String(referrer);
    }
    referrer = decodeURI(referrer);
    if (referrer.indexOf('https://www.baidu.com/') === 0) {
      referrer = referrer.split('?')[0];
    }
    referrer = referrer.slice(0, sdPara.max_referrer_string_length);
    return typeof referrer === 'string' ? referrer : '';
  }

  function getReferSearchEngine(referrerUrl) {
    var hostname = getHostname(referrerUrl);
    if (!hostname || hostname === 'hostname解析异常') {
      return '';
    }
    var searchEngineUrls = {
      baidu: [/^.*\.baidu\.com$/],
      bing: [/^.*\.bing\.com$/],
      google: [/^www\.google\.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
      sm: [/^m\.sm\.cn$/],
      so: [/^.+\.so\.com$/],
      sogou: [/^.*\.sogou\.com$/],
      yahoo: [/^.*\.yahoo\.com$/]
    };
    for (var prop in searchEngineUrls) {
      var urls = searchEngineUrls[prop];
      for (var i = 0, len = urls.length; i < len; i++) {
        if (urls[i].test(hostname)) {
          return prop;
        }
      }
    }
    return '未知搜索引擎';
  }

  function getKeywordFromReferrer(referrerUrl, activeValue) {
    referrerUrl = referrerUrl || document.referrer;
    var search_keyword = sdPara.source_type.keyword;
    if (document && typeof referrerUrl === 'string') {
      if (referrerUrl.indexOf('http') === 0) {
        var searchEngine = getReferSearchEngine(referrerUrl);
        var query = getQueryParamsFromUrl(referrerUrl);
        if (isEmptyObject(query)) {
          if (sdPara.preset_properties.search_keyword_baidu && isBaiduTraffic()) {
            return;
          } else {
            return '未取到值';
          }
        }
        var temp = null;
        for (var i in search_keyword) {
          if (searchEngine === i) {
            if (typeof query === 'object') {
              temp = search_keyword[i];
              if (isArray(temp)) {
                for (i = 0; i < temp.length; i++) {
                  var _value = query[temp[i]];
                  if (_value) {
                    if (activeValue) {
                      return {
                        active: _value
                      };
                    } else {
                      return _value;
                    }
                  }
                }
              } else if (query[temp]) {
                if (activeValue) {
                  return {
                    active: query[temp]
                  };
                } else {
                  return query[temp];
                }
              }
            }
          }
        }
        if (sdPara.preset_properties.search_keyword_baidu && isBaiduTraffic()) {
          return;
        } else {
          return '未取到值';
        }
      } else {
        if (referrerUrl === '') {
          return '未取到值_直接打开';
        } else {
          return '未取到值_非http的url';
        }
      }
    } else {
      return '取值异常_referrer异常_' + String(referrerUrl);
    }
  }

  function getWxAdIdFromUrl(url) {
    var click_id = getQueryParam(url, 'gdt_vid');
    var hash_key = getQueryParam(url, 'hash_key');
    var callbacks = getQueryParam(url, 'callbacks');
    var obj = {
      click_id: '',
      hash_key: '',
      callbacks: ''
    };
    if (isString(click_id) && click_id.length) {
      obj.click_id = click_id.length == 16 || click_id.length == 18 ? click_id : '参数解析不合法';

      if (isString(hash_key) && hash_key.length) {
        obj.hash_key = hash_key;
      }
      if (isString(callbacks) && callbacks.length) {
        obj.callbacks = callbacks;
      }
    }

    return obj;
  }

  var pageInfo = {
    initPage: function() {
      var referrer = getReferrer();
      var url = getURL();
      var url_domain = getCurrentDomain(url);
      if (!url_domain) {
        debug.jssdkDebug('url_domain异常_' + url + '_' + url_domain);
      }

      this.pageProp = {
        referrer: referrer,
        referrer_host: referrer ? getHostname(referrer) : '',
        url: url,
        url_host: getHostname(url, 'url_host取值异常'),
        url_domain: url_domain
      };
    },
    pageProp: {},

    campaignParams: function() {
      var campaign_keywords = source_channel_standard.split(' '),
        kw = '',
        params = {};
      if (isArray(sdPara.source_channel) && sdPara.source_channel.length > 0) {
        campaign_keywords = campaign_keywords.concat(sdPara.source_channel);
        campaign_keywords = unique(campaign_keywords);
      }
      each(campaign_keywords, function(kwkey) {
        kw = getQueryParam(location.href, kwkey);
        if (kw.length) {
          params[kwkey] = kw;
        }
      });

      return params;
    },
    campaignParamsStandard: function(prefix, prefix_add) {
      prefix = prefix || '';
      prefix_add = prefix_add || '';
      var utms = pageInfo.campaignParams();
      var $utms = {},
        otherUtms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms[prefix + i] = utms[i];
        } else {
          otherUtms[prefix_add + i] = utms[i];
        }
      });
      return {
        $utms: $utms,
        otherUtms: otherUtms
      };
    },
    properties: function() {
      return {
        $timezone_offset: new Date().getTimezoneOffset(),
        $screen_height: Number(screen.height) || 0,
        $screen_width: Number(screen.width) || 0,
        $lib: 'js',
        $lib_version: sdkversion_placeholder
      };
    },
    currentProps: {},
    register: function(obj) {
      extend(pageInfo.currentProps, obj);
    }
  };

  function getSourceFromReferrer() {
    function getMatchStrFromArr(arr, str) {
      for (var i = 0; i < arr.length; i++) {
        if (str.split('?')[0].indexOf(arr[i]) !== -1) {
          return true;
        }
      }
    }

    var utm_reg = '(' + sdPara.source_type.utm.join('|') + ')\\=[^&]+';
    var search_engine = sdPara.source_type.search;
    var social_engine = sdPara.source_type.social;

    var referrer = document.referrer || '';
    var url = pageInfo.pageProp.url;
    if (url) {
      var utm_match = url.match(new RegExp(utm_reg));
      if (utm_match && utm_match[0]) {
        return '付费广告流量';
      } else if (getMatchStrFromArr(search_engine, referrer)) {
        return '自然搜索流量';
      } else if (getMatchStrFromArr(social_engine, referrer)) {
        return '社交网站流量';
      } else if (referrer === '') {
        return '直接流量';
      } else {
        return '引荐流量';
      }
    } else {
      return '获取url异常';
    }
  }

  function autoExeQueue() {
    var queue = {
      items: [],
      enqueue: function(val) {
        this.items.push(val);
        this.start();
      },
      dequeue: function() {
        return this.items.shift();
      },
      getCurrentItem: function() {
        return this.items[0];
      },
      isRun: false,
      start: function() {
        if (this.items.length > 0 && !this.isRun) {
          this.isRun = true;
          this.getCurrentItem().start();
        }
      },
      close: function() {
        this.dequeue();
        this.isRun = false;
        this.start();
      }
    };
    return queue;
  }

  function mediaQueriesSupported() {
    return typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined';
  }

  function getScreenOrientation() {
    var screenOrientationAPI = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type;
    var screenOrientation = '未取到值';
    if (screenOrientationAPI) {
      screenOrientation = screenOrientationAPI.indexOf('landscape') > -1 ? 'landscape' : 'portrait';
    } else if (mediaQueriesSupported()) {
      var matchMediaFunc = window.matchMedia || window.msMatchMedia;
      if (matchMediaFunc('(orientation: landscape)').matches) {
        screenOrientation = 'landscape';
      } else if (matchMediaFunc('(orientation: portrait)').matches) {
        screenOrientation = 'portrait';
      }
    }
    return screenOrientation;
  }

  var cookie = {
    get: function(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return _decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },
    set: function(name, value, days, cross_subdomain) {
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sdPara.cross_subdomain : cross_subdomain;
      var cdomain = '',
        expires = '',
        secure = '',
        samesite = '';
      days = days == null ? 73000 : days;

      if (cross_subdomain) {
        var domain = getCurrentDomain(location.href);
        if (domain === 'url解析失败') {
          domain = '';
        }
        cdomain = domain ? '; domain=' + domain : '';
      }

      if (days !== 0) {
        var date = new Date();
        if (String(days).slice(-1) === 's') {
          date.setTime(date.getTime() + Number(String(days).slice(0, -1)) * 1000);
        } else {
          date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        }

        expires = '; expires=' + date.toGMTString();
      }
      if (isString(sdPara.set_cookie_samesite) && sdPara.set_cookie_samesite !== '') {
        samesite = '; SameSite=' + sdPara.set_cookie_samesite;
      }
      if (sdPara.is_secure_cookie) {
        secure = '; secure';
      }

      function getValid(data) {
        if (data) {
          return data.replaceAll(/\r\n/g, '');
        } else {
          return false;
        }
      }
      var valid_name = '';
      var valid_value = '';
      var valid_domain = '';
      if (name) {
        valid_name = getValid(name);
      }
      if (value) {
        valid_value = getValid(value);
      }
      if (cdomain) {
        valid_domain = getValid(cdomain);
      }
      if (valid_name && valid_value) {
        document.cookie = valid_name + '=' + encodeURIComponent(valid_value) + expires + '; path=/' + valid_domain + samesite + secure;
      }
    },
    encrypt: function(v) {
      return 'data:enc;' + rot13obfs(v);
    },
    decrypt: function(v) {
      v = v.substring('data:enc;'.length);
      v = rot13defs(v);
      return v;
    },
    resolveValue: function(cross) {
      var flag = 'data:enc;';
      if (isString(cross) && cross.indexOf(flag) === 0) {
        cross = cookie.decrypt(cross);
      }
      return cross;
    },

    remove: function(name, cross_subdomain) {
      cross_subdomain = typeof cross_subdomain === 'undefined' ? sdPara.cross_subdomain : cross_subdomain;
      cookie.set(name, '', -1, cross_subdomain);
    },

    getCookieName: function(name_prefix, url) {
      var sub = '';
      url = url || location.href;
      if (sdPara.cross_subdomain === false) {
        try {
          sub = _URL(url).hostname;
        } catch (e) {
          sdLog(e);
        }
        if (typeof sub === 'string' && sub !== '') {
          sub = 'sajssdk_2015_' + sdPara.sdk_id + name_prefix + '_' + sub.replace(/\./g, '_');
        } else {
          sub = 'sajssdk_2015_root_' + sdPara.sdk_id + name_prefix;
        }
      } else {
        sub = 'sajssdk_2015_cross_' + sdPara.sdk_id + name_prefix;
      }
      return sub;
    },
    getNewUser: function() {
      var prefix = 'new_user';
      if (this.get('sensorsdata_is_new_user') !== null || this.get(this.getCookieName(prefix)) !== null) {
        return true;
      } else {
        return false;
      }
    }
  };

  var _localstorage = {
    get: function(name) {
      return window.localStorage.getItem(name);
    },

    parse: function(name) {
      var storedValue;
      try {
        storedValue = JSON.parse(_localstorage.get(name)) || null;
      } catch (err) {
        sdLog(err);
      }
      return storedValue;
    },

    set: function(name, value) {
      window.localStorage.setItem(name, value);
    },

    remove: function(name) {
      window.localStorage.removeItem(name);
    },

    isSupport: function() {
      var supported = true;
      try {
        var supportName = '__sensorsdatasupport__';
        var val = 'testIsSupportStorage';
        _localstorage.set(supportName, val);
        if (_localstorage.get(supportName) !== val) {
          supported = false;
        }
        _localstorage.remove(supportName);
      } catch (err) {
        supported = false;
      }
      return supported;
    }
  };

  var _sessionStorage = {
    isSupport: function() {
      var supported = true;

      var supportName = '__sensorsdatasupport__';
      var val = 'testIsSupportStorage';
      try {
        if (sessionStorage && sessionStorage.setItem) {
          sessionStorage.setItem(supportName, val);
          sessionStorage.removeItem(supportName, val);
          supported = true;
        } else {
          supported = false;
        }
      } catch (e) {
        supported = false;
      }
      return supported;
    }
  };

  function isSupportCors() {
    if (typeof window.XMLHttpRequest === 'undefined') {
      return false;
    }
    if ('withCredentials' in new XMLHttpRequest()) {
      return true;
    } else if (typeof XDomainRequest !== 'undefined') {
      return true;
    } else {
      return false;
    }
  }

  function isIOS() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
  }

  function getIOSVersion() {
    try {
      var version = navigator.appVersion.match(/OS (\d+)[._](\d+)[._]?(\d+)?/);
      return version && version[1] ? Number.parseInt(version[1], 10) : '';
    } catch (e) {
      return '';
    }
  }

  function getUA() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    if ((s = ua.match(/opera.([\d.]+)/))) {
      Sys.opera = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/msie ([\d.]+)/))) {
      Sys.ie = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/edge.([\d.]+)/))) {
      Sys.edge = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/firefox\/([\d.]+)/))) {
      Sys.firefox = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/chrome\/([\d.]+)/))) {
      Sys.chrome = Number(s[1].split('.')[0]);
    } else if ((s = ua.match(/version\/([\d.]+).*safari/))) {
      Sys.safari = Number(s[1].match(/^\d*.\d*/));
    } else if ((s = ua.match(/trident\/([\d.]+)/))) {
      Sys.ie = 11;
    }
    return Sys;
  }

  function isSupportBeaconSend() {
    var supported = false;
    if (typeof navigator !== 'object' || typeof navigator.sendBeacon !== 'function') {
      return supported;
    }

    var Sys = getUA();
    var ua = navigator.userAgent.toLowerCase();
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      var reg = /os [\d._]*/gi;
      var verinfo = ua.match(reg);
      var version = (verinfo + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
      var ver = version.split('.');
      if (typeof Sys.safari === 'undefined') {
        Sys.safari = ver[0];
      }
      if (ver[0] && ver[0] < 13) {
        if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 12) {
          supported = true;
        }
      } else if (Sys.chrome > 41 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.3) {
        supported = true;
      }
    } else {
      if (Sys.chrome > 38 || Sys.edge > 13 || Sys.firefox > 30 || Sys.opera > 25 || Sys.safari > 11.0) {
        supported = true;
      }
    }
    return supported;
  }

  function addEvent() {
    function fixEvent(event) {
      if (event) {
        event.preventDefault = fixEvent.preventDefault;
        event.stopPropagation = fixEvent.stopPropagation;
        event._getPath = fixEvent._getPath;
      }
      return event;
    }
    fixEvent._getPath = function() {
      var ev = this;
      return this.path || (this.composedPath && this.composedPath()) || ry(ev.target).getParents();
    };

    fixEvent.preventDefault = function() {
      this.returnValue = false;
    };
    fixEvent.stopPropagation = function() {
      this.cancelBubble = true;
    };

    var register_event = function(element, type, handler) {
      var useCapture = isObject(sdPara.heatmap) && sdPara.heatmap.useCapture ? true : false;
      if (isObject(sdPara.heatmap) && typeof sdPara.heatmap.useCapture === 'undefined' && type === 'click') {
        useCapture = true;
      }
      if (element && element.addEventListener) {
        element.addEventListener(
          type,
          function(e) {
            e._getPath = fixEvent._getPath;
            handler.call(this, e);
          },
          useCapture
        );
      } else {
        var ontype = 'on' + type;
        var old_handler = element[ontype];
        element[ontype] = makeHandler(element, handler, old_handler, type);
      }
    };

    function makeHandler(element, new_handler, old_handlers, type) {
      var handler = function(event) {
        event = event || fixEvent(window.event);
        if (!event) {
          return undefined;
        }
        event.target = event.srcElement;

        var ret = true;
        var old_result, new_result;
        if (typeof old_handlers === 'function') {
          old_result = old_handlers(event);
        }
        new_result = new_handler.call(element, event);
        if (type !== 'beforeunload') {
          if (false === old_result || false === new_result) {
            ret = false;
          }
          return ret;
        }
      };
      return handler;
    }

    register_event.apply(null, arguments);
  }

  function addHashEvent(callback) {
    var hashEvent = 'pushState' in window.history ? 'popstate' : 'hashchange';
    addEvent(window, hashEvent, callback);
  }

  function addSinglePageEvent(callback) {
    var current_url = location.href;
    var historyPushState = window.history.pushState;
    var historyReplaceState = window.history.replaceState;

    if (isFunction(window.history.pushState)) {
      window.history.pushState = function() {
        historyPushState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    if (isFunction(window.history.replaceState)) {
      window.history.replaceState = function() {
        historyReplaceState.apply(window.history, arguments);
        callback(current_url);
        current_url = location.href;
      };
    }

    var singlePageEvent;
    if (window.document.documentMode) {
      singlePageEvent = 'hashchange';
    } else {
      singlePageEvent = historyPushState ? 'popstate' : 'hashchange';
    }

    addEvent(window, singlePageEvent, function() {
      callback(current_url);
      current_url = location.href;
    });


  }

  function listenPageState(obj) {
    var visibilystore = {
      visibleHandler: isFunction(obj.visible) ? obj.visible : function() {},
      hiddenHandler: isFunction(obj.hidden) ? obj.hidden : function() {},
      visibilityChange: null,
      hidden: null,
      isSupport: function() {
        return typeof document[this.hidden] !== 'undefined';
      },
      init: function() {
        if (typeof document.hidden !== 'undefined') {
          this.hidden = 'hidden';
          this.visibilityChange = 'visibilitychange';
        } else if (typeof document.mozHidden !== 'undefined') {
          this.hidden = 'mozHidden';
          this.visibilityChange = 'mozvisibilitychange';
        } else if (typeof document.msHidden !== 'undefined') {
          this.hidden = 'msHidden';
          this.visibilityChange = 'msvisibilitychange';
        } else if (typeof document.webkitHidden !== 'undefined') {
          this.hidden = 'webkitHidden';
          this.visibilityChange = 'webkitvisibilitychange';
        }
        this.listen();
      },
      listen: function() {
        if (!this.isSupport()) {
          addEvent(window, 'focus', this.visibleHandler);
          addEvent(window, 'blur', this.hiddenHandler);
        } else {
          var _this = this;
          addEvent(
            document,
            this.visibilityChange,
            function() {
              if (!document[_this.hidden]) {
                _this.visibleHandler();
              } else {
                _this.hiddenHandler();
              }
            },
            1
          );
        }
      }
    };
    visibilystore.init();
  }

  function bindReady(fn, win) {
    win = win || window;
    var done = false,
      top = true,
      doc = win.document,
      root = doc.documentElement,
      modern = doc.addEventListener,
      add = modern ? 'addEventListener' : 'attachEvent',
      rem = modern ? 'removeEventListener' : 'detachEvent',
      pre = modern ? '' : 'on',
      init = function(e) {
        if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
        (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
        if (!done && (done = true)) fn.call(win, e.type || e);
      },
      poll = function() {
        try {
          root.doScroll('left');
        } catch (e) {
          setTimeout(poll, 50);
          return;
        }
        init('poll');
      };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
      if (!modern && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (e) {
          sdLog(e);
        }
        if (top) poll();
      }
      doc[add](pre + 'DOMContentLoaded', init, false);
      doc[add](pre + 'readystatechange', init, false);
      win[add](pre + 'load', init, false);
    }
  }

  function xhr(cors) {
    if (cors) {
      if (typeof window.XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest()) {
        return new XMLHttpRequest();
      } else if (typeof XDomainRequest !== 'undefined') {
        return new XDomainRequest();
      } else {
        return null;
      }
    } else {
      if (typeof window.XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
      }
      if (window.ActiveXObject) {
        try {
          return new ActiveXObject('Msxml2.XMLHTTP');
        } catch (d) {
          try {
            return new ActiveXObject('Microsoft.XMLHTTP');
          } catch (d) {
            sdLog(d);
          }
        }
      }
    }
  }

  function ajax(para) {
    para.timeout = para.timeout || 20000;

    para.credentials = typeof para.credentials === 'undefined' ? true : para.credentials;

    function getJSON(data) {
      if (!data) {
        return '';
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    }

    var g = xhr(para.cors);

    if (!g) {
      return false;
    }

    if (!para.type) {
      para.type = para.data ? 'POST' : 'GET';
    }
    para = extend({
        success: function() {},
        error: function() {}
      },
      para
    );

    debug.protocol.ajax(para.url);

    var oldsuccess = para.success;
    var olderror = para.error;
    var errorTimer;

    function abort() {
      try {
        if (isObject(g) && g.abort) {
          g.abort();
        }
      } catch (error) {
        sdLog(error);
      }

      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
        para.error && para.error();
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      }
    }

    para.success = function(data) {
      oldsuccess(data);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    para.error = function(err) {
      olderror(err);
      if (errorTimer) {
        clearTimeout(errorTimer);
        errorTimer = null;
      }
    };
    errorTimer = setTimeout(function() {
      abort();
    }, para.timeout);

    if (typeof XDomainRequest !== 'undefined' && g instanceof XDomainRequest) {
      g.onload = function() {
        para.success && para.success(getJSON(g.responseText));
        g.onreadystatechange = null;
        g.onload = null;
        g.onerror = null;
      };
      g.onerror = function() {
        para.error && para.error(getJSON(g.responseText), g.status);
        g.onreadystatechange = null;
        g.onerror = null;
        g.onload = null;
      };
    }
    g.onreadystatechange = function() {
      try {
        if (g.readyState == 4) {
          if ((g.status >= 200 && g.status < 300) || g.status == 304) {
            para.success(getJSON(g.responseText));
          } else {
            para.error(getJSON(g.responseText), g.status);
          }
          g.onreadystatechange = null;
          g.onload = null;
        }
      } catch (e) {
        g.onreadystatechange = null;
        g.onload = null;
      }
    };

    g.open(para.type, para.url, true);

    try {
      if (para.credentials) {
        g.withCredentials = true;
      }
      if (isObject(para.header)) {
        each(para.header, function(v, i) {
          g.setRequestHeader && g.setRequestHeader(i, v);
        });
      }

      if (para.data) {
        if (!para.cors) {
          g.setRequestHeader && g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        if (para.contentType === 'application/json') {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        } else {
          g.setRequestHeader && g.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
      }
    } catch (e) {
      sdLog(e);
    }

    g.send(para.data || null);
  }

  function jsonp(obj) {
    if (!(isObject(obj) && isString(obj.callbackName))) {
      sdLog('JSONP 请求缺少 callbackName');
      return false;
    }
    obj.success = isFunction(obj.success) ? obj.success : function() {};
    obj.error = isFunction(obj.error) ? obj.error : function() {};
    obj.data = obj.data || '';
    var script = document.createElement('script');
    var head = document.getElementsByTagName('head')[0];
    var timer = null;
    var isError = false;
    head.appendChild(script);
    if (isNumber(obj.timeout)) {
      timer = setTimeout(function() {
        if (isError) {
          return false;
        }
        obj.error('timeout');
        window[obj.callbackName] = function() {
          sdLog('call jsonp error');
        };
        timer = null;
        head.removeChild(script);
        isError = true;
      }, obj.timeout);
    }
    window[obj.callbackName] = function() {
      clearTimeout(timer);
      timer = null;
      obj.success.apply(null, arguments);
      window[obj.callbackName] = function() {
        sdLog('call jsonp error');
      };
      head.removeChild(script);
    };
    if (obj.url.indexOf('?') > -1) {
      obj.url += '&callbackName=' + obj.callbackName;
    } else {
      obj.url += '?callbackName=' + obj.callbackName;
    }
    if (isObject(obj.data)) {
      var arr = [];
      each(obj.data, function(value, key) {
        arr.push(key + '=' + value);
      });
      obj.data = arr.join('&');
      obj.url += '&' + obj.data;
    }
    script.onerror = function(err) {
      if (isError) {
        return false;
      }
      window[obj.callbackName] = function() {
        sdLog('call jsonp error');
      };
      clearTimeout(timer);
      timer = null;
      head.removeChild(script);
      obj.error(err);
      isError = true;
    };
    script.src = obj.url;
  }

  var EventEmitter = function() {
    this._events = [];
    this.pendingEvents = [];
  };

  EventEmitter.prototype = {
    emit: function(type) {
      var args = [].slice.call(arguments, 1);

      each(this._events, function(val) {
        if (val.type !== type) {
          return;
        }
        val.callback.apply(val.context, args);
      });

      this.pendingEvents.push({
        type: type,
        data: args
      });
      this.pendingEvents.length > 20 ? this.pendingEvents.shift() : null;
    },
    on: function(event, callback, context, replayAll) {
      if (typeof callback !== 'function') {
        return;
      }
      this._events.push({
        type: event,
        callback: callback,
        context: context || this
      });

      replayAll = replayAll === false ? false : true;
      if (this.pendingEvents.length > 0 && replayAll) {
        each(this.pendingEvents, function(val) {
          if (val.type === event) {
            callback.apply(context, val.data);
          }
        });
      }
    },
    tempAdd: function(event, data) {
      if (!data || !event) {
        return;
      }
      return this.emit(event, data);
    },
    isReady: function() {}
  };


  var _ = {
    __proto__: null,
    each: each,
    map: map,
    extend: extend,
    extend2Lev: extend2Lev,
    coverExtend: coverExtend,
    isArray: isArray,
    isFunction: isFunction,
    isArguments: isArguments,
    toArray: toArray,
    values: values,
    indexOf: indexOf,
    filter: filter,
    inherit: inherit,
    trim: trim,
    isObject: isObject,
    isEmptyObject: isEmptyObject,
    isUndefined: isUndefined,
    isString: isString,
    isDate: isDate,
    isBoolean: isBoolean,
    isNumber: isNumber,
    isElement: isElement,
    isJSONString: isJSONString,
    safeJSONParse: safeJSONParse,
    throttle: throttle,
    hashCode: hashCode,
    getRandomBasic: getRandomBasic,
    getRandom: getRandom,
    formatJsonString: formatJsonString,
    unique: unique,
    base64Decode: base64Decode,
    base64Encode: base64Encode,
    now: now,
    rot13obfs: rot13obfs,
    rot13defs: rot13defs,
    strToUnicode: strToUnicode,
    hasAttributes: hasAttributes,
    hasAttribute: hasAttribute,
    getElementContent: getElementContent,
    loadScript: loadScript,
    ry: ry,
    setCssStyle: setCssStyle,
    getDomBySelector: getDomBySelector,
    decodeURIComponent: _decodeURIComponent,
    decodeURI: _decodeURI,
    getQueryParam: getQueryParam,
    urlParse: urlParse,
    getURLSearchParams: getURLSearchParams,
    URL: _URL,
    getHostname: getHostname,
    getQueryParamsFromUrl: getQueryParamsFromUrl,
    urlSafeBase64: urlSafeBase64,
    secCheck: urlCheck,
    getURL: getURL,
    encodeDates: encodeDates,
    formatDate: formatDate,
    searchObjDate: searchObjDate,
    mediaQueriesSupported: mediaQueriesSupported,
    getScreenOrientation: getScreenOrientation,
    cookie: cookie,
    localStorage: _localstorage,
    sessionStorage: _sessionStorage,
    isSupportCors: isSupportCors,
    isIOS: isIOS,
    getUA: getUA,
    getIOSVersion: getIOSVersion,
    isSupportBeaconSend: isSupportBeaconSend,
    searchZZAppStyle: searchZZAppStyle,
    searchObjString: searchObjString,
    filterReservedProperties: filterReservedProperties,
    parseSuperProperties: parseSuperProperties,
    strip_sa_properties: strip_sa_properties,
    searchConfigData: searchConfigData,
    strip_empty_properties: strip_empty_properties,
    UUID: UUID,
    getCurrentDomain: getCurrentDomain,
    getEleInfo: getEleInfo,
    isBaiduTraffic: isBaiduTraffic,
    getReferrerEqid: getReferrerEqid,
    getReferrerEqidType: getReferrerEqidType,
    getBaiduKeyword: getBaiduKeyword,
    getCookieTopLevelDomain: getCookieTopLevelDomain,
    isReferralTraffic: isReferralTraffic,
    getReferrer: getReferrer,
    getKeywordFromReferrer: getKeywordFromReferrer,
    getWxAdIdFromUrl: getWxAdIdFromUrl,
    getReferSearchEngine: getReferSearchEngine,
    getSourceFromReferrer: getSourceFromReferrer,
    info: pageInfo,
    autoExeQueue: autoExeQueue,
    formatString: formatString,
    addEvent: addEvent,
    addHashEvent: addHashEvent,
    addSinglePageEvent: addSinglePageEvent,
    listenPageState: listenPageState,
    bindReady: bindReady,
    xhr: xhr,
    ajax: ajax,
    jsonp: jsonp,
    eventEmitter: EventEmitter
  };

  var saNewUser = {
    checkIsAddSign: function(data) {
      if (data.type === 'track') {
        if (cookie.getNewUser()) {
          data.properties.$is_first_day = true;
        } else {
          data.properties.$is_first_day = false;
        }
      }
    },
    is_first_visit_time: false,
    checkIsFirstTime: function(data) {
      if (data.type === 'track' && data.event === '$pageview') {
        if (this.is_first_visit_time) {
          data.properties.$is_first_time = true;
          this.is_first_visit_time = false;
        } else {
          data.properties.$is_first_time = false;
        }
      }
    },
    setDeviceId: function(uuid) {
      var device_id = null;
      var ds = cookie.get('sensorsdata2015jssdkcross' + sd.para.sdk_id);
      ds = cookie.resolveValue(ds);
      var state = {};
      if (ds != null && isJSONString(ds)) {
        state = JSON.parse(ds);
        if (state.$device_id) {
          device_id = state.$device_id;
        }
      }

      device_id = device_id || uuid;

      if (sd.para.cross_subdomain === true) {
        sd.store.set('$device_id', device_id);
      } else {
        state.$device_id = device_id;
        state = JSON.stringify(state);
        if (sd.para.encrypt_cookie) {
          state = cookie.encrypt(state);
        }
        cookie.set('sensorsdata2015jssdkcross' + sd.para.sdk_id, state, null, true);
      }

      if (sd.para.is_track_device_id) {
        pageInfo.currentProps.$device_id = device_id;
      }
    },
    storeInitCheck: function() {
      if (sd.is_first_visitor) {
        var date = new Date();
        var obj = {
          h: 23 - date.getHours(),
          m: 59 - date.getMinutes(),
          s: 59 - date.getSeconds()
        };
        cookie.set(cookie.getCookieName('new_user'), '1', obj.h * 3600 + obj.m * 60 + obj.s + 's');
        this.is_first_visit_time = true;
      } else {
        if (!cookie.getNewUser()) {
          this.checkIsAddSign = function(data) {
            if (data.type === 'track') {
              data.properties.$is_first_day = false;
            }
          };
        }
        this.checkIsFirstTime = function(data) {
          if (data.type === 'track' && data.event === '$pageview') {
            data.properties.$is_first_time = false;
          }
        };
      }
    },
    checkIsFirstLatest: function() {
      var url_domain = pageInfo.pageProp.url_domain;


      var latestObj = {};

      if (url_domain === '') {
        url_domain = 'url解析失败';
      }

      var baiduKey = getKeywordFromReferrer(document.referrer, true);
      if (sd.para.preset_properties.search_keyword_baidu) {
        if (isReferralTraffic(document.referrer)) {
          if (isBaiduTraffic() && !(isObject(baiduKey) && baiduKey.active)) {
            latestObj['$search_keyword_id'] = getBaiduKeyword.id();
            latestObj['$search_keyword_id_type'] = getBaiduKeyword.type();
            latestObj['$search_keyword_id_hash'] = hashCode(latestObj['$search_keyword_id']);
          } else {
            if (sd.store._state && sd.store._state.props) {
              sd.store._state.props.$search_keyword_id && delete sd.store._state.props.$search_keyword_id;
              sd.store._state.props.$search_keyword_id_type && delete sd.store._state.props.$search_keyword_id_type;
              sd.store._state.props.$search_keyword_id_hash && delete sd.store._state.props.$search_keyword_id_hash;
            }
          }
        }
      } else {
        if (sd.store._state && sd.store._state.props) {
          sd.store._state.props.$search_keyword_id && delete sd.store._state.props.$search_keyword_id;
          sd.store._state.props.$search_keyword_id_type && delete sd.store._state.props.$search_keyword_id_type;
          sd.store._state.props.$search_keyword_id_hash && delete sd.store._state.props.$search_keyword_id_hash;
        }
      }

      sd.store.save();

      each(sd.para.preset_properties, function(value, key) {
        if (key.indexOf('latest_') === -1) {
          return false;
        }
        key = key.slice(7);
        if (value) {
          if (key === 'wx_ad_click_id' && value === 'not_collect') {
            return false;
          }
          if (key !== 'utm' && url_domain === 'url解析失败') {
            if (key === 'wx_ad_click_id') {
              latestObj['_latest_wx_ad_click_id'] = 'url的domain解析失败';
              latestObj['_latest_wx_ad_hash_key'] = 'url的domain解析失败';
              latestObj['_latest_wx_ad_callbacks'] = 'url的domain解析失败';
            } else {
              latestObj['$latest_' + key] = 'url的domain解析失败';
            }
          } else if (isReferralTraffic(document.referrer)) {
            switch (key) {
              case 'traffic_source_type':
                latestObj['$latest_traffic_source_type'] = getSourceFromReferrer();
                break;
              case 'referrer':
                latestObj['$latest_referrer'] = pageInfo.pageProp.referrer;
                break;
              case 'search_keyword':
                if (getKeywordFromReferrer()) {
                  latestObj['$latest_search_keyword'] = getKeywordFromReferrer();
                } else if (isObject(sd.store._state) && isObject(sd.store._state.props) && sd.store._state.props.$latest_search_keyword) {
                  delete sd.store._state.props.$latest_search_keyword;
                }
                break;
              case 'landing_page':
                latestObj['$latest_landing_page'] = getURL();
                break;
              case 'wx_ad_click_id':
                var adObj = getWxAdIdFromUrl(location.href);
                latestObj['_latest_wx_ad_click_id'] = adObj.click_id;
                latestObj['_latest_wx_ad_hash_key'] = adObj.hash_key;
                latestObj['_latest_wx_ad_callbacks'] = adObj.callbacks;
                break;
            }
          }
        } else {
          if (key === 'utm' && sd.store._state && sd.store._state.props) {
            for (var key1 in sd.store._state.props) {
              if (key1.indexOf('$latest_utm') === 0 || (key1.indexOf('_latest_') === 0 && key1.indexOf('_latest_wx_ad_') < 0)) {
                delete sd.store._state.props[key1];
              }
            }
          } else if (sd.store._state && sd.store._state.props && '$latest_' + key in sd.store._state.props) {
            delete sd.store._state.props['$latest_' + key];
          } else if (key == 'wx_ad_click_id' && sd.store._state && sd.store._state.props && value === false) {
            var wxPro = ['_latest_wx_ad_click_id', '_latest_wx_ad_hash_key', '_latest_wx_ad_callbacks'];
            each(wxPro, function(value) {
              if (value in sd.store._state.props) {
                delete sd.store._state.props[value];
              }
            });
          }
        }
      });

      sd.register(latestObj);

      if (sd.para.preset_properties.latest_utm) {
        var allUtms = pageInfo.campaignParamsStandard('$latest_', '_latest_');
        var $utms = allUtms.$utms;
        var otherUtms = allUtms.otherUtms;
        if (!isEmptyObject($utms)) {
          sd.register($utms);
        }
        if (!isEmptyObject(otherUtms)) {
          sd.register(otherUtms);
        }
      }
    }
  };


  var store = {
    requests: [],
    _sessionState: {},
    _state: {
      distinct_id: '',
      first_id: '',
      props: {}
    },
    getProps: function() {
      return this._state.props || {};
    },
    getSessionProps: function() {
      return this._sessionState;
    },
    getDistinctId: function() {
      return this._state._distinct_id || this._state.distinct_id;
    },
    getUnionId: function() {
      var obj = {};
      var firstId = this._state._first_id || this._state.first_id,
        distinct_id = this._state._distinct_id || this._state.distinct_id;
      if (firstId && distinct_id) {
        obj.login_id = distinct_id;
        obj.anonymous_id = firstId;
      } else {
        obj.anonymous_id = distinct_id;
      }
      return obj;
    },
    getFirstId: function() {
      return this._state._first_id || this._state.first_id;
    },
    toState: function(ds) {
      var state = null;
      if (ds != null && isJSONString(ds)) {
        state = JSON.parse(ds);
        this._state = extend(state);
        if (state.distinct_id) {
          if (typeof state.props === 'object') {
            for (var key in state.props) {
              if (typeof state.props[key] === 'string') {
                state.props[key] = state.props[key].slice(0, sd.para.max_referrer_string_length);
              }
            }
            this.save();
          }
        } else {
          this.set('distinct_id', UUID());
          sd.debug.distinct_id('1', ds);
        }
      } else {
        this.set('distinct_id', UUID());
        sd.debug.distinct_id('2', ds);
      }
    },
    initSessionState: function() {
      var ds = cookie.get('sensorsdata2015session');
      var state = null;
      if (ds !== null && typeof(state = JSON.parse(ds)) === 'object') {
        this._sessionState = state || {};
      }
    },

    setOnce: function(a, b) {
      if (!(a in this._state)) {
        this.set(a, b);
      }
    },
    set: function(name, value) {
      this._state = this._state || {};
      var pre_id = this._state.distinct_id;
      this._state[name] = value;
      if (name === 'first_id') {
        delete this._state._first_id;
      } else if (name === 'distinct_id') {
        delete this._state._distinct_id;
      }
      this.save();
      if (name === 'distinct_id' && pre_id) {
        sd.events.tempAdd('changeDistinctId', value);
      }
    },
    change: function(name, value) {
      this._state['_' + name] = value;
    },
    setSessionProps: function(newp) {
      var props = this._sessionState;
      extend(props, newp);
      this.sessionSave(props);
    },
    setSessionPropsOnce: function(newp) {
      var props = this._sessionState;
      coverExtend(props, newp);
      this.sessionSave(props);
    },
    setProps: function(newp, isCover) {
      var props = {};
      if (!isCover) {
        props = extend(this._state.props || {}, newp);
      } else {
        props = newp;
      }
      for (var key in props) {
        if (typeof props[key] === 'string') {
          props[key] = props[key].slice(0, sd.para.max_referrer_string_length);
        }
      }
      this.set('props', props);
    },
    setPropsOnce: function(newp) {
      var props = this._state.props || {};
      coverExtend(props, newp);
      this.set('props', props);
    },
    clearAllProps: function(arr) {
      this._sessionState = {};
      var i;
      if (isArray(arr) && arr.length > 0) {
        for (i = 0; i < arr.length; i++) {
          if (isString(arr[i]) && arr[i].indexOf('latest_') === -1 && isObject(this._state.props) && arr[i] in this._state.props) {
            delete this._state.props[arr[i]];
          }
        }
      } else {
        if (isObject(this._state.props)) {
          for (i in this._state.props) {
            if (i.indexOf('latest_') !== 1) {
              delete this._state.props[i];
            }
          }
        }
      }
      this.sessionSave({});
      this.save();
    },
    sessionSave: function(props) {
      this._sessionState = props;
      cookie.set('sensorsdata2015session', JSON.stringify(this._sessionState), 0);
    },
    save: function() {
      var copyState = JSON.parse(JSON.stringify(this._state));
      delete copyState._first_id;
      delete copyState._distinct_id;

      var stateStr = JSON.stringify(copyState);
      if (sd.para.encrypt_cookie) {
        stateStr = cookie.encrypt(stateStr);
      }
      cookie.set(this.getCookieName(), stateStr, 73000, sd.para.cross_subdomain);
    },
    getCookieName: function() {
      var sub = '';
      if (sd.para.cross_subdomain === false) {
        try {
          sub = _URL(location.href).hostname;
        } catch (e) {
          sd.log(e);
        }
        if (typeof sub === 'string' && sub !== '') {
          sub = 'sa_jssdk_2015_' + sd.para.sdk_id + sub.replace(/\./g, '_');
        } else {
          sub = 'sa_jssdk_2015_root' + sd.para.sdk_id;
        }
      } else {
        sub = 'sensorsdata2015jssdkcross' + sd.para.sdk_id;
      }
      return sub;
    },
    init: function() {
      this.initSessionState();
      var uuid = UUID();
      var cross = cookie.get(this.getCookieName());
      cross = cookie.resolveValue(cross);
      if (cross === null) {
        sd.is_first_visitor = true;

        this.set('distinct_id', uuid);
      } else {
        if (!isJSONString(cross) || !JSON.parse(cross).distinct_id) {
          sd.is_first_visitor = true;
        }

        this.toState(cross);
      }

      saNewUser.setDeviceId(uuid);

      saNewUser.storeInitCheck();
      saNewUser.checkIsFirstLatest();
    }
  };

  var checkOption = {
    regChecks: {
      regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
    },
    checkPropertiesKey: function(obj) {
      var me = this,
        flag = true;
      each(obj, function(content, key) {
        if (!me.regChecks.regName.test(key)) {
          flag = false;
        }
      });
      return flag;
    },
    check: function(a, b) {
      if (typeof this[a] === 'string') {
        return this[this[a]](b);
      } else if (isFunction(this[a])) {
        return this[a](b);
      }
    },
    str: function(s) {
      if (isString(s) && s !== '') {
        return true;
      } else {
        sdLog('请检查参数格式,必须是字符串且有值');
        return false;
      }
    },
    properties: function(p) {
      strip_sa_properties(p);
      if (p) {
        if (isObject(p)) {
          if (this.checkPropertiesKey(p)) {
            return true;
          } else {
            sdLog('properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头');
            return true;
          }
        } else {
          sdLog('properties可以没有，但有的话必须是对象');
          return true;
        }
      } else {
        return true;
      }
    },
    propertiesMust: function(p) {
      strip_sa_properties(p);
      if (p === undefined || !isObject(p) || isEmptyObject(p)) {
        sdLog('properties必须是对象且有值');
        return true;
      } else {
        if (this.checkPropertiesKey(p)) {
          return true;
        } else {
          sdLog('properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头');
          return true;
        }
      }
    },
    event: function(s) {
      if (!isString(s) || !this['regChecks']['regName'].test(s)) {
        sdLog('请检查参数格式，eventName 必须是字符串，且需是合法的变量名，即不能以数字开头，且只包含：大小写字母、数字、下划线和 $,其中以 $ 开头的表明是系统的保留字段，自定义事件名请不要以 $ 开头');
        return true;
      } else {
        return true;
      }
    },
    item_type: 'str',
    item_id: 'str',
    distinct_id: function(id) {
      if (isString(id) && /^.{1,255}$/.test(id)) {
        return true;
      } else {
        sdLog('distinct_id必须是不能为空，且小于255位的字符串');
        return false;
      }
    }
  };

  function check(p) {
    var flag = true;
    for (var i in p) {
      if (Object.prototype.hasOwnProperty.call(p, i) && !checkOption.check(i, p[i])) {
        return false;
      }
    }
    return flag;
  }

  var saEvent = {};

  saEvent.check = check;

  saEvent.sendItem = function(p) {
    var data = {
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      time: new Date() * 1
    };

    extend(data, p);
    filterReservedProperties(data.properties);
    searchObjDate(data);
    searchObjString(data);
    if (data.properties && '$project' in data.properties) {
      data.project = String(data.properties.$project);
      delete data.properties.$project;
    }

    sd.sendState.getSendCall(data);
  };

  saEvent.send = function(p, callback) {
    var data = sd.kit.buildData(p);
    sd.kit.sendData(data, callback);
  };

  saEvent.debugPath = function(data) {
    var _data = data;
    var url = '';
    if (sd.para.debug_mode_url.indexOf('?') !== -1) {
      url = sd.para.debug_mode_url + '&data=' + encodeURIComponent(base64Encode(data));
    } else {
      url = sd.para.debug_mode_url + '?data=' + encodeURIComponent(base64Encode(data));
    }

    ajax({
      url: url,
      type: 'GET',
      cors: true,
      header: {
        'Dry-Run': String(sd.para.debug_mode_upload)
      },
      success: function(data) {
        isEmptyObject(data) === true ? alert('debug数据发送成功' + _data) : alert('debug失败 错误原因' + JSON.stringify(data));
      }
    });
  };


  var heatmap = {
    otherTags: [],
    getTargetElement: function(element, e) {
      var that = this;
      var target = element;
      if (typeof target !== 'object') {
        return null;
      }
      if (typeof target.tagName !== 'string') {
        return null;
      }
      var tagName = target.tagName.toLowerCase();
      if (tagName.toLowerCase() === 'body' || tagName.toLowerCase() === 'html') {
        return null;
      }
      if (!target || !target.parentNode || !target.parentNode.children) {
        return null;
      }

      var parent_ele = target.parentNode;
      var hasAOrAttr = that.hasElement({
        event: (e && e.originalEvent) || e,
        element: element
      }, function(target) {
        return target.tagName.toLowerCase() === 'a' || hasAttributes(target, sd.para.heatmap.track_attr);
      });

      var otherTags = that.otherTags;

      if (tagName === 'a' || tagName === 'button' || tagName === 'input' || tagName === 'textarea') {
        return target;
      } else if (indexOf(otherTags, tagName) > -1) {
        return target;
      } else if (parent_ele.tagName.toLowerCase() === 'button' || parent_ele.tagName.toLowerCase() === 'a') {
        return parent_ele;
      } else if (tagName === 'area' && parent_ele.tagName.toLowerCase() === 'map' && ry(parent_ele).prev().tagName && ry(parent_ele).prev().tagName.toLowerCase() === 'img') {
        return ry(parent_ele).prev();
      } else if (hasAOrAttr) {
        return hasAOrAttr;
      } else if (tagName === 'div' && sd.para.heatmap.collect_tags.div && that.isDivLevelValid(target)) {
        var max_level = (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level) || 1;
        if (max_level > 1 || that.isCollectableDiv(target)) {
          return target;
        } else {
          return null;
        }
      } else if (that.isStyleTag(tagName) && sd.para.heatmap.collect_tags.div) {
        var parentTrackDiv = that.getCollectableParent(target);
        if (parentTrackDiv && that.isDivLevelValid(parentTrackDiv)) {
          return parentTrackDiv;
        }
      }
      return null;
    },
    getDivLevels: function(element, rootElement) {
      var path = heatmap.getElementPath(element, true, rootElement);
      var pathArr = path.split(' > ');
      var ans = 0;
      each(pathArr, function(tag) {
        if (tag === 'div') {
          ans++;
        }
      });
      return ans;
    },
    isDivLevelValid: function(element) {
      var max_level = (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level) || 1;

      var allDiv = element.getElementsByTagName('div');
      for (var i = allDiv.length - 1; i >= 0; i--) {
        if (heatmap.getDivLevels(allDiv[i], element) > max_level) {
          return false;
        }
      }
      return true;
    },
    getElementPath: function(element, ignoreID, rootElement) {
      var names = [];
      while (element.parentNode) {
        if (element.id && !ignoreID && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(element.id)) {
          names.unshift(element.tagName.toLowerCase() + '#' + element.id);
          break;
        } else {
          if (rootElement && element === rootElement) {
            names.unshift(element.tagName.toLowerCase());
            break;
          } else if (element === document.body) {
            names.unshift('body');
            break;
          } else {
            names.unshift(element.tagName.toLowerCase());
          }
          element = element.parentNode;
        }
      }
      return names.join(' > ');
    },
    getClosestLi: function(element) {
      var getClosest = function(elem, selector) {
        for (; elem && elem !== document && elem.nodeType === 1; elem = elem.parentNode) {
          if (elem.tagName.toLowerCase() === selector) {
            return elem;
          }
        }
        return null;
      };
      return getClosest(element, 'li');
    },
    getElementPosition: function(element, elementPath, ignoreID) {
      var closestLi = sd.heatmap.getClosestLi(element);
      if (!closestLi) {
        return null;
      }
      var tag = element.tagName.toLowerCase();
      var sameTypeTags = closestLi.getElementsByTagName(tag);
      var sameTypeTagsLen = sameTypeTags.length;
      var arr = [];
      if (sameTypeTagsLen > 1) {
        for (var i = 0; i < sameTypeTagsLen; i++) {
          var elepath = sd.heatmap.getElementPath(sameTypeTags[i], ignoreID);
          if (elepath === elementPath) {
            arr.push(sameTypeTags[i]);
          }
        }
        if (arr.length > 1) {
          return indexOf(arr, element);
        }
      }

      function _getPosition(element) {
        var parentNode = element.parentNode;
        if (!parentNode) {
          return '';
        }
        var sameTypeSiblings = ry(element).getSameTypeSiblings();
        var typeLen = sameTypeSiblings.length;
        if (typeLen === 1) {
          return 0;
        }
        for (var i = 0, e = element; ry(e).previousElementSibling().ele; e = ry(e).previousElementSibling().ele, i++);
        return i;
      }
      return _getPosition(closestLi);
    },
    setNotice: function(web_url) {
      sd.is_heatmap_render_mode = true;

      if (!sd.para.heatmap) {
        sd.errorMsg = '您SDK没有配置开启点击图，可能没有数据！';
      }
      if (web_url && web_url[0] && web_url[1]) {
        if (web_url[1].slice(0, 5) === 'http:' && location.protocol === 'https:') {
          sd.errorMsg = '您的当前页面是https的地址，神策分析环境也必须是https！';
        }
      }
      if (!sd.para.heatmap_url) {
        sd.para.heatmap_url = location.protocol + '//static.sensorsdata.cn/sdk/' + sd.lib_version + '/heatmap.min.js';
      }
    },
    getDomIndex: function(el) {
      if (!el.parentNode) return -1;
      var i = 0;
      var nodeName = el.tagName;
      var list = el.parentNode.children;
      for (var n = 0; n < list.length; n++) {
        if (list[n].tagName === nodeName) {
          if (el === list[n]) {
            return i;
          } else {
            i++;
          }
        }
      }
      return -1;
    },
    selector: function(el, notuseid) {
      var i = el.parentNode && 9 == el.parentNode.nodeType ? -1 : this.getDomIndex(el);
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && (!sd.para.heatmap || (sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id')) && !notuseid) {
        return '#' + el.getAttribute('id');
      } else {
        return el.tagName.toLowerCase() + (~i ? ':nth-of-type(' + (i + 1) + ')' : '');
      }
    },
    getDomSelector: function(el, arr, notuseid) {
      if (!el || !el.parentNode || !el.parentNode.children) {
        return false;
      }
      arr = arr && arr.join ? arr : [];
      var name = el.nodeName.toLowerCase();
      if (!el || name === 'body' || 1 != el.nodeType) {
        arr.unshift('body');
        return arr.join(' > ');
      }
      arr.unshift(this.selector(el, notuseid));
      if (el.getAttribute && el.getAttribute('id') && /^[A-Za-z][-A-Za-z0-9_:.]*$/.test(el.getAttribute('id')) && sd.para.heatmap && sd.para.heatmap.element_selector !== 'not_use_id' && !notuseid) return arr.join(' > ');
      return this.getDomSelector(el.parentNode, arr, notuseid);
    },
    na: function() {
      var a = document.documentElement.scrollLeft || window.pageXOffset;
      return parseInt(isNaN(a) ? 0 : a, 10);
    },
    i: function() {
      var a = 0;
      try {
        (a = (o.documentElement && o.documentElement.scrollTop) || m.pageYOffset), (a = isNaN(a) ? 0 : a);
      } catch (b) {
        a = 0;
      }
      return parseInt(a, 10);
    },
    getBrowserWidth: function() {
      var a = window.innerWidth || document.body.clientWidth;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getBrowserHeight: function() {
      var a = window.innerHeight || document.body.clientHeight;
      return isNaN(a) ? 0 : parseInt(a, 10);
    },
    getScrollWidth: function() {
      var a = parseInt(document.body.scrollWidth, 10);
      return isNaN(a) ? 0 : a;
    },
    getEleDetail: function(target) {
      var selector = this.getDomSelector(target);
      var prop = getEleInfo({
        target: target
      });
      prop.$element_selector = selector ? selector : '';
      prop.$element_path = sd.heatmap.getElementPath(target, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      var element_position = sd.heatmap.getElementPosition(target, prop.$element_path, sd.para.heatmap && sd.para.heatmap.element_selector === 'not_use_id');
      if (isNumber(element_position)) {
        prop.$element_position = element_position;
      }
      return prop;
    },
    start: function(ev, target, tagName, customProps, callback) {
      var userCustomProps = isObject(customProps) ? customProps : {};
      var userCallback = isFunction(callback) ? callback : isFunction(customProps) ? customProps : undefined;
      if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(target)) {
        return false;
      }

      var prop = this.getEleDetail(target);

      if (sd.para.heatmap && sd.para.heatmap.custom_property) {
        var customP = sd.para.heatmap.custom_property(target);
        if (isObject(customP)) {
          prop = extend(prop, customP);
        }
      }
      prop = extend(prop, userCustomProps);
      if (tagName === 'a' && sd.para.heatmap && sd.para.heatmap.isTrackLink === true) {
        sd.trackLink({
          event: ev,
          target: target
        }, '$WebClick', prop);
      } else {
        sd.track('$WebClick', prop, userCallback);
      }
    },
    hasElement: function(obj, func) {
      var path;
      if (obj.event) {
        var e = obj.event;
        path = e.path || (e._getPath && e._getPath());
      } else if (obj.element) {
        path = ry(obj.element).getParents();
      }

      if (path) {
        if (isArray(path) && path.length > 0) {
          for (var i = 0; i < path.length; i++) {
            if (typeof path[i] === 'object' && path[i].nodeType === 1 && func(path[i])) {
              return path[i];
            }
          }
        }
      }
    },
    isStyleTag: function(tagname, isVisualMode) {
      var defaultTag = ['a', 'div', 'input', 'button', 'textarea'];
      var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
      if (indexOf(defaultTag, tagname) > -1) {
        return false;
      }
      if (isVisualMode && (!sd.para.heatmap || !sd.para.heatmap.collect_tags || !sd.para.heatmap.collect_tags.div)) {
        return indexOf(ignore_tags_default, tagname) > -1;
      } else if (isObject(sd.para.heatmap) && isObject(sd.para.heatmap.collect_tags) && isObject(sd.para.heatmap.collect_tags.div) && isArray(sd.para.heatmap.collect_tags.div.ignore_tags) && indexOf(sd.para.heatmap.collect_tags.div.ignore_tags, tagname) > -1) {
        return true;
      }
      return false;
    },
    isCollectableDiv: function(target, isVisualMode) {
      try {
        if (target.children.length === 0) {
          return true;
        } else {
          for (var i = 0; i < target.children.length; i++) {
            if (target.children[i].nodeType !== 1) {
              continue;
            }
            var tag = target.children[i].tagName.toLowerCase();
            var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
            if ((tag === 'div' && max_level > 1) || this.isStyleTag(tag, isVisualMode)) {
              if (!this.isCollectableDiv(target.children[i], isVisualMode)) {
                return false;
              }
            } else {
              return false;
            }
          }
          return true;
        }
      } catch (error) {
        sd.log(error);
      }
      return false;
    },
    getCollectableParent: function(target, isVisualMode) {
      try {
        var parent = target.parentNode;
        var parentName = parent ? parent.tagName.toLowerCase() : '';
        if (parentName === 'body') {
          return false;
        }
        var max_level = sd.para && sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div && sd.para.heatmap.collect_tags.div.max_level;
        if (parentName && parentName === 'div' && (max_level > 1 || this.isCollectableDiv(parent, isVisualMode))) {
          return parent;
        } else if (parent && this.isStyleTag(parentName, isVisualMode)) {
          return this.getCollectableParent(parent, isVisualMode);
        }
      } catch (error) {
        sd.log(error);
      }
      return false;
    },
    initScrollmap: function() {
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.scroll_notice_map !== 'default') {
        return false;
      }

      var checkPage = function() {
        if (sd.para.scrollmap && isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url()) {
          return false;
        }
        return true;
      };

      var interDelay = function(param) {
        var interDelay = {};
        interDelay.timeout = param.timeout || 1000;
        interDelay.func = param.func;
        interDelay.hasInit = false;
        interDelay.inter = null;
        interDelay.main = function(para, isClose) {
          this.func(para, isClose);
          this.inter = null;
        };
        interDelay.go = function(isNoDelay) {
          var para = {};
          if (!this.inter) {
            para.$viewport_position = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
            para.$viewport_position = Math.round(para.$viewport_position) || 0;
            para.$viewport_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            para.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
            if (isNoDelay) {
              interDelay.main(para, true);
            } else {
              this.inter = setTimeout(function() {
                interDelay.main(para);
              }, this.timeout);
            }
          }
        };
        return interDelay;
      };

      var delayTime = interDelay({
        timeout: 1000,
        func: function(para, isClose) {
          var offsetTop = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || document.body.scrollTop || 0;
          var current_time = new Date();
          var delay_time = current_time - this.current_time;
          if ((delay_time > sd.para.heatmap.scroll_delay_time && offsetTop - para.$viewport_position !== 0) || isClose) {
            para.$url = getURL();
            para.$title = document.title;
            para.$url_path = location.pathname;
            para.event_duration = Math.min(sd.para.heatmap.scroll_event_duration, parseInt(delay_time) / 1000);
            para.event_duration = para.event_duration < 0 ? 0 : para.event_duration;
            sd.track('$WebStay', para);
          }
          this.current_time = current_time;
        }
      });

      delayTime.current_time = new Date();

      addEvent(window, 'scroll', function() {
        if (!checkPage()) {
          return false;
        }
        delayTime.go();
      });

      addEvent(window, 'unload', function() {
        if (!checkPage()) {
          return false;
        }
        delayTime.go('notime');
      });
    },
    initHeatmap: function() {
      var that = this;
      if (!isObject(sd.para.heatmap) || sd.para.heatmap.clickmap !== 'default') {
        return false;
      }

      if (isFunction(sd.para.heatmap.collect_url) && !sd.para.heatmap.collect_url()) {
        return false;
      }

      if (sd.para.heatmap.collect_elements === 'all') {
        sd.para.heatmap.collect_elements = 'all';
      } else {
        sd.para.heatmap.collect_elements = 'interact';
      }
      if (sd.para.heatmap.collect_elements === 'all') {
        addEvent(document, 'click', function(e) {
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          if (typeof target !== 'object') {
            return false;
          }
          if (typeof target.tagName !== 'string') {
            return false;
          }
          var tagName = target.tagName.toLowerCase();
          if (tagName === 'body' || tagName === 'html') {
            return false;
          }
          if (!target || !target.parentNode || !target.parentNode.children) {
            return false;
          }
          var parent_ele = target.parentNode.tagName.toLowerCase();
          if (parent_ele === 'a' || parent_ele === 'button') {
            that.start(ev, target.parentNode, parent_ele);
          } else {
            that.start(ev, target, tagName);
          }
        });
      } else {
        addEvent(document, 'click', function(e) {
          var ev = e || window.event;
          if (!ev) {
            return false;
          }
          var target = ev.target || ev.srcElement;
          var theTarget = sd.heatmap.getTargetElement(target, e);
          if (theTarget) {
            that.start(ev, theTarget, theTarget.tagName.toLowerCase());
          } else if (isElement(target) && target.tagName.toLowerCase() === 'div' && isObject(sd.para.heatmap) && sd.para.heatmap.get_vtrack_config && sd.unlimitedDiv.events.length > 0) {
            if (sd.unlimitedDiv.isTargetEle(target)) {
              that.start(ev, target, target.tagName.toLowerCase(), {
                $lib_method: 'vtrack'
              });
            }
          }
        });
      }
    }
  };

  var commonWays = {
    setOnlineState: function(state) {
      if (state === true && isObject(sd.para.jsapp) && typeof sd.para.jsapp.getData === 'function') {
        sd.para.jsapp.isOnline = true;
        var arr = sd.para.jsapp.getData();
        if (isArray(arr) && arr.length > 0) {
          each(arr, function(str) {
            if (isJSONString(str)) {
              sd.sendState.realtimeSend(JSON.parse(str));
            }
          });
        }
      } else {
        sd.para.jsapp.isOnline = false;
      }
    },
    autoTrackIsUsed: false,
    isReady: function(callback) {
      callback();
    },
    getUtm: function() {
      return pageInfo.campaignParams();
    },
    getStayTime: function() {
      return (new Date() - sd._t) / 1000;
    },
    setProfileLocal: function(obj) {
      if (!_localstorage.isSupport()) {
        sd.setProfile(obj);
        return false;
      }
      if (!isObject(obj) || isEmptyObject(obj)) {
        return false;
      }
      var saveData = _localstorage.parse('sensorsdata_2015_jssdk_profile');
      var isNeedSend = false;
      if (isObject(saveData) && !isEmptyObject(saveData)) {
        for (var i in obj) {
          if ((i in saveData && saveData[i] !== obj[i]) || !(i in saveData)) {
            saveData[i] = obj[i];
            isNeedSend = true;
          }
        }
        if (isNeedSend) {
          _localstorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(saveData));
          sd.setProfile(obj);
        }
      } else {
        _localstorage.set('sensorsdata_2015_jssdk_profile', JSON.stringify(obj));
        sd.setProfile(obj);
      }
    },
    setInitReferrer: function() {
      var _referrer = getReferrer();
      sd.setOnceProfile({
        _init_referrer: _referrer,
        _init_referrer_host: pageInfo.pageProp.referrer_host
      });
    },
    setSessionReferrer: function() {
      var _referrer = getReferrer();
      sd.store.setSessionPropsOnce({
        _session_referrer: _referrer,
        _session_referrer_host: pageInfo.pageProp.referrer_host
      });
    },
    setDefaultAttr: function() {
      pageInfo.register({
        _current_url: location.href,
        _referrer: getReferrer(),
        _referring_host: pageInfo.pageProp.referrer_host
      });
    },
    trackHeatMap: function(target, props, callback) {
      if (typeof target === 'object' && target.tagName) {
        var tagName = target.tagName.toLowerCase();
        var parent_ele = target.parentNode.tagName.toLowerCase();
        var trackAttrs = sd.para.heatmap && sd.para.heatmap.track_attr ? sd.para.heatmap.track_attr : ['data-sensors-click'];
        if (tagName !== 'button' && tagName !== 'a' && parent_ele !== 'a' && parent_ele !== 'button' && tagName !== 'input' && tagName !== 'textarea' && !hasAttributes(target, trackAttrs)) {
          heatmap.start(null, target, tagName, props, callback);
        }
      }
    },
    trackAllHeatMap: function(target, props, callback) {
      if (typeof target === 'object' && target.tagName) {
        var tagName = target.tagName.toLowerCase();
        heatmap.start(null, target, tagName, props, callback);
      }
    },
    autoTrackSinglePage: function(para, callback) {
      var url;
      if (this.autoTrackIsUsed) {
        url = pageInfo.pageProp.url;
      } else {
        url = pageInfo.pageProp.referrer;
      }
      para = isObject(para) ? para : {};

      function getUtm() {
        var utms = pageInfo.campaignParams();
        var $utms = {};
        each(utms, function(v, i, utms) {
          if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
            $utms['$' + i] = utms[i];
          } else {
            $utms[i] = utms[i];
          }
        });
        return $utms;
      }

      var is_set_profile = !para.not_set_profile;
      if (para.not_set_profile) {
        delete para.not_set_profile;
      }

      function closure(p, c) {
        sd.track(
          '$pageview',
          extend({
              $referrer: url,
              $url: getURL(),
              $url_path: location.pathname,
              $title: document.title
            },
            p,
            getUtm()
          ),
          c
        );
        url = getURL();
      }
      closure(para, callback);
      this.autoTrackSinglePage = closure;

      if (sd.is_first_visitor && is_set_profile) {
        var eqidObj = {};

        if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
          eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
          eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          eqidObj['$search_keyword_id_hash'] = hashCode(eqidObj['$search_keyword_id']);
        }

        sd.setOnceProfile(
          extend({
              $first_visit_time: new Date(),
              $first_referrer: getReferrer(),
              $first_browser_language: navigator.language || '取值异常',
              $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
              $first_traffic_source_type: getSourceFromReferrer(),
              $first_search_keyword: getKeywordFromReferrer()
            },
            getUtm(),
            eqidObj
          )
        );

        sd.is_first_visitor = false;
      }
    },
    autoTrackWithoutProfile: function(para, callback) {
      para = isObject(para) ? para : {};
      this.autoTrack(extend(para, {
        not_set_profile: true
      }), callback);
    },
    autoTrack: function(para, callback) {
      para = isObject(para) ? para : {};

      var utms = pageInfo.campaignParams();
      var $utms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });

      var is_set_profile = !para.not_set_profile;
      if (para.not_set_profile) {
        delete para.not_set_profile;
      }

      var current_page_url = location.href;

      if (sd.para.is_single_page) {
        addHashEvent(function() {
          var referrer = getReferrer(current_page_url);
          sd.track(
            '$pageview',
            extend({
                $referrer: referrer,
                $url: getURL(),
                $url_path: location.pathname,
                $title: document.title
              },
              $utms,
              para
            ),
            callback
          );
          current_page_url = getURL();
        });
      }
      sd.track(
        '$pageview',
        extend({
            $referrer: getReferrer(),
            $url: getURL(),
            $url_path: location.pathname,
            $title: document.title
          },
          $utms,
          para
        ),
        callback
      );

      if (sd.is_first_visitor && is_set_profile) {
        var eqidObj = {};

        if (sd.para.preset_properties.search_keyword_baidu && isReferralTraffic(document.referrer) && isBaiduTraffic()) {
          eqidObj['$search_keyword_id'] = getBaiduKeyword.id();
          eqidObj['$search_keyword_id_type'] = getBaiduKeyword.type();
          eqidObj['$search_keyword_id_hash'] = hashCode(eqidObj['$search_keyword_id']);
        }

        sd.setOnceProfile(
          extend({
              $first_visit_time: new Date(),
              $first_referrer: getReferrer(),
              $first_browser_language: navigator.language || '取值异常',
              $first_browser_charset: typeof document.charset === 'string' ? document.charset.toUpperCase() : '取值异常',
              $first_traffic_source_type: getSourceFromReferrer(),
              $first_search_keyword: getKeywordFromReferrer()
            },
            $utms,
            eqidObj
          )
        );

        sd.is_first_visitor = false;
      }

      this.autoTrackIsUsed = true;
    },
    getAnonymousID: function() {
      if (isEmptyObject(sd.store._state)) {
        return '请先初始化SDK';
      } else {
        return sd.store._state._first_id || sd.store._state.first_id || sd.store._state._distinct_id || sd.store._state.distinct_id;
      }
    },
    setPlugin: function(para) {
      if (!isObject(para)) {
        return false;
      }
      each(para, function(v, k) {
        if (isFunction(v)) {
          if (isObject(window.SensorsDataWebJSSDKPlugin) && window.SensorsDataWebJSSDKPlugin[k]) {
            v(window.SensorsDataWebJSSDKPlugin[k]);
          } else {
            sd.log(k + '没有获取到,请查阅文档，调整' + k + '的引入顺序！');
          }
        }
      });
    },
    useModulePlugin: function() {
      sd.use.apply(sd, arguments);
    },
    useAppPlugin: function() {
      this.setPlugin.apply(this, arguments);
    }
  };


  sd.para_default = defaultPara;

  sd.addReferrerHost = function(data) {
    var defaultHost = '取值异常';
    if (isObject(data.properties)) {
      if (data.properties.$first_referrer) {
        data.properties.$first_referrer_host = getHostname(data.properties.$first_referrer, defaultHost);
      }
      if (data.type === 'track' || data.type === 'track_signup') {
        if ('$referrer' in data.properties) {
          data.properties.$referrer_host = data.properties.$referrer === '' ? '' : getHostname(data.properties.$referrer, defaultHost);
        }
        if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
          data.properties.$latest_referrer_host = data.properties.$latest_referrer === '' ? '' : getHostname(data.properties.$latest_referrer, defaultHost);
        }
      }
    }
  };

  sd.addPropsHook = function(data) {
    if (sd.para.preset_properties && sd.para.preset_properties.url && (data.type === 'track' || data.type === 'track_signup') && typeof data.properties.$url === 'undefined') {
      data.properties.$url = getURL();
    }
    if (sd.para.preset_properties && sd.para.preset_properties.title && (data.type === 'track' || data.type === 'track_signup') && typeof data.properties.$title === 'undefined') {
      data.properties.$title = document.title;
    }
  };

  sd.initPara = function(para) {
    extend(sdPara, para || sd.para || {});

    sd.para = sdPara;

    var latestObj = {};
    if (isObject(sd.para.is_track_latest)) {
      for (var latestProp in sd.para.is_track_latest) {
        latestObj['latest_' + latestProp] = sd.para.is_track_latest[latestProp];
      }
    }
    sd.para.preset_properties = extend({}, sd.para_default.preset_properties, latestObj, sd.para.preset_properties || {});

    var i;
    for (i in sd.para_default) {
      if (sd.para[i] === void 0) {
        sd.para[i] = sd.para_default[i];
      }
    }
    if (typeof sd.para.server_url === 'string') {
      sd.para.server_url = trim(sd.para.server_url);
      if (sd.para.server_url) {
        if (sd.para.server_url.slice(0, 3) === '://') {
          sd.para.server_url = location.protocol.slice(0, -1) + sd.para.server_url;
        } else if (sd.para.server_url.slice(0, 2) === '//') {
          sd.para.server_url = location.protocol + sd.para.server_url;
        } else if (sd.para.server_url.slice(0, 4) !== 'http') {
          sd.para.server_url = '';
        }
      }
    }

    if (typeof sd.para.web_url === 'string' && (sd.para.web_url.slice(0, 3) === '://' || sd.para.web_url.slice(0, 2) === '//')) {
      if (sd.para.web_url.slice(0, 3) === '://') {
        sd.para.web_url = location.protocol.slice(0, -1) + sd.para.web_url;
      } else {
        sd.para.web_url = location.protocol + sd.para.web_url;
      }
    }

    if (sd.para.send_type !== 'image' && sd.para.send_type !== 'ajax' && sd.para.send_type !== 'beacon') {
      sd.para.send_type = 'image';
    }

    sd.debug.protocol.serverUrl();

    sd.bridge.initPara();
    sd.bridge.initState();

    var batch_send_default = {
      datasend_timeout: 6000,
      send_interval: 6000
    };

    if (_localstorage.isSupport() && isSupportCors() && typeof localStorage === 'object') {
      if (sd.para.batch_send === true) {
        sd.para.batch_send = extend({}, batch_send_default);
      } else if (typeof sd.para.batch_send === 'object') {
        sd.para.batch_send = extend({}, batch_send_default, sd.para.batch_send);
      }
    } else {
      sd.para.batch_send = false;
    }

    var utm_type = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var search_type = ['www.baidu.', 'm.baidu.', 'm.sm.cn', 'so.com', 'sogou.com', 'youdao.com', 'google.', 'yahoo.com/', 'bing.com/', 'ask.com/'];
    var social_type = ['weibo.com', 'renren.com', 'kaixin001.com', 'douban.com', 'qzone.qq.com', 'zhihu.com', 'tieba.baidu.com', 'weixin.qq.com'];
    var search_keyword = {
      baidu: ['wd', 'word', 'kw', 'keyword'],
      google: 'q',
      bing: 'q',
      yahoo: 'p',
      sogou: ['query', 'keyword'],
      so: 'q',
      sm: 'q'
    };

    if (typeof sd.para.source_type === 'object') {
      sd.para.source_type.utm = isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(utm_type) : utm_type;
      sd.para.source_type.search = isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(search_type) : search_type;
      sd.para.source_type.social = isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(social_type) : social_type;
      sd.para.source_type.keyword = isObject(sd.para.source_type.keyword) ? extend(search_keyword, sd.para.source_type.keyword) : search_keyword;
    }
    var collect_tags_default = {
      div: false
    };
    var ignore_tags_default = ['mark', '/mark', 'strong', 'b', 'em', 'i', 'u', 'abbr', 'ins', 'del', 's', 'sup'];
    if (sd.para.heatmap && !isObject(sd.para.heatmap)) {
      sd.para.heatmap = {};
    }
    if (isObject(sd.para.heatmap)) {
      sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || 'default';
      sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || 'default';
      sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4000;
      sd.para.heatmap.scroll_event_duration = sd.para.heatmap.scroll_event_duration || 18000;
      sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1000;
      sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1000;

      if (sd.para.heatmap.get_vtrack_config !== true) {
        sd.para.heatmap.get_vtrack_config = false;
      }

      var trackAttrs = isArray(sd.para.heatmap.track_attr) ?
        filter(sd.para.heatmap.track_attr, function(v) {
          return v && typeof v === 'string';
        }) :
        [];
      trackAttrs.push('data-sensors-click');
      sd.para.heatmap.track_attr = trackAttrs;

      if (isObject(sd.para.heatmap.collect_tags)) {
        if (sd.para.heatmap.collect_tags.div === true) {
          sd.para.heatmap.collect_tags.div = {
            ignore_tags: ignore_tags_default,
            max_level: 1
          };
        } else if (isObject(sd.para.heatmap.collect_tags.div)) {
          if (sd.para.heatmap.collect_tags.div.ignore_tags) {
            if (!isArray(sd.para.heatmap.collect_tags.div.ignore_tags)) {
              sd.log('ignore_tags 参数必须是数组格式');
              sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
            }
          } else {
            sd.para.heatmap.collect_tags.div.ignore_tags = ignore_tags_default;
          }
          if (sd.para.heatmap.collect_tags.div.max_level) {
            var supportedDivLevel = [1, 2, 3];
            if (indexOf(supportedDivLevel, sd.para.heatmap.collect_tags.div.max_level) === -1) {
              sd.para.heatmap.collect_tags.div.max_level = 1;
            }
          }
        } else {
          sd.para.heatmap.collect_tags.div = false;
        }
      } else {
        sd.para.heatmap.collect_tags = collect_tags_default;
      }
    }
    if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (i = 0; i < sd.para.server_url.length; i++) {
        if (!/sa\.gif[^\/]*$/.test(sd.para.server_url[i])) {
          sd.para.server_url[i] = sd.para.server_url[i].replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
        }
      }
    } else if (!/sa\.gif[^\/]*$/.test(sd.para.server_url) && typeof sd.para.server_url === 'string') {
      sd.para.server_url = sd.para.server_url.replace(/\/sa$/, '/sa.gif').replace(/(\/sa)(\?[^\/]+)$/, '/sa.gif$2');
    }
    if (typeof sd.para.server_url === 'string') {
      sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace('sa.gif', 'debug');
    }
    if (sd.para.noCache === true) {
      sd.para.noCache = '?' + new Date().getTime();
    } else {
      sd.para.noCache = '';
    }

    if (sd.para.callback_timeout > sd.para.datasend_timeout) {
      sd.para.datasend_timeout = sd.para.callback_timeout;
    }

    if (sd.para.heatmap && sd.para.heatmap.collect_tags && isObject(sd.para.heatmap.collect_tags)) {
      each(sd.para.heatmap.collect_tags, function(val, key) {
        if (key !== 'div' && val) {
          sd.heatmap.otherTags.push(key);
        }
      });
    }
  };

  sd.readyState = {
    state: 0,
    historyState: [],
    stateType: {
      1: '1-init未开始',
      2: '2-init开始',
      3: '3-store完成'
    },
    getState: function() {
      return this.historyState.join('\n');
    },
    setState: function(n) {
      if (String(n) in this.stateType) {
        this.state = n;
      }
      this.historyState.push(this.stateType[n]);
    }
  };

  sd.setPreConfig = function(sa) {
    sd.para = sa.para;
    sd._q = sa._q;
  };

  sd.setInitVar = function() {
    sd._t = sd._t || 1 * new Date();
    sd.lib_version = sdkversion_placeholder;
    sd.is_first_visitor = false;
    sd.source_channel_standard = source_channel_standard;
  };

  sd.log = sdLog;

  sd.enableLocalLog = function() {
    if (_sessionStorage.isSupport()) {
      try {
        sessionStorage.setItem('sensorsdata_jssdk_debug', 'true');
      } catch (e) {
        sd.log('enableLocalLog error: ' + e.message);
      }
    }
  };

  sd.disableLocalLog = function() {
    if (_sessionStorage.isSupport()) {
      sessionStorage.removeItem('sensorsdata_jssdk_debug');
    }
  };

  sd.debug = debug;

  sd.quick = function() {
    var arg = Array.prototype.slice.call(arguments);
    var arg0 = arg[0];
    var arg1 = arg.slice(1);
    if (typeof arg0 === 'string' && commonWays[arg0]) {
      return commonWays[arg0].apply(commonWays, arg1);
    } else if (typeof arg0 === 'function') {
      arg0.apply(sd, arg1);
    } else {
      sd.log('quick方法中没有这个功能' + arg[0]);
    }
  };


  sd.use = function(name, option) {
    if (!isString(name)) {
      sd.log('use插件名称必须是字符串！');
      return false;
    }

    if (isObject(window.SensorsDataWebJSSDKPlugin) && isObject(window.SensorsDataWebJSSDKPlugin[name]) && isFunction(window.SensorsDataWebJSSDKPlugin[name].init)) {
      window.SensorsDataWebJSSDKPlugin[name].init(sd, option);
      return window.SensorsDataWebJSSDKPlugin[name];
    } else if (isObject(sd.modules) && isObject(sd.modules[name]) && isFunction(sd.modules[name].init)) {
      sd.modules[name].init(sd, option);
      return sd.modules[name];
    } else {
      sd.log(name + '没有获取到,请查阅文档，调整' + name + '的引入顺序！');
    }
  };

  sd.track = function(e, p, c) {
    if (saEvent.check({
        event: e,
        properties: p
      })) {
      saEvent.send({
          type: 'track',
          event: e,
          properties: p
        },
        c
      );
    }
  };

  sd.trackLink = function(link, event_name, event_prop) {
    function _trackLink(obj, event_name, event_prop) {
      obj = obj || {};
      var link = null;
      if (obj.ele) {
        link = obj.ele;
      }
      if (obj.event) {
        if (obj.target) {
          link = obj.target;
        } else {
          link = obj.event.target;
        }
      }

      event_prop = event_prop || {};
      if (!link || typeof link !== 'object') {
        return false;
      }
      if (!link.href || /^javascript/.test(link.href) || link.target || link.download || link.onclick) {
        sd.track(event_name, event_prop);
        return false;
      }

      function linkFunc(e) {
        e.stopPropagation();
        e.preventDefault();
        var hasCalled = false;

        function track_a_click() {
          if (!hasCalled) {
            hasCalled = true;
            location.href = link.href;
          }
        }
        setTimeout(track_a_click, 1000);
        sd.track(event_name, event_prop, track_a_click);
      }
      if (obj.event) {
        linkFunc(obj.event);
      }
      if (obj.ele) {
        addEvent(obj.ele, 'click', function(e) {
          linkFunc(e);
        });
      }
    }

    if (typeof link === 'object' && link.tagName) {
      _trackLink({
        ele: link
      }, event_name, event_prop);
    } else if (typeof link === 'object' && link.target && link.event) {
      _trackLink(link, event_name, event_prop);
    }
  };

  sd.trackLinks = function(link, event_name, event_prop) {
    event_prop = event_prop || {};
    if (!link || typeof link !== 'object') {
      return false;
    }
    if (!link.href || /^javascript/.test(link.href) || link.target) {
      return false;
    }
    addEvent(link, 'click', function(e) {
      e.preventDefault();
      var hasCalled = false;
      setTimeout(track_a_click, 1000);

      function track_a_click() {
        if (!hasCalled) {
          hasCalled = true;
          location.href = link.href;
        }
      }
      sd.track(event_name, event_prop, track_a_click);
    });
  };

  sd.setItem = function(type, id, p) {
    if (saEvent.check({
        item_type: type,
        item_id: id,
        properties: p
      })) {
      saEvent.sendItem({
        type: 'item_set',
        item_type: type,
        item_id: id,
        properties: p || {}
      });
    }
  };

  sd.deleteItem = function(type, id) {
    if (saEvent.check({
        item_type: type,
        item_id: id
      })) {
      saEvent.sendItem({
        type: 'item_delete',
        item_type: type,
        item_id: id
      });
    }
  };

  sd.setProfile = function(p, c) {
    if (saEvent.check({
        propertiesMust: p
      })) {
      saEvent.send({
          type: 'profile_set',
          properties: p
        },
        c
      );
    }
  };

  sd.setOnceProfile = function(p, c) {
    if (saEvent.check({
        propertiesMust: p
      })) {
      saEvent.send({
          type: 'profile_set_once',
          properties: p
        },
        c
      );
    }
  };

  sd.appendProfile = function(p, c) {
    if (saEvent.check({
        propertiesMust: p
      })) {
      each(p, function(value, key) {
        if (isString(value)) {
          p[key] = [value];
        } else if (isArray(value)) {
          p[key] = value;
        } else {
          delete p[key];
          sd.log('appendProfile属性的值必须是字符串或者数组');
        }
      });
      if (!isEmptyObject(p)) {
        saEvent.send({
            type: 'profile_append',
            properties: p
          },
          c
        );
      }
    }
  };
  sd.incrementProfile = function(p, c) {
    var str = p;
    if (isString(p)) {
      p = {};
      p[str] = 1;
    }

    function isChecked(p) {
      for (var i in p) {
        if (Object.prototype.hasOwnProperty.call(p, i) && !/-*\d+/.test(String(p[i]))) {
          return false;
        }
      }
      return true;
    }

    if (saEvent.check({
        propertiesMust: p
      })) {
      if (isChecked(p)) {
        saEvent.send({
            type: 'profile_increment',
            properties: p
          },
          c
        );
      } else {
        sd.log('profile_increment的值只能是数字');
      }
    }
  };

  sd.deleteProfile = function(c) {
    saEvent.send({
        type: 'profile_delete'
      },
      c
    );
    store.set('distinct_id', UUID());
    store.set('first_id', '');
  };
  sd.unsetProfile = function(p, c) {
    var str = p;
    var temp = {};
    if (isString(p)) {
      p = [];
      p.push(str);
    }
    if (isArray(p)) {
      each(p, function(v) {
        if (isString(v)) {
          temp[v] = true;
        } else {
          sd.log('profile_unset给的数组里面的值必须时string,已经过滤掉', v);
        }
      });
      saEvent.send({
          type: 'profile_unset',
          properties: temp
        },
        c
      );
    } else {
      sd.log('profile_unset的参数是数组');
    }
  };
  sd.identify = function(id, isSave) {
    if (typeof id === 'number') {
      id = String(id);
    }
    var firstId = store.getFirstId();
    if (typeof id === 'undefined') {
      var uuid = UUID();
      if (firstId) {
        store.set('first_id', uuid);
      } else {
        store.set('distinct_id', uuid);
      }
    } else if (saEvent.check({
        distinct_id: id
      })) {
      if (isSave === true) {
        if (firstId) {
          store.set('first_id', id);
        } else {
          store.set('distinct_id', id);
        }
      } else {
        if (firstId) {
          store.change('first_id', id);
        } else {
          store.change('distinct_id', id);
        }
      }
    } else {
      sd.log('identify的参数必须是字符串');
    }
  };
  sd.trackSignup = function(id, e, p, c) {
    if (saEvent.check({
        distinct_id: id,
        event: e,
        properties: p
      })) {
      var original_id = store.getFirstId() || store.getDistinctId();
      store.set('distinct_id', id);
      saEvent.send({
          original_id: original_id,
          distinct_id: id,
          type: 'track_signup',
          event: e,
          properties: p
        },
        c
      );
    }
  };


  sd.registerPage = function(obj) {
    if (saEvent.check({
        properties: obj
      })) {
      extend(pageInfo.currentProps, obj);
    } else {
      sd.log('register输入的参数有误');
    }
  };

  sd.clearAllRegister = function(arr) {
    store.clearAllProps(arr);
  };

  sd.clearPageRegister = function(arr) {
    var i;
    if (isArray(arr) && arr.length > 0) {
      for (i = 0; i < arr.length; i++) {
        if (isString(arr[i]) && arr[i] in pageInfo.currentProps) {
          delete pageInfo.currentProps[arr[i]];
        }
      }
    } else if (arr === true) {
      for (i in pageInfo.currentProps) {
        delete pageInfo.currentProps[i];
      }
    }
  };

  sd.register = function(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setProps(props);
    } else {
      sd.log('register输入的参数有误');
    }
  };

  sd.registerOnce = function(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setPropsOnce(props);
    } else {
      sd.log('registerOnce输入的参数有误');
    }
  };

  sd.registerSession = function(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setSessionProps(props);
    } else {
      sd.log('registerSession输入的参数有误');
    }
  };

  sd.registerSessionOnce = function(props) {
    if (saEvent.check({
        properties: props
      })) {
      store.setSessionPropsOnce(props);
    } else {
      sd.log('registerSessionOnce输入的参数有误');
    }
  };

  sd.login = function(id, callback) {
    if (typeof id === 'number') {
      id = String(id);
    }
    if (saEvent.check({
        distinct_id: id
      })) {
      var firstId = store.getFirstId();
      var distinctId = store.getDistinctId();
      if (id !== distinctId) {
        if (!firstId) {
          store.set('first_id', distinctId);
        }
        sd.trackSignup(id, '$SignUp', {}, callback);
      } else {
        callback && callback();
      }
    } else {
      sd.log('login的参数必须是字符串');
      callback && callback();
    }
  };

  sd.logout = function(isChangeId) {
    var firstId = store.getFirstId();
    if (firstId) {
      store.set('first_id', '');
      if (isChangeId === true) {
        var uuid = UUID();
        store.set('distinct_id', uuid);
      } else {
        store.set('distinct_id', firstId);
      }
    } else {
      sd.log('没有first_id，logout失败');
    }
  };

  sd.getPresetProperties = function() {
    function getUtm() {
      var utms = pageInfo.campaignParams();
      var $utms = {};
      each(utms, function(v, i, utms) {
        if ((' ' + sd.source_channel_standard + ' ').indexOf(' ' + i + ' ') !== -1) {
          $utms['$' + i] = utms[i];
        } else {
          $utms[i] = utms[i];
        }
      });
      return $utms;
    }

    var obj = {
      $is_first_day: cookie.getNewUser(),
      $referrer: pageInfo.pageProp.referrer || '',
      $referrer_host: pageInfo.pageProp.referrer ? getHostname(pageInfo.pageProp.referrer) : '',
      $url: getURL(),
      $url_path: location.pathname,
      $title: document.title || '',
      _distinct_id: store.getDistinctId()
    };
    var result = extend({}, pageInfo.properties(), sd.store.getProps(), getUtm(), obj);
    if (sd.para.preset_properties.latest_referrer && sd.para.preset_properties.latest_referrer_host) {
      result.$latest_referrer_host = result.$latest_referrer === '' ? '' : getHostname(result.$latest_referrer);
    }
    return result;
  };
  sd.iOSWebClickPolyfill = function() {
    var iOS_other_tags_css = '';
    var default_cursor_css = ' { cursor: pointer; -webkit-tap-highlight-color: rgba(0,0,0,0); }';
    if (sd.heatmap && isArray(sd.heatmap.otherTags)) {
      each(sd.heatmap.otherTags, function(val) {
        iOS_other_tags_css += val + default_cursor_css;
      });
    }
    if (sd._.isIOS() && sd._.getIOSVersion() && sd._.getIOSVersion() < 13) {
      if (sd.para.heatmap && sd.para.heatmap.collect_tags && sd.para.heatmap.collect_tags.div) {
        sd._.setCssStyle('div, [data-sensors-click]' + default_cursor_css);
      }
      if (sd.para.heatmap && sd.para.heatmap.track_attr) {
        sd._.setCssStyle('[' + sd.para.heatmap.track_attr.join('], [') + ']' + default_cursor_css);
      }
      if (iOS_other_tags_css !== '') {
        sd._.setCssStyle(iOS_other_tags_css);
      }
    }
  };

  var kit = {};

  kit.buildData = function(p) {
    var data = {
      distinct_id: sd.store.getDistinctId(),
      lib: {
        $lib: 'js',
        $lib_method: 'code',
        $lib_version: String(sd.lib_version)
      },
      properties: {}
    };

    if (isObject(p) && isObject(p.properties) && !isEmptyObject(p.properties)) {
      if (p.properties.$lib_detail) {
        data.lib.$lib_detail = p.properties.$lib_detail;
        delete p.properties.$lib_detail;
      }
      if (p.properties.$lib_method) {
        data.lib.$lib_method = p.properties.$lib_method;
        delete p.properties.$lib_method;
      }
    }

    extend(data, sd.store.getUnionId(), p);

    if (isObject(p.properties) && !isEmptyObject(p.properties)) {
      extend(data.properties, p.properties);
    }


    if (!p.type || p.type.slice(0, 7) !== 'profile') {

      data.properties = extend({}, pageInfo.properties(), store.getProps(), store.getSessionProps(), pageInfo.currentProps, data.properties);
      if (sd.para.preset_properties.latest_referrer && !isString(data.properties.$latest_referrer)) {
        data.properties.$latest_referrer = '取值异常';
      }
      if (sd.para.preset_properties.latest_search_keyword && !isString(data.properties.$latest_search_keyword)) {
        if (!sd.para.preset_properties.search_keyword_baidu || !isString(data.properties.$search_keyword_id) || !isNumber(data.properties.$search_keyword_id_hash) || !isString(data.properties.$search_keyword_id_type)) {
          data.properties.$latest_search_keyword = '取值异常';
        }
      }
      if (sd.para.preset_properties.latest_traffic_source_type && !isString(data.properties.$latest_traffic_source_type)) {
        data.properties.$latest_traffic_source_type = '取值异常';
      }
      if (sd.para.preset_properties.latest_landing_page && !isString(data.properties.$latest_landing_page)) {
        data.properties.$latest_landing_page = '取值异常';
      }
      if (sd.para.preset_properties.latest_wx_ad_click_id === 'not_collect') {
        delete data.properties._latest_wx_ad_click_id;
        delete data.properties._latest_wx_ad_hash_key;
        delete data.properties._latest_wx_ad_callbacks;
      } else if (sd.para.preset_properties.latest_wx_ad_click_id && !isString(data.properties._latest_wx_ad_click_id)) {
        data.properties._latest_wx_ad_click_id = '取值异常';
        data.properties._latest_wx_ad_hash_key = '取值异常';
        data.properties._latest_wx_ad_callbacks = '取值异常';
      }
      if (isString(data.properties._latest_wx_ad_click_id)) {
        data.properties.$url = getURL();
      }
    }

    if (data.properties.$time && isDate(data.properties.$time)) {
      data.time = data.properties.$time * 1;
      delete data.properties.$time;
    } else {
      data.time = new Date() * 1;
    }

    sd.vtrackBase.addCustomProps(data);

    parseSuperProperties(data);

    filterReservedProperties(data.properties);
    searchObjDate(data);
    searchObjString(data);
    searchZZAppStyle(data);

    saNewUser.checkIsAddSign(data);
    saNewUser.checkIsFirstTime(data);

    sd.addReferrerHost(data);
    sd.addPropsHook(data);
    return data;
  };

  kit.sendData = function(data, callback) {
    var data_config = searchConfigData(data.properties);
    if (sd.para.debug_mode === true) {
      sd.log(data);
      sd.saEvent.debugPath(JSON.stringify(data), callback);
    } else {
      sd.sendState.getSendCall(data, data_config, callback);
    }
  };

  function getSendUrl(url, data) {
    var base64Data = base64Encode(data);
    var crc = 'crc=' + hashCode(base64Data);
    if (url.indexOf('?') !== -1) {
      return url + '&data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
    } else {
      return url + '?data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
    }
  }

  function getSendData(data) {
    var base64Data = base64Encode(data);
    var crc = 'crc=' + hashCode(base64Data);
    return 'data=' + encodeURIComponent(base64Data) + '&ext=' + encodeURIComponent(crc);
  }

  var ImageSender = function(para) {
    this.callback = para.callback;
    this.img = document.createElement('img');
    this.img.width = 1;
    this.img.height = 1;
    if (sd.para.img_use_crossorigin) {
      this.img.crossOrigin = 'anonymous';
    }
    this.data = para.data;
    this.server_url = getSendUrl(para.server_url, para.data);
  };

  ImageSender.prototype.start = function() {
    var me = this;
    if (sd.para.ignore_oom) {
      this.img.onload = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onerror = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
      this.img.onabort = function() {
        this.onload = null;
        this.onerror = null;
        this.onabort = null;
        me.isEnd();
      };
    }
    this.img.src = this.server_url;
  };

  ImageSender.prototype.lastClear = function() {
    this.img.src = '';
  };

  var AjaxSender = function(para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  AjaxSender.prototype.start = function() {
    var me = this;
    ajax({
      url: this.server_url,
      type: 'POST',
      data: this.data,
      credentials: false,
      timeout: sd.para.datasend_timeout,
      cors: true,
      success: function() {
        me.isEnd();
      },
      error: function() {
        me.isEnd();
      }
    });
  };

  var BeaconSender = function(para) {
    this.callback = para.callback;
    this.server_url = para.server_url;
    this.data = getSendData(para.data);
  };

  BeaconSender.prototype.start = function() {
    var me = this;
    if (typeof navigator === 'object' && typeof navigator.sendBeacon === 'function') {
      navigator.sendBeacon(this.server_url, this.data);
    }
    setTimeout(function() {
      me.isEnd();
    }, 40);
  };

  function getSendType(data) {
    var supportedSendTypes = ['image', 'ajax', 'beacon'];
    var sendType = supportedSendTypes[0];

    if (data.config && indexOf(supportedSendTypes, data.config.send_type) > -1) {
      sendType = data.config.send_type;
    } else {
      sendType = sd.para.send_type;
    }

    if (sendType === 'beacon' && isSupportBeaconSend() === false) {
      sendType = 'image';
    }

    if (sendType === 'ajax' && isSupportCors() === false) {
      sendType = 'image';
    }

    return sendType;
  }

  function getSender(data) {
    var sendType = getSendType(data);
    switch (sendType) {
      case 'image':
        return new ImageSender(data);
      case 'ajax':
        return new AjaxSender(data);
      case 'beacon':
        return new BeaconSender(data);
      default:
        return new ImageSender(data);
    }
  }

  function getRealtimeInstance(data) {
    var obj = getSender(data);
    var start = obj.start;
    obj.start = function() {
      var me = this;
      start.apply(this, arguments);
      setTimeout(function() {
        me.isEnd(true);
      }, sd.para.callback_timeout);
    };
    obj.end = function() {
      this.callback && this.callback();
      var self = this;
      setTimeout(function() {
        self.lastClear && self.lastClear();
      }, sd.para.datasend_timeout - sd.para.callback_timeout);
    };
    obj.isEnd = function() {
      if (!this.received) {
        this.received = true;
        this.end();
      }
    };
    return obj;
  }


  var sendState = {};
  sendState.queue = autoExeQueue();

  sendState.getSendCall = function(data, config, callback) {
    if (sd.is_heatmap_render_mode) {
      return false;
    }

    if (sd.readyState.state < 3) {
      sd.log('初始化没有完成');
      return false;
    }

    data._track_id = Number(String(getRandom()).slice(2, 5) + String(getRandom()).slice(2, 4) + String(new Date().getTime()).slice(-4));
    data._flush_time = new Date().getTime();

    var originData = data;

    data = JSON.stringify(data);

    var requestData = {
      data: originData,
      config: config,
      callback: callback
    };

    sd.events.tempAdd('send', originData);

    if (!sd.para.app_js_bridge && sd.para.batch_send && localStorage.length < 200) {
      sd.log(originData);
      sd.batchSend.add(requestData.data);
      return false;
    }
    if (originData.type === 'item_set' || originData.type === 'item_delete') {
      this.prepareServerUrl(requestData);
    } else {
      sd.bridge.dataSend(requestData, this, callback);
    }

    sd.log(originData);
  };

  sendState.prepareServerUrl = function(requestData) {
    if (typeof requestData.config === 'object' && requestData.config.server_url) {
      this.sendCall(requestData, requestData.config.server_url, requestData.callback);
    } else if (isArray(sd.para.server_url) && sd.para.server_url.length) {
      for (var i = 0; i < sd.para.server_url.length; i++) {
        this.sendCall(requestData, sd.para.server_url[i]);
      }
    } else if (typeof sd.para.server_url === 'string' && sd.para.server_url !== '') {
      this.sendCall(requestData, sd.para.server_url, requestData.callback);
    } else {
      sd.log('当前 server_url 为空或不正确，只在控制台打印日志，network 中不会发数据，请配置正确的 server_url！');
    }
  };

  sendState.sendCall = function(requestData, server_url, callback) {
    var data = {
      server_url: server_url,
      data: JSON.stringify(requestData.data),
      callback: callback,
      config: requestData.config
    };
    if (isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && typeof sd.para.jsapp.setData === 'function') {
      delete data.callback;
      data = JSON.stringify(data);
      sd.para.jsapp.setData(data);
    } else {
      this.realtimeSend(data);
    }
  };

  sendState.realtimeSend = function(data) {
    var instance = getRealtimeInstance(data);
    instance.start();
  };

  var methods = ['setItem', 'deleteItem', 'getAppStatus', 'track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'clearPageRegister'];

  function checkState() {
    each(methods, function(method) {
      var oldFunc = sd[method];
      sd[method] = function() {
        if (sd.readyState.state < 3) {
          if (!isArray(sd._q)) {
            sd._q = [];
          }
          sd._q.push([method, arguments]);
          return false;
        }
        if (!sd.readyState.getState()) {
          try {
            console.error('请先初始化神策JS SDK');
          } catch (e) {
            sd.log(e);
          }
          return;
        }
        return oldFunc.apply(sd, arguments);
      };
    });
  }

  var heatmapMode = {
    searchKeywordMatch: location.search.match(/sa-request-id=([^&#]+)/),
    isSeachHasKeyword: function() {
      var match = this.searchKeywordMatch;
      if (match && match[0] && match[1]) {
        if (typeof sessionStorage.getItem('sensors-visual-mode') === 'string') {
          sessionStorage.removeItem('sensors-visual-mode');
        }
        return true;
      } else {
        return false;
      }
    },
    hasKeywordHandle: function() {
      var match = this.searchKeywordMatch;
      var type = location.search.match(/sa-request-type=([^&#]+)/);
      var web_url = location.search.match(/sa-request-url=([^&#]+)/);
      heatmap.setNotice(web_url);
      if (_sessionStorage.isSupport()) {
        if (web_url && web_url[0] && web_url[1]) {
          sessionStorage.setItem('sensors_heatmap_url', decodeURIComponent(web_url[1]));
        }
        sessionStorage.setItem('sensors_heatmap_id', match[1]);
        if (type && type[0] && type[1]) {
          if (type[1] === '1' || type[1] === '2' || type[1] === '3') {
            type = type[1];
            sessionStorage.setItem('sensors_heatmap_type', type);
          } else {
            type = null;
          }
        } else {
          if (sessionStorage.getItem('sensors_heatmap_type') !== null) {
            type = sessionStorage.getItem('sensors_heatmap_type');
          } else {
            type = null;
          }
        }
      }
      this.isReady(match[1], type);
    },
    isReady: function(data, type, url) {
      if (sd.para.heatmap_url) {
        loadScript({
          success: function() {
            setTimeout(function() {
              if (typeof sa_jssdk_heatmap_render !== 'undefined') {
                sa_jssdk_heatmap_render(sd, data, type, url);
                if (typeof console === 'object' && typeof console.log === 'function') {
                  if (!(sd.heatmap_version && sd.heatmap_version === sd.lib_version)) {
                    console.log('heatmap.js与sensorsdata.js版本号不一致，可能存在风险!');
                  }
                }
              }
            }, 0);
          },
          error: function() {},
          type: 'js',
          url: sd.para.heatmap_url
        });
      } else {
        sd.log('没有指定heatmap_url的路径');
      }
    },
    isStorageHasKeyword: function() {
      return _sessionStorage.isSupport() && typeof sessionStorage.getItem('sensors_heatmap_id') === 'string';
    },
    storageHasKeywordHandle: function() {
      heatmap.setNotice();
      heatmapMode.isReady(sessionStorage.getItem('sensors_heatmap_id'), sessionStorage.getItem('sensors_heatmap_type'), location.href);
    }
  };

  function listenSinglePage() {
    if (sd.para.is_track_single_page) {
      addSinglePageEvent(function(last_url) {
        var sendData = function(extraData) {
          extraData = extraData || {};
          if (last_url !== location.href) {
            pageInfo.pageProp.referrer = getURL(last_url);
            sd.quick('autoTrack', extend({
              $url: getURL(),
              $referrer: getURL(last_url)
            }, extraData));
          }
        };
        if (typeof sd.para.is_track_single_page === 'boolean') {
          sendData();
        } else if (typeof sd.para.is_track_single_page === 'function') {
          var returnValue = sd.para.is_track_single_page();
          if (isObject(returnValue)) {
            sendData(returnValue);
          } else if (returnValue === true) {
            sendData();
          }
        }
      });
    }
  }

  function enterFullTrack() {
    if (sd._q && isArray(sd._q) && sd._q.length > 0) {
      each(sd._q, function(content) {
        sd[content[0]].apply(sd, Array.prototype.slice.call(content[1]));
      });
    }

    if (isObject(sd.para.heatmap)) {
      heatmap.initHeatmap();
      heatmap.initScrollmap();
    }
  }

  function trackModeOnly() {
    sd.readyState.setState(3);
    pageInfo.initPage();

    listenSinglePage();

    sd.store.init();

    sd.readyState.setState(4);

    enterFullTrack();
  }

  sd.use = function() {
    sdLog('当前版本支持多文件实例，不支持插件。');
  };

  var bridge = {
    initPara: function() {},
    initState: function() {},
    initDefineBridgeInfo: function() {},
    bridge_info: {
      touch_app_bridge: false
    },
    dataSend: function(requestData, that) {
      that.prepareServerUrl(requestData);
    }
  };

  function JSBridge() {}

  var vtrackBase = {
    init: function() {},
    addCustomProps: function() {}
  };

  var batchSend = {
    add: function(data) {
      sd.para.batch_send = false;
      var data_config = searchConfigData(data.properties);
      sd.sendState.prepareServerUrl({
        data: data,
        config: data_config
      });
    }
  };

  sd.modules = {};
  sd._ = _;
  sd.kit = kit;
  sd.saEvent = saEvent;
  sd.sendState = sendState;
  sd.events = new EventEmitter();
  sd.store = store;
  sd.heatmap = heatmap;

  sd.bridge = bridge;
  sd.JSBridge = JSBridge;
  sd.vtrackBase = vtrackBase;
  sd.batchSend = batchSend;

  sd.init = function(para) {
    if (sd.readyState && sd.readyState.state && sd.readyState.state >= 2) {
      return false;
    }
    para = para || {};
    para.batch_send = false;
    if (isObject(para.heatmap)) {
      para.heatmap.get_vtrack_config = false;
    }

    sd.setInitVar();
    sd.readyState.setState(2);
    sd.initPara(para);
    trackModeOnly();
    sd.iOSWebClickPolyfill();
  };

  checkState();

  return sd;

})));