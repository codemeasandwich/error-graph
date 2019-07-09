import React from 'react';
import errorGraph from './errorGraph';
import {Sigma, RelativeSize} from 'react-sigma';
// dsdf
let myGraph = {
  "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 1, "y": 0, "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 0, "y": 1, "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 2, "y": 1, "size": 1
    }
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
  ]
};



const errorsArray = [], x =  [1,2];

x.forEach(()=>{
  errorsArray.push(new Error("could not find"))
})
errorsArray.push(new Error("you forgot username"))
errorsArray.push(new Error("you forgot password"))
x.forEach((a)=>{
  errorsArray.push(new Error(a === 1 ? "you forgot username" : "xx"))
})
x.forEach((a)=>{
  errorsArray.push(new Error("error somewhere in the code"))
})
errorsArray.push(new Error("error somewhere in the code"))


errorsArray.forEach(({stack})=>errorGraph(stack))


console.log(errorGraph.dump())


//TODO: errorGraphJSON -> to -> Sigma JSON

function App() {
  return (
    <div style={{backgroundColor:'eee'}}>
      <Sigma graph={myGraph} settings={{drawEdges: true}}>
        <RelativeSize initialSize={15}/>
      </Sigma>
    </div>
  );
}

export default App;
