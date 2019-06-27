var scribble = require("../index")
scribble.config({standerOut:()=>{}})
    scribble("helloworld");


const x =  [1,2];
x.forEach(()=>{
  scribble(new Error("could not find"))
})
//scribble(new Error("you forgot username"))
//scribble(new Error("you forgot password"))
x.forEach((a)=>{
  scribble(new Error(a === 1 ? "you forgot username" : "xx"))
})
x.forEach((a)=>{
  scribble(new Error("error somewhere in the code"),{a})
})
scribble(new Error("error somewhere in the code"))

//console.log( scribble.snapShotErrorGraph() )
/*
var pickNMixErrors = require('pick-n-mix/errors')
    pickNMixErrors.registry(['Range>InvalidArgument','Authorization']);

var AuthorizationError = pickNMixErrors.AuthorizationError
var myError = new AuthorizationError("Bad password",{name:"kevin"})
console.log(JSON.stringify(myError))
console.log(Object.keys(myError))

pickNMixErrors.registry("foo")
pickNMixErrors.registry("bar")

var foo1 = new pickNMixErrors.fooError("foo 1",{a:1})
var foo2 = new pickNMixErrors.fooError("foo 2",{a:1})
*/

// error type
//  |
// where in code
// |
// messages // problem in ${sql} conntion / could not connent
// |
// values
