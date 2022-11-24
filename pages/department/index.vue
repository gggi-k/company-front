<template>
  <content>
    <a-row>
      <a-col span="12">
        <a-checkbox
          v-model="query.isHistory"
          @change="onChangeIsHistory"
        >이력조회</a-checkbox>
        <a-date-picker
          v-model="query.searchDate"
         :disabled="isNotHistory"
         :disabled-date="disabledDate"
          value-format="YYYY-MM-DD"
          @change="onChangeDatePicker"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col span="12">
        <a-input-search v-model="query.searchEmployeeName" @search="search"/>
      </a-col>
    </a-row>
    <a-row>
      <a-col span="12">
        <a-tree
          :tree-data="treeData"
          show-line
          @select="onSelectTree"
        >
        </a-tree>
      </a-col>
      <a-col span="12">
        <a-descriptions  title="직원 정보" bordered>
          <template v-if="existSelectEmployee">
            <a-descriptions-item label="이름">{{selectEmployee.employeeName}}</a-descriptions-item>
            <a-descriptions-item label="생년월일">{{selectEmployee.birthDay}}</a-descriptions-item>
            <a-descriptions-item label="사번">{{selectEmployee.employeeNumber}}</a-descriptions-item>
            <a-descriptions-item label="직책">{{selectEmployee.positionName}}</a-descriptions-item>
            <a-descriptions-item label="입사일">{{selectEmployee.joinDate}}</a-descriptions-item>
            <a-descriptions-item label="퇴사일">{{selectEmployee.retireDate}}</a-descriptions-item>
          </template>
          <template v-else>
            <a-empty/>
          </template>
        </a-descriptions>
      </a-col>
    </a-row>
  </content>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: 'DepartmentPage',
  layout: 'default',
  data: () => ({
    query: {
      isHistory: false,
      searchDate: '',
      searchEmployeeName: '',
    },
    selectEmployee: {
      employeeId: '',
      employeeName: '',
      birthDay: '',
      employeeNumber: '',
      positionName: '',
      joinDate: '',
      retireDate: '',
    },
    departmentTree: {
      corporation: null,
      tree: null,
      list: [],
    },
  }),
  computed: {
    isNotHistory() {
      return !this.query.isHistory;
    },
    disabledDate() {
      return (date) => {
        return moment().add(-1, 'd').isSameOrBefore(date);
      }
    },
    existSelectEmployee() {
      return this.selectEmployee && this.selectEmployee.employeeId;
    },
    treeData() {
      if(!this.departmentTree.tree) return [];

      const result = [];

      result.push({
        key: 'corp-' + this.departmentTree.corporation.corporationId,
        title: this.departmentTree.corporation.corporationName,
        children: this.recursiveDepartmentTree('0'),
      });

      return result;
    },
    recursiveDepartmentTree() {
      return function (upperDepartmentId) {
        if(!(this.departmentTree.tree[upperDepartmentId] && this.departmentTree.tree[upperDepartmentId].length)) return [];

        return this.departmentTree.tree[upperDepartmentId].map(obj => {
          obj.children = obj.employee ? [] : this.recursiveDepartmentTree(obj.departmentId);
          return obj;
        });
      }
    },
    ...mapGetters({
      selectCorporationId: 'corporation/getSelectCorporationId'
    }),
  },
  watch: {
    selectCorporationId(val) {
      if(!val) return;

      this.findDepartments();
    }
  },
  created() {
    this.findDepartments();
  },
  methods: {
    search() {
      this.findDepartments();
    },
    async findDepartments() {
      if(this.query.isHistory && !this.query.searchDate) {
        return this.$message.error('날짜를 선택해주세요');
      }

      const params = this.query;
      this.departmentTree.tree = this.departmentTree.corporation = {};
      this.departmentTree = await this.$axios.$get(`/api/corporation/${this.selectCorporationId}/department`, { params });
    },
    onSelectTree(selectedKeys, event) {
      if(!(event.selectedNodes && event.selectedNodes.length)) return;

      this.selectEmployee = event.selectedNodes[0].data.props;
    },
    onChangeDatePicker() {
      this.findDepartments();
    },
    onChangeIsHistory() {
      if(this.query.isHistory && !this.query.searchDate) return;

      this.findDepartments();
    }
  }
}
</script>
