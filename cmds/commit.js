module.exports = (args) => {

  // git logs, parse stdout, and use jQuery Global plugin v1.0.0pre.

  var spawn = require('child_process').spawn,
  git = spawn('git', ['log'])

  // date and fr modules are jQuery.global plugins ported to node
  // date = require('./global'),
  // fr = require('./fr');


  git.stdout.on('data', function (s) {

    s = s.toString();

    var commits = s.split(/\n\nc/);

    commits.forEach(function(mit){
      mit = /^c/.test(mit) ? mit : 'c' + mit;

      var commit = mit.match(/[\da-f]{40}/),
      author = mit.match(/Author:\s([^<]+)?/),
      d = mit.match(/Date:\s*(.+)/),
      comment = mit.match(/\n\n\s*(.+)/);

      console.log('commit: ', commit[0]);
      console.log('author: ', author[1]);
      // console.log('date: ', date.format(new Date(d[1]), 'F', 'fr'));
      console.log('comment: ', comment[1]);

      console.log('\n\n');
    });



  });

  git.stderr.on('data', function (data) {
    console.log('g stderr: ' + data);
  });

  git.on('exit', function (code) {
    console.log('ug child process exited with code ' + code);
  });

}