<template>
  <content>
    <a-row>
      <a-col span="5">
        <date-picker></date-picker>
      </a-col>
      <a-col span="7">
        <a-input-search @search="search"/>
      </a-col>
      <a-col offset="12"/>
    </a-row>
    <a-row>
      <a-col span="12">
<!--        <a-tree :expanded-keys="expandedKeys" :tree-data="treeData">-->
<!--        </a-tree>-->
      </a-col>
      <a-col span="12">
        <a-descriptions title="직원 정보" bordered column="1">
          <a-descriptions-item label="이름">라이언</a-descriptions-item>
          <a-descriptions-item label="생년월일">라이언</a-descriptions-item>
          <a-descriptions-item label="사번">라이언</a-descriptions-item>
          <a-descriptions-item label="직책">라이언</a-descriptions-item>
          <a-descriptions-item label="입사일">라이언</a-descriptions-item>
          <a-descriptions-item label="퇴사일">라이언</a-descriptions-item>
        </a-descriptions>
      </a-col>
    </a-row>
  </content>
</template>

<script>
export default {
  name: 'DepartmentPage',
  layout: 'default',
  data: () => ({
      searchDate: '',
      searchEmployeeName: '',
      expandedKeys: ['0-0-0', '0-0-1'],
      treeData: '',
  }),
  methods: {
    search() {
      console.log('ddd');
    },
  }
}
</script>
