module.exports = (args) => {

  var shell = require('shelljs');

  var silentState = shell.config.silent;
  shell.config.silent = true;

  let attemptCounter = 0
  let userName = shell.exec('git config --get user.name').exec(`tr -d '\n'`)
  let userEmail = shell.exec('git config --get user.email').exec(`tr -d '\n'`)
  let message =()=> `This is my commit message, attempt ${attemptCounter}`
  let writeTree = shell.exec(`git write-tree`).exec(`tr -d '\n'`)
  let revParse = shell.exec(`git rev-parse HEAD`).exec(`tr -d '\n'`)
  let commit =()=>`tree ${writeTree}
parent ${revParse}
author ${userName} <${userEmail}>  1545187366 +0500
committer ${userName} <${userEmail}>  1545187366 +0500

${message()}`

  let commitHash =()=> shell.exec('git rev-parse HEAD').exec(`tr -d '\n'`)


  let leadingChars = /^[0]{1}/g
  let testForZeroes = ''

  while(!testForZeroes){
    shell.echo(`${commitHash()} ${testForZeroes}`)
    attemptCounter++
    let commitMessage = commit()
    let byteNum = commitMessage.length
    let hashToSubmit =()=> {
      shell.exec(`echo "commit ${byteNum}${commitMessage}"`).exec(`sha1sum`)
    }
    let hash =()=> shell.exec(`echo "${commitMessage}"`).exec(`git hash-object -t commit -w --stdin`)
    shell.exec(`git reset --hard ${hash()}`)
    testForZeroes = commitHash().match(leadingChars)
    // testForZeroes = commitHash().slice(0,1)
    shell.echo(`${commitHash()} ${testForZeroes}`)
  }
  shell.config.silent = silentState

  // shell.exec('git push origin master')
}
