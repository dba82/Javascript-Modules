export class Fps{
    public framesPerSecond;
    private lastTime;
    private now;
    private handlers = [];
    public func;

    constructor(func?){
        if (!func || typeof func === typeof true){
            if (window && window.requestAnimationFrame){
                this.func = window.requestAnimationFrame.bind(window);
                if (func === true){
                    this.start();
                    let display = window.document.createElement('div');
                    display.style.position = 'fixed';
                    display.style.top = '0px';
                    display.style.right = '0px';
                    window.document.body.appendChild(display);
                    this.addHandler((x) => display.innerHTML = this.framesPerSecond)
                }
            }
        } else {
            this.func = func;
        }
    }
    public addHandler(handler){
        this.handlers.push(handler);
    }

    public update(){
        this.now = Date.now();
        if (this.lastTime) this.framesPerSecond = -~(1000/(this.now-this.lastTime));
        this.lastTime = this.now;
        let self = this;
        this.handlers.forEach(function(f){
            f.bind(self)()});
        }
    
    public start(){
        let self = this
        let wtf = function(){
            self.update.bind(self)();
            self.func(wtf);
        };
        self.func(wtf);
    }
}