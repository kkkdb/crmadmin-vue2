<template>
    <div class="header">
        <div class="logo">CRM 管理系统</div>
		<div class="levelOneMenu">
			<el-menu :default-active="oneLevel" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="1"><i class="el-icon-star-on"></i> 会员中心</el-menu-item>
				<el-menu-item index="2"><i class="el-icon-star-on"></i> 营销触达</el-menu-item>
				<el-menu-item index="3"><i class="el-icon-star-on"></i> 数据洞察</el-menu-item>
			</el-menu>
		</div>
        <div class="user-info">
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
	        			id: 'home'
		        		},{
		        			name: '生日权益',
		        			id: '1'
		        		},{
		        			name: '会员等级设置',
		        			id: '2'
		        		}]
		        	},{
		        		title: '会员积分',
		        		sub_list: [{
	        			name: '会员积分管理',
	        			id: '3'
		        		},{
		        			name: '活动积分设置',
		        			id: '4'
		        		},{
		        			name: '积分基础设置',
		        			id: '5'
		        		}]
		        	},{
		        		title: '兑礼及试用',
		        		sub_list: [{
	        			name: '积分兑礼设置',
	        			id: '6'
		        		},{
		        			name: '试用申请设置',
		        			id: '7'
		        		},{
		        			name: '积分兑礼记录',
		        			id: '8'
		        		},{
		        			name: '试用申请记录',
		        			id: '9'
		        		}]
		        	}],
		        	[{
		        		title: '等级二',
		        		sub_list: [{
		        			id: 23,
		        			name: '2-1'
		        		},{
		        			id: 24,
		        			name: '2-2'
		        		}]
		        	}]
        		]
            }
        },
        computed:{
        	...mapState(['username','oneLevel','menuList']),
        },
        mounted(){
        	this.handleSelect(1);
        },
        methods:{
        	...mapMutations(['changeMenuLevel','changeMenu']),
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            handleSelect(key){
            	this.changeMenuLevel(key);
            	this.changeMenu(this.list[key-1]);
            }
        }
    }
</script>
<style scoped lang="scss">
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        line-height: 50px;
        color: #fff;
        box-shadow: 0px 5px 5px #F5F5F7;
        background: #fff;
    }
    .header .logo{
        float: left;
        width:200px;
        background: #008DE7;
        text-align: center;
        font-size: 18px;
    }
    .levelOneMenu{
    	margin-left: 50px;
    	float: left;
    	width: 30%;
		ul{
			background-color: #fff;
			li{
	    		height: 50px;
	    		line-height: 50px;
	    		background: #fff;
	    	}
		}
    }
    .user-info {
        float: right;
        height: 100%;
        font-size: 16px;
        color: #fff;
        width: 200px;
		position: relative;
		padding-left: 40px;
        img{
        	position: absolute;
        	height: 30px;
        	top: 10px;
        	left: 0;
        }
        span{
        	display: inline-block;
        	height: 50px;
        	line-height: 50px;
        	color: #999;
        	font-size: 14px;
        }
    }
</style>
