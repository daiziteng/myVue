<template>
  <!-- router表示路由，可以跳转相应界面 -->
  <el-container class="fillcontain">
    <el-container direction="vertical">
      <headTop></headTop>
      <el-container style="overflow:scroll">
        <sideBar></sideBar>
        <el-main>
          <el-row>
            <el-col :span="24">
              <h4 style="float:left">表格操作</h4>
            </el-col>
          </el-row>
          <!-- 换行 -->
          <br />
          <el-row>
            <el-col :span="12" class="grid">
              <el-button
                type="success"
                @click="addFlag=true;dialogVisible = true "
                icon="el-icon-circle-plus-outline"
                size="mini"
                round
              >新增</el-button>

        
            </el-col>
            <el-col :span="12" class="grid">
              <div style="float:right">
                <el-input v-model="search" placeholder="请输入内容" style="width:180px"></el-input>
                <el-button type="warning" icon="el-icon-search" size="big">搜索</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="date" label="日期" width="180"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <!-- scope.row代表当前对应行 -->
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      icon="el-icon-edit"
                      type="primary"
                      size="small"
                      @click="editBook(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                      icon="el-icon-delete"
                      type="danger"
                      size="small"
                      @click="Delete(scope.$index,scope.row)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                :title="addFlag?'新增数据':'修改数据'"
                style="text-align:left !important"
                :visible.sync="dialogVisible"
              >
                <el-form ref="editsForm" :model="editsForm" label-width="80px">
                  <el-form-item label="日期" style="width:600px">
                    <el-input v-model="editsForm.date" placeholder="请输入日期"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" style="width:600px">
                    <el-input v-model="editsForm.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="地址" style="width:600px">
                    <el-input v-model="editsForm.address" placeholder="请输入地址"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button type="success" @click="saveBook()">提交</el-button>
                  <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="提示"
                style="text-align:left !important"
                :visible.sync="dialog2Visible"
                :before-close="handleClose"
              >
                <span>你确定要删除该条数据吗?</span>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="handleDel()">提交</el-button>
                  <el-button type="primary" @click="dialog2Visible = false">取消</el-button>
                </span>
              </el-dialog>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import headTop from "@/components/headTop";
import sideBar from "@/components/sideBar";
export default {
  data() {
    return {
      inpContent: "Blog",
      input: "",
      dialogVisible: false,
      addFlag: true,
      dialog2Visible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      search: "",

      editsForm: {
        date: "",
        name: "",
        address: ""
      }
    };
  },
  computed: {
    // 模糊搜索
    tables() {
      const search = this.search;
      console.log(search);
      if (search) {
        // // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // // 注意： filter() 不会对空数组进行检测。
        // // 注意： filter() 不会改变原始数组。
        // return this.tableData.filter(data => {
        //   // some() 方法用于检测数组中的元素是否满足指定条件;
        //   // some() 方法会依次执行数组的每个元素：
        //   // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
        //   // 如果没有满足条件的元素，则返回false。
        //   // 注意： some() 不会对空数组进行检测。
        //   // 注意： some() 不会改变原始数组。
        //   return Object.keys(data).some(key => {
        //     // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
        //     // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
        //     return (
        //       String(data[key])
        //         .toLowerCase()
        //         .indexOf(search) > -1
        //     );
        //   });
        // });
      }
      return this.dormitory;
    }
  },

  components: {
    headTop,
    sideBar
  },

  methods: {
    // getData() {
    //   this.$axios.get("/api/getdata").then(res => {
    //     console.log(res);
    //   });
    // },

    handleClose(done) {
      done();
    },
    editBook(index, row) {
      console.log(index, row);
      this.editsForm = Object.assign({}, row);
      this.dialogVisible = true;
      this.addFlag = false;
    },

    Delete(index, row) {
      //   this.addFlag = false;
      //   this.dialog2Visible = true;
      //   this.curId = row.ID;
      this.tableData.splice(index, 1);
    }
  }
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>