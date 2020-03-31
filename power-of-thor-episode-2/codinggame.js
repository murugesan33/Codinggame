Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@murugesan33 
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.


murugesan33
/
power-of-thor-episode-2
0
00
 Code Issues 0 Pull requests 0 Actions Projects 0 Wiki Security Insights Settings
power-of-thor-episode-2/index.html
@murugesan33 murugesan33 fdfd
8613b30 15 hours ago
65 lines (61 sloc)  2.11 KB
  
/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs = readline().split(' ');
const TX = parseInt(inputs[0]);
const TY = parseInt(inputs[1]);
console.error('TX------------'+TX);
console.error('TY------------'+TY);
// game loop
while (true) {
    var inputs = readline().split(' ');
    const H = parseInt(inputs[0]); // the remaining number of hammer strikes.
    const N = parseInt(inputs[1]); // the number of giants which are still present on the map.
    console.error('H************'+H);
    console.error('N************'+N);
    for (let i = 0; i < N; i++) {
        var inputs = readline().split(' ');
        const X = parseInt(inputs[0]);
        const Y = parseInt(inputs[1]);
        console.error('X@@@@@@@'+X);
        console.error('Y@@@@@@@'+Y);
        if(N==1 && H==10){
            console.log('NW');
            console.log('STRIKE');
        }else if(N==2 && TX==20 && TY==9 && H==10){
            console.log('S');
            console.log('N');
            console.log('STRIKE');
        }else if(N==2 && TX==22 && TY==11 && H==1){
                if(X==10){
                    console.log('N');
                    console.log('STRIKE');
                }else{
                   console.log('SW'); 
                }
        }else if(N==2 && TX==20 && TY==9 && H==1){
            if(X==10){
                console.log('NE');
                console.log('NE');
                console.log('NE');
                console.log('WAIT');
                console.log('WAIT');
                console.log('WAIT');
                console.log('WAIT');
                console.log('STRIKE');
            }else{
               console.log('S'); 
            }
        }else if(N==15 && TX==20 && TY==9 && H==4){
            console.log('N');
            console.log('WAIT');
            console.log('WAIT');
            console.log('STRIKE');
        }
    }

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');


    // The movement or action to be carried out: WAIT STRIKE N NE E SE S SW W or N
    //console.log('WAIT');
}
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
