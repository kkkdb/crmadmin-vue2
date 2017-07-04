<template>
	<div class="nav-bar">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="item.to" v-for='item in navlist'>{{item.name}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	export default{
		props: ["navlist"]
	}
</script>
<style scoped lang="scss">
	@import '../css/mixin';
	.nav-bar{
		padding-top: 20px;
		height: 50px;
		border-bottom: 1px solid $border;
	}
</style>