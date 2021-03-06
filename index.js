const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))
  const cmd = args._[0]

  switch (cmd) {
    case 'simple':
      require('./cmds/simple')(args)
      break
    case 'hash':
      require('./cmds/hash')(args)
      break
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}
