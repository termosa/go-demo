const generate = {
  name: 'generate',
  description: 'interactive assistant to help you create Angular modules',
  title: 'choose module type:',
  commands: [
    require('./component'),
    { name: 'service',
      description: 'business logic (https://angular.io/guide/providers)',
      callback () {} },
    { name: 'directive',
      description: 'component decorator (https://angular.io/api/core/Directive)',
      callback () {} },
    { name: 'pipe',
      description: 'display-value transformation (https://angular.io/guide/pipes)',
      callback () {} },
    { name: 'interface',
      description: 'TypeScript interface instance (https://www.typescriptlang.org/docs/handbook/interfaces.html)',
      callback () {} },
    { name: 'enum',
      description: 'TypeScript enum instance (https://www.typescriptlang.org/docs/handbook/enums.html)',
      callback () {} }
  ]
}

module.exports = generate
