var vec = require('../Vector Functions/Vector-Functions');

function Body(position, mass, speed, charge){
  this.position = position;
  this.mass = mass || 0;
  this.speed = speed || position.map(function(){return 0});
  this.charge = charge || 0;
};

function isBody(b){
  return !!b.position;
};

function moveObject(body){
  body.position = add(body.position, body.speed);
  return body;
};


function InteractionField(){
  this.setFunction(fieldFunction);
	this.body = undefined;
};

InteractionField.prototype.setFunction = function(func){
  this.fieldFunction =  ( func)
                        ? _.memoize(func, function(body){return body.position}).bind(this)
                        : undefined;
  return this;
};

InteractionField.prototype.apply = function(body){
	body = this.fieldFunction(body);
	return body;
};

InteractionField.prototype.bindToBody = function(body){
	this.body = body;
  return body;
};
/*
  Shape
  Vector (Points are vectors pointing)/Scalar
  Bound/Free
  Static/Dynamic (Bound => Dynamic)
  Open/Closed(capped)

boolean          checkfunc(body)                       depends on shape of field and shape of body
directionVector  directionfunc(point)                  depends on position of relevant(?) point
scalar           valuefunc(body)                       might depend on body-attribute-values
body             applyfunc(body, attributeName, func)  only one attribute might be changed by one field
interactionField changefunc(body, currentTime)

  buildField({
    shape: 'radial',
    bound: spriteObject,
    cap: 200,
    offset: 10,
    type: 'vector',
    strength: 'periodic' //'constant', 'decreasing', 'increasing', 'periodic', 'custom'
    strength-parameters : {
      wavelength: 20,
      max: 10,
      min: 5
    }
  })
  .setFunction

  ... also Scrolling...:
  buildField({
    shape: 'parallel-horizontal', //implicit height == FULLHEIGHT, position == [0,0], type == 'vector', angle == 0
    strength: .....,
    touches: {
      position: ADD
    }
  })

... also Windstrom...:
  buildField({
    shape: 'parallel-horizontal',
    height: 30,
    strength: 30,
    position: [19,20],
    touches: {
      speed: ADD
    }
  })
... also Gravitation...:
  buildField({
    shape: 'radial',
    bound: body,
    inward: function(body, dist){ //implicit type == 'vector'
      g * (this.body.mass) / (dist * dist);
    },
    touches: {
      speed: ADD // == function(x){return add(x, this.value)}
    }
  })

  ==>

  function(body1, body2, config){
    var dist, dir;
    this.body = body2;

    dist = distance(body1.position, this.body.position)
    if (dist < MAXCAP){
        dir = direction(subtract(this.body.position, body1.position))
        this.value = multiply(config.inward.bind(this)(body1, dist), dir)
    }
    body1['speed'] = add(body1['speed'], value);
    return body1
  }

*/
/*
  A ForceField is a way to describe behavior of bodies in space and their
  interactions
  The metaphor of a field is used to highlight the scope of function-application
  in terms of position in space, a field has a form and a size and can therefore
  be visualized
  to apply a field in an update-map of a stateContainer you have to
  bind the apply-method to the respective ForceField-object
*/

function ForceField(fieldFunction){
  this.setFunction(fieldFunction);
	this.body = undefined;
};

ForceField.prototype = new InteractionField();

ForceField.prototype.apply = function(body){
	body.speed = vec.add(body.speed, this.fieldFunction(body));
	return body;
};




function ParallelField(reach, angle, baseLineStartOrBody, baseLineEndOrBody){
  bei allen so:
  this.reach = reach;
  this.angle = angle;
  this.baseLineStart = .....;
  etc.
|    |       /    /
|    |      /    /
|    | or  /    /  e.g.
|____|    /____/
}
ParallelField.prototype = new InteractionField();

function FanField(reach, startAngle, endAngle, centerOrBaseLineStartOrBody, optionalBaseLineEndOrBody){
\        /    \    /
 \      /  or  \  /
  \____/        \/
}
FanField.prototype = new InteractionField();




/*
  A radialField is around a center
  it has a reach from that center up to which it can meaningfully applied
  and it also starts at a certain distance from the center ("start")
  "func" depicts a function which returns the vector that should be added to
    the speed-vector of the object the field is applied to
  a radialField can be bound to a moving body or a fixed center
*/
function RadialField(reach, start, func, centerOrBody){
  if (isBody(centerOrBody)){
    this.setFunction(radialField(reach, start, func))
        .bindToBody(centerOrBody)
  } else {
    this.setFunction(radialField(reach, start, func, centerOrBody))
  }
};

RadialField.prototype = new ForceField();

function radialField(reach, start, func, center){
  return (function(body){
    var dist;

    func = func.bind(this);
    center = ( this.body)
             ? this.body.position
             : center;
    dist = vec.distance(center, body.position)
    return ( dist < reach && dist > start)
           ? vec.multiply(func(body, dist, reach), vec.direction(vec.subtract(center,body.position)))
           : [0, 0];
  })
};

/*
  This is an example-function which can be used as the "func"-parameter in the
  RadialField-constructor
*/
function gravity(body, dist, reach){
  var g;

  g = 10;
	return g * (this.body.mass) / (dist * dist);
};

/*
  These are example functions which can be used in the update-map of a
  stateContainer
*/
function randomJiggle(body){
  body.speed = add(multiply(Math.random() * 2, direction([-1+ Math.random()*2, -1+Math.random()*2])), body.speed)
  return body
};

function friction(body){
  body.speed = multiply(0.9, body.speed)
  return body
};

/*
  To more easily apply several different Forcefields you can combine them in
  one field using the CombinedField-constructor
*/
function CombinedField(){
  this.fields = _.toArray(arguments);
};

CombinedField.prototype = new ForceField();

CombinedField.prototype.addField = function(field){
  this.fields.push(field);
};

CombinedField.prototype.apply = function(body){
  var self = this
  return _.flow.apply(self,
    self.fields.map(function(field){
      return field.apply.bind(field)
    }))(body);
};
