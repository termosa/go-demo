const go = require('go')
const fuzzy = require('fuzzy')
const opn = require('opn')

go.createDirSync('./src/components')
const modules = go.fs.readdirSync('./src/components')
  .filter(name => !name.startsWith('.'))

module.exports = {
  name: 'search',
  description: 'why to create what already exists?',
  async callback () {
    if (modules.length) {
      const component = await go.ask({
        message: 'search:',
        prefix: '',
        source: input => input
          ? fuzzy
            .filter(input, modules)
            .sort((a, b) => a.score - b.score)
            .map(result => result.string)
          : modules
      })

      return go.fs.stat(`./src/components/${component}/${component}.component.md`)
        .then(
          () => { opn(`./src/components/${component}/${component}.component.md`) },
          () => { opn(`./src/components/${component}`) }
        )
    } else {
      console.log('there are no any modules yet')
    }
  }
}
