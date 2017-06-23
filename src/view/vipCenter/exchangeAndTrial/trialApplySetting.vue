<template>
	<div class='trial-apply-setting pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>
		<div class="operation-btn">
			<el-button type='primary' class='button-radius' @click='addGift'>增加礼品</el-button>
			<el-button type='primary' class='button-radius' @click='batchOffShelf'>批量下架</el-button>
			<el-button type='primary' class='button-radius' @click='batchDelete'>批量删除</el-button>
		</div>
		<div class="table-content">
			<point-table :table-data='tableData' @select='select' @edit='edit'></point-table>
		</div>

		<el-dialog :title="dialogType=='add'?'新增试用':'编辑试用'" :visible.sync="dialogFormVisible">
		  	<el-form :model="dialogForm" :inline="true" label-width='100px'>
		  		<el-form-item label='试用类型' class='block'>
		  			<template>
		  				<el-radio class='radio' v-model='dialogForm.gift_type' label='freeTrial'>免费试用</el-radio>
		  				<el-radio class='radio' v-model='dialogForm.gift_type' label='pointChange'>积分兑换</el-radio>
		  				<el-radio class='radio' v-model='dialogForm.gift_type' label='postTrial'>付邮试用</el-radio>
		  			</template>
		  		</el-form-item>
		    	<el-form-item label="内部ID">
		      		<el-input v-model="dialogForm.inID" auto-complete="off" style='width: 220px;'></el-input>
	    		</el-form-item>
		    	<el-form-item label="产品名称">
		      		<el-input v-model="dialogForm.name" auto-complete="off" style='width: 220px;'></el-input>
	    		</el-form-item>
		    	<el-form-item label="兑换积分数">
		      		<el-input v-model="dialogForm.point" auto-complete="off" disabled style='width: 220px;'></el-input>
	    		</el-form-item>
	    		<el-form-item label="库存">
		      		<el-input v-model="dialogForm.stockNum" auto-complete="off" style='width: 220px;'></el-input>
	    		</el-form-item>
	    		<el-form-item label="活动时间">
		      		<el-date-picker
				      	v-model="dialogForm.date"
				      	type="daterange"
				      	placeholder="选择日期范围">
				    </el-date-picker>
	    		</el-form-item>
	    		<el-form-item label='领用方式' class='block'>
	    			<template>
					  	<el-radio class="radio" v-model="dialogForm.receive_type" label="shipping">快递寄送</el-radio>
					  	<el-radio class="radio" v-model="dialogForm.receive_type" label="counter">专柜领用</el-radio>
					</template>
	    		</el-form-item>
	    		<el-form-item label='礼品图片' class='block'>
	    			<el-upload
					  	class="avatar-uploader"
					  	action="https://jsonplaceholder.typicode.com/posts/"
					  	:show-file-list="false"
					  	:on-success="handleAvatarSuccess"
					  	:before-upload="beforeAvatarUpload">
					  	<img v-if="dialogForm.imageUrl" :src="dialogForm.imageUrl" class="avatar">
					  	<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<p>图片建议尺寸500px*500px</p>
	    		</el-form-item>
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
	import pointTable  from '../../../component/common/pointTable'
	export default{
		mounted() {
			let list = [{
				imgUrl: 'http://leqeeweishop.oss-cn-hangzhou.aliyuncs.com/shipping/3.jpg', //图片地址
				inID: '1', //内部ID
				outID: '11111', //外部ID
				giftName: '礼品一号', //礼品名称
				exchangeType: '快递寄送', //领取方式
				exchangePoint: '1000', //兑礼积分数
				stockNum: '50', //库存数
				exchangeNum: '50', //兑换量
				startDate: '2017-01-01 00:00:00',
				endDate: '2017-01-31 23:59:59'
			},{
				imgUrl: 'http://leqeeweishop.oss-cn-hangzhou.aliyuncs.com/shipping/4.jpg', //图片地址
				inID: '2', //内部ID
				outID: '22222', //外部ID
				giftName: '礼品二号', //礼品名称
				exchangeType: '快递寄送', //领取方式
				exchangePoint: '1000', //兑礼积分数
				stockNum: '50', //库存数
				exchangeNum: '50', //兑换量
				startDate: '2017-01-01 00:00:00',
				endDate: '2017-01-31 23:59:59'
			},{
				imgUrl: 'http://leqeeweishop.oss-cn-hangzhou.aliyuncs.com/shipping/1.jpg', //图片地址
				inID: '3', //内部ID
				outID: '33333', //外部ID
				giftName: '礼品三号', //礼品名称
				exchangeType: '柜台领取', //领取方式
				exchangePoint: '1000', //兑礼积分数
				stockNum: '50', //库存数
				exchangeNum: '50', //兑换量
				startDate: '2017-01-01 00:00:00',
				endDate: '2017-01-31 23:59:59'
			}]
			list.forEach(item => {
				item.modifyName = false
				item.modifyExchangePoint = false
				item.modifyStockNum = false
			})
			this.tableData = list
		},
		components:{
			navBar,
			pointTable
		},
		data() {
			return{
				navList: [{name: '会员中心'},{name: '兑礼及试用'},{name: '试用申请设置'}],
				tableData: [],
				dialogFormVisible: false,
				multipleSelection: [],
				dialogType: 'add',
				dialogForm: {
					gift_type: 'freeTrial',
					inID: '',
					name: '',
					point: '',
					stockNum: '',
					date: '',
					receive_type: 'shipping',
					imageUrl: ''
				}
			}
		},
		methods: {
			select(data){
		        this.multipleSelection = data.val;
			},
			edit(data){
				this.dialogType = data.dialogType;
				this.dialogFormVisible = data.dialogFormVisible;
			},
			addGift(){
				this.dialogType = 'add';
				this.dialogFormVisible = true;
			},
			handleAvatarSuccess(res, file) {
		        this.dialogForm.imageUrl = URL.createObjectURL(file.raw);
	      	},
	      	beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
	      	},
	      	batchOffShelf(){
	      		//检测选中数组
	      		if (!this.multipleSelection.length) {
	      			this.$message({
			          	message: '至少选择一件礼品',
			          	type: 'warning'
			        });
	      			return
	      		}
	      		this.$confirm('确定要将选中的礼品批量下架吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '下架成功!'
		          	});
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消'
		          	});
		        });
	      	},
	      	batchDelete(){
	      		//检测选中数组
	      		if (!this.multipleSelection.length) {
	      			this.$message({
			          	message: '至少选择一件礼品',
			          	type: 'warning'
			        });
	      			return
	      		}
	      		this.$confirm('删除后不可撤销删除，确定要将选中的礼品批量删除吗？', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		          	this.$message({
		            	type: 'success',
		            	message: '删除成功!'
		          	});
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消'
		          	});
		        });
	      	}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';

	.operation-btn{
		padding: 20px 0;
	}
	.avatar-uploader .avatar-uploader-icon{
		font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 178px;
	    line-height: 178px;
	    text-align: center;
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	}
</style>