// 默认导入所有src文件夹下的icons文件(自动导入，不需手动一个个导入)
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
// import all svg（自动）
// context的三个参数：directory:需要检索的目录；useSubdirectories:是否检索子目录；regExp：匹配文件的正则表达式
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
