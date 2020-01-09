import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
});
 
export default store;




























//一个store  , Vuex.store的 实例
// export default new Vuex.Store({
//     state: {
//         token: ''
//     },
//     getters: {            //  Getter相当于vue中的computed计算属性
//         getToken: (state) => { return state.token; }
//     },
//     mutations: {
//         set_token(state, ltoken) {   //第一个参数是拿到state对象
//             localStorage.setItem('token', ltoken);
//             state.token = ltoken;
//         },
//         del_token(state) {
//             localStorage.removeItem('token');
//             state.token = '';
//         }
//     },
//     actions: {      //注册actions，类似vue里面的methods 
//         //通过这个修改state里面的值
//         // 可以直接用mutations修改，但是官方建议使用actions去调用mutations去修改
//         set_token(context, token) {
//             context.commit("set_token", token);
//         },
//         del_token(context) {
//             context.commit("del_token");
//         }
//     }
// })

