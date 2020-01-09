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
                <h4 style="float:left">选项卡展示</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" v-for="project in allprojects" :key="project.key">
                <div class="item" :style="{background:project.color}">
                  <div class="item-header">
                    <p>{{project.title}}</p>
                    <span>{{project.subtitle}}</span>
                  </div>
                  <div class="item-body">
                    <h2>{{project.count}}</h2>
                  </div>
                  <p class="item-tip">{{project.key}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <h4 style="float:left">卡片展示</h4>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" v-for="(item,index) in imgData" :key="index">
                <div class="card-item">
                  <img :src="item.src" class="card-item-img" />
                  <div class="card-item-text" style="color:#fff;backgroundColor:#2e323f">
                    <h3>{{item.name}}</h3>
                    <p>{{item.text}}</p>
                  </div>
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
    return {
      name: "Vue.js",

      allprojects: [
        {
          title: "分类统计",
          subtitle: "实时",
          count: 7993,
          allcount: 10222,
          text: "当前分类总记录数",
          color: "rgb(49, 180, 141)",
          key: "类"
        },
        {
          title: "附件统计",
          subtitle: "实时",
          count: 3112,
          allcount: 10222,
          text: "当前上传的附件数",
          color: "rgb(56, 161, 242)",
          key: "附"
        },
        {
          title: "文章统计",
          subtitle: "实时",
          count: 908,
          allcount: 10222,
          text: "评论次数",
          color: "rgb(117, 56, 199)",
          key: "评"
        },
        {
          title: "新闻统计",
          subtitle: "实时",
          count: 908,
          allcount: 10222,
          text: "评论次数",
          color: "rgb(59, 103, 164)",
          key: "新"
        }
      ],
      imgData: [
        {
          name: "图片1",
          src: "static/img/card/card-1.jpg",
          text: "火星撞地球"
        },
        {
          name: "图片2",
          src: "static/img/card/card-2.jpg",
          text: "璀璨星空图"
        },
        {
          name: "图片3",
          src: "static/img/card/card-3.jpg",
          text: "中国水墨画"
        },
        {
          name: "图片4",
          src: "static/img/card/card-4.jpg",
          text: "田园风景图"
        }
      ]
    };
  },
  components: {
    headTop,
    sideBar
  },
  methods:{
   
  }

};
</script>
<style scoped lang='less'>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding-right:0px;

}

.el-col {
  border-radius: 4px;
  padding: 10px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
// 选项卡样式
.item {
  position: relative;
  margin: 15px;
  padding: 12px;
  height: 144px;
  border-radius: 4px;
  box-sizing: border-box;
  // overflow: hidden;
  color: #fff;
}
.item-header {
  position: relative;
  & > p {
    float: left;
    margin: 0px;
    font-size: 14px;
  }
  & > span {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.3);
  }
}
.item-body {
  position: absolute;
  float: left;
  margin-top: 15px;
  & > h2 {
    margin: 0;
    font-size: 32px;
    line-height: 60px;
  }
}
.item-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 80px;
  height: 80px;
  right: 10px;
  border: 2px solid #fff;
  border-radius: 100%;
  font-size: 48px;
  transform: rotate(-40deg);
  opacity: 0.1;
}
// 卡片样式
.card-item {
  position: relative;
  margin: 0 auto;
  margin-bottom: 50px;
  width: 230px;
  height: 340px;
  overflow: hidden;
  border-radius: 5px;
  border-color: #fff;
  border-width: 1px;
  border-style: solid;
  &:hover .card-item-text {
    top: 0;
  }
}
.card-item-img {
  width: 100%;
  //  height: 340px;
  background: red;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.card-item-text {
  position: absolute;
  top: 150px;
  padding: 20px 15px;
  width: 100%;
  height: 340px;
  // overflow: auto;
  box-sizing: border-box;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  opacity: 0.9;
  transition: top 0.4s;
  & > p {
    float: left;
    font-size: 12px;
    line-height: 25px;
    text-indent: 2em;
  }
  & > h3 {
    text-align: left;
    padding: 10px;
  }
}
</style>