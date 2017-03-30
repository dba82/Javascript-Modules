"use strict";
exports.__esModule = true;
var Display = (function () {
    function Display(variables) {
        this.variables = variables;
        this.bindings = {};
        this.main = document.createElement('div');
        this.main.classList.add('db82-display');
        this.main.style.position = 'absolute';
        this.main.style.bottom = 0;
        this.main.style.right = 0;
        document.body.appendChild(this.main);
    }
    Display.prototype.refresh = function () {
        var _this = this;
        var list = document.getElementById('db82-display-list');
        if (!list) {
            list = document.createElement('table');
            list.id = 'db82-display-list';
            this.main.appendChild(list);
        }
        Object.keys(this.variables).forEach(function (x) {
            var el = document.getElementById('db82-display-value-' + x);
            if (!el) {
                var row = document.createElement('tr');
                row.id = 'db82-display-row-' + x;
                list.appendChild(row);
                var title = document.createElement('td');
                title.id = 'db82-display-title-' + x;
                title.innerHTML = x;
                row.appendChild(title);
                el = document.createElement('td');
                el.id = 'db82-display-value-' + x;
                row.appendChild(el);
            }
            var val = _this.variables[x];
            el.innerHTML = val();
        });
        Object.keys(this.bindings).forEach(function (x) {
            var d = document.getElementById('db82-bound-value-display-' + x);
            if (!d) {
                var row = document.createElement('tr');
                row.id = 'db82-bound-row-' + x;
                list.appendChild(row);
                var title = document.createElement('td');
                title.id = 'db82-bound-title-' + x;
                title.innerHTML = x;
                row.appendChild(title);
                var cell = document.createElement('td');
                cell.id = 'db82-bound-value-' + x;
                row.appendChild(cell);
                var el_1 = document.createElement('input');
                el_1.setAttribute('type', 'range');
                el_1.setAttribute('min', _this.bindings[x].min || '0');
                el_1.setAttribute('max', _this.bindings[x].max || '1');
                el_1.setAttribute('step', _this.bindings[x].step || '0.05');
                el_1.value = _this.bindings[x].value;
                el_1.addEventListener('input', function () { return _this.bindings[x].value = el_1.value; });
                el_1.id = 'db82-bound-value-slider-' + x;
                cell.appendChild(el_1);
                d = document.createElement('span');
                d.id = 'db82-bound-value-display-' + x;
                d.innerHTML = _this.bindings[x].value;
                cell.appendChild(d);
            }
            d.innerHTML = _this.bindings[x].value;
        });
    };
    return Display;
}());
exports.Display = Display;
