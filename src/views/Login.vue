<template>
	<div class="textsBox">
		<div class="sub-title">管理员登录</div>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item prop="checkPass"><el-input type="password" v-model="ruleForm.checkPass" placeholder="管理员账户" autocomplete="off"></el-input></el-form-item>
			<el-form-item prop="pass"><el-input type="password" v-model="ruleForm.pass" placeholder="管理员密码" autocomplete="off"></el-input></el-form-item>
			<el-form-item><el-checkbox v-model="checked" style="color:#a0a0a0;margin-top:-10px;">记住密码</el-checkbox></el-form-item>
			<el-form-item><el-button type="primary" @click="show()" style="width: 400px;">提交</el-button></el-form-item>
		</el-form>
		<div class="active">
			<ul>
				<li class="el-table--striped_01">
					超级管理员用户名: admin123 超级管理员用户名：admin123 商城管理员用户名: mall123 商城管理员用户名：mall123 推广管理员用户名: promotion123
					推广管理员用户名：promotion123
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: 'admin123',
        checkPass: 'admin123',
        checked: false// 是否选中记住密码
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
	  show () {
		  this.$router.push('/dashboard')
	  },
    show () {
      this.axios
        .post('http://192.168.1.54:8080/admin/auth/login', {
          username: this.ruleForm.checkPass,
          password: this.ruleForm.pass
        })
        .then(res => {
          console.log(res)
          if (res.data.errmsg == '成功') {//eslint-disable-line
            if (this.$router.query == 'login') {//eslint-disable-line
              this.$router.go(-1)
            } else {
              this.$router.push('/dashboard')
            }
          }
        })
      if (this.mess) {
        this.mess.close()
      }
      this.mess = this.$message('登录成功')
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style type="text/css">
.textsBox {
	width: 500px;
	margin: 0 auto;
	padding: 160px 35px 0;
}
.sub-title {
	height: 60px;
	font-size: 20px;
	text-align: center;
	margin-left: 80px;
	color: burlywood;
}
.el-table--striped_01 {
	width: 393px;
	/* height: 84px; */
	margin: auto;
	list-style: none;
	margin-left: 60px;
	font-size: 14px;
}
</style>
