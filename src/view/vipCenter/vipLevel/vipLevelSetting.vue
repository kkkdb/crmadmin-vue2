<template>
	<div class="vip-level-setting">
		<nav-bar :navlist='navList'></nav-bar>
		<div class="table-content">
			<template>
				<el-table :data='tableData' style="width: 100%;">
					<el-table-column width='150px' label='等级编号'>
						<template scope="scope">
							<span>{{scope.$index+1}}</span>
						</template>
					</el-table-column>
					<el-table-column label='等级名称'>
						<template scope="scope">
							<el-input type="text" style="width:50%" v-model='scope.row.level_name' size='small'></el-input>
						</template>
					</el-table-column>
					<el-table-column label='升级规则'>
						<template scope="scope">
							<template v-if='scope.$index==0'>
								<span>绑定手机号</span>
							</template>
							<template v-else>
								当年消费金额满 <el-input type="number" style="width:50%" v-model='scope.row.level_up_rules' size='small'></el-input> 元
							</template>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
					        <i class="el-icon-minus" @click="handleDelete(scope.$index, scope.row)" style="cursor: pointer;"></i>
					        <template v-if='scope.$index+1==tableData.length'>
					        	<i class="el-icon-plus" @click="handleAdd(scope.$index, scope.row)" style="cursor: pointer;"></i>
					        </template>
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
		data(){
			return{
				navList: [{name: '会员中心'},{name: '会员等级'},{name: '会员等级设置'}],
				tableData: [{
					level_name: '普通会员',
					level_up_rules: '绑定手机号',
				},{
					level_name: '白银会员',
					level_up_rules: '66',
				},{
					level_name: '黄金会员',
					level_up_rules: '666',
				},{
					level_name: '铂金会员',
					level_up_rules: '6666',
				}]
			}
		},
		components:{
			navBar
		},
		methods:{
			handleDelete(index, row){
				this.$confirm('确认删除等级编号为 '+(index+1)+' 的这一行?', '提示', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
					let index = this.tableData.indexOf(row)
			        if (index !== -1) {
			          	this.tableData.splice(index, 1)
			        }
		          	this.$message({
		            	type: 'success',
		            	message: '删除成功!'
		          	});
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消删除'
		          	});          
		        });
			},
			handleAdd(){
				this.tableData.push({
					level_name: '',
					level_up_rules: '',
		        });
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';

	.vip-level-setting{
		padding: 0 20px;
		@include wh(100%, 100%);
	}
	.table-content{
		margin-top: 20px;
	}
	[class*=" el-icon-"], [class^=el-icon-]{
		border: 1px solid #999;
		padding: 3px;
		border-radius: 100%;
		color: #999;
		margin-right: 10px;
	}
	.submit-content{
		text-align: center;
		padding-top: 20px;
	}
</style>