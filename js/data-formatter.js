define(['util', 'token', 'decimal-formatter'], function(Util, Token, DecimalFormatter) {
    var DateSymbol = {
        MONTH: 'm',
        DATE: 'd',
        YEAR: 'y'
    };

    var TimeSymbol = {
        HOUR: 'h',
        MINUS: 'm',
        SECOND: 's',
    };

    var tokenize_ = function(pattern) {
        var length = pattern.length;
        var tokens = [];
        var preTextToken;
        for (var i = 0; i < length;) {
            var result = (Token.CharHandler[pattern[i]] || Token.CharHandler.default)(i, pattern);
            if (result.token.type === Token.Type.ERROR) {
                return result.token;
            } else {
                if (result.token.type === Token.Type.PLAIN_TEXT) {
                    if (!!preTextToken) {
                        preTextToken.data += result.token.data;
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

    return {
        format: function(value, pattern) {
            var tokens = tokenize_(pattern);
            if (!Util.isArray(tokens)) {
                return tokens.data || 'Unknown Error';
            }
            return DecimalFormatter.format(tokens, value, true);
        }
    };
});