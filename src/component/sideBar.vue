<template>
    <div class="sidebar">
    	<el-menu :default-active="onRoutes" mode="vertical" class="el-menu-vertical-demo" router>
    		<template v-for='item in menuList'>
    			<el-menu-item-group :title="item.title">
    				<template v-for='elem in item.sub_list'>
		        		<el-menu-item :index="elem.id">{{elem.name}}</el-menu-item>    					
    				</template>
		      	</el-menu-item-group>
    		</template>
	    </el-menu>

    </div>
</template>

<script>
	import {mapState} from 'vuex'
    export default {
        computed:{
        	...mapState(['menuList']),
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 200px;
        left: 0;
        top: 50px;
        bottom:0;
    }
    .el-menu-item{
    	line-height: 40px;
    	height: 40px;
    	text-align: center;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
