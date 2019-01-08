module.exports = (args) => {
  var shell = require('shelljs');
  let spawn = require('child_process').spawn

  var silentState = shell.config.silent;
  shell.config.silent = true;

  let userName = shell.exec('git config --get user.name').exec(`tr -d '\n'`)
  let userEmail = shell.exec('git config --get user.email').exec(`tr -d '\n'`)
  let writeTree = shell.exec(`git write-tree`).exec(`tr -d '\n'`)
  let commitHash =()=> shell.exec('git rev-parse HEAD').exec(`tr -d '\n'`)

  let attemptCounter = 0
  let message =()=> `This is my commit message, attempt ${attemptCounter}`

// KEEP FORMATTING THIS WAY! New lines in string literals is inerpreted as new lines, and tabs are registered as tabs.
  let commit =()=>`tree ${writeTree}
parent ${commitHash()}
author ${userName} <${userEmail}> 1545187366 +0500
committer ${userName} <${userEmail}> 1545187366 +0500

${message()}`
  let hash


let testForZeroes =''

  while(attemptCounter < 5){
  // while(testForZeroes != '0'){
    attemptCounter++
    let commitMessage = commit()
      // let hashToSubmit =()=> shell.exec(`echo "commit ${byteNum}${commitMessage}"`).exec(`sha1sum`)
    let hashMaker =()=> shell.exec(`echo "${commitMessage}"`).exec(`git hash-object -t commit -w --stdin`)
    hash = hashMaker()
    // testForZeroes = shell.exec('git rev-parse HEAD').exec(`tr -d '\n'`).slice(0,1)
    testForZeroes = hash.slice(0,1)
      shell.echo(`LOOK AT ME!!!! ${hashMaker()}`)
  }
  shell.config.silent = silentState
  // shell.exec(`git reset --hard ${hash}`)

  // shell.exec('git push origin master')
}
