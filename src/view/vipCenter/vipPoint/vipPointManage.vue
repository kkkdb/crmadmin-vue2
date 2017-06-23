<template>
	<div class="vip-level-manage pd-lr-20">
		<nav-bar :navlist='navList'></nav-bar>
		<div class="fourth-floor">
			<el-button type="primary" size="small" class='button-radius' @click='navigateTo("first")'>批量手工发放积分</el-button>
			<el-button type="primary" size="small" class='button-radius' @click='navigateTo("second")'>积分变更记录</el-button>
		</div>
		<div class="form-content">
			<el-form :model="searchForm" ref="searchForm" :inline="true" label-width="100px">
				<el-form-item label="会员手机号" prop="mobile">
					<el-input v-model="searchForm.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class='button-radius' type="primary" @click='search'>查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-content">
			<template>
				<el-table :data='tableData' style="width: 100%;">
					<el-table-column align='center' prop='vip_no' label='会员编号'></el-table-column>
					<!-- <el-table-column align='center' prop='user_name' label='会员姓名'></el-table-column> -->
					<el-table-column align='center' prop='mobile' label='会员手机号'></el-table-column>
					<el-table-column align='center' prop='now_points' label='当前积分'></el-table-column>
					<el-table-column align='center' prop='history_points' label='历史累计积分'></el-table-column>
					<el-table-column align='center' prop='all_out_points' label='累计消耗积分'></el-table-column>
					<el-table-column align='center' label="操作">
						<template scope="scope">
							<el-popover
							  	ref="popover1"
							  	placement="left"
							  	trigger="hover">
							  	<p class='text-center popover-p'>发放积分</p>
							  	<p class='text-center popover-p'>扣减积分</p>
							</el-popover>
				        	<i class="el-icon-setting" v-popover:popover1 style="padding:5px;cursor: pointer;margin-right:5px;"></i>
				        	<i class="el-icon-more" @click="handleDetail(scope.$index, scope.row)" style="padding:5px;cursor: pointer;"></i>
				      	</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
	</div>
</template>

<script>
	import navBar from '../../../component/navBar'
	export default{
		data(){
			return{
				navList: [{name: '会员中心'},{name: '会员积分'},{name: '会员积分管理'}],
				dialogVisible: false,
				searchForm:{
					mobile: ''
				},
				tableData: [{
					user_id: '1',
					vip_no: 100001,
					user_name: '洞洞滨',
					mobile: 15958585851,
					now_points: '233',
					history_points: '2233',
					all_out_points: '2000'
				},{
					user_id: '2',
					vip_no: 100002,
					user_name: '洞洞滨2',
					mobile: 15958585852,
					now_points: '233',
					history_points: '2233',
					all_out_points: '2000'
				},{
					user_id: '3',
					vip_no: 100003,
					user_name: '洞洞滨3',
					mobile: 15958585853,
					now_points: '233',
					history_points: '2233',
					all_out_points: '2000'
				},{
					user_id: '4',
					vip_no: 100004,
					user_name: '洞洞滨4',
					mobile: 15958585854,
					now_points: '233',
					history_points: '2233',
					all_out_points: '2000'
				}]
			}
		},
		components: {
			navBar
		},
		methods:{
			search(){

			},
			handleDetail(index, row){
				localStorage.setItem('user_id', row.user_id);
				localStorage.setItem('name', 'third');
				this.$router.push({name: 'vipPointDetail'})
			},
			navigateTo(name){
				localStorage.setItem('user_id', 0);
				localStorage.setItem('name', name);
				this.$router.push({name: 'vipPointDetail'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';

	.vip-level-manage{
		@include wh(100%, 100%);
	}
	.popover-p{
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		margin-top: 5px;
		cursor: pointer;

		&:hover{
			color: #20a0ff;
		}
	}
	.fourth-floor{
		height: 60px;
		position: relative;
		border-bottom: 1px solid $border;

		.button-radius{
			margin-top: 16px;
		}
	}
	.form-content{
		margin-top: 15px;
	}
	.img-list{
		width: 100%;
		li{
			float: left;
			width: 50%;
			padding: 20px;
			img{
				width: 100%;
				height: 100%;
				cursor: pointer;
			}
		}
	}
</style>