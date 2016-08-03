define(function() {
    return function(type, data) {
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
});