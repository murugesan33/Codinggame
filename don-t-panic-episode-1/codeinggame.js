/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const nbFloors = parseInt(inputs[0]); // number of floors
const width = parseInt(inputs[1]); // width of the area
const nbRounds = parseInt(inputs[2]); // maximum number of rounds
const exitFloor = parseInt(inputs[3]); // floor on which the exit is found
const exitPos = parseInt(inputs[4]); // position of the exit on its floor
const nbTotalClones = parseInt(inputs[5]); // number of generated clones
const nbAdditionalElevators = parseInt(inputs[6]); // ignore (always zero)
const nbElevators = parseInt(inputs[7]); // number of elevators

//const elevatorPosValue1 = [];
//const elevatorFloorValue1 = [];

let elevatorPosValue = 0;
let elevatorFloorValue = 0;

for (let i = 0; i < nbElevators; i++) {
   // console.error('Murugesan');
    var inputs = readline().split(' ');
    const elevatorFloor = parseInt(inputs[0]); // floor on which this elevator is found
    const elevatorPos = parseInt(inputs[1]); // position of the elevator on its floor
  //  elevatorPosValue1.push(elevatorPos);
//    elevatorFloorValue1.push(elevatorFloor);
    elevatorPosValue = elevatorPos;
    elevatorFloorValue = elevatorFloor;
    console.error('elevatorPosValue1----'+elevatorPosValue1);
    console.error('elevatorFloorValue1----'+elevatorFloorValue1);
  //  console.error('elevatorFloor----'+elevatorFloor+'-------elevatorPos'+elevatorPos);
}



//game loop
while (true) {
    var inputs = readline().split(' ');
    const cloneFloor = parseInt(inputs[0]); // floor of the leading clone
    const clonePos = parseInt(inputs[1]); // position of the leading clone on its floor
    const direction = inputs[2]; // direction of the leading clone: LEFT or RIGHT

   // console.error('nbElevators----'+nbElevators+'----nbFloors'+nbFloors);  

  // console.error('nbElevators----'+nbElevators+'----nbFloors'+nbFloors+'----clonePos'+clonePos+'---exitPos'+exitPos);  

 //console.error('elevatorPosValue----'+elevatorPosValue);
  //console.error('elevatorFloorValue----'+elevatorFloorValue);
  //console.error('cloneFloor----'+cloneFloor+'----clonePos'+clonePos+'----exitPos'+exitPos);
  //console.error('nbFloors---'+nbFloors);
    if(nbFloors == 1 && clonePos > exitPos && direction == 'RIGHT'){
        console.log('BLOCK');
    }else if(nbFloors > 1){
       // for(let index = 0; index<nbFloors;index++){
          if(cloneFloor == (nbFloors-1) && clonePos > elevatorPosValue && direction == 'RIGHT' ){
            console.log('BLOCK');    
          }else if(elevatorFloorValue == cloneFloor && clonePos > elevatorPosValue && direction == 'RIGHT' ){
              console.log('BLOCK'); 
          }
       // }
    }
   console.log('WAIT');     // action: WAIT or BLOCK
}
