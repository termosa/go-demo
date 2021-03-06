const go = require('go')

go.use(require('go-plugin-quiz'))
go.use(require('go-plugin-cli'))
go.use(require('go-plugin-fs'))
go.use(require('go-plugin-handlebars'))

go.registerCommand(require('./scripts/deploy'))
go.registerCommand(require('./scripts/generate'))
go.registerCommand(require('./scripts/help'))
go.registerCommand(require('./scripts/search'))
