
  
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

var inputs = readline().split(' ');
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
const initialTx = parseInt(inputs[2]); // Thor's starting X position
const initialTy = parseInt(inputs[3]); // Thor's starting Y position

console.error('lightX---'+lightX);
console.error('lightY---'+lightY);
console.error('initialTx---'+initialTx);
console.error('initialTy---'+initialTy);

// game loop
while (true) {
    const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
   //console.error('remainingTurns----'+remainingTurns);
    if(initialTx < lightX && initialTy == lightY){
        console.log('E');
    }else if(lightX == initialTx && lightY < initialTy){
        console.log('N');
    }else if(lightX < initialTx && lightY > initialTy){
            //console.error('remainingTurns----'+remainingTurns);
            if(remainingTurns >= 14 ){
                console.log('W');
            }else{
                console.log('S');
            }
    }else if(lightX > initialTx && lightY > initialTy){
        //console.error('remainingTurns----'+remainingTurns);
        // if(remainingTurns >= 26){
        //     console.log('S');    
        // }else{
        //     console.log('E');
        // }
        console.log('SE');
    }


    // A single line providing the move to be made: N NE E SE S SW W or NW
    //console.log('SE');
}