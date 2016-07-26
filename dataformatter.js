window.mxk = window.mxk || {};
window.mxk.DataFormatter = window.mxk.DataFormatter || {};

(function(DataFormatter) {

    DataFormatter.DateSymbol = {
        MONTH: 'm',
        DATE: 'd',
        YEAR: 'y'
    };

    DataFormatter.TimeSymbol = {
        HOUR: 'h',
        MINUS: 'm',
        SECOND: 's',

    };

    DataFormatter.getFormatter = function(pattern) {

    };

    DataFormatter.tokenize = function(pattern) {
        var length = pattern.length;
        var tokens = [];
        var preTextToken;
        for (var i = 0; i < length;) {
            var result = (DataFormatter.Token.CharHandler[pattern[i]] || DataFormatter.Token.CharHandler.default)(i, pattern);
            if (result.token.type === DataFormatter.Token.Type.ERROR) {
                return result.token;
            } else {
                if (result.token.type === DataFormatter.Token.Type.PLAIN_TEXT) {
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

    var IntegerFormatter = function(pattern) {
        this.pattern_ = pattern;
        this.valid_ = false;
        this.tokens_ = [];
    };

    IntegerFormatter.prototype.format = function(number) {

    };


})(window.mxk.DataFormatter);