var showMessage = function (message){
console.log("===========")
console.log("==="+ message )
console.log("===========")
}

showMessage('operator precedurce');

let result = 1+ (2 * 3);

console.log(result);

result = (1 +2 ) * 3;

console.log(result);

showMessage('For Loops');

for(let i=0; i<7; i++){
    console.log(i);
}

for(let i=0; i <=25; i =i+2){
    console.log(i)
}

showMessage('While loop');

let looper =10;
while (looper < 15){
    console.log(looper++);
}

do{
    console.log(looper ++)
} while(looper < 20);