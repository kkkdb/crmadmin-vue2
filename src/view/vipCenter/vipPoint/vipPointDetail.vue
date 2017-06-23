<template>
	<div class='vip-level-detail'>
		<el-tabs type="border-card" v-model="activeName">
			<!-- 批量调整会员等级 -->
			<el-tab-pane label="批量手工发放积分" name='first'>
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
					<el-form-item label='发放积分数' prop='pointNum'>
						<el-input v-model="vipForm.pointNum" style='width: 200px;' placeholder='个积分每个手机'>
						    <!-- <template slot="append">个积分每个手机</template> -->
					  	</el-input>
					</el-form-item>
					<el-form-item label='发放原因' prop='reason'>
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="vipForm.reason" style='width: 200px;' placeholder='请输入发放原因'></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type='primary' size='small' class='button-radius' @click='submit("vipForm")'>确认</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<!-- 会员等级变更记录 -->
			<el-tab-pane label="积分变更记录" name='second'>
				<navBar :navlist='navList2' style='margin-top:10px;'></navBar>
				<el-form :model='secondForm' :inline='true' ref='secondForm' class='secondForm'>
					<el-form-item label='变更类型'>
						<el-select v-model='secondForm.change_type'>
							<el-option
								v-for='item in changeTypeOptions'
								:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
							</el-option>
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
					<el-form-item label='变更活动'>
						<el-select v-model='secondForm.change_activity'>
							<el-option
								v-for='item in changeActivityOptions'
								:key="item.value"
						      	:label="item.label"
						      	:value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label='会员手机'>
						<el-input style='width: 200px;' placeholder='请输入手机号' v-model='secondForm.mobile'></el-input>
					</el-form-item>
					<el-form-item label='变更原因'>
						<el-input style='width: 220px;' placeholder='请填写原因' v-model='secondForm.change_sources'></el-input>
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
							<el-table-column label='变更类型' prop='change_way'></el-table-column>
							<el-table-column label='变更积分' prop='change_points'></el-table-column>
							<el-table-column label='变更时间' prop='change_date' min-width='120px'></el-table-column>
							<el-table-column label='变更活动' prop='change_activity'></el-table-column>
							<el-table-column label='变更原因' prop='change_sources'></el-table-column>
							<el-table-column label='变更后积分' prop='after_points'></el-table-column>
						</el-table>
					</template>
				</div>
			</el-tab-pane>
			<!-- 会员等级详情 -->
			<el-tab-pane label="会员积分详情" name='third' v-if='pathName=="third"'>
				<navBar :navlist='navList3' style='margin-top:10px;'></navBar>
				<div class="vip-info">
					<div class="title">
						<span>会员编号：100001</span>
						<span style="margin-left:20px;">会员手机号：18888888888</span>
					</div>
					<div class="info-price">
						<div class="left"><p class='p1'>当前积分</p><p class="p2">233</p></div>
						<div class="left"><p class='p1'>30天内即将到期积分</p><p class="p2">50</p></div>
						<div class="left"><p class='p1'>历史累计积分</p><p class="p2">2233</p></div>
						<div class="left"><p class='p1'>累计消费积分</p><p class="p2">2000</p></div>
					</div>
				</div>
				<div class="form-content" style="height: 60px; padding-top: 10px;">
					<el-form :model='thirdForm' :inline='true' ref='thirdForm' class='thirdForm'>
						<el-form-item label='变更类型'>
							<el-select v-model='thirdForm.change_type'>
								<el-option
									v-for='item in changeTypeOptions'
									:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label='变更时间'>
							<el-date-picker
						      	v-model="thirdForm.change_date"
						      	type="daterange"
						      	align="right"
						      	placeholder="请选择时间段"
						      	:picker-options="pickerOptions">
						    </el-date-picker>
						</el-form-item>
						<el-form-item label='变更活动'>
							<el-select v-model='thirdForm.change_activity'>
								<el-option
									v-for='item in changeActivityOptions'
									:key="item.value"
							      	:label="item.label"
							      	:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button class='button-radius' type="primary" @click='search'>搜 索</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="table-content">
					<template>
						<el-table :data='tableData' style="width: 100%;">
							<el-table-column label='会员编号' prop='level_no'></el-table-column>
							<el-table-column label='会员手机号码' prop='mobile'></el-table-column>
							<el-table-column label='变更类型' prop='change_way'></el-table-column>
							<el-table-column label='变更积分' prop='change_points'></el-table-column>
							<el-table-column label='变更时间' prop='change_date' min-width='120px'></el-table-column>
							<el-table-column label='变更活动' prop='change_activity'></el-table-column>
							<el-table-column label='变更原因' prop='change_sources'></el-table-column>
							<el-table-column label='变更后积分' prop='after_points'></el-table-column>
						</el-table>
					</template>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import navBar from '../../../component/navBar'
	import {mapState} from 'vuex'
	export default{
		mounted() {

		},
		components:{
			navBar
		},
		created(){
			let list = [{name: '会员中心'},{name: '会员积分'},{name: '会员积分管理',to:'/vipPointManage'}];
			this.navList1 = [...list,...[{name: '批量手工发放积分'}]]
			this.navList2 = [...list,...[{name: '积分变更记录'}]]
			this.navList3 = [...list,...[{name: '会员积分详情'}]]

			this.activeName = this.pathName;
		},
		computed:{
			...mapState(['pickerOptions']),
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
					pointNum: '',
					reason: ''
				},
				rules: {
					mobile: [{required: true, message: '请输入手机号', trigger: 'blur'}],
					toLevel:  [{required: true, message: '请选择等级', trigger: 'change'}],
				},

				secondForm: {
					change_date: '',
					change_sources: '',
					change_type: 'all',
					change_activity: 'all',
					mobile: ''
				},

				thirdForm: {
					change_date: '',
					change_type: 'all',
					change_activity: 'all',
				},
				changeTypeOptions: [{
					value: 'all',
					label: '全部'
				},{
					value: 'out',
          			label: '扣减'
				},{
					value: 'in',
          			label: '发放'
				}],
				changeActivityOptions: [{
					value: 'all',
					label: '全部'
				},{
					value: '1',
          			label: '积分兑礼'
				},{
					value: '2',
          			label: '手工发放'
				},{
					value: '3',
          			label: '消费积分'
				},{
					value: '4',
          			label: '会员会动'
				}],

				tableData: [{
					level_no: '100001',
					mobile: '15888888888',
					change_way: '扣减',
					change_points: '-20',
					change_date: '2016-12-31 09:05:41',
					change_activity: '积分兑礼',
					change_sources: '兑礼订单：1111',
					after_points: '100',
				},{
					level_no: '100001',
					mobile: '15888888888',
					change_way: '发放',
					change_points: '20',
					change_date: '2016-12-31 10:12:52',
					change_activity: '手工发放',
					change_sources: '手工补发',
					after_points: '120',
				},{
					level_no: '100001',
					mobile: '15888888888',
					change_way: '发放',
					change_points: '50',
					change_date: '2016-12-31 16:50:02',
					change_activity: '消费积分',
					change_sources: '兑礼订单：111111',
					after_points: '170',
				},{
					level_no: '100001',
					mobile: '15888888888',
					change_way: '发放',
					change_points: '5',
					change_date: '2016-12-31 19:25:35',
					change_activity: '每日签到',
					change_sources: '兑礼订单：1111',
					after_points: '175',
				}]
			}
		},
		methods: {
			search(){

			},
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
			width: 25%;
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