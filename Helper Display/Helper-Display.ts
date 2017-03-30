export class Display{
    public main;
    public bindings = {};
        
    constructor(public variables){
        this.main = document.createElement('div');
        this.main.classList.add('db82-display');
        this.main.style.position = 'absolute';
        this.main.style.bottom = 0;
        this.main.style.right = 0;
        document.body.appendChild(this.main);
   }
    refresh(){
        let list = document.getElementById('db82-display-list');
        if (!list){
            list = document.createElement('table');
            list.id = 'db82-display-list';
            this.main.appendChild(list);
        }
        Object.keys(this.variables).forEach( x => {
            let el = document.getElementById('db82-display-value-' + x);
            if (!el){
                let row = document.createElement('tr');
                row.id = 'db82-display-row-' + x;
                list.appendChild(row);
                let title = document.createElement('td');
                title.id = 'db82-display-title-' + x;
                title.innerHTML = x;
                row.appendChild(title);
                el = document.createElement('td');
                el.id = 'db82-display-value-' + x;
                row.appendChild(el);
            }
            let val = this.variables[x];
            el.innerHTML = val();
        });
        Object.keys(this.bindings).forEach( x => {
            let d = document.getElementById('db82-bound-value-display-' + x);
            if (!d){
                let row = document.createElement('tr');
                row.id = 'db82-bound-row-' + x;
                list.appendChild(row);
                let title = document.createElement('td');
                title.id = 'db82-bound-title-' + x;
                title.innerHTML = x;
                row.appendChild(title);
                let cell = document.createElement('td');
                cell.id = 'db82-bound-value-' + x;
                row.appendChild(cell);
                let el = document.createElement('input');
                el.setAttribute('type', 'range');
                el.setAttribute('min', this.bindings[x].min || '0');
                el.setAttribute('max', this.bindings[x].max || '1');
                el.setAttribute('step', this.bindings[x].step || '0.05');
                el.value = this.bindings[x].value;
                el.addEventListener('input', () => this.bindings[x].value = el.value);
                el.id = 'db82-bound-value-slider-' + x;
                cell.appendChild(el);
                d = document.createElement('span');
                d.id = 'db82-bound-value-display-' + x;
                d.innerHTML = this.bindings[x].value;
                cell.appendChild(d);
            }
            d.innerHTML = this.bindings[x].value;
        })
    }
}