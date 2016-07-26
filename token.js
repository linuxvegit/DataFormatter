window.mxk = window.mxk || {};
window.mxk.DataFormatter = window.mxk.DataFormatter || {};
window.mxk.DataFormatter.Token = window.mxk.DataFormatter.Token || {};

(function(Token) {
    Token.create = function(type, data) {
        return {
            set type(t) {
                type = t;
            },
            get type() {
                return type
            },
            set data(d) {
                data = d;
            },
            get data() {
                return data;
            }
        };
    };
})(window.mxk.DataFormatter.Token);