<template>
	<div class='brithday-rights pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>
		<div class="meg-tips">
			当会员等级设置和积分基础设置未设置时，提示：若要设置会员生日特权，请先进行 <router-link :to="{name: 'vipLevelSetting'}" class='routerLink'>会员等级设置</router-link> 和 <router-link :to="{name: 'vipLevelSetting'}" class='routerLink'>积分基础设置</router-link>。
		</div>
		<div class="table-content">
			<template>
				<el-table :data='tableData' style="width: 100%;">
					<el-table-column label='等级编号'>
						<template scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column label='等级名称' prop='level_name'></el-table-column>
					<el-table-column label='生日权益'>
						<template scope="scope">
							<div class='line'>
								生日当月消费积分 <el-input type="number" style="width:30%" v-model='scope.row.point_times' size='small'></el-input> 倍
							</div>
							<div class='line'>
								生日当天送 <el-input type="number" style="width:30%" v-model='scope.row.gift_point' size='small'></el-input> 积分
							</div>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
		<div class="submit-content">
			<el-button class='button-radius'>取消</el-button>
			<el-button type="primary" class='button-radius'>保存</el-button>
		</div>
	</div>
</template>

<script>
	import navBar from '../../../component/navBar'
	export default{
		mounted() {

		},
		components:{
			navBar
		},
		data() {
			return{
				navList: [{name: '会员中心'},{name: '会员等级'},{name: '生日权益'}],
				tableData: [{
					level_name: '普通会员',
					point_times: '1', //生日当月积分消费倍数
					gift_point: '100', //生日当天赠送积分
				},{
					level_name: '白银会员',
					point_times: '2', //生日当月积分消费倍数
					gift_point: '200', //生日当天赠送积分
				},{
					level_name: '黄金会员',
					point_times: '2', //生日当月积分消费倍数
					gift_point: '500', //生日当天赠送积分
				},{
					level_name: '铂金会员',
					point_times: '3', //生日当月积分消费倍数
					gift_point: '1000', //生日当天赠送积分
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';
	.meg-tips{
		margin: 10px 0;
		background-color: #FCF3DC;
		height: 40px;
		line-height: 40px;
		padding:0 10px;
		color: #666;
		border-radius: 4px;
	}
	.routerLink{
		color: #008DE7;
	}
	.line{
		margin: 5px 0;
	}
	.submit-content{
		text-align: center;
		padding-top: 20px;
	}
</style>