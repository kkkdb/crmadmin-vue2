<template>
    <div class="header">
        <div class="logo">CRM 管理系统</div>
		<!-- <div class="level-one-menu">
			<el-menu :default-active="oneLevel" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="fa fa-diamond"></i> 会员中心</el-menu-item>
                <el-menu-item index="2"><i class="fa fa-yelp"></i> 客户管理</el-menu-item>
				<el-menu-item index="3"><i class="fa fa-yelp"></i> 营销触达</el-menu-item>
				<el-menu-item index="4"><i class="fa fa-pie-chart"></i> 数据洞察</el-menu-item>
			</el-menu>
		</div> -->
        <div class="login-out right" @click='loginOut'>
        	<i class="fa fa-power-off"></i>
        </div>
        <div class="recharge right">
        	<span>充</span>
        </div>
        <div class="user-info right">
            <img class="user-logo" src="../img/user.jpg">
            <span class="username">{{username}}，您好！</span>
        </div>
    </div>
</template>
<script>
	import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
            	list : [
            		[{
	            		title: '会员等级',
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
		        		title: '会员积分',
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
		        		title: '兑礼及试用',
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
                    [{
                        title: '客户管理',
                        sub_list: [{
                            name: '客户列表',
                            id: 'customerList'
                        },{
                            name: '客户分群',
                            id: 'customerSegmentation'
                        }]
                    }],
		        	[{
		        		title: '等级二',
		        		sub_list: [{
		        			id: "jjj",
		        			name: '2-1'
		        		},{
		        			id: "kkk",
		        			name: '2-2'
		        		}]
		        	}],
		        	[{
		        		title: '等级三',
		        		sub_list: [{
		        			id: "lll",
		        			name: '3-1'
		        		},{
		        			id: "mmm",
		        			name: '3-2'
		        		}]
		        	}]
        		]
            }
        },
        computed:{
        	...mapState(['username','oneLevel','menuList']),
        },
        mounted(){
        	this.handleSelect("1");
        },
        methods:{
        	...mapMutations(['changeMenuLevel','changeMenu']),
            loginOut(command) {
                localStorage.removeItem('ms_username')
                this.$router.push({name: 'login'});
            },
            handleSelect(key){
            	this.changeMenuLevel(key);
            	this.changeMenu(this.list[key-1]);
            }
        }
    }
</script>
<style scoped lang="scss">
	@import '../css/mixin';
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        line-height: 50px;
        color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        background: #fff;
    }
    .header .logo{
        float: left;
        width:200px;
        background: #008DE7;
        text-align: center;
        font-size: 18px;
        color: #fff;
    }
    .level-one-menu{
    	float: left;
		ul{
			background-color: #fff;
			li{
	    		height: 50px;
	    		line-height: 50px;
	    		background: #fff;
	    		color: #999;
	    		&.is-active{
	    			color: #20a0ff;
	    		}
	    	}
		}
    }
    .user-info {
        height: 100%;
        font-size: 16px;
        color: #fff;
		position: relative;
		padding-left: 40px;
		padding-right: 20px;
        img{
        	position: absolute;
        	height: 30px;
        	top: 10px;
        	left: 0;
        	@include borderRadius(100%);
        }
        span{
        	display: inline-block;
        	height: 50px;
        	line-height: 50px;
        	color: #999;
        	font-size: 14px;
        }
    }
    .login-out{
    	width: 50px;
    	text-align: center;
    	color: #999;
    	border-left: 1px solid $border;
    	font-size: 20px;
    	cursor: pointer;
    }
    .recharge{
    	width: 50px;
    	text-align: center;
    	border-left: 1px solid $border;
    	font-size: 12px;

    	span{
    		background-color: $border;
    		cursor: pointer;
    		padding: 2.5px 5px;
    		@include borderRadius(100%);
            color: #fff;
    	}
    }
</style>
