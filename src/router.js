import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    // base: '#/',
    routes: [{
            path: '/index',
            name: 'index',
            component: require('./view/index'),
            children: [{
                name: 'home',
                path: '/home',
                component: require('./view/home')                                //首页
            },{
                name: 'vipLevelManage',
                path: '/vipLevelManage',
                component: require('./view/vipCenter/vipLevel/vipLevelManage')   //会员等级管理
            },{
                name: 'vipLevelSetting',
                path: '/vipLevelSetting',
                component: require('./view/vipCenter/vipLevel/vipLevelSetting')  //会员等级设置
            },{
                name: 'birthdayRights',
                path: '/birthdayRights',
                component: require('./view/vipCenter/vipLevel/birthdayRights')  //生日权益
            },{
                name: 'vipLevelDetail',
                path: '/vipLevelDetail',
                component: require('./view/vipCenter/vipLevel/vipLevelDetail')  //会员等级详情
            },
            ]
        }, 
        {
            name: 'login',
            path: '/login',
            component: require('./view/login')                      //登录
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})
