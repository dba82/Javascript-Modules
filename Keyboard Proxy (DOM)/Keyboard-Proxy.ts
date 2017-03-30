import { keycodes, keynames } from 'db82-keycodes';

 export class KeyboardProxy{
    public pressedKeys = [];
    public releasedKeys = [];
	public down = {};
    public held = {};
    public up = {};
    public done = {};
    
    constructor(){
        var self = this;
        window.addEventListener('keydown', function(e){
		    if (self.pressedKeys.indexOf(e.key || keycodes[e.keyCode].name) == -1){
			    self.pressedKeys.push(e.key || keycodes[e.keyCode].name);
		    }
        });
  
	    window.addEventListener('keyup', function(e){
            self.pressedKeys.splice(self.pressedKeys.indexOf(e.key || keycodes[e.keyCode].name), 1);
		    if (self.releasedKeys.indexOf(e.key || keycodes[e.keyCode].name) == -1){
			    self.releasedKeys.push(e.key || keycodes[e.keyCode].name);
		    }        
        });
     }

    handleInput(){
        this.pressedKeys
            .filter( x => this.down[x])
            .forEach( x => this.down[x].forEach( f => {f()}))
        this.releasedKeys
            .filter( x => this.up[x])
            .forEach( x => {
                this.up[x].forEach( f => {f()});
                this.done[x] = false;
            })
        this.pressedKeys
            .filter( x => this.held[x] && !this.done[x])
            .forEach( x => {
                this.held[x].forEach( f => {f()});
                this.done[x] = true;
            })

        this.releasedKeys = [];
    }

     addKeyhandler(key, cb, modifier = "down"){
        this[modifier][key] = this[modifier][key] || [];
        this[modifier][key].push(cb);
     }

     removeKeyHandler(key, cb, modifier = "down"){
         let index = this[modifier][key].indexOf(cb);
         if (index != -1){
             this[modifier][key].splice(index, 1);
         }
     }

    setControlScheme(scheme){
        for (let k in scheme){
            if (scheme[k].down){
                this.addKeyhandler(k, scheme[k].down, "down");
            }
            if (scheme[k].up){
                this.addKeyhandler(k, scheme[k].up, "up");
            }
            if (scheme[k].held){
                this.addKeyhandler(k, scheme[k].held, "held");
            }
        }
    }
}
