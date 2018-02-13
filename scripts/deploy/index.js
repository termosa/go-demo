const deployStaging = () => {}
const deployTest = () => {}
const deployProduction = () => {}

module.exports = {
  name: 'deploy',
  description: 'push changes to server',
  title: 'choose server:',
  commands: [
    { name: 'staging',
      description: '',
      callback: deployStaging },

    { name: 'test',
      description: '',
      callback: deployTest },

    { name: 'production',
      description: '',
      callback: deployProduction }

  ]
}
