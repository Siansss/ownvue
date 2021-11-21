const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const {vueRepo} = require('../config/repo.config')
const {commandSpawn} = require('../utils/terminal')
const {compile,writeToFile,createDirSync} = require('../utils/utils')

const creatProjectAction =  async (project) =>{
  console.log("why help you create your project~");
  // 1.clone项目
  await download(vueRepo,project,{clone:true})
  // 2.执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'],{cwd:`./${project}`})
  // 3.运行npm run serve
  commandSpawn(command,['run','serve'],{cwd:`./${project}`})
  // 4.打开浏览器
  open("http://localhost:8080/")

}

// 添加组件的action
const addComponentAction = async (name,dest) =>{
  // 1.有对应的ejs模块
  // 2.编译ejs模板 result
  const result =  await compile('vue-component.ejs',{name,lowerName: name.toLowerCase()})
  // 3.将result写入到.vue文件中
  const targetPath = path.resolve(dest,`${name}.vue`)
  // 4.放到对应的文件夹中
  await writeToFile(targetPath,result)

}

// 添加组件和路由
const addPageAndRouteAction = async (name,dest) =>{
  // 1.编译ejs模板
  const data = {name,lowerName: name.toLowerCase()}
  const pageResult = await compile('vue-component.ejs',data)
  const routeResult = await compile('vue-router.ejs',data)
 
  // 2.写入文件
  if(createDirSync(dest)){
    const targetPagePath = path.resolve(dest,`${name}.vue`)
    const targetRoutePath = path.resolve(dest,`router.js`)

    
    // 3.放到对应的文件夹中
    await writeToFile(targetPagePath,pageResult)
    await writeToFile(targetRoutePath,routeResult)
  }
}

const addStoreAction = async (name,dest) =>{
  // 1.编译过程
  const storeResult = await compile('vue-store.ejs',{})
  const typesResult = await compile('vue-types.ejs',{})

  // 2.创建文件
  if(createDirSync(dest)){
    const targetPagePath = path.resolve(dest,`${name}.vue`)
    const targetRoutePath = path.resolve(dest,`types.js`)

    
    // 3.放到对应的文件夹中
    await writeToFile(targetPagePath,storeResult)
    await writeToFile(targetRoutePath,typesResult)
  }
}



module.exports = {
  creatProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}