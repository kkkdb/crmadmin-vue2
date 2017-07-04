<template>
    <div class="sidebar">
    	<el-menu :default-active="onRoutes" mode="vertical" class="el-menu-vertical-demo" router unique-opened>
            <el-menu-item index="home"><i class="fa fa-diamond"></i> 首页</el-menu-item>                
            <template v-for='item in list'>
                <el-submenu :index="item.name">
                    <template slot="title"><i :class="item.icon"></i> {{item.title}}</template>
                    <el-menu-item-group v-for='elem in item.children'>
                        <template slot="title">{{elem.sub_title}}</template>
                        <el-menu-item :index="elem2.id" v-for='elem2 in elem.sub_list'>{{elem2.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>

    		<!-- <template v-for='item in menuList'>
    			<el-menu-item-group :title="item.title">
    				<template v-for='elem in item.sub_list'>
		        		<el-menu-item :index="elem.id">{{elem.name}}</el-menu-item>    					
    				</template>
		      	</el-menu-item-group>
    		</template> -->
	    </el-menu>

    </div>
</template>

<script>
	import {mapState} from 'vuex'
    export default {
        computed:{
        	...mapState(['menuList']),
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        data () {
            return{
                list : [
                    {
                        title: '会员中心',
                        icon: 'fa fa-diamond',
                        name: 'userCenter',
                        children: [{
                            sub_title: '会员等级',
                            sub_list: [{
                                name: '会员等级管理',
                                id: 'vipLevelManage'
                            },{
                                name: '生日权益',
                                id: 'birthdayRights'
                            },{
                                name: '会员等级设置',
                                id: 'vipLevelSetting'
                            }]
                        },{
                            sub_title: '会员积分',
                            sub_list: [{
                                name: '会员积分管理',
                                id: 'vipPointManage'
                            },{
                                name: '活动积分设置',
                                id: 'activityPointSetting'
                            },{
                                name: '积分基础设置',
                                id: 'vipBasicSetting'
                            }]
                        },{
                            sub_title: '兑礼及试用',
                            sub_list: [{
                                name: '积分兑礼设置',
                                id: 'pointExchangeSetting'
                            },{
                                name: '试用申请设置',
                                id: 'trialApplySetting'
                            },{
                                name: '积分兑礼记录',
                                id: 'pointExchangeRecord'
                            },{
                                name: '试用申请记录',
                                id: 'trialApplyRecord'
                            }]
                        }],
                    },
                    {
                        title: '客户管理',
                        icon: 'fa fa-users',
                        name: 'customerManage',
                        children: [{
                            sub_title: '客户管理',
                            sub_list: [{
                                name: '客户列表',
                                id: 'customerList'
                            },{
                                name: '客户分群',
                                id: 'customerSegmentation'
                            }]
                        }]
                    },
                    {
                        title:'营销管理',
                        icon: 'fa fa-pie-chart',
                        name: 'yxManage',
                        children: [{
                            sub_title: '等级二',
                            sub_list: [{
                                id: "jjj",
                                name: '2-1'
                            },{
                                id: "kkk",
                                name: '2-2'
                            }]
                        }]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 50px;
        bottom:0;
    }
    .el-menu-item{
    	line-height: 40px;
    	height: 40px;
    	text-align: center;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
