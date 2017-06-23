<template>
	<div class='point-table'>
		<el-table :data='tableData' style='width: 100%;font-size: 12px;' @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="50"></el-table-column>
			<el-table-column label="礼品图片" width="120">
				<template scope="scope">
					<img :src="scope.row.imgUrl" alt="" width="80" height="80" style="object-fit: cover;">
				</template>
			</el-table-column>
			<el-table-column label='礼品编码'>
				<template scope='scope'>
					<p>内部ID：{{scope.row.inID}}</p>
					<p>外部ID：{{scope.row.outID}}</p>
				</template>
			</el-table-column>
			<el-table-column label='礼品名称'>
				<template scope='scope'>
					<p v-if='!scope.row.modifyName'><span class='txt-content' v-text='scope.row.giftName' :title='scope.row.giftName'></span> <i class="el-icon-edit" @click='handleEdit(scope, "modifyName")'></i></p>
					<p v-else><el-input ref='modifyName' v-model='scope.row.giftName' @blur='handleBlur(scope, "modifyName")'></el-input></p>
				</template>
			</el-table-column>
			<el-table-column label='领用方式' prop='exchangeType'></el-table-column>
			<el-table-column label='兑换积分数'>
				<template scope='scope'>
					<p v-if='!scope.row.modifyExchangePoint'>
						<span class="txt-content" v-text='scope.row.exchangePoint' :title='scope.row.exchangePoint'></span>
						<i class="el-icon-edit" @click='handleEdit(scope, "modifyExchangePoint")'></i>
					</p>
					<p v-else><el-input ref='modifyExchangePoint' v-model='scope.row.exchangePoint' @blur='handleBlur(scope, "modifyExchangePoint")'></el-input></p>
				</template>
			</el-table-column>
			<el-table-column label='库存'>
				<template scope='scope'>
					<p v-if='!scope.row.modifyStockNum'>
						<span class="txt-content" v-text='scope.row.stockNum' :title='scope.row.stockNum'></span>
						<i class="el-icon-edit" @click='handleEdit(scope, "modifyStockNum")'></i>
					</p>
					<p v-else><el-input ref='modifyStockNum' v-model='scope.row.stockNum' @blur='handleBlur(scope, "modifyStockNum")'></el-input></p>
				</template>
			</el-table-column>
			<el-table-column label='兑换量' prop='exchangeNum'></el-table-column>
			<el-table-column label='活动时间' width="160">
				<template scope='scope'>
					<p>{{scope.row.startDate}}</p>
					至 
					<p>{{scope.row.endDate}}</p>
				</template>
			</el-table-column>
			<el-table-column label='操作'>
				<template scope='scope'>
					<i class="el-icon-edit" @click='editDialog'></i>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		props: ['tableData'],
		mounted() {

		},
		data() {
			return{
				
			}
		},
		methods: {
			handleEdit(scope, type){
				scope.row[type] = !scope.row[type]
				this.$nextTick(()=>{
					$(scope._self.$refs[type].$el).find('input').focus();
				})
			},
			handleBlur(scope, type){
				scope.row[type] = !scope.row[type]
			},
			handleSelectionChange(val) {
				this.$emit('select',{
					val
				})
	      	},
	      	editDialog(){
	      		this.$emit('edit',{
					dialogType: 'edit',
					dialogFormVisible: true
				})
	      	}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/mixin';

	.el-icon-edit{
		margin-left: 10px;
		color: #999;
		cursor: pointer;
	}
	.txt-content{
		float: left;
		max-width: 80%;
	}
</style>