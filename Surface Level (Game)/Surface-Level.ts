import * as _ from 'lodash';
import * as sa from 'db82-shape-analytics';
import * as rand from 'db82-random';
import * as si from 'db82-shapes-intersection-functions';
import { vec } from '2d-vector-functions';
import { Body } from 'db82-physics-body';
import { Scheduler } from 'db82-scheduler';
import { mouse, acan, dcan, idman, cd, fps, ctx, w, h, keyboard} from './boilerplate';

let schedule = new Scheduler();
class Game{
    public level = 3;
    public go = true;
    constructor(public canvas, public collisionManager, public keyboard){
        this.collisionManager.objects = [[[0,1], [w,1]], [[0,h-1], [w,h-1]],[[1,1], [1,h]],[[w-1,0], [w-1,h-1]]].map( p => new Wall(...p))
                                        .concat(_.range(this.level).map(x => new MiniBall()));
        this.keyboard.setControlScheme({
            'a' : { 'held' : this.addBall.bind(this),
                    'up'   : this.stopGrowth.bind(this)},
            'p' : { 'down' : _.throttle(() => {this.go = !this.go; schedule.toggle()},1000)}
        });
        this.collisionManager.table.setCollisionTypeCheckersAndHandlers([
            ['playerball', 'miniball',
                (a, b) => si.circleIntersectsCircle(a.getShape(), b.getShape()).length,
                [(p, m) => {
                        if (p.growing) this.collisionManager.objects.splice(this.collisionManager.objects.indexOf(p))
                        else m.velocity = vec.mirror(vec.inverse(m.velocity), vec.subtract(m.position, p.position));
                    }]
            ],
            ['playerball', 'playerball', 
                (a,b) =>  si.circleIntersectsCircle(a.getShape(), b.getShape()).length,
                [(a, b) => {
                    if (a.growing || b.growing) this.stopGrowth();
                    let normal = vec.withLength(Math.min(a.restitution, b.restitution) + Math.max(a.radius + b.radius - vec.distance(a.position, b.position), 0), vec.subtract(a.position, b.position));
                    a.velocity = vec.add(a.velocity, normal);
                    b.velocity = vec.add(b.velocity, vec.inverse(normal));
                }]
            ],
            ['playerball', 'wall', 
                (a,b) =>  si.circleIntersectsSegment(a.getShape(), b.getShape()).length,
                [(ball, wall) => {
                    if (ball.growing) ball.growing = false;
                    let normal = (vec.normal(vec.subtract(wall.position, wall.end)));
                    let m;
                    if (wall.position[1] == h-1 && wall.end[1] == h-1) m = (wall.position[1] - ball.position[1])
                    else if (wall.position[0] == w-1 && wall.end[0] == w-1){ m = (wall.position[0] - ball.position[0]); normal = vec.inverse(normal)}
                    else if (wall.position[0] == 1 && wall.end[0] == 1) m = (ball.position[0] - wall.position[0])
                    else { m = (ball.position[1] - wall.position[1]); normal = vec.inverse(normal)}
                    m = ball.restitution + Math.max(ball.radius - m, 0);
                    ball.velocity = vec.add(ball.velocity, vec.withLength(m , normal))
                }]
            ],
            ['miniball', 'wall', 
                (a,b) => si.circleIntersectsSegment(a.getShape(), b.getShape()).length,
                [(ball, wall) => ball.velocity = vec.reflect(ball.velocity, vec.subtract(wall.end, wall.position))]
            ],
            ['miniball', 'miniball', 
                (a,b) => si.circleIntersectsCircle(a.getShape(), b.getShape()).length,
                [(a, b) => {
                    a.velocity = vec.mirror(vec.inverse(a.velocity), vec.subtract(a.position, b.position));
                    b.velocity = vec.mirror(vec.inverse(b.velocity), vec.subtract(b.position, a.position));
                }]
            ],
            ['wall', 'wall', (a,b) => false]
        ]);
        
        this.canvas.addHandler(() => {
            schedule.run();
            this.keyboard.handleInput();
            if (this.go){
                dcan.ctx.fillStyle = 'black';
                dcan.ctx.fillRect(0, 0, w, h)
                this.collisionManager.update();
                this.collisionManager.objects.forEach( x => x.update());
                dcan.ctx.strokeStyle = 'white';
                this.collisionManager.objects.filter( x => x.type === 'playerball').forEach( x => dcan.circle(x.position, x.radius));
                dcan.stroke();
                dcan.ctx.fillStyle = 'yellow';
                this.collisionManager.objects.filter( x => x.type === 'miniball').forEach( x => dcan.circle(x.position, x.radius));
                dcan.fill();
            }
        })
    }
    stopGrowth(){ this.collisionManager.objects.filter(x => x.type === 'playerball').forEach(x => x.growing = false)}
    addBall(){ this.collisionManager.objects.push(new PlayerBall(mouse.position))}
    run(){ this.canvas.draw()}
}
class Wall extends Body{
    constructor(public position, public end){super(idman.newId()); this.init();}
    getBoundingbox(){return sa.getBoundingboxForSegment([this.position, this.end])}
    getShape(){return [this.position, this.end]}
}
class Ball extends Body{
    public radius = 5;
    constructor(){ super(idman.newId()); this.init();}
    getBoundingbox(){return sa.getBoundingboxForCircle(this.position, this.radius)}
    getShape(){return {radius:this.radius, center: this.position}}
    getVolume(){return this.radius * this.radius * Math.PI;}
}
class PlayerBall extends Ball{
    public growing = true;
    public friction = 1 - 0.3;
    public restitution = 0;
    constructor(public position){super()}
    update(){
        super.update();
        if (this.growing) this.radius += 0.8;
        if (!this.growing) this.appliedForce = [0,1]; //Gravitation!!
    }
}
class MiniBall extends Ball{
    public velocity = vec.multiply(rand.number(0.6, 0.9) , rand.unitVector());
    public position = [rand.number(this.radius,w-this.radius), rand.number(this.radius,h-this.radius)];
}
(new Game(acan,cd,keyboard)).run();