module.exports = (args) => {
  var shell = require('shelljs');
  let spawn = require('child_process').spawn

  var silentState = shell.config.silent;
  shell.config.silent = true;

  let attemptCounter = 0
  let userName = shell.exec('git config --get user.name').exec(`tr -d '\n'`)
  let userEmail = shell.exec('git config --get user.email').exec(`tr -d '\n'`)
  let message = `This is my commit message, attempt ${attemptCounter}`
  let writeTree = shell.exec(`git write-tree`).exec(`tr -d '\n'`)
  let revParse = shell.exec(`git rev-parse HEAD`).exec(`tr -d '\n'`)
  let commit =`tree ${writeTree}
parent ${revParse}
author Dan Kozlowski <koz@planetscale.com> 1545187366 +0500
committer Dan Kozlowski <koz@planetscale.com> 1545187366 +0500

${message}`

let byteNum = shell.exec(`echo "${commit}"`).exec('wc -c').exec(`tr -d '\n'`)
let hashToSubmit = shell.exec(`echo "commit ${byteNum}${commit}"`).exec(`sha1sum`)
let hash = shell.exec(`echo "${commit}"`).exec(`git hash-object -t commit -w --stdin`)

shell.exec(`git reset --hard ${hash}`)

let commitHash = shell.exec('git rev-parse HEAD').exec(`tr -d '\n'`)

shell.config.silent = silentState
commitHash = commitHash.slice(0,1)

while(commitHash != '0'){
  attemptCounter++

}
shell.echo(`${commitHash} ${revParse}`)





  //
  // let experiment = () => {
  //   console.log('finishLine: ', uName.toString('utf8'), uEmail.toString('utf8'))
  //   let echo = `tree 'git write-tree'/nparent 'git rev-parse --HEAD'\nauthor ${uName} ${uEmail} 1545187366 +0500/n/n'hello'`
  //   let commit = spawn('echo', [echo])
  //   commit.stdout.on('data', function(data){
  //     console.log('experiment: ', data.toString('utf8'))
  //   })
  // }
  //
  // let getEmail = () =>{
  //   userEmail.stdout.on('data', function (data) {
  //     console.log('User email stdout: ' + data);
  //     uEmail = data
  //   });
  // }
  //
  // userName.stdout.on('data', function (data) {
  //   uName = data
  //   // console.log('User Name stdout: ' + uName);
  // });
  //
  // userName.stderr.on('data', function (data) {
  //   // console.log('User name stderr: ' + data);
  // });
  //
  // userName.on('exit', function (code) {
  //     // console.log('User name child process exited with code ' + uName);
  //     getEmail()
  // });
  //
  //
  // userEmail.stderr.on('data', function (data) {
  //   // console.log('User email stderr: ' + data);
  // });
  //
  // //
  // userEmail.on('exit', function (code) {
  //       experiment()
  // });


}
