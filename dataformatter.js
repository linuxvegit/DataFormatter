window.mxk = {};
window.mxk.DataFormatter = {};

(function(DataFormatter) {
    DataFormatter.Token = {};

    DataFormatter.Token.Type = {
        NUMBER_PLACEHOLDER: 'NumberPlaceHolder',
        TEXT_PLACEHOLDER: 'TextPlaceHolder',
        DECIMAL_POINT: 'DecimalPoint',
        POSI_SCIENTIFIC: 'PositiveScientific',
        NEGO_SCIENTIFIC: 'NegotiveScientific',
        FRACTION: 'Fraction',
        SECTION_SEPERATOR: 'SectionSeperator',
        THOUSAND_SEPERATOR: 'ThousandSeperator',
        PERCENTAGE: 'Percentage',
        EMPTY_PLACEHOLDER: 'EmptyPlaceHolder',
        CELL_FILL: 'CellFill',
        CONDITION: 'Condition',
        PLAIN_TEXT: 'PlainText',
        ERROR: 'Error'
    };

    DataFormatter.SingleEscape = {
        BACK_SLASH: '\'',
        EXCLAMATION: '!',
        PLACE_HOLD: '_'
    };

    DataFormatter.MultipleEscape = {
        QUOTE: '"',
        FILL: '*'
    };

    DataFormatter.DateSymbol = {
        MONTH: 'm',
        DATE: 'd',
        YEAR: 'y'
    };

    DataFormatter.TimeSymbol = {
        HOUR: 'h',
        MINUS: 'm',
        SECOND: 's',

    }

    DataFormatter.CharHandler = {
        '0': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.NUMBER_PLACEHOLDER,
                    default: '0'
                },
                next: index + 1
            };
        },
        '#': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.NUMBER_PLACEHOLDER,
                    default: ''
                },
                next: index + 1
            };
        },
        '?': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.NUMBER_PLACEHOLDER,
                    default: ' '
                },
                next: index + 1
            };
        },
        '@': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.TEXT_PLACEHOLDER,
                    default: ''
                },
                next: index + 1
            };
        },
        '.': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.DECIMAL_POINT,
                },
                next: index + 1
            };
        },
        'E': function(index, array) {
            var token, next;
            if (array[index + 1] === '+') {
                token = {
                    type: DataFormatter.Token.Type.POSI_SCIENTIFIC
                };
                next = index + 2
            } else if (array[index + 1] === '-') {
                type = {
                    type: DataFormatter.Token.Type.NEGO_SCIENTIFIC
                };
                next = index + 2
            } else {
                type = {
                    type: DataFormatter.Token.Type.PLAIN_TEXT,
                    text: 'E'
                };
                next = index + 1
            }
            return {
                token: token,
                next: next
            };
        },
        '/': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.FRACTION,
                },
                next: index + 1
            };
        },
        ';': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.SECTION_SEPERATOR,
                },
                next: index + 1
            };
        },
        ',': function(index, array) {
            var next = index + 1;
            while (!!array[next] && array[next] === ',') {
                next++;
            }
            return {
                token: {
                    type: DataFormatter.Token.Type.THOUSAND_SEPERATOR
                },
                next: next
            };
        },
        '%': function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.PERCENTAGE,
                },
                next: index + 1
            };
        },
        '"': function(index, array) {
            var text = '';
            var next = index + 1;
            while (!!array[next] && array[next] !== '"') {
                text += array[next++];
            }
            var token;
            if (!array[next]) {
                token = {
                    type: DataFormatter.Token.Type.ERROR,
                    reason: 'quote does not close'
                };
            } else {
                token = {
                    type: DataFormatter.Token.Type.PLAIN_TEXT,
                    text: text
                };
            }
            return {
                token: token,
                next: next
            };
        },
        '\'': function(index, array) {
            var nextText = array[index + 1];
            var token;
            if (!nextText) {
                token = {
                    type: DataFormatter.Token.Type.ERROR,
                    reason: 'No character to escape'
                };
            } else {
                token = {
                    type: DataFormatter.Token.Type.PLAIN_TEXT,
                    text: nextText
                };
            }
            return {
                token: token,
                next: next + 2
            }
        },
        '!': function(index, array) {
            var nextText = array[index + 1];
            var token;
            if (!nextText) {
                token = {
                    type: DataFormatter.Token.Type.ERROR,
                    reason: 'No character to escape'
                };
            } else {
                token = {
                    type: DataFormatter.Token.Type.EMPTY_PLACEHOLDER,
                    text: nextText
                };
            }
            return {
                token: token,
                next: next + 2
            }
        },
        '*': function(index, array) {
            var nextText = array[index + 1];
            var token;
            if (!nextText) {
                token = {
                    type: DataFormatter.Token.Type.ERROR,
                    reason: 'No character to escape'
                };
            } else {
                token = {
                    type: DataFormatter.Token.Type.CELL_FILL,
                    text: nextText
                };
            }
            return {
                token: token,
                next: next + 2
            }
        },
        '[': function(index, array) {
            var next = index + 1;
            var condition = '';
            while (!!array[next] && array[next] !== ']') {
                condition += array[next++];
            }
            var token;
            if (!array[next]) {
                token = {
                    type: DataFormatter.Token.Type.ERROR,
                    reason: '"[" must be closed'
                };
            } else {
                token = {
                    type: DataFormatter.Token.Type.CONDITION,
                    condition: condition
                }
            }
            return {
                token: token,
                next: next
            };
        },
        default: function(index, array) {
            return {
                token: {
                    type: DataFormatter.Token.Type.PLAIN_TEXT,
                    text: array[index]
                },
                next: index + 1
            };
        }
    }

    DataFormatter.getFormatter = function(pattern) {

    };

    DataFormatter.tokenize = function(pattern) {
        var length = pattern.length;
        var tokens = [];
        var preTextToken;
        for (var i = 0; i < length;) {
            var result = (DataFormatter.CharHandler[pattern[i]] || DataFormatter.CharHandler.default)(i, pattern);
            if (result.token.type === DataFormatter.Token.Type.ERROR) {
                return result.token;
            } else {
                if (result.token.type === DataFormatter.Token.Type.PLAIN_TEXT) {
                    if (!!preTextToken) {
                        preTextToken.text += result.token.text;
                    } else {
                        preTextToken = result.token;
                    }
                } else {
                    !!preTextToken && tokens.push(preTextToken);
                    preTextToken = null;
                    tokens.push(result.token);
                }
            }
            i = result.next;
        }!!preTextToken && tokens.push(preTextToken);
        return tokens;
    };

    var IntegerFormatter = function(pattern) {
        this.pattern_ = pattern;
        this.valid_ = false;
        this.tokens_ = [];
    };

    IntegerFormatter.prototype.format = function(number) {

    };


})(window.mxk.DataFormatter);