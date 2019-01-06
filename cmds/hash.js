module.exports = (args) => {

  let spawn = require('child_process').spawn

  let userName = spawn('git', ['config', '--get', 'user.name'])
  let userEmail = spawn('git', ['config', '--get', 'user.email'])

  let message = "This is my commit message."

  let uName
  let uEmail

  let experiment = () => {
    console.log('finishLine: ', uName.toString('utf8'), uEmail.toString('utf8'))
    let echo = `tree 'git write-tree'/nparent 'git rev-parse --HEAD'\nauthor ${uName} ${uEmail} 1545187366 +0500/n/n'hello'`
    let commit = spawn('echo', [echo])
    commit.stdout.on('data', function(data){
      console.log('experiment: ', data.toString('utf8'))
    })
  }

  let getEmail = () =>{
    userEmail.stdout.on('data', function (data) {
      console.log('User email stdout: ' + data);
      uEmail = data
    });
  }

  userName.stdout.on('data', function (data) {
    uName = data
    // console.log('User Name stdout: ' + uName);
  });

  userName.stderr.on('data', function (data) {
    // console.log('User name stderr: ' + data);
  });

  userName.on('exit', function (code) {
      console.log('User name child process exited with code ' + uName);
      getEmail()
  });


  userEmail.stderr.on('data', function (data) {
    // console.log('User email stderr: ' + data);
  });

  //
  userEmail.on('exit', function (code) {
    // console.log('User email child process exited with code ' + code);
    // let hashString = `tree 'git write-tree'/nparent 'git rev-parse --HEAD'\nauthor ${uName} ${uEmail} 1545187366 +0500/n/n${message}`
    // let hashData
    // let git = spawn('echo', [hashString]);
      // git.stdout.on('data', function (data) {
        // hashData = data
        // console.log('g stdout: ' + data);
      // });

      // git.stderr.on('data', function (data) {
        // console.log('g stderr: ' + data);
      // });

      // git.on('exit', function (code) {
        // console.log('ug child process exited with code' + code);
        experiment()
      // });

  });
}
