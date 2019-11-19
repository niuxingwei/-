<!--
 * @Author:牛兴炜
 * @Date: 2019-10-23 21:43:00
 * @LastEditTime: 2019-11-19 16:44:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simple-login-master\src\views\Login\index.vue
 -->
<template>
  <div class="main">
    <canvas id="loginAni"></canvas>
    <div class="login-wrapper">
      <div id="login-box">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" size="medium" @keyup.enter.native="userLogin()">
          <div class="logoImg">
            <img src="../../assets/images/logo.png" alt="">
          </div>
          <el-form-item prop="userAccount">
            <el-input class="login-input" type="text" v-model="loginForm.userAccount" placeholder="用户名">
            </el-input>
          </el-form-item>

          <el-form-item prop="userPassword">
            <el-input class="login-input" type="password" v-model="loginForm.userPassword" placeholder="密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <div style="margin-top:8px;">
              <el-button class="login-button" type="primary" @click="userLogin()">立即登录</el-button><br>
              <div style="text-align:center">
                <el-link type="primary" @click="register">注册12306账号</el-link>
                <el-link type="info" @click="forgetPassword">|忘记密码？</el-link>
              </div>

            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { startAnimation } from '@/api/loginAni'
import { isvalidNull } from '@/utils/validate'
import { loginByUsername } from '@/api/login'
export default {
  name: 'Login',
  data () {
    // 登录信息验证
    var validateUserAccount = (rule, value, callback) => {
      if (isvalidNull(value)) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validateUserPassword = (rule, value, callback) => {
      if (isvalidNull(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userAccount: '',
        userPassword: ''
      },
      loginRules: {
        userAccount: [
          { required: true, trigger: 'blur', validator: validateUserAccount }
        ],
        userPassword: [
          { required: true, trigger: 'blur', validator: validateUserPassword }
        ]
      }
    }
  },
  mounted () {
    startAnimation('loginAni')
  },
  methods: {
    /**
     * @description: 点击登录按钮
     * @param {type} 
     * @return: 密码正确则进入主页面
     */
    userLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$router.push('home')
          loginByUsername(this.loginForm).then((response) => {
            console.log("后台传递数据")
            console.log(response.data)
            let result = response.data
            if (result[0].account === this.loginForm.userAccount && result[0].pwd === this.loginForm.userPassword) {
              // this.$router.push('home')
            } else {
              this.$message.error("用户名或密码不正确，请检查！")
            }

          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    /**
     * @description: 注册账界面
     * @param {type} 
     * @return: 界面跳转
     */
    register () {
      this.$router.push({ path: '/register' })
    },
    /**
     * @description: 忘记密码界面
     * @param {type} 
     * @return: 忘记密码界面
     */
    forgetPassword () {
      this.$router.push({ path: '/errPage' })
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.login-wrapper {
  position: absolute;
  top: 20%;
  height: 300px;
  z-index: 10;
}
#login-box {
  position: absolute;
  z-index: 20;
  display: flex;
  justify-content: center;
  left: 50%;
  top: 50%;
  width: 350px;
  height: 370px;
  padding: 50px 0 40px 0;
  margin: -150px 0 0 -150px;
  opacity: 0.8;
  box-sizing: border-box;
  background: white;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.18);
}
.login-input {
  width: 220px;
}

.login-button {
  width: 220px;
}
.login-ani {
  position: absolute;
  top: 0;
  left: 0;
}
.logoImg {
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
}
</style>

