require(["data-formatter"], function(DataFormatter) {

    var value = document.getElementById('value');
    var format = document.getElementById('format');
    var result = document.getElementById('result');

    value.addEventListener('input', setResult);
    format.addEventListener('input', setResult);

    function setResult() {
        var r = DataFormatter.format(value.value, format.value);
        result.innerHTML = r;
    }
});