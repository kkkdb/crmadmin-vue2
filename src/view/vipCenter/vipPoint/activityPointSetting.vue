<template>
	<div class='activity-point-setting pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>

		<div class="sign-block">
			<p class="title">每日签到</p>
			<div class="box-content">
				<el-form :model="signForm" ref="signForm" label-width="100px">
					<el-form-item label='签到活动时间'>
						<el-date-picker
					      	v-model="signForm.date"
					      	type="daterange"
					      	placeholder="选择日期范围">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label='每日签到积分'>
						<el-input v-model='signForm.point' style='width: 220px;'></el-input> 分
					</el-form-item>
					<el-form-item label='连续签到奖励'>
						<template>
						  	<el-radio class="radio" v-model="signForm.isSuccessive" label="0">无</el-radio>
						  	<el-radio class="radio" v-model="signForm.isSuccessive" label="1">
						  		连续签到 <el-input v-model='signForm.limitDay' style='width: 100px;'></el-input> 天，奖励 <el-input v-model='signForm.limitPoint' style='width: 100px;'></el-input> 积分
						  	</el-radio>
						</template>
					</el-form-item>
					<el-form-item>
						<el-button class='button-radius'>取消</el-button>
						<el-button type="primary" class='button-radius'>保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="user-info">
			<p class="title">完善资料</p>
			<div class="box-content">
				<el-form :model="userForm" ref="userForm" label-width="100px">
					<el-form-item label='完善资料奖励'>
						<el-input style='width: 100px;' v-model='userForm.point'></el-input> 积分
					</el-form-item>
					<el-form-item label='完善资料内容'>
						<el-checkbox-group v-model='userForm.checkedInfos'>
							<template v-for='item in infoOptions'>
								<el-checkbox class='block' v-if='item.value=="contentWay"' :label='item.value' :key='item.value'>
									{{item.label}} 
									<span v-for='elem in userForm.contentWayList' v-text='elem.label'></span>
									<span style="color: #20a0ff;">添加</span>
								</el-checkbox>
								<el-checkbox class='block' v-else-if='item.value=="other"' :label='item.value' :key='item.value'>
									{{item.label}} 
									<span v-for='elem in userForm.otherList' v-text='elem.label'></span>
									<span style="color: #20a0ff;">添加</span>
								</el-checkbox>
								<el-checkbox v-else :label='item.value' :key='item.value'>{{item.label}}</el-checkbox>
							</template>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item>
						<el-button class='button-radius'>取消</el-button>
						<el-button type="primary" class='button-radius'>保存</el-button>
					</el-form-item>
				</el-form>
			</div>
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
				navList: [{name: '会员中心'},{name: '会员积分'},{name: '活动积分设置'}],

				signForm: {
					date: '',
					point: '',
					isSuccessive: "0",
					limitDay: '',
					limitPoint: ''
				},
				userForm: {
					point: '',
					checkedInfos: ['contentWay', 'other'],
					contentWayList: [{
						value: 'msg',
						label: '短信'
					},{
						value: 'email',
						label: '邮件'
					},{
						value: 'phone',
						label: '电话'
					}],
					otherList: [{
						value: '1',
						label: '干性'
					},{
						value: '2',
						label: '油性'
					},{
						value: '3',
						label: '敏感性'
					}]
				},
				infoOptions: [{
					value: 'name',
					label: '姓名'
				},{
					value: 'sex',
					label: '性别'
				},{
					value: 'mobile',
					label: '手机号(不可改)'
				},{
					value: 'email',
					label: '邮箱'
				},{
					value: 'birthday',
					label: '生日'
				},{
					value: 'pcd',
					label: '所在地'
				},{
					value: 'address',
					label: '具体地址'
				},{
					value: 'contentWay',
					label: '联系方式'
				},{
					value: 'other',
					label: '您的肤质'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';
	.title{
		margin: 10px 0;
		color: #333;
		font-size: 14px;
	}
	.box-content{
		width: 100%;
		border: 1px dashed #e0e3e6;
		padding: 20px 10px;
	}
	.el-checkbox+.el-checkbox.block{
		display: block;
		margin-left: 0;

		span{
			margin: 0 15px;
		}
	}
</style>