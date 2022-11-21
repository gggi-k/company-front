<template>
  <a-row justify="center" style="padding-top: 15%;">
    <a-col span="8" offset="8">
      <a-form
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        label-align="left"
        @finish="login"
        @submit.prevent="login"
      >
        <a-form-item label="id" name="formState.employeeId" :rules="employeeIdRules">
          <a-input v-model="formState.employeeId"/>
        </a-form-item>

        <a-form-item label="pw" name="formState.password" :rules="passwordRules">
          <a-input-password v-model="formState.password"/>
        </a-form-item>

        <a-form-item>
          <a-checkbox :checked="formState.rememberMe">remember me</a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">Login</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: 'SignupPage',
  layout: 'blank',
  data: () => ({
    formState : {
      employeeId: '',
      password: '',
      rememberMe: false
    }
  }),
  computed: {
    employeeIdRules() {
      return [{ required: true, message: '아이디를 입력해주세요'}];
    },
    passwordRules() {
      return [{ required: true, message: '패스워드를 입력해주세요'}];
    }
  },
  methods: {
    login() {
      // this.$axios.$post('/login', {
      //
      // }).then(res => {
      //   console.log(res);
      // });
      console.log(this);
    },
  }
}
</script>
