<template>
	<div class=' pd-lr-20'>
		<nav-bar :navlist='navList'></nav-bar>
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
				navList: [{name: '会员中心'},{name: '兑礼及试用'},{name: '生日权益'}],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../css/mixin';


</style>