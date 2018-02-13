module.exports = {
  name: 'component',
  description: 'custom HTML elements (https://angular.io/api/core/Component)',
  title: 'choose component type:',
  commands: [
    require('./block'),
    require('./page'),
    require('./widget'),
    require('./layout')
  ]
}
