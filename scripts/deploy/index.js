const go = require('go')
const ora = require('ora')
const chalk = require('chalk')
const git = require('simple-git')(process.cwd())

const party = '🎉'

const getCommitMessage = (branch) => new Promise(resolve => {
  git.log([branch], (err, summary) => {
    resolve(summary.latest.message.replace(/\s+\([^\(]*\)$/, ''))
  })
})

const search = () => new Promise((resolve) => {
  const text1 = 'load branches..'
  const text2 = 'load branches...'

  const spinner = ora({ text: text1, spinner: 'weather' }).start()
  const interval = setInterval(() => { spinner.text = spinner.text === text1 ? text2 : text1 }, 500)
  const close = (branches) => {
    clearInterval(interval)
    spinner.stop()
    resolve(branches)
  }

  git.branchLocal((err, summary) => {
    Promise
      .all(summary.all.map(async (branch) => `${branch} (last commit: ${await getCommitMessage(branch)})`))
      .then(close)
  })
})

const push = (branch, server) => new Promise((resolve) => {
  const text1 = `pushing ${branch} to ${server}..`
  const text2 = `pushing ${branch} to ${server}...`

  const spinner = ora({ text: text1, spinner: 'weather' }).start()
  const toggleSpinner = () => { spinner.text = spinner.text === text1 ? text2 : text1 }
  const interval = setInterval(toggleSpinner, 500)
  const close = (branches) => {
    clearInterval(interval)
    spinner.stop()
    resolve(branches)
  }
  setInterval(close, 8000)
})

const deploy = (server) => {
  return async () => {
    const branches = await search()
    const branch = (branches.length > 1
      ? await go.ask({ message: 'choose branch to deploy', choices: branches })
      : branches[0]).split(' ')[0]

    if (await go.confirm(`Are you sure you want deploy ${chalk.underline(branch)} to ${chalk.underline(server)}?`, false)) {
      await push(branch, server)
      console.log(`Code is deployed!  ${party}  ${party}  ${party}`)
      console.log('Now go, and write more code!')
    } else {
      console.log('Good choice! Let\'s run more tests first')
    }
  }
}

module.exports = {
  name: 'deploy',
  description: 'push changes to server',
  title: 'choose server:',
  commands: [
    { name: 'staging',
      callback: deploy('staging') },

    { name: 'test',
      callback: deploy('test') },

    { name: 'production',
      callback: deploy('production') }

  ]
}
