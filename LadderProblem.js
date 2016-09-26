var distanceVertical
var distanceHorizontal
var theta
var distanceDiagonal
var distancePerson
var massLadder
var massPerson
var forceLadder
var forcePerson
var forceNormal
var forceWall
var forceFriction
var torqueLadder
var torquePerson
var torqueWall
var mew
var g = 10

function calculateTorques(){
  torquePerson = -1*forcePerson*distancePerson*Math.cos(Math.PI/180*theta)
  torqueLadder = -1*forceLadder*distanceDiagonal/2*Math.cos(Math.PI/180*theta)
  torqueWall = -1*(torqueLadder+torquePerson)
  calculateMew()
}

function calculateForces(){
  forceLadder = g*massLadder
  forcePerson = g*massPerson
  forceNormal = forceLadder+forcePerson
  calculateTorques()
  forceWall = torqueWall/distanceVertical
  forceFriction = forceWall
}

function calculateMew(){
  mew = forceFriction/forceNormal
  console.log(`distanceVertical:${distanceVertical} distanceHorizontal:${distanceHorizontal} theta:${theta} distanceDiagonal:${distanceDiagonal} distancePerson:${distancePerson} massLadder:${massLadder} massPerson:${massPerson} forceLadder:${forceLadder} forcePerson:${forcePerson} forceNormal:${forceNormal} forceWall:${forceWall} forceFriction:${forceFriction} torqueLadder:${torqueLadder} torquePerson:${torquePerson} torqueWall:${torqueWall} mew:${mew} g:${g}`)
  document.getElementById("answers").innerHTML = `distanceVertical:${distanceVertical} distanceHorizontal:${distanceHorizontal} theta:${theta} distanceDiagonal:${distanceDiagonal} distancePerson:${distancePerson} massLadder:${massLadder} massPerson:${massPerson} forceLadder:${forceLadder} forcePerson:${forcePerson} forceNormal:${forceNormal} forceWall:${forceWall} forceFriction:${forceFriction} torqueLadder:${torqueLadder} torquePerson:${torquePerson} torqueWall:${torqueWall} mew:${mew} g:${g}`
}

function handleClick(e){
  var form = document.getElementById("myForm")
  var name = e.name
  var value = e.value
  if(name.includes("distance")){
    if(name==="distanceHorizontal"){
      distanceHorizontal = Math.round(value*1000)/1000
      if(theta != undefined){
        form.distanceDiagonal.value = distanceDiagonal = value/Math.cos(Math.PI/180*theta)
        form.distanceVertical.value = distanceVertical = value*Math.tan(Math.PI/180*theta)
      }
    }
    else if(name==="distanceVertical"){
      distanceVertical = Math.round(value*1000)/1000
      if(theta != undefined){
        form.distanceDiagonal.value = distanceDiagonal = value/Math.sin(Math.PI/180*theta)
        form.distanceHorizontal.value = distanceHorizontal =value/Math.tan(Math.PI/180*theta)
      }
    }
    else if(name==="distanceDiagonal"){
      distanceDiagonal = Math.round(value*1000)/1000
      if(theta != undefined){
        form.distanceVertical.value = distanceVertical = value*Math.sin(Math.PI/180*theta)
        form.distanceHorizontal.value = distanceHorizontal = value*Math.cos(Math.PI/180*theta)
      }
    }
    else if(name === "distancePerson"){
      distancePerson = Math.round(value*1000)/1000
    }
  }
  else if(name.includes("Theta")){
    form.hTheta.value = theta = (name==="vTheta")?(90-value):value
    form.vTheta.value = value
  }
  else if(name.includes("mass")){
    if(name==="massPerson")
      massPerson = value
    else
    massLadder = value
  }
  var thetaBool = form.vTheta.value != "" || form.hTheta.value != ""
  var distanceDiagonalBool = form.distanceDiagonal.value != ""
  var distanceHorizontalBool = form.distanceHorizontal.value != ""
  var distanceVerticalBool = form.distanceVertical.value != ""
  var distancePersonBool = form.distancePerson.value != ""
  var massPersonBool = form.massPerson.value != ""
  var massLadderBool = form.massLadder.value != ""
  console.log(thetaBool && distanceDiagonalBool && distanceHorizontalBool && distanceVerticalBool && massPersonBool && massLadderBool)
  if(thetaBool && distanceDiagonalBool && distanceHorizontalBool && distanceVerticalBool && massPersonBool && massLadderBool){
    calculateForces()
  }
}
