module.exports = (args) => {
  var shell = require('shelljs');
  let spawn = require('child_process').spawn;

  var silentState = shell.config.silent;
  shell.config.silent = true;

  let userName = String(shell.exec('git config --get user.name')).slice(0, -1)//.exec(`tr -d '\n'`);
  let userEmail = String(shell.exec('git config --get user.email')).slice(0, -1)//.exec(`tr -d '\n'`);
  let writeTree = String(shell.exec(`git write-tree`)).slice(0, -1)//.exec(`tr -d '\n'`);
  let commitHash = String(shell.exec('git rev-parse HEAD')).slice(0, -1)//.exec(`tr -d '\n'`);

  let attemptCounter = 0;
  let message =()=> `This is my commit message, attempt ${attemptCounter}`;
  let hash;
  let testForZeroes ='';

// KEEP FORMATTING THIS WAY! New lines in string literals is inerpreted as new lines, and tabs are registered as tabs.
  let commit =()=>`tree ${writeTree}
parent ${commitHash}
author ${userName} <${userEmail}> 1545187366 +0500
committer ${userName} <${userEmail}> 1545187366 +0500

${message()}`;

  while(attemptCounter < 10){
  // while(testForZeroes != '00'){
    attemptCounter++
    let commitMessage = commit();
      // let hashToSubmit =()=> shell.exec(`echo "commit ${byteNum}${commitMessage}"`).exec(`sha1sum`)
    let hashMaker =()=> shell.exec(`echo "${commitMessage}"`).exec(`git hash-object -t commit -w --stdin`);
    hash = String(hashMaker()).slice(0, -1)//.exec(`tr -d '\n'`);
    // testForZeroes = shell.exec('git rev-parse HEAD').exec(`tr -d '\n'`).slice(0,1)
    testForZeroes = hash.slice(0,2);
    // shell.echo(`LOOK AT ME!!!! ${userName} ${attemptCounter}`)
  }
  shell.config.silent = silentState;
  // shell.exec(`git reset --hard ${hash}`);

  // shell.exec('git push origin master');
}
