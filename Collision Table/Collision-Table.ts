import { boundingboxIntersectsBoundingbox } from 'db82-shape-intersection-detectors';

function switchArguments(fn, scope?) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return fn.apply(scope || this, args.reverse());
  };
};

export class CollisionTable{
    public handlerTable = {};
    public checkerTable = {};

    addCollisionTypeHandler(type1, type2, handler){
        if (!this.handlerTable[type1]){
            this.handlerTable[type1] = {};
        }
        if (!this.handlerTable[type2]){
            this.handlerTable[type2] = {};
        }
        if (!this.handlerTable[type1][type2]){
             this.handlerTable[type1][type2] = [];
        }
        if (!this.handlerTable[type2][type1]){
             this.handlerTable[type2][type1] = [];
        }
        this.handlerTable[type1][type2].push(handler);
        if (type1 != type2){
            this.handlerTable[type2][type1].push(switchArguments(handler));
        }
    }

    setCollisionTypeChecker(type1, type2, checker){
        if (!this.checkerTable[type1]){
            this.checkerTable[type1] = {};
        }
        if (!this.checkerTable[type2]){
            this.checkerTable[type2] = {};
        }
        this.checkerTable[type1][type2] = checker;
        let t = switchArguments(checker)
        this.checkerTable[type2][type1] = t;
    }

    setCollisionTypeCheckersAndHandlers(arr){
        let self = this;
        arr.forEach( x => {
            self.setCollisionTypeChecker(x[0], x[1], x[2]);
            if (x[3]){
                x[3].forEach(y => self.addCollisionTypeHandler(x[0], x[1], y));
            }
        })
    }

    checkAndHandleCollision(obj1, obj2){
        if (!this.checkerTable[obj1.type] || !this.checkerTable[obj1.type][obj2.type]) return;
        if (!!this.checkerTable[obj1.type][obj2.type](obj1, obj2)){
            this.handlerTable[obj1.type][obj2.type].forEach(f => f(obj1, obj2))
        }
    }

    checkCollisions(objects, checked){
        objects.forEach( obj1 =>{
            objects.filter( obj2 => {
                if (obj1 == obj2 || checked['' + obj1.id + ' ' + obj2.id]) return false;
                return boundingboxIntersectsBoundingbox(obj1.getBoundingbox(),obj2.getBoundingbox())
            }).forEach(objx => {
                this.checkAndHandleCollision(obj1, objx);
                checked['' + objx.id + ' ' + obj1.id] = true;
                checked['' + obj1.id + ' ' + objx.id] = true;
            })
        })
    }
}