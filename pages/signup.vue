<template>
  <a-row justify="center" style="padding-top: 15%;">
    <a-col span="8" offset="8">
      <a-form
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 20 }"
        :form="form"
        label-align="left"
        @submit.prevent="signUp"
      >
        <a-form-item label="직원아이디" required>
          <a-input v-decorator="employeeIdRules"/>
        </a-form-item>

        <a-form-item label="비밀번호" required>
          <a-input-password v-decorator="passwordRules"/>
        </a-form-item>

        <a-form-item label="비밀번호 확인" required>
          <a-input-password v-decorator="confirmPasswordRules"/>
        </a-form-item>

        <a-form-item label="이름" required>
          <a-input v-decorator="nameRules"/>
        </a-form-item>

        <a-form-item label="생년월일">
          <a-date-picker
            v-model="formState.birthDay"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>

        <a-form-item label="입사일">
          <a-date-picker
            v-model="formState.joinDate"
            value-format="YYYY-MM-DD"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit">등록</a-button>
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
      confirmPassword: '',
      name: '',
      birthDay: '',
      joinDate: '',
    }
  }),
  computed: {
    employeeIdRules() {
      return [
        'formState.employeeId',
        { rules: [{ required: true, message: '아이디를 입력해주세요'}]}
      ];
    },
    passwordRules() {
      return [
        'formState.password',
        { rules: [{ required: true, message: '비밀번호를 입력해주세요'}]}
      ];
    },
    confirmPasswordRules() {
      return [
        'formState.confirmPassword',
        { rules: [
          { required: true, message: '비밀번호 확인을 입력해주세요'},
          { validator (rule, value, callback) {
            if(this.formState.password !== value) callback();
            }, message: '비밀번호값이 다릅니다'}]
        }
      ];
    },
    nameRules() {
      return [
        'formState.name',
        { rules: [{ required: true, message: '이름을 입력해주세요'}]}
      ];
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    signUp() {
      this.form.validateFieldsAndScroll((errors, values) => {
        if (errors) return;

        console.log(values);

        this.$axios.$post('/sign-up', this.formState).then(res => {
          this.$message.success('회원가입하였습니다');
        });
      })


    },
  }
}
</script>
