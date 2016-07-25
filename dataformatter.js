window.mxk = {};
window.mxk.DataFormatter;

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
    }

    DataFormatter.getFormatter = function(pattern) {

    };

    var IntegerFormatter = function(pattern) {
        this.pattern_ = pattern;
        this.valid_ = false;
        this.tokens_ = [];
    };

    IntegerFormatter.ErrorChar = [
        ['d', 'h', 'm', 's', 'y', '.', '@', ',', ';', '%', '/', '[', ']'],
        ['E+', 'E-'],
        ['a/p'],
        [],
        ['am/pm']
    ];

    IntegerFormatter.prototype.format = function(number) {

    };


})(window.mxk.DataFormatter);