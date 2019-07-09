const FuzzySet = require('fuzzyset.js');

//=====================================================
//========================================= Error graph
//=====================================================

const errorGraphData = { __meta:{ __info:{} } }

function errorGraph(stack,args) {


  /*
           Object.assign( errorGraphData.__meta.__info, {
             running: branch,
             repo:    repo,
             mode:    config.mode,
             gitHash: short
           })*/

  let stackArr, name, message, path;

  if('string' === typeof stack) {
    stackArr = stack.split('\n');
    [name,message] = stackArr.shift().split(/:(.+)?/);
    path = stackArr[0].split("(").pop().slice(0, -1)
  } else if (stack instanceof Error) {
    stackArr = stack.stack.split('\n');
    name = stack.type || stack.name;
    message = stack.message;
    path = stackArr[1].split("(")[1].slice(0, -1);
  } else {
    debugger
    throw new Error(`${typeof stack} is not a supported type of error`)
  }

  const valsKey = JSON.stringify(args || "?")

  errorGraphData[name] = errorGraphData[name] || { __meta:{ } };
  errorGraphData.__meta[name] = errorGraphData.__meta[name] ? errorGraphData.__meta[name] + 1 : 1

  errorGraphData[name][path] = errorGraphData[name][path] || {__meta:{ __relationship:[] }};
  errorGraphData[name].__meta[path] = errorGraphData[name].__meta[path] ? errorGraphData[name].__meta[path] + 1 : 1

  errorGraphData[name][path][message] = errorGraphData[name][path][message] || {__meta:{}};

//console.log(message)
  // message relationship
  //const errorMessageLookUp = FuzzySet(Object.keys(errorGraphData[name][path].__meta).filer(message => ! message.startsWith('__')));
  Object.keys(errorGraphData[name][path].__meta)
        .filter(extMessage => ! extMessage.startsWith('__') && extMessage !== message)
        .forEach(extMessage => {

          let relationship = FuzzySet([extMessage]).get(message)
          if( ! relationship){
            return; // FuzzySet can return NULL to its not a match
          }
          relationship = relationship[0]
          relationship.push(message)
          errorGraphData[name][path].__meta
                                    .__relationship
                                    .push(relationship)
        })

  errorGraphData[name][path].__meta[message] = errorGraphData[name][path].__meta[message] ? errorGraphData[name][path].__meta[message] + 1 : 1

  errorGraphData[name][path][message][valsKey] = args
  errorGraphData[name][path][message].__meta[valsKey] = errorGraphData[name][path][message].__meta[valsKey] ? errorGraphData[name][path][message].__meta[valsKey]+1 : 1

//  console.log(JSON.stringify(errorGraphData))

} // END errorGraph

errorGraph.dump = function(){
  // Us use JSON as we dont want people messing with our data
  return JSON.parse(JSON.stringify(errorGraphData))
}

export default errorGraph;
