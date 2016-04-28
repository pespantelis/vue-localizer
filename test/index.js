var context = require.context('./specs', true, /\.js$/)
context.keys().forEach(context)

var srcContext = require.context('../src', true, /^\.\/(?!index(\.js)?$)/)
srcContext.keys().forEach(srcContext)
