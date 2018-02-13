const go = require('go')
const opn = require('opn')

const collectData = () => go.ask([
  { name: 'name',
    message: 'component name:',
    transformer: (name) => name.toLowerCase(),
    filter: (name) => name && name.trim().toLowerCase(),
    validate (name) {
      if (!name) return 'name can\'t be empty'
      if (/^[-\d]/.test(name)) return 'name can\'t start with number or minus (-)'
      if (!/^[-a-z\d]+$/.test(name)) return 'name can only contain latin letters, numbers and minus (-)'
      return true
    }
  },

  { name: 'short',
    message: 'enter short description of the component',
    transformer: (short) => short.trim(),
    validate: (short) => short ? true : 'can\'t be empty'
  },

  { name: 'description', type: 'editor',
    message: 'describe how to use component (using markdown)',
    transformer: (description) => description.trim(),
    default: ({ name }) =>
      go.loadTemplate('component.md').then(template => template({ name }))
  }
])

const generateBlock = async () => {
  const { name, short, description } = await collectData()

  const path = `./src/components/${name}`
  const docPath = `${path}/${name}.component.md`
  const modulePath = `${path}/${name}.component.ts`
  const templatePath = `${path}/${name}.component.html`
  const stylePath = `${path}/${name}.component.css`

  await go.writeFile(docPath, `# ${name}\n\n${short}\n\n${description}`)
  await go.writeFile(stylePath, '')

  const className = name.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join('') + 'Component'
  await go.processTemplate('component.ts', modulePath, { name, className })
  await go.processTemplate('component.html', templatePath, { name })

  console.log(` component is created and waiting for you in ./src/components/${name}/`)

  if (await go.confirm('do you want to open it now?')) {
    opn(modulePath)
  }
}

module.exports = {
  name: 'block',
  description: 'low-level HTML element',
  callback: generateBlock
}
