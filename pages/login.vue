<template>
  <a-row justify="center" style="padding-top: 15%;">
    <a-col span="8" offset="8">
      <a-form
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        :form="form"
        label-align="left"
        @submit.prevent="login"
      >
        <a-form-item label="id" required>
          <a-input v-decorator="employeeIdRules"/>
        </a-form-item>

        <a-form-item label="pw" required>
          <a-input-password v-decorator="passwordRules"/>
        </a-form-item>

        <a-form-item>
          <a-checkbox v-model="loginForm.rememberMe">remember me</a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">Login</a-button>
        </a-form-item>

        <a-divider/>

        <nuxt-link to="/signup">회원가입</nuxt-link>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>

export default {
  name: 'LoginPage',
  layout: 'blank',
  data: () => ({
    loginForm : {
      employeeId: '',
      password: '',
      rememberMe: false
    }
  }),
  computed: {
    employeeIdRules() {
      return [
        'loginForm.employeeId',
        { rules: [{ required: true, message: '아이디를 입력해주세요'}]}
      ];
    },
    passwordRules() {
      return [
        'loginForm.password',
        { rules: [{ required: true, message: '패스워드를 입력해주세요'}]}
      ];
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    login() {
      this.form.validateFieldsAndScroll((errors, values) => {
        if(errors) return;

        this.$store.dispatch('authentication/login',{
            employeeId: values.loginForm.employeeId,
            password: values.loginForm.password
        });
      });
    },
  }
}
</script>
