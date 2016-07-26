window.mxk = window.mxk || {};
window.mxk.DataFormatter = window.mxk.DataFormatter || {};
window.mxk.DataFormatter.Token = window.mxk.DataFormatter.Token || {};

(function(Token) {
    var DataFormatter = window.mxk.DataFormatter;
    var Type = Token.Type;

    Token.CharHandler = {
        '0': function(index, array) {
            return {
                token: Token.create(Type.NUMBER_PLACEHOLDER, '0'),
                next: index + 1
            };
        },
        '#': function(index, array) {
            return {
                token: Token.create(Type.NUMBER_PLACEHOLDER, ''),
                next: index + 1
            };
        },
        '?': function(index, array) {
            return {
                token: Token.create(Type.NUMBER_PLACEHOLDER, ' '),
                next: index + 1
            };
        },
        '@': function(index, array) {
            return {
                token: Token.create(Type.TEXT_PLACEHOLDER, ''),
                next: index + 1
            };
        },
        '.': function(index, array) {
            return {
                token: Token.create(Type.DECIMAL_POINT),
                next: index + 1
            };
        },
        'E': function(index, array) {
            var token, next;
            if (array[index + 1] === '+') {
                token = Token.create(Type.POSI_SCIENTIFIC);
                next = index + 2;
            } else if (array[index + 1] === '-') {
                token = Token.create(Type.NEGO_SCIENTIFIC);
                next = index + 2;
            } else {
                token = Token.create(Type.PLAIN_TEXT, 'E');
                next = index + 1
            }
            return {
                token: token,
                next: next
            };
        },
        '/': function(index, array) {
            return {
                token: Token.create(Type.FRACTION),
                next: index + 1
            };
        },
        ';': function(index, array) {
            return {
                token: Token.create(Type.SECTION_SEPERATOR),
                next: index + 1
            };
        },
        ',': function(index, array) {
            var next = index + 1;
            while (!!array[next] && array[next] === ',') {
                next++;
            }
            return {
                token: Token.create(Type.THOUSAND_SEPERATOR),
                next: next
            };
        },
        '%': function(index, array) {
            return {
                token: Token.create(Type.PERCENTAGE),
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
                token = Token.create(Type.ERROR, 'quote does not close');
            } else {
                token = Token.create(Type.PLAIN_TEXT, text);
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
                token = Token.create(Type.ERROR, 'No character to escape');
            } else {
                token = Token.create(Type.PLAIN_TEXT, nextText);
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
                token = Token.create(Type.ERROR, 'No character to escape');
            } else {
                token = Token.create(Type.PLAIN_TEXT, nextText);
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
                token = Token.create(Type.ERROR, 'No character to escape');
            } else {
                token = Token.create(Type.CELL_FILL, nextText);
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
                token = Token.create(Type.ERROR, '"[" must be closed');
            } else {
                token = Token.create(Type.CONDITION, condition);
            }
            return {
                token: token,
                next: next
            };
        },
        'm': function(index, array) {
            var next = index + 1;
            var count = 1;
            while (!!array[next] && array[next] === 'm') {
                next++;
                count++;
            }
            return {
                token: Token.create(Type.MINUTE_MONTH, count),
                next: next
            };
        },
        default: function(index, array) {
            return {
                token: Token.create(Type.PLAIN_TEXT, array[index]),
                next: index + 1
            };
        }
    };
})(window.mxk.DataFormatter.Token);