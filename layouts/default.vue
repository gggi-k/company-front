<template>
  <a-layout>
    <a-layout-header>
      <div style="float: right">
        <a-typography-title level="3" style="color: white;">법인</a-typography-title>
        <a-select :options="options" style="width: 130px"/>
      </div>
    </a-layout-header>
    <a-layout-content>
      <nuxt/>
    </a-layout-content>
  </a-layout>
</template>


<script>
export default {
  data: () => ({
  }),
  computed: {
    options() {
      return [
        {value: 'test', label: 'test'}
      ];
    }
  },
  created() {
    this.$store.dispatch('corporation/findAll');
  }
}
</script>
