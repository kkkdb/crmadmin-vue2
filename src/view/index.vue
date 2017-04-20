<template>
    <div>
        <!-- 页面顶部公共模块 -->
        <top-bar></top-bar>
        <!-- 侧边栏导航公共模块 -->
        <side-bar></side-bar>
        <!-- 路由导航的不同主内容区 -->
        <div class='content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import topBar from '../component/topBar'
import sideBar from '../component/sideBar'

export default {
    components: {
        'topBar': topBar,
        'sideBar': sideBar
    }
}
</script>