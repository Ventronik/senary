module.exports = (args) => {
  var shell = require('shelljs')
  let counter = 0

  let world =()=> `world ${counter}`
  let greeting =()=> {
    world()
    shell.echo(`hello ${world()}`)
  }

  while(counter < 10) {
    counter++
    greeting()
  }


  // var exec = require('child_process').exec, child;
  //
  // child = exec('cat *.js bad_file | wc -l',
  //     function (error, stdout, stderr) {
  //         console.log('stdout: ' + stdout);
  //         console.log('stderr: ' + stderr);
  //         if (error !== null) {
  //              console.log('exec error: ' + error);
  //         }
  //     });
}
