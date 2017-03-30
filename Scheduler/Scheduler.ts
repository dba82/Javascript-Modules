/**
 * To be used in Gameloops, like:
 * 
let sched = new Scheduler;
let sched2 = new Scheduler;
sched.schedule(6000, () => console.log("huuhuuuuuuuuu"), "once");
sched.schedule(200, addBall);
sched.schedule(3000, sched.pause.bind(sched));
sched2.schedule(6000, sched.resume.bind(sched))
acan.addHandler(sched.run.bind(sched));
acan.addHandler(sched2.run.bind(sched2));
 */

 export class Scheduler{
    /**
     * TODO: auch dynamische schedules ermöglichen, also zum Beispiel intervall immer reduzieren
     * TODO: statt "echter" Zeit auch andere Zeitangaben (z.B. Frames since start) ermöglichen
     */
    public startTime;
    public running = true;
    public _every = [];
    public _once = [];
    public pausedAmount = 0;
    public lastPauseTime;

    schedule(msecs, cb, modifier = "every"){
        this["_" + modifier].push({
            interval: msecs,
            action: cb,
            lastTime: undefined,
            offset : 0
        })
    }
    
    every(ms, cb){
        this.schedule(ms,cb, "every");
    }

    once(ms, cb){
        this.schedule(ms,cb, "once");
    }

    unschedule(msecs, cb, modifier = "every"){
        this["_" + modifier][msecs] = this["_" + modifier][msecs].filter( x => x.intervall != msecs && x.action != cb);
    }

    run(fromStart){
        if (!this.running) return;
        if (!this.startTime) this.startTime = Date.now();
        let now = Date.now();
        this._every
            .filter( x => now - (x.lastTime || this.startTime) - this.pausedAmount >= x.interval - x.offset)
            .forEach( x => {
                x.action(now);
                x.offset = now - (x.lastTime || this.startTime) + x.offset - x.interval;
                x.lastTime = now;
        });
        this._once
            .filter( x => now - this.startTime - this.pausedAmount >= x.interval)
            .forEach( x => {
                x.action(now);
                this._once.splice(this._once.indexOf(x), 1);
        });
    }

    pause(){
        this.lastPauseTime = Date.now();
        this.running = false;
    }

    resume(){
        this.running = true;
        this.pausedAmount += Date.now() - this.lastPauseTime;
    }

    toggle(){
        if (this.running) this.pause();
        else this.resume();
    }
}