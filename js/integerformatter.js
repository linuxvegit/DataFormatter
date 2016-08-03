define(['token'], function(Token) {
    var Type = Token.Type;

    var getThousand_ = function(digit, thousand) {
        return !!thousand && digit > 3 && digit % 3 === 1 ? ',' : '';
    };

    return {
        format: function(tokens, integer, thousand) {

            var integer = Number.parseInt(integer);
            var prefix = '';
            var postfix = '';
            var digit = 0;
            for (var i = tokens.length - 1; i >= 0; i--) {
                var token = tokens[i];
                switch (token.type) {
                    case Type.NUMBER_PLACEHOLDER:
                        var hasDigit = integer > 0;
                        var intStr = hasDigit ? (integer % 10) + '' : token.data;
                        hasDigit && (digit++);
                        postfix = intStr + getThousand_(digit, thousand) + prefix + postfix;
                        prefix = '';
                        integer = Number.parseInt(integer / 10);
                        break;
                    case Type.PLAIN_TEXT:
                        prefix = token.data + prefix;
                        break;
                    case Type.ERROR:
                        return 'Can not parse';
                        break;
                }
            }

            var middle = '';
            while (integer > 0) {
                middle = (integer % 10) + '' + getThousand_(++digit, thousand) + middle;
                integer = Number.parseInt(integer / 10);
            }
            return prefix + middle + postfix;
        }
    };
});