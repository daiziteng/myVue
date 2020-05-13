<template>
  <!-- router表示路由，可以跳转相应界面 -->
  <el-container class="fillcontain">
    <el-container direction="vertical">
      <headTop></headTop>
      <el-container style="overflow:scroll">
        <sideBar></sideBar>
        <el-main>
          <el-scrollbar style="height:100%;">
            <el-row>
              <el-col :span="24">
                <h4 style="float:left">图表展示</h4>
              </el-col>
            </el-row>
            <!-- 换行 -->
            <br />
            <br />
            <el-row>
              <el-col :span="12">
                <div class="border_light">
                  <ve-gauge :data="gaugeData"></ve-gauge>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="border_light">
                  <ve-bar :data="barData"></ve-bar>
                </div>
              </el-col>
            </el-row>
            <br />
            <br />
            <br />
            <br />
            <el-row>
              <el-col :span="12">
                <div class="border_light">
                  <ve-sankey :data="sankeyData" :settings="chartSettings"></ve-sankey>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="border_light">
                  <ve-radar :data="radarData"></ve-radar>
                </div>
              </el-col>
            </el-row>
          </el-scrollbar>
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
    this.chartSettings = {
      links: [
        { source: "首页", target: "列表页a", value: 0.5 },
        { source: "首页", target: "列表页b", value: 0.5 },
        { source: "列表页a", target: "内容页a-1", value: 0.1 },
        { source: "列表页a", target: "内容页a-2", value: 0.4 },
        { source: "列表页b", target: "内容页b-1", value: 0.2 },
        { source: "列表页b", target: "内容页b-2", value: 0.3 }
      ]
    };
    return {
      gaugeData: {
        columns: ["type", "a", "b", "value"],
        rows: [{ type: "速度", value: 80, a: 1, b: 2 }]
      },
      barData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      sankeyData: {
        columns: ["页面", "访问量"],
        rows: [
          { 页面: "首页", 访问量: 100000 },
          { 页面: "列表页a", 访问量: 20000 },
          { 页面: "列表页b", 访问量: 80000 },
          { 页面: "内容页a-1", 访问量: 10000 },
          { 页面: "内容页a-2", 访问量: 10000 },
          { 页面: "内容页b-1", 访问量: 60000 },
          { 页面: "内容页b-2", 访问量: 20000 }
        ]
      },
      radarData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  },
  components: {
    headTop,
    sideBar
  },

  methods: {}
};
</script>
<style scoped lang='less'>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding-right: 0px;
}

.border_light,
.border_light::before,
.border_light::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.border_light {
  z-index: 999;
  position: relative;
  // width: 50%;
  width: 400px;
  height: 400px;
  margin: auto;
  color: #69ca62;
  box-shadow: inset 0 0 0 1px rgba(105, 202, 98, 0.5);
}

.border_light::before,
.border_light::after {
  content: "";
  z-index: -1;
  margin: -5%;
  box-shadow: inset 0 0 0 2px;
  animation: clipMe 8s linear infinite;
}
.border_light::before {
  animation-delay: -4s;
}

.border_light:hover::after,
.border_light:hover::before {
  background-color: rgba(255, 0, 0, 0.3);
}

@keyframes clipMe {
  0%,
  100% {
    clip: rect(0px, 440px, 0px, 0px);
  }
  25% {
    clip: rect(0px, 2px, 440px, 0px);
  }
  50% {
    clip: rect(436px, 440px, 440px, 0px);
  }
  75% {
    clip: rect(0px, 440px, 440px, 436px);
  }
}
</style>