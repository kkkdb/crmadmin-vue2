<template>
	<div class='vip-basic-setting pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>

		<div class="form-content">
			<el-form :model="submitForm" ref="submitForm" label-width="100px">
				<el-form-item label="消费积分">
					<div class="text1">
						每 <el-input v-model="submitForm.price" style='width: 100px;margin:0 5px;'></el-input> 元，赠送1积分 按照付款金额（不含运费）比例发放
					</div>
				</el-form-item>
				<el-form-item label="积分有效期">
					<div class="text2">
						<template>
						  	<el-radio class="radio" v-model="submitForm.dateWay" label="1">发放当前12月31日后过期</el-radio>
						  	<el-radio class="radio" v-model="submitForm.dateWay" label="2">
								<el-input v-model="submitForm.timeNum" style='width: 100px;margin:0 5px;'></el-input>
								<el-select v-model="submitForm.timeWay" style='width: 75px;'>
								    <el-option
								      	v-for="item in options"
								      	:key="item.value"
								      	:label="item.label"
								      	:value="item.value">
								    </el-option>
							  	</el-select>
							  	后过期
						  	</el-radio>
						</template>
					</div>
				</el-form-item>
				<el-form-item>
					<el-button class='button-radius'>取消</el-button>
					<el-button type="primary" class='button-radius'>保存</el-button>
				</el-form-item>
			</el-form>
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
				navList: [{name: '会员中心'},{name: '会员积分'},{name: '积分基础设置'}],
				submitForm: {
					price: '',
					dateWay: '1',
					timeNum: '',
					timeWay: 'year'
				},
				options: [{
					value: 'year',
					label: '年'
				},{
					value: 'month',
					label: '月'
				},{
					value: 'date',
					label: '日'
				}]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';
	.form-content{
		margin-top: 10px;
	}
	.el-radio+.el-radio{
		display: block;
		margin-left: 0;
	}
</style>