window.mxk = window.mxk || {};
window.mxk.DataFormatter = window.mxk.DataFormatter || {};
window.mxk.DataFormatter.Token = window.mxk.DataFormatter.Token || {};

(function(Token) {
    Token.Type = {
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
        MINUTE_MONTH: 'MinuteMonth',
        PLAIN_TEXT: 'PlainText',
        ERROR: 'Error'
    };
})(window.mxk.DataFormatter.Token);