define(['token'], function(Token) {
    var Type = Token.Type;

    var getThousand_ = function(digit, thousand) {
        return !!thousand && digit > 3 && digit % 3 === 1 ? ',' : '';
    };

    var format_ = function(tokens, integer, thousand) {
        var prefix = '';
        var postfix = '';
        var digit = integer.length - 1;
        for (var i = tokens.length - 1; i >= 0; i--) {
            var token = tokens[i];
            switch (token.type) {
                case Type.NUMBER_PLACEHOLDER:
                    var hasDigit = digit >= 0;
                    var intStr = hasDigit ? integer[digit] : token.data;
                    postfix = intStr + getThousand_(integer.length - digit, thousand) + prefix + postfix;
                    hasDigit && (digit--);
                    prefix = '';
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
        while (digit >= 0) {
            middle = integer[digit] + getThousand_(integer.length - digit, thousand) + middle;
            digit--;
        }
        return prefix + middle + postfix;
    };

    return {
        format: format_
    };
});