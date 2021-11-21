const program = require('commander')

const {creatProjectAction,addComponentAction,addPageAndRouteAction,addStoreAction} = require('./actions')

const createCommand = ()=>{
  program
    .command('create <project> [others...]')
    .description('clone repository into a folder')
    .action(creatProjectAction)

  program
  .command('addcpn <name>')
  .description('add vue component,例如: why addcpn HelloWorld [-d src/components]')
  .action((name)=>{
      addComponentAction(name, program._optionValues.dest || 'src/components')
  })

  program
   .command('addpage <page>')
   .description('add vue page and router config,例如：why addpage Home [-d src/pages]')
   .action((page) => {
      addPageAndRouteAction(page, program._optionValues.dest || `src/pages/${page.toLowerCase()}`)
   })

   program
   .command('addstore <store>')
   .description('add vuex page ,例如：why addstore Home [-d src/pages]')
   .action((store) => {
      addStoreAction(store, program._optionValues.dest || `src/store/modules/${store.toLowerCase()}`)
   })

} 

module.exports = createCommand