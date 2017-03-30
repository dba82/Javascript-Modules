import { AnimationCanvas } from 'db82-animation-canvas';
import { MouseProxy } from 'db82-mouse-proxy';
import { CollisionDetector } from 'db82-collision-detector';
import { IdManager } from 'db82-id-manager';
import { KeyboardProxy } from 'db82-keyboard-proxy';
import { Scheduler } from 'db82-scheduler';


export class Game{
    public go = true;
    public canvas;
    public keyboard;
    public mouse;
    public collisionManager;
    public idManager;
    public scheduler;
    public eventHandlers = {};
    public eventQueue = [];
    
    constructor(public CanvasElement){
        this.canvas = new AnimationCanvas(CanvasElement);
        this.keyboard = new KeyboardProxy();
        this.mouse = new MouseProxy(CanvasElement);
        this.idManager = new IdManager();
        this.collisionManager = new CollisionDetector(CanvasElement.width, CanvasElement.height);
        this.scheduler = new Scheduler();
       
        this.keyboard.setControlScheme({
            'p' :  {
                'held' : () => {this.go = !this.go; this.scheduler.toggle()},
                'up'   : () => {}
            }
        });

        this.canvas.addHandler(() => {
            this.scheduler.run();
            this.keyboard.handleInput();
            if (this.go) {
                this.draw();
                this.handleEvents();
                this.collisionManager.update();
                this.collisionManager.objects.forEach( x => x.update());
            }
        });
    }

    setEventHandlers(obj){
        Object.keys(obj).forEach( k => {
            this.on(k, obj[k]);
        })
    }

    emit(event, data){
        this.eventQueue.push({
            name: event,
            data: data,
            time: Date.now()
        })
    }

    on(event, fn){
        this.eventHandlers[event] = this.eventHandlers[event] || [];
        this.eventHandlers[event].push(fn);
    }

    handleEvents(){
        for (let i=0; i<this.eventQueue.length; i++){
            let event = this.eventQueue[i];
            for (let j=0; this.eventHandlers[event.name].length; j++){
                this.eventHandlers[event.name][j](event);
            }
        }
        this.eventQueue = [];
    }

    run(){
        this.canvas.draw();
    }

    draw(){
        this.collisionManager.objects.filter( x => x.type != 'wall').forEach( x => x.draw());
    }
}
