define(['token'], function(Token) {
    var Type = Token.Type;
    var format_ = function(tokens, fraction) {
        var digit = 0;
        var result = '';
        for (var i = 0, length = tokens.length; i < length; i++) {
            var token = tokens[i];
            switch (token.type) {
                case Type.NUMBER_PLACEHOLDER:
                    if (digit < fraction.length) {
                        result += fraction[digit++];
                    } else {
                        result += token.data;
                    }
                    break;
                case Type.PLAIN_TEXT:
                    result += token.data;
                    break;
                case Type.DECIMAL_POINT:
                    result += '.';
                    break;
                case Type.ERROR:
                    return 'Can not parse';
                    break;
            }
        }
        return result;
    };

    return {
        format: format_
    };
});