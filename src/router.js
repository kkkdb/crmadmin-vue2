import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    // mode: "history",
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
            },{
                name: 'activityPointSetting',
                path: '/activityPointSetting',
                component: require('./view/vipCenter/vipPoint/activityPointSetting')  //活动积分设置
            },{
                name: 'vipBasicSetting',
                path: '/vipBasicSetting',
                component: require('./view/vipCenter/vipPoint/vipBasicSetting')  //会员基础设置
            },{
                name: 'vipPointManage',
                path: '/vipPointManage',
                component: require('./view/vipCenter/vipPoint/vipPointManage')  //会员积分管理
            },{
                name: 'vipPointDetail',
                path: '/vipPointDetail',
                component: require('./view/vipCenter/vipPoint/vipPointDetail')  //会员积分详情
            },{
                name: 'pointExchangeSetting',
                path: '/pointExchangeSetting',
                component: require('./view/vipCenter/exchangeAndTrial/pointExchangeSetting')  //积分兑礼设置
            },{
                name: 'trialApplySetting',
                path: '/trialApplySetting',
                component: require('./view/vipCenter/exchangeAndTrial/trialApplySetting')  //试用申请设置
            },{
                name: 'pointExchangeRecord',
                path: '/pointExchangeRecord',
                component: require('./view/vipCenter/exchangeAndTrial/pointExchangeRecord')  //积分兑礼记录
            },{
                name: 'trialApplyRecord',
                path: '/trialApplyRecord',
                component: require('./view/vipCenter/exchangeAndTrial/trialApplyRecord')  //试用申请记录
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
