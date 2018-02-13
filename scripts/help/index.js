const { resolve } = require('path')
const opn = require('opn')
const { spawn } = require('child_process')

module.exports = {
  name: 'help',
  description: 'good place to start',
  callback: (argv) => {
    if (argv.geek) {
      return new Promise(() => {
        spawn(`less ${resolve(__dirname, 'help.txt')}`, { stdio: 'inherit', shell: true })
          .on('exit', () => resolve())
      })
    } else {
      opn(resolve(__dirname, 'help.html'))
    }
  }
}
