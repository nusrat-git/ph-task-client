const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const rotateLeft = (num,b) => {
if(b<8){

}
  num.push(num.shift());
  console.log();
  console.log(num);
};

rotateLeft(numbers,4);
