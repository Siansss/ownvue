#!/usr/bin/env node
const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommand = require('./lib/core/create')

// 版本号查看
program.version(require('./package.json').version)

// 帮助和可选信息
helpOptions()

// 创建其他的指令
createCommand()

// 指定参数传递过去
program.parse(process.argv);
