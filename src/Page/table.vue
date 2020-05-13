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
                <el-button type="warning" @click="searchData" icon="el-icon-search" size="big">搜索</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="24">
              <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <!-- scope.row代表当前对应行 -->
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      icon="el-icon-edit"
                      type="primary"
                      size="small"
                      @click="editData(scope.$index, scope.row)"
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
                <el-form ref="editsForm" :model="editsForm" :rules="rules" label-width="80px">
                  <el-form-item label="日期" style="width:600px" prop="date">
                    <el-input v-model="editsForm.date" placeholder="请输入日期"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" style="width:600px" prop="name">
                    <el-input v-model="editsForm.name" placeholder="请输入姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="地址" style="width:600px" prop="address">
                    <el-input v-model="editsForm.address" placeholder="请输入地址"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button type="success" @click="Submit()">提交</el-button>
                  <el-button type="primary" @click="dialogVisible = false;editsForm={}">取消</el-button>
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
import { formatDate } from "../../common/date";
export default {
  data() {
    return {
      inpContent: "Blog",
      input: "",
      dialogVisible: false,
      addFlag: true,
      dialog2Visible: false,
      tableData: [],
      search: "",
      editsForm: {
        id: "",
        date: "",
        name: "",
        address: ""
      },
      rules: {
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  computed: {},
  components: {
    headTop,
    sideBar
  },
  mounted() {
    this.getData();
  },
  methods: {
    searchData() {
      const search = this.search; //获取input搜索框输入值
      if (search) {
        // 单列搜索
        // this.tableData = this.tableData.filter(
        //   // console.log(this.tableData)
        //   // item => ~item.date.indexOf(search)
        // );
        //全局搜索
        this.tableData = this.tableData.filter(data => {
          return Object.keys(data).some(key => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(search) > -1
            );
          });
        });
      } else {
        this.getData();
      }
    },
    getData() {
      this.$axios.get("/api/getdata").then(res => {
        var i;
        for (i = 0; i < res.data.length; i++) {
          res.data[i].date = formatDate(res.data[i].date, "yyyy-MM-dd"); // 时间格式化处理
        }
        // console.log(res);
        this.tableData = res.data;
      });
    },
    handleClose(done) {
      done();
    },
    Submit() {
      console.log(this.addFlag);
      if (this.addFlag == true) {
        this.$axios
          .post("/api/tableData", this.editsForm)
          .then(res => {
            if (res.data.status == 200) {
              this.$message.success("新增成功");
              this.dialogVisible = false;
              this.getData();
              this.editsForm = {};
            } else {
              this.$message.error("新增失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .post("/api/update/tableData", this.editsForm)
          .then(res => {
            if (res.data.status == 200) {
              this.$message.success("修改成功");
              this.getData();
              this.editsForm = {};
              this.dialogVisible = false;
            } else {
              this.$message.error("修改失败");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    editData(index, row) {
      this.editsForm = Object.assign({}, row);
      this.dialogVisible = true;
      this.addFlag = false;
    },

    handleDel() {
      this.$axios
        .post("/api/delete/tableData", { id: this.curId })
        .then(res => {
          if (res.data.status == 200) {
            this.$message.success("删除成功");
            this.getData();
            this.dialog2Visible = false;
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Delete(index, row) {
      this.addFlag = false;
      this.dialog2Visible = true;
      this.curId = row.id;
      console.log(row.date);
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