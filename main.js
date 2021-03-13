const fs=require('fs');
var a=fs.readFileSync("input.txt",(err,data)=>{
    console.log(data.toString());
});
console.log(a.toString());