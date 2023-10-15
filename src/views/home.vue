<template>
    <div class="main">
        <Top></Top>
        <div class="content">
            <Lines></Lines>
            <div style="width: 30%;height: 300px;"></div>
            <Pie></Pie>
           
        </div>
        <div class="content" style="margin-top: 0;">
            <Bar></Bar>
            <Ber></Ber>
            <Table></Table>
        </div>

    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import Lines from "../components/echart/lines.vue"
import Bar from "../components/echart/bar.vue"
import Pie from "../components/echart/pie.vue"
import Ber from "../components/echart/berthage.vue"
import Table from "../components/echart/table.vue"


export default {
    components: {
        Top,
        Lines, Bar,
        Pie,
        Ber,
        Table
    },
    data() {
        return {

        }
    },
    created() {
    },
   async mounted() {
  
    }

}
</script>
<style scoped lang="scss">

::v-deep {
   

    .content {
        margin-top: 40px;
        box-sizing: border-box;
        padding: 0 40px;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }

}
</style>
<style>
.main {
    background: url(../assets/img/bj.jpg);
    background-size: 100% 100%;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;

}
.echart-title {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #318cdd;
        font-weight: bold;
    }

    .left-icon {
        height: 28px;
        width: 4px;
        background-color: #00deff;
        margin-right: 12px;
    }
</style>