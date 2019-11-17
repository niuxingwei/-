<!--
 * @Author: your name
 * @Date: 2019-10-23 22:26:40
 * @LastEditTime: 2019-11-17 09:19:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simple-login-master\src\views\Login\register.vue
 -->
<template>
  <div class="register">
    <img style="margin-top:0px" src="../../assets/images/register.jpg" alt="">
    <br>
    <br>
    <div class="register-input">
      <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm" label-width="100px">
        <el-form-item label="用户名" prop="UserName">
          <el-input type="text" v-model="registerForm.UserName" clearable></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="pass">
          <el-input type="password" v-model="registerForm.pass" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" clearable auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input type="text" v-model="registerForm.Name" clearable></el-input>
        </el-form-item>
        <el-form-item label="证件号码" prop="ID">
          <el-input type="text" v-model="registerForm.ID" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input type="text" v-model="registerForm.Email" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="Phone">
          <el-input type="text" v-model.number="registerForm.Phone" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { isvalidNull, isIDCard, isEmail, isMobile } from '@/utils/validate'
import { registerUser } from '@/api/login'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (isvalidNull(value)) {
        callback(new Error('手机号不能为空'))
      }
      if (!isMobile(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    };
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入姓名'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validateID = (rule, value, callback) => {
      if (isvalidNull(value)) {
        callback(new Error('身份证号不能为空'))
      } else if (!isIDCard(value)) {
        callback(new Error('身份证号格式不正确'))
      } else {
        callback()
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        callback()
      }
    };


    return {
      registerForm: {
        UserName: '',
        Name: '',
        ID: '',
        Email: '',
        Phone: '',
        pass: '',
        checkPass: ''
      },
      registerRules: {
        pass: [
          { validator: validatePass, trigger: 'blur', required: 'true' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', required: 'true' }
        ],
        Phone: [
          { validator: validatePhone, trigger: 'blur', required: 'true' }
        ]
        ,
        UserName: [
          { validator: validateUserName, trigger: 'blur', required: 'true' }
        ],
        Name: [
          { validator: validateName, trigger: 'blur', required: 'true' }
        ],
        ID: [
          { validator: validateID, trigger: 'blur', required: 'true' }
        ],
        Email: [
          { validator: validateEmail, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          registerUser(this.registerForm).then((response) => {
            console.log("后台传递数据")
            console.log(response.data)
            let result = response.data
            if (result === "scuuess") {
              this.$message({
                type: 'success',
                message: "注册成功"
              })
              this.$router.push('home')
            }
            else {
              this.$message.error('注册姓名已存在，请重试');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register {
  text-align: center;
  position: relative;
  margin-top: 5%;
  background: url("https://www.12306.cn/index/images/pic/banner-login.jpg")
    center center no-repeat;
}
.register-input {
  width: 420px;
  margin-left: 40%;
}
</style>
