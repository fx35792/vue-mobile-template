<template>
    <div class="home">
        <div class="text">首页</div>
        <van-button type="info" @click="showContent">按钮点击显示</van-button>
        <van-button type="info" @click="hideContent">按钮点击隐藏</van-button>
        <van-button type="primary" @click="jumpList">跳转到列表页面</van-button>
        <div v-if="visible">点击才能显示</div>
        <div>{{getFullName}}</div>
        <ul>
            <li v-for="(item,index) in list" :key="index">{{item.name}} {{item.email}}</li>
        </ul>
    </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
export default {
    name:'Home',
    computed:{
        ...mapState('home', ['list','visible']),
        ...mapGetters('home',['getFullName'])
    },
    created(){
        this.getList()
    },
    
    methods:{
        getList() {
            this.$store.dispatch('home/AGetList',{
                page:1,
                per_page:10
            })
        },
        showContent() {
            this.$store.commit('home/MChangeVisible', true)
        },
        hideContent() {
            this.$store.commit('home/MChangeVisible', false)
        },
        jumpList() {
            this.$router.push({
                name:'list'
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .home{
        background:#efefef;
        height: 100vh;
        .text{
            font-size: 20px;
        }
        .van-button{
            margin-right: 5px;
        }
    }
</style>

