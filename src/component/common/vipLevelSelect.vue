<template>
	<el-form-item label="会员等级" prop="vipLevel">
		<el-select v-model="level" placeholder="请选择等级" @change='handleChange' style='display: block;'>
			<el-option :label="item.label" :value="item.value" v-for='item in vipLevelList'></el-option>
		</el-select>
	</el-form-item>
</template>

<script>
	export default{
		props: ['vipLevel'],
		mounted() {
			this.level = this.vipLevel
		},
		data() {
			return{
				level: '',
				vipLevelList: [{
					label: '全部',
					value: ''
				},{
					label: '普通会员',
					value: '1'
				},{
					label: '白银会员',
					value: '2'
				},{
					label: '黄金会员',
					value: '3'
				},{
					label: '铂金会员',
					value: '4'
				}]
			}
		},
		methods: {
			handleChange(val){
				this.$emit('selectLevel',val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../css/mixin';


</style>