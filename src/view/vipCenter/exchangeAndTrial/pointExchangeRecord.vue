<template>
	<div class='point-exchange-record pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>
		<div class="form-content">
			<el-form :model="recordForm" ref="recordForm" :inline="true" label-width="85px">
				<el-row>
					<el-col :span='5'>
						<el-form-item label='查询时间'>
							<el-date-picker
						      	v-model="recordForm.date"
						      	type="daterange"
						      	align="right"
						      	placeholder="请选择时间段"
						      	:picker-options="pickerOptions">
						    </el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span='5'>
						<el-form-item label='领取方式'>
							<el-select v-model='recordForm.exchangeType'>
								<el-option label='快递寄送' value='shipping'></el-option>
								<el-option label='专柜领用' value='counter'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span='5'>
						<el-form-item label='所属专柜' v-if='recordForm.exchangeType == "counter"'>
							<el-select v-model='recordForm.counterId'>
								<el-option label='全部' value=''></el-option>
								<el-option label='杭州西湖银泰店' value='1'></el-option>
								<el-option label='杭州滨江宝龙店' value='2'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span='5'>
						<el-form-item label='订单状态'>
							<el-select v-model='recordForm.orderStatus'>
								<el-option
									v-for='item in orderOptions'
									:key='item.value'
									:value='item.value'
									:label='item.label'>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='5'>
						<el-form-item label='礼品消息'>
							<el-input v-model='recordForm.giftInfo' placeholder='礼品名称/内部ID/外部ID' style='width: 220px;'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='5'>
						<el-form-item label='积分兑换数'>
							<el-input v-model='recordForm.giftExchangeNum' style='width: 200px;'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='5'>
						<el-form-item label='订单编号'>
							<el-input v-model='recordForm.orderNumber' style='width: 200px;'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='5'>
						<el-form-item label='会员手机号'>
							<el-input v-model='recordForm.phoneNumber' style='width: 200px;'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span='4'>
						<el-button type='primary' class='button-radius'>查 询</el-button>							
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div class="operation-btn">
			<el-button type='primary' class='button-radius'>批量确认</el-button>
			<el-button type='primary' class='button-radius'>批量发货/领用</el-button>
			<el-button type='primary' class='button-radius'>批量修改积分</el-button>
		</div>
		<div class="table-content">
			<el-table :data='tableData' style='width: 100%;font-size: 12px;' @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column label="订单编号" prop='orderNumber'></el-table-column>
				<el-table-column label="兑换人" prop='exchangePerson'></el-table-column>
				<el-table-column label="手机号" prop='mobile'></el-table-column>
				<el-table-column label="所属专柜" prop='counterName'></el-table-column>
				<el-table-column label='礼品信息'>
					<template scope='scope'>
						<p>内部ID：{{scope.row.inID}}</p>
						<p>外部ID：{{scope.row.outID}}</p>
						<p>{{scope.row.giftName}}</p>
					</template>
				</el-table-column>
				<el-table-column label="积分兑换数" prop='needPoint'></el-table-column>
				<el-table-column label="领用方式" prop='exchangeType'></el-table-column>
				<el-table-column label="订单状态" prop='orderStatus'></el-table-column>
				<el-table-column label='操作'>
					<template scope='scope'>
						<i class="el-icon-edit" @click='editDialog'></i>
						<el-button class='right' type='text'>确认</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<el-dialog title="编辑兑礼订单" :visible.sync="dialogFormVisible" top='10%'>
		  	<el-form :model="dialogForm" label-width='100px'>
		  		<el-row>
		  			<el-col :span='12'>
		  				<el-form-item label="订单编号">
				      		<p class="text-note" v-text='dialogForm.orderNumber'></p>
			    		</el-form-item>
			    		<el-form-item label="兑换人">
				      		<el-input v-model="dialogForm.exchangePerson" auto-complete="off" style='width: 200px;'></el-input>
			    		</el-form-item>
			    		<el-form-item label="省">
				      		<el-select v-model="dialogForm.province">
				      			<el-option value='' label='请选择'></el-option>
				      		</el-select>
			    		</el-form-item>
			    		<el-form-item label="区">
			    			<el-select v-model="dialogForm.district">
				      			<el-option value='' label='请选择'></el-option>
				      		</el-select>
			    		</el-form-item>
		  			</el-col>
		  			<el-col :span='12'>
			    		<el-form-item label="下单时间">
				      		<p class="text-note" v-text='dialogForm.shipping_time'></p>
			    		</el-form-item>
			    		<el-form-item label="手机号">
				      		<el-input v-model="dialogForm.mobile" auto-complete="off" style='width: 200px;'></el-input>
			    		</el-form-item>
			    		<el-form-item label="市">
			    			<el-select v-model="dialogForm.city">
				      			<el-option value='' label='请选择'></el-option>
				      		</el-select>
			    		</el-form-item>
		  			</el-col>
		  		</el-row>
		  		<el-row>
		  			<el-col :span='20'>
		  				<el-form-item label='详细地址'>
		  					<el-input type='textarea'></el-input>		  					
		  				</el-form-item>
		  			</el-col>
		  		</el-row>
		  		<el-row>
		  			<el-col :span='12'>
		  				<el-form-item label="领用方式">
				      		<el-select v-model="dialogForm.exchangeType">
				      			<el-option value='shipping' label='快递寄送'></el-option>
				      			<el-option value='counter' label='专柜领用'></el-option>
				      		</el-select>
			    		</el-form-item>
		  			</el-col>
		  			<el-col :span='12'>
		  				<el-form-item label="所属专柜" v-if='dialogForm.exchangeType == "counter"'>
				      		<el-select v-model="dialogForm.counterName">
				      			<el-option value='1' label='杭州西湖银泰店'></el-option>
				      			<el-option value='2' label='杭州滨江宝龙店'></el-option>
				      		</el-select>
			    		</el-form-item>
		  			</el-col>
		  		</el-row>
		  		<el-row>
		  			<el-form-item label='积分兑换数'>
		  				<p>{{dialogForm.needPoint}} <i class="el-icon-edit"></i></p>
		  			</el-form-item>
		  		</el-row>
		  		<el-row>
		  			<el-form-item label='订单状态'>
		  				<el-steps :space="50" direction="vertical" :active="1">
						  	<el-step title="未确认"></el-step>
						  	<el-step title="未发货"></el-step>
						  	<el-step title="未完成"></el-step>
						</el-steps>
		  			</el-form-item>
		  		</el-row>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  	</div>
		</el-dialog>
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
		computed: {
			...mapState(['pickerOptions'])
		},
		data() {
			return{
				navList: [{name: '会员中心'},{name: '兑礼及试用'},{name: '积分兑礼记录'}],
				recordForm: {
					exchangeType: 'shipping', 	//领取方式
					counterId: '', 				//柜台id
					date: '', 					//日期
					orderStatus: '', 			//订单状态
					giftInfo: '', 				//礼品信息 礼品名称/内部ID/外部ID
					giftExchangeNum: '', 		//积分兑换数
					orderNumber: '', 			//订单编号
					phoneNumber: '', 			//会员手机号
				},
				orderOptions: [{
					value: '',
					label: '全部'
				},{
					value: '1',
					label: '未确认'
				},{
					value: '2',
					label: '未发货'
				},{
					value: '3',
					label: '已发货'
				},{
					value: '4',
					label: '未领用'
				},{
					value: '5',
					label: '已领用'
				}],
				multipleSelection: [],
				tableData: [{
					orderNumber: '20170401001',
					exchangePerson: 'Lily',
					mobile: '18512586212',
					counterName: '杭州西湖银泰店',
					inID: '1234',
					outID: '123456',
					giftName: '礼品一号',
					needPoint: '5000',
					exchangeType: '快递寄送',
					orderStatus: '未确认'
				},{
					orderNumber: '20170401002',
					exchangePerson: 'HanMeimei',
					mobile: '15696857465',
					counterName: '杭州滨江宝龙店',
					inID: '2223',
					outID: '235689',
					giftName: '礼品二号',
					needPoint: '4000',
					exchangeType: '柜台领取',
					orderStatus: '未领用'
				}],
				dialogForm: {
					orderNumber: '201704010001',
					exchangePerson: '',
					province: '',
					shipping_time: '2017-04-01 10:00:00',
					mobile: '',
					city: '',
					district: '',
					exchangeType: 'shipping',
					counterName: '',
					needPoint: 5000,

				},
				dialogFormVisible: false
			}
		},
		methods: {
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			editDialog(){
				this.dialogFormVisible = true
				this.$nextTick(()=>{
					$('.el-dialog__wrapper .el-dialog').css('min-width', '640px')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';
	
	.form-content{
		padding-top: 15px;
		border-bottom: 1px solid #e0e3e6;
	}
	.operation-btn{
		padding: 15px 0;
	}
	.el-icon-edit{
		margin-left: 10px;
		color: #999;
		cursor: pointer;
		padding: 5px;
	}
</style>