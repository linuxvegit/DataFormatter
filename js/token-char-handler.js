define(['token-type', 'token-create'], function(Type, create) {
    return {
        '0': function(index, array) {
            return {
                token: create(Type.NUMBER_PLACEHOLDER, '0'),
                next: index + 1
            };
        },
        '#': function(index, array) {
            return {
                token: create(Type.NUMBER_PLACEHOLDER, ''),
                next: index + 1
            };
        },
        '?': function(index, array) {
            return {
                token: create(Type.NUMBER_PLACEHOLDER, ' '),
                next: index + 1
            };
        },
        '@': function(index, array) {
            return {
                token: create(Type.TEXT_PLACEHOLDER, ''),
                next: index + 1
            };
        },
        '.': function(index, array) {
            return {
                token: create(Type.DECIMAL_POINT),
                next: index + 1
            };
        },
        'E': function(index, array) {
            var token, next;
            if (array[index + 1] === '+') {
                token = create(Type.POSI_SCIENTIFIC);
                next = index + 2;
            } else if (array[index + 1] === '-') {
                token = create(Type.NEGO_SCIENTIFIC);
                next = index + 2;
            } else {
                token = create(Type.PLAIN_TEXT, 'E');
                next = index + 1
            }
            return {
                token: token,
                next: next
            };
        },
        '/': function(index, array) {
            return {
                token: create(Type.FRACTION),
                next: index + 1
            };
        },
        ';': function(index, array) {
            return {
                token: create(Type.SECTION_SEPERATOR),
                next: index + 1
            };
        },
        ',': function(index, array) {
            var next = index + 1;
            while (!!array[next] && array[next] === ',') {
                next++;
            }
            return {
                token: create(Type.THOUSAND_SEPERATOR),
                next: next
            };
        },
        '%': function(index, array) {
            return {
                token: create(Type.PERCENTAGE),
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
                token = create(Type.ERROR, 'quote does not close');
            } else {
                token = create(Type.PLAIN_TEXT, text);
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
                token = create(Type.ERROR, 'No character to escape');
            } else {
                token = create(Type.PLAIN_TEXT, nextText);
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
                token = create(Type.ERROR, 'No character to escape');
            } else {
                token = create(Type.PLAIN_TEXT, nextText);
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
                token = create(Type.ERROR, 'No character to escape');
            } else {
                token = create(Type.CELL_FILL, nextText);
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
                token = create(Type.ERROR, '"[" must be closed');
            } else {
                token = create(Type.CONDITION, condition);
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
                token: create(Type.MINUTE_MONTH, count),
                next: next
            };
        },
        default: function(index, array) {
            return {
                token: create(Type.PLAIN_TEXT, array[index]),
                next: index + 1
            };
        }
    }
});