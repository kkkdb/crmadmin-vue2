<template>
	<div class="vip-level-manage pd-lr-20">
		<nav-bar :navlist='navList'></nav-bar>
		<div class="fourth-floor">
			<el-button type="primary" size="small" class='button-radius' @click='navigateTo("first")'>批量调整会员等级</el-button>
			<el-button type="primary" size="small" class='button-radius' @click='navigateTo("second")'>会员等级变更记录</el-button>
		</div>
		<div class="form-content">
			<el-form :model="searchForm" ref="searchForm" :inline="true" label-width="100px">
				<el-form-item label="会员手机号" prop="mobile">
					<el-input v-model="searchForm.mobile" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="当前等级" prop="level">
					<el-select v-model="searchForm.level" placeholder="请选择等级">
						<el-option label="普通会员" value="1"></el-option>
						<el-option label="白银会员" value="2"></el-option>
						<el-option label="黄金会员" value="3"></el-option>
						<el-option label="铂金会员" value="4"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click='search'>查询</el-button>
					<el-button @click="resetForm('searchForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table-content">
			<template>
				<el-table :data='tableData' style="width: 100%;">
					<el-table-column align='center' prop='vip_no' label='会员编号'></el-table-column>
					<el-table-column align='center' prop='user_name' label='会员姓名'></el-table-column>
					<el-table-column align='center' prop='mobile' label='会员手机号'></el-table-column>
					<el-table-column align='center' prop='vip_name' label='会员等级'></el-table-column>
					<el-table-column align='center' prop='last_shop_time' label='最近一次消费时间'></el-table-column>
					<el-table-column align='center' label="操作">
						<template scope="scope">
							<el-tooltip class="item" effect="dark" content="编辑" placement="top">
					        	<i class="el-icon-setting" @click="handleEdit(scope.$index, scope.row)" style="padding:5px;cursor: pointer;"></i>
      						</el-tooltip>
      						<el-tooltip class="item" effect="dark" content="查看详情" placement="top" style='margin-left: 20px;'>
					        	<i class="el-icon-more" @click="handleDetail(scope.$index, scope.row)" style="padding:5px;cursor: pointer;"></i>
      						</el-tooltip>
				      	</template>
					</el-table-column>
				</el-table>
			</template>
		</div>
		<el-dialog title="调整会员等级至" v-model='dialogVisible' @open='reDialogSize'>
			<ul class="img-list clear">
				<li v-for='item in imgList'><img :src="'http://leqeeweishop.oss-cn-hangzhou.aliyuncs.com/shipping/'+item.img_url" :alt="item.value"></li>
			</ul>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import navBar from '../../../component/navBar'
	export default{
		data(){
			return{
				navList: [{name: '会员中心'},{name: '会员等级'},{name: '会员等级管理'}],
				dialogVisible: false,
				imgList: [{
					id: 1,
					value: '普通会员',
					img_url: 'card_pt.png'
				},{
					id: 2,
					value: '白银会员',
					img_url: 'card_by.png'
				},{
					id: 3,
					value: '黄金会员',
					img_url: 'card_hj.png'
				},{
					id: 4,
					value: '铂金会员',
					img_url: 'card_bj.png'
				}],
				searchForm:{
					mobile: '',
					level: ''
				},
				tableData: [{
					user_id: '1',
					vip_no: 100001,
					user_name: '洞洞滨',
					mobile: 15958585851,
					vip_level: 1,
					vip_name: '普通会员',
					last_shop_time: '2017-05-11 20:00:00'
				},{
					user_id: '2',
					vip_no: 100002,
					user_name: '洞洞滨2',
					mobile: 15958585852,
					vip_level: 2,
					vip_name: '白银会员',
					last_shop_time: '2017-05-12 20:00:00'
				},{
					user_id: '3',
					vip_no: 100003,
					user_name: '洞洞滨3',
					mobile: 15958585853,
					vip_level: 3,
					vip_name: '黄金会员',
					last_shop_time: '2017-05-13 20:00:00'
				},{
					user_id: '4',
					vip_no: 100004,
					user_name: '洞洞滨4',
					mobile: 15958585854,
					vip_level: 4,
					vip_name: '铂金会员',
					last_shop_time: '2017-05-14 20:00:00'
				}]
			}
		},
		components: {
			navBar
		},
		methods:{
			search(){

			},
			handleEdit(index, row){
				this.dialogVisible = true;
			},
			handleDetail(index, row){
				localStorage.setItem('user_id', row.user_id);
				localStorage.setItem('name', 'third');
				this.$router.push({name: 'vipLevelDetail'})
			},
			navigateTo(name){
				localStorage.setItem('user_id', 0);
				localStorage.setItem('name', name);
				this.$router.push({name: 'vipLevelDetail'})
			},
			resetForm(formName) {
		        this.$refs[formName].resetFields();
	      	},
	      	reDialogSize(){
	      		$(".el-dialog.el-dialog--small").css('width','600px');
	      	}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';

	.vip-level-manage{
		@include wh(100%, 100%);
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