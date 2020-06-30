/*
 * @Description: 用户信息
 * @Author: your name
 * @Date: 2020-06-28 11:40:12
 * @LastEditTime: 2020-06-30 11:01:00
 * @LastEditors: Please set LastEditors
 */
const user = {
  state: {
    username: '', // 登录用户姓名
    userAccount: '', // 登录用户账号
    userRoleID: 0, // 登录用户角色
    userResAccount: 0, // 登录之后后台返回的与账号对应的账号，Number类型
    otherusername: '' // 其他用户，管理员操作下的部门或网格员

  },
  mutations: {
    // 登录，保存用户姓名信息
    set_userName (state, username) {
      sessionStorage.setItem('username', username)
      state.username = username
    },
    // 登录，保存用户账号信息
    set_userAccount (state, userAccount) {
      sessionStorage.setItem('userAccount', userAccount)
      state.userAccount = userAccount
    },
    // 登录，保存用户登录时选择的角色ID
    set_userRoleID (state, userRoleID) {
      sessionStorage.setItem('userRoleID', userRoleID)
      state.userRoleID = userRoleID
    },
    // 保存后台返回的与账号对应的
    set_userResAccount (state, userResAccount) {
      sessionStorage.setItem('userResAccount', userResAccount)
      state.userResAccount = userResAccount
    },
    // 退出，清空用户信息(账号、角色ID)
    log_out (state) {
      sessionStorage.removeItem('username') // 移除sessionStorage
      state.username = '' // 同步的改变story中的状态
      sessionStorage.removeItem('userRoleID')
      state.userRoleID = ''
      sessionStorage.removeItem('userAccount')
      state.userAccount = ''
      sessionStorage.removeItem('userResAccount')
      state.userResAccount = ''
    },
    // 系统管理员选择查询部门的还是网格员的
    set_otherusername (state, otherusername) {
      sessionStorage.setItem('otherusername', otherusername)
      state.otherusername = otherusername
    }
  }

}
export default user
