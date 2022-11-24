<template>
  <a-layout>
    <a-layout-header>
      <div style="float: right">
        <a-button
          style="margin-right: 5px;"
          @click="logout"
        >로그아웃</a-button>
        <a-typography-title level="3" style="color: white;">법인</a-typography-title>
        <a-select
          v-model="selectCorporationId"
          style="width: 130px"
          @change="onChangeCorporation"
        >
          <a-select-option v-for="corp in corporations" :key="corp.corporationId">{{corp.corporationName}}</a-select-option>
        </a-select>
      </div>
    </a-layout-header>
    <a-layout-content>
      <nuxt/>
    </a-layout-content>
  </a-layout>
</template>


<script>

import { mapGetters } from 'vuex'

export default {
  middleware: ['authenticated'],
  data: () => ({
  }),
  fetch() {
    this.$store.dispatch('corporation/findAll');
  },
  computed: {
    fieldNames() {
      return {
        label: 'corporationId',
        value: 'corporationName',
        options: 'corporations'
      }
    },
    ...mapGetters({
      corporations: 'corporation/getCorporations',
      selectCorporationId: 'corporation/getSelectCorporationId'
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('authentication/logout');
    },
    onChangeCorporation(corporationId) {
      this.$store.commit('corporation/setSelectCorporation', corporationId);
    }
  }
}
</script>
