<template>
    <div class="list">
        <van-button type="primary" @click="handleBack">返回</van-button>

    </div>
</template>
<script>
export default {
    name:'List',
    methods:{
        handleBack(){
            this.$router.back()
        }
    }
}
</script>
<style lang="less" scoped>
    
</style>