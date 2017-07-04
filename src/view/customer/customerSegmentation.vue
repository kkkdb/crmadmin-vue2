<template>
	<div class='custom-segmentation pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>
		<div class="system-crowd clear">
			<el-popover
			  	ref="popover1"
			  	width="300"
			  	trigger="hover"
			  	content="人群覆盖人数过低，无法查看人群分析详情。">
			</el-popover>

			<p class="crowd-title">重点运营人群</p>
			
			<el-card class="box-card" body-style='padding: 16px 0 0;width: 100%;height: 100%;position: relative;' v-for='item in crowdList'>
				<div class="crowd-name">
					<img src="../../img/user.png" alt="" width="40" height="40">
					<div class="crowd-name-title">{{item.crowd_name_title}}</div>
					<div class="crowd-name-desc">{{item.crowd_name_desc}}</div>
				</div>
				<div class="count-data crowd-count">
					<div class="title">人群总数</div>
					<div class="count">{{item.count0}}</div>
				</div>
				<div class="count-data count-data-minor">
					<div class="title">昨日访客</div>
					<div class="count">{{item.count1}}</div>
				</div>
				<div class="count-data count-data-minor">
					<div class="title">昨日成交</div>
					<div class="count">{{item.count2}}</div>
				</div>
				<div class="foot-links">
					<a href="" class='btn-secondary btn-disabled' v-if='item.count0<10' v-popover:popover1>人群分析</a>
					<a href="" class='btn-secondary' v-else>人群分析</a>
					<a href="" class='btn-primary'>定向运营</a>
				</div>
			</el-card>
		</div>
		<div class="custom-crowd">
			<p class="crowd-title">我的人群库</p>
			<div class="tab-list">
				<template>
				  	<el-tabs v-model="activeName" style='font-size: 12px;'>
				    	<el-tab-pane label="自定义人群" name="first">
							<el-table
							:data='tableData'
							style="width: 100%;color: #666;font-size: 12px;">
								<el-table-column label='人群名称' prop='crowd_name'></el-table-column>
								<el-table-column label='人群定义'>
									<template scope='scope'>
										<el-popover
										  	ref="popover2"
										  	width="220"
										  	trigger="hover">
										  	<p v-for='item in scope.row.crowd_desc_list' v-text='item'></p>
										</el-popover>
										<p style='overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;margin: 10px 0;' v-popover:popover2>{{scope.row.crowd_desc_list.join('，且')}}</p>
									</template>
								</el-table-column>
								<el-table-column label='创建时间' prop='create_time'></el-table-column>
								<el-table-column label='人群数量' prop='crowd_num'></el-table-column>
								<el-table-column label='操作'>
									<template scope='scope'>
										<el-button type='text' size='mini' class='no-padding'>人群透视</el-button>
										<el-dropdown style='margin:0 3px;' menu-align='start'>
										  	<span class="el-dropdown-link" style="font-size: 12px; color: #20a0ff; cursor: pointer;">
										    	人群应用<i class="fa fa-chevron-down"></i>
										  	</span>
										  	<el-dropdown-menu slot="dropdown" style='font-size: 12px;'>
										    	<el-dropdown-item>个性化首页</el-dropdown-item>
										    	<el-dropdown-item>定向优惠</el-dropdown-item>
										    	<el-dropdown-item>定向海报</el-dropdown-item>
										  	</el-dropdown-menu>
										</el-dropdown>
										<el-button type='text' size='mini' class='no-padding'>编辑</el-button>
										<el-button type='text' size='mini' class='no-padding'>删除</el-button>
									</template>
								</el-table-column>
							</el-table>
				    	</el-tab-pane>
					    <el-tab-pane label="系统推荐人群" name="second">系统推荐人群</el-tab-pane>
				  	</el-tabs>
				</template>
			</div>
		</div>
		<div class="search-crowd">
			<el-input
				size='small'
			  	placeholder="输入人群名称"
			  	icon="search"
			  	v-model="searchValue"
			  	:on-icon-click="handleIconClick"
			  	style='width: 200px;margin-right: 10px;'>
			</el-input>
			<el-button type='primary' size='small'><i class="fa fa-plus"></i> 新增人群</el-button>
		</div>
	</div>
</template>

<script>
	import navBar from '../../component/navBar'
	export default{
		mounted() {
			let list = [{
				crowd_name: 'beta',
				crowd_desc_list: ['性别:女', '店铺会员等级:普通客户、VIP1', '付款次数:大于1并且小于10000', '商品系列偏好:betaD'],
				create_time: '2017-07-03',
				crowd_num: '低于300人'
			},{
				crowd_name: 'test',
				crowd_desc_list: ['成功交易次数:大于1并且小于10000', '店铺有购买:近360天内有成交'],
				create_time: '2017-07-02',
				crowd_num: '400+'
			}]
			this.tableData = list;
		},
		components:{
			navBar
		},
		data() {
			return{
				navList: [{name: '客户管理'},{name: '客户分群'}],
				crowdList: [{
					crowd_name_title: '兴趣人群',
					crowd_name_desc: '近3-10天有加购或收藏行为，且近期没有购买加购或者收藏商品的客户。',
					count0: '10',
					count1: '0',
					count2: '0'
				},{
					crowd_name_title: '复购人群',
					crowd_name_desc: '720天内只成交过一次，且此次成交在最近180天内。',
					count0: '158',
					count1: '0',
					count2: '0'
				},{
					crowd_name_title: '复购人群',
					crowd_name_desc: '买过店铺内复购率较高商品，且处于回购周期的客户。',
					count0: '1',
					count1: '0',
					count2: '0'
				}],
				activeName: 'first',
				tableData: [],
				searchValue: '',
			}
		},
		methods: {
			handleIconClick(val) {
				console.log(val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/mixin';
	.custom-segmentation{
		position: relative;
	}
	.system-crowd{
		margin-bottom: 20px;
	}
	.crowd-title{
		font-size: 14px;
		color: #333;
		border-left: 2px solid #333;
		padding-left: 10px;
		margin: 10px 0;
	}
	.box-card{
		width: 282px;
		height: 192px;
		margin-right: 16px;
		float: left;

		.crowd-name{
			height: 80px;
			font-size: 14px;
			color: #333;
			position: relative;
			padding-left: 62px;
			padding-right: 12px;

			img{
				position: absolute;
				left: 12px;
			}
			.crowd-name-desc{
				color: #999;
				font-size: 12px;
				margin-top: 4px;
				line-height: 18px;
			}
		}

		.count-data{
			width: 30%;
			float: left;
			color: #333;
			padding-left: 12px;

			&.crowd-count{
				width: 40%;
			}
			&.count-data-minor{
				border-left: 1px solid #e0e6e2;
			}

			.title{
				margin-bottom: 5px;
				font-size: 12px;
			}
		}

		.foot-links{
			position: absolute;
			bottom: 0;
			width: 100%;

			a{
				width: 50%;
				height: 32px;
				line-height: 32px;
				float: left;
				text-align: center;
				font-size: 12px;
			}
		}
	}
	.search-crowd{
		position: absolute;
		top: 10px;
		right: 20px;
	}
</style>