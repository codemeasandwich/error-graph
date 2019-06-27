const errorGraph = require('./errorGraph')

const errors = [
`Error: request problem
 at Object.<anonymous> (/Users/user/Documents/www/file.js:4:12)
 at Module._compile (internal/modules/cjs/loader.js:774:30)
 at Object.Module._extensions..js (internal/modules/cjs/loader.js:785:10)
 at Module.load (internal/modules/cjs/loader.js:641:32)
 at Function.Module._load (internal/modules/cjs/loader.js:556:12)
 at Function.Module.runMain (internal/modules/cjs/loader.js:837:10)
 at internal/main/run_main_module.js:17:11`,
`Error: request problem
 at Object.<anonymous> (/Users/user/Documents/www/file.js:4:12)`,
`Error: request problem
 at Object.<anonymous> (/Users/user/Documents/www/file.js:44:3)`,
`Error: user login problem
 at Object.<anonymous> (/Users/user/Documents/www/foo.js:4:12)`,
`Error: user password problem
 at Object.<anonymous> (/Users/user/Documents/www/foo.js:4:12)`
]

test('errors as stack traces', () => {

  errors.forEach(stack => errorGraph(stack))
  console.log(errorGraph.dump())
  expect(errorGraph.dump()).toMatchSnapshot();
});
