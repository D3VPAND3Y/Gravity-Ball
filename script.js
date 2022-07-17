function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  
  function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
  }

  const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

var gravity=1;
var friction=0.6;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener("click",function(){
  init();
})


// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  
  update() {
    if(this.y + this.radius +this.dy> canvas.height){
      this.dy=  -this.dy*friction;
    }
    else{
      this.dy+=gravity; 
    }
    if(this.x + this.radius + this.dx> canvas.width || this.x - this.radius<= 0){
      this.dx= -this.dx*(friction/3);
    }
    this.x+=this.dx;
    this.y= this.y + this.dy;
    this.draw()
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    // c.stroke()
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
}

// Implementation
let balls
var ballArray = [];
function init() {
  ballArray = [];
  for(var i = 0;i<200;i++){
    var radius = randomIntFromRange(20,30);

    var x = randomIntFromRange(radius,canvas.width-radius);
    var y = randomIntFromRange(0,canvas.height-radius);
    var dx = randomIntFromRange(-2,2);
    var dy = randomIntFromRange(-2,2);
    var color = randomColor(colors);
    ballArray.push(new Ball(x,y,dx,dy,radius,color));
  }

  // balls = new Ball(innerWidth / 2, innerHeight / 2, 3, 30, '#2185C5');

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  for(var i =0;i<ballArray.length;i++){
    ballArray[i].update();
  }


  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()