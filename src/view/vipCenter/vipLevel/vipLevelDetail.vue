<template>
	<div class='vip-level-detail'>
		<el-tabs type="border-card" v-model="activeName">
			<!-- 批量调整会员等级 -->
			<el-tab-pane label="批量调整会员等级" name='first'>
				<navBar :navlist='navList1' style='margin-top:10px;'></navBar>
				<el-form :model='vipForm' :rules="rules" ref='vipForm' label-width="100px" class='vipForm'>
					<el-form-item label='输入手机号' prop='mobile'>
						<el-input type="textarea" v-model="vipForm.mobile" :rows='8' style="width: 200px;" class='left'></el-input>
						<div class="example left">
							<p class="text-info">若有多个手机号，则一行一个，最多输入100个</p>
							<p>示例如下：</p>
							<div class="example-mobile">
								<p>18811111111</p>
								<p>18822222222</p>
								<p>18833333333</p>
							</div>
						</div>
					</el-form-item>
					<el-form-item label='调整等级至' prop='toLevel'>
						<el-select v-model='vipForm.toLevel' placeholder='请选择'>
							<el-option label="普通会员" value="1"></el-option>
							<el-option label="白银会员" value="2"></el-option>
							<el-option label="黄金会员" value="3"></el-option>
							<el-option label="铂金会员" value="4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type='primary' size='small' class='button-radius' @click='submit("vipForm")'>确认</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<!-- 会员等级变更记录 -->
			<el-tab-pane label="会员等级变更记录" name='second'>
				<navBar :navlist='navList2' style='margin-top:10px;'></navBar>
				<el-form :model='secondForm' :inline='true' ref='secondForm' class='secondForm'>
					<el-form-item label='变更来源'>
						<el-select v-model='secondForm.change_sources'>
							<el-option label='系统执行' value='1'></el-option>
							<el-option label='手工调整' value='2'></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label='变更时间'>
						<el-date-picker
					      	v-model="secondForm.change_date"
					      	type="daterange"
					      	align="right"
					      	placeholder="请选择时间段"
					      	:picker-options="pickerOptions">
					    </el-date-picker>
					</el-form-item>
					<el-form-item label='会员手机号'>
						<el-input placeholder='请输入手机号' v-model='secondForm.mobile'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type='primary' class='button-radius'>查 询</el-button>
					</el-form-item>
				</el-form>
				<div class="table-content">
					<template>
						<el-table :data='tableData' style="width: 100%;">
							<el-table-column label='会员编号' prop='level_no'></el-table-column>
							<el-table-column label='会员手机号码' prop='mobile'></el-table-column>
							<el-table-column label='变更前等级' prop='prev_level'></el-table-column>
							<el-table-column label='变更后等级' prop='next_level'></el-table-column>
							<el-table-column label='变更来源' prop='change_sources'></el-table-column>
							<el-table-column label='变更时间' prop='change_date'></el-table-column>
						</el-table>
					</template>
				</div>
			</el-tab-pane>
			<!-- 会员等级详情 -->
			<el-tab-pane label="会员等级详情" name='third' v-if='pathName=="third"'>
				<navBar :navlist='navList3' style='margin-top:10px;'></navBar>
				<div class="vip-info">
					<div class="title">
						<span>会员编号：100001</span>
						<span style="margin-left:20px;">会员手机号：18888888888</span>
					</div>
					<div class="info-price">
						<div class="left"><p class='p1'>当前等级</p><p class="p2">4</p></div>
						<div class="left"><p class='p1'>当年累计交易额（元）</p><p class="p2">5000</p></div>
						<div class="left"><p class='p1'>最近30天交易额（元）</p><p class="p2">1000</p></div>
					</div>
				</div>
				<div class="table-content">
					<template>
						<el-table :data='tableData' style="width: 100%;">
							<el-table-column label='会员编号' prop='level_no'></el-table-column>
							<el-table-column label='会员手机号码' prop='mobile'></el-table-column>
							<el-table-column label='变更前等级' prop='prev_level'></el-table-column>
							<el-table-column label='变更后等级' prop='next_level'></el-table-column>
							<el-table-column label='变更来源' prop='change_sources'></el-table-column>
							<el-table-column label='变更时间' prop='change_date'></el-table-column>
						</el-table>
					</template>
				</div>
			</el-tab-pane>
		</el-tabs>
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
		created(){
			let list = [{name: '会员中心'},{name: '会员等级'},{name: '会员等级管理',to:'/vipLevelManage'}];
			this.navList1 = [...list,...[{name: '批量调整会员等级'}]]
			this.navList2 = [...list,...[{name: '会员等级变更记录'}]]
			this.navList3 = [...list,...[{name: '会员等级详情'}]]

			this.activeName = this.pathName;
		},
		computed:{
			pathName(){
				return localStorage.getItem('name')
			}
		},
		data() {
			return{
				navList1: [],
				navList2: [],
				navList3: [],
				activeName: '',

				vipForm: {
					mobile: '',
					toLevel: '',
				},
				rules: {
					mobile: [{required: true, message: '请输入手机号', trigger: 'blur'}],
					toLevel:  [{required: true, message: '请选择等级', trigger: 'change'}],
				},

				secondForm: {
					change_date: '',
					change_sources: '',
					mobile: ''
				},

				pickerOptions: {
		          	shortcuts: [{
		            	text: '最近一周',
		            	onClick(picker) {
		              		const end = new Date();
		              		const start = new Date();
		              		start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              		picker.$emit('pick', [start, end]);
		            	}
		          	}, {
		            	text: '最近一个月',
		            	onClick(picker) {
		              		const end = new Date();
		              		const start = new Date();
		              		start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              		picker.$emit('pick', [start, end]);
		            	}
		          	}, {
		            	text: '最近三个月',
		            	onClick(picker) {
		              		const end = new Date();
		              		const start = new Date();
		              		start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              		picker.$emit('pick', [start, end]);
		            	}
		          	}]
		        },

				tableData: [{
					level_no: '100001',
					mobile: '15888888888',
					prev_level: '-',
					next_level: '普通会员',
					change_sources: '系统执行',
					change_date: '2016-12-31 10:00:00',
				},{
					level_no: '100001',
					mobile: '15888888888',
					prev_level: '普通会员',
					next_level: '银卡会员',
					change_sources: '手工调整',
					change_date: '2017-01-14 15:23:05',
				},{
					level_no: '100001',
					mobile: '15888888888',
					prev_level: '银卡会员',
					next_level: '金卡会员',
					change_sources: '系统执行',
					change_date: '2017-02-15 10:00:00',
				},{
					level_no: '100001',
					mobile: '15888888888',
					prev_level: '金卡会员',
					next_level: '铂金会员',
					change_sources: '手工调整',
					change_date: '2017-05-18 09:15:45',
				}]
			}
		},
		methods: {
			submit(formName){
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.vipForm.mobile);						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';
	.el-tabs--border-card{
		border: none;
		box-shadow: none;
	}
	.vipForm{
		margin-top: 20px;
	}
	.vip-info{
		padding: 10px 0;
		color: $normal;
		.title{
			margin: 8px 0;
		}
	}
	.info-price{
		width: 100%;
		height: 100px;
		background-color: #E5F3FD;

		.left{
			width: 33.3%;
			text-align: center;
			padding-top: 20px;

			.p2{
				font-size: 26px;
				margin-top: 5px;
				color: #008DE7;
			}
		}
	}
	.table-content{
		margin-top: 10px;
	}
	.example{
		padding: 10px;
		background-color: #CCE8FA;
		@include borderRadius(4px);
		margin-left: 10px;
		p{
			color: $normal;
			height: 20px;
			line-height: 20px;
			&.text-info{
				color: #008DE7;
			}
		}
		.example-mobile{
			padding: 8px;
			margin: 5px 0;
			background-color: #fff;
			@include borderRadius(4px);
		}
	}
	.secondForm{
		margin-top: 20px;
	}
</style>