<template>
	<div class=' pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>

		<template>
		  	<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="成交客户" name="first">
			    	<div class="form-content clear">
						<el-form ref='firstForm' :model='firstForm' label-width="100px" >
							<el-col :span="8">
								<el-form-item label='分组名称'>
									<el-input placeholder='不限' v-model='submitForm.group_name'></el-input>
								</el-form-item>							
							</el-col>
							<el-col :span="8">
								<el-form-item label='客户昵称'>
									<el-input placeholder='不限' v-model='submitForm.customer_name'></el-input>
								</el-form-item>							
							</el-col>
							<template v-if='showMore==true'>
								<el-col :span="8">
									<vip-level-select :vip-level='submitForm.level' @selectLevel='selectLevel'></vip-level-select>
								</el-col>
								<el-col :span="8">
									<el-form-item label='交易额(元)'>
										<el-col :span='11'>
											<el-input v-model='submitForm.trade_from_price'></el-input>
										</el-col>
										<el-col :span='2' style='text-align: center'>-</el-col>
										<el-col :span='11'>
											<el-input placeholder='不限' v-model='submitForm.trade_to_price'></el-input>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label='交易笔数'>
										<el-col :span='11'>
											<el-input v-model='submitForm.trade_from_num'></el-input>
										</el-col>
										<el-col :span='2' style='text-align: center'>-</el-col>
										<el-col :span='11'>
											<el-input placeholder='不限' v-model='submitForm.trade_to_num'></el-input>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label='上次交易时间'>
										<el-date-picker
									      	v-model="submitForm.last_trade_time"
									      	type="daterange"
									      	align="right"
									      	placeholder="请选择时间段"
									      	:picker-options="pickerOptions"
									      	style='display: block;width: auto;'>
									    </el-date-picker>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label='地区'>
										<el-select v-model="submitForm.area_id" class='block'>
											<el-option :label='item.label' :value='item.value' v-for='item in areaList'></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label='性别'>
										<el-select v-model="submitForm.sex" class='block'>
											<el-option label='不限' value=''></el-option>
											<el-option label='男' value='1'></el-option>
											<el-option label='女' value='2'></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label='生日'>
										<el-col :span='11'>
											<el-select v-model='submitForm.start_time' class='block'>
												<el-option label='不限' value=''></el-option>
												<el-option v-for='n in 12' :label='n+"月"' :value='n'></el-option>
											</el-select>
										</el-col>
										<el-col :span='2' style='text-align: center'>-</el-col>
										<el-col :span='11'>
											<el-select v-model='submitForm.end_time' class='block'>
												<el-option label='不限' value=''></el-option>
												<el-option v-for='n in 12' :label='n+"月"' :value='n'></el-option>
											</el-select>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label='会员折扣'>
										<el-select v-model='submitForm.hasDiscount' class='block'>
											<el-option label='不限' value=''></el-option>
											<el-option label='享受会员折扣' value='1'></el-option>
											<el-option label='不享受会员折扣' value='2'></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item></el-form-item>
								</el-col>
							</template>
							<el-col :span="8">
								<el-button type='text' v-if='showMore==false' @click='showMore=true'>更多 <i class="el-icon-arrow-down"></i></el-button>
								<el-button type='text' v-else @click='showMore=false'>收起 <i class="el-icon-arrow-up"></i></el-button>
								<el-button type='primary'>搜索</el-button>
							</el-col>
						</el-form>			    		
			    	</div>
					<div class="table-content">
						<div class="table-header">
							<el-button size='mini' :disabled='multipleSelection.length==0'>批量设置</el-button>
							<el-button size='mini' :disabled='multipleSelection.length==0'>送优惠券</el-button>
							<el-button size='mini' :disabled='multipleSelection.length==0'>送支付宝红包</el-button>
							<el-button size='mini' :disabled='multipleSelection.length==0'>送流量</el-button>
							<el-button size='mini'>分组管理</el-button>
						</div>
						<div class="table-body">
							<el-table
								:data='tableData'
								style="width: 100%;color: #666;font-size: 12px;"
								@selection-change="handleSelectionChange">
								<el-table-column type='selection' width='50'></el-table-column>
								<el-table-column label='客户信息' prop='customer_name'></el-table-column>
								<el-table-column label='客户级别' prop='customer_level'></el-table-column>
								<el-table-column label='交易总额(元)' prop='trade_total_price'></el-table-column>
								<el-table-column label='交易笔数(笔)' prop='trade_total_num'></el-table-column>
								<el-table-column label='平均交易金额(元)' prop='trade_average_price'></el-table-column>
								<el-table-column label='上次交易时间' prop='last_trade_time'></el-table-column>
								<el-table-column label='操作'>
									<template scope='scope'>
										<el-button type='text' size='mini' class='no-padding'>详情</el-button>
										<el-button type='text' size='mini' class='no-padding'>交易记录</el-button>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="未成交客户" name="second">未成交客户</el-tab-pane>
			    <el-tab-pane label="询单客户" name="third">询单客户</el-tab-pane>
		  	</el-tabs>
		</template>
	</div>
</template>

<script>
	import navBar from '../../component/navBar'
	import vipLevelSelect from '../../component/common/vipLevelSelect'
	import {mapState} from 'vuex'
	export default{
		mounted() {

		},
		components:{
			navBar,
			vipLevelSelect
		},
		computed: {
			...mapState(['pickerOptions'])
		},
		data() {
			return{
				navList: [{name: '客户管理'},{name: '客户列表'}],
				activeName: 'first',
				showMore: false,
				areaList: [{
					label: '',
					value: ''
				}], //省列表
				submitForm: {
					group_name: '', 		//分组名称
					customer_name: '', 		//客户名称
					level: '', 				//会员等级
					trade_from_price: '0',	//交易from金额
					trade_to_price: '',		//交易to金额
					trade_from_num: '1',	//交易from笔数
					trade_to_num: '',		//交易to笔数
					last_trade_time: '',	//上次交易时间
					area_id: '', 			//地区
					sex: '',  				//性别
					start_time: '', 		//生日开始月份
					end_time: '',			//生日结束月份
					hasDiscount: '',		//会员折扣
				},
				tableData: [{
					customer_name: 'zky198267',
					customer_level: '至尊VIP会员',
					trade_total_price: '1242.00',
					trade_total_num: '9',
					trade_average_price: '138.00',
					last_trade_time: '2017-06-12',
				},{
					customer_name: 'yanjuan1815',
					customer_level: '高级会员',
					trade_total_price: '396.00',
					trade_total_num: '2',
					trade_average_price: '198.00',
					last_trade_time: '2017-05-29',
				},{
					customer_name: 'chenqin9891014',
					customer_level: '普通会员',
					trade_total_price: '164.00',
					trade_total_num: '1',
					trade_average_price: '164.00',
					last_trade_time: '2017-05-29',
				},],
				multipleSelection: [],
				firstForm: {},
			}
		},
		methods: {
			selectLevel(data){
				this.submitForm.level = data
			},
			handleClick(tab, event) {
		        // console.log(tab, event);
      		},
      		handleSelectionChange(val) {
		        this.multipleSelection = val;
	      	}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/mixin';
	
	.table-content .table-header{
		padding: 20px 0;
	}
</style>