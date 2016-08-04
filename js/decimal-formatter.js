define(['token', 'integer-formatter', 'decimal-fraction-formatter'], function(Token, IntegerFormatter, FractionFormatter) {
    var Type = Token.Type;

    var format_ = function(tokens, decimal) {
    	if(Number(decimal) !== Number(decimal)){
    		return 'Parse Error';
    	}
        var negotive = Number(decimal) < 0;
        var integer = decimal.split('.')[0] || '';
        var fraction = decimal.split('.')[1] || '';
        var integerTokens = [];
        var fractionTokens = [];

        var isInteger = true;
        var isThousand = false;

        for (var i = 0, length = tokens.length; i < length; i++) {
            var token = tokens[i];
            switch (token.type) {
                case Type.DECIMAL_POINT:
                    if (isInteger) {
                        isInteger = false;
                    } else {
                        fractionTokens.push(token);
                    }
                    break;
                case Type.THOUSAND_SEPERATOR:
                    isThousand = true;
                    break;
                case Type.ERROR:
                    return 'Can not parse';
                    break;
                default:
                    if (isInteger) {
                        integerTokens.push(token);
                    } else {
                        fractionTokens.push(token);
                    }
            }
        }

        return (!!negotive ? '-' : '') + IntegerFormatter.format(integerTokens, integer, isThousand) + '.' + FractionFormatter.format(fractionTokens, fraction);
    };

    return {
        format: format_
    };
});