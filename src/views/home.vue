<template>
    <div class="main">
        <Top></Top>
        <div class="content">
            <Lines></Lines>
            <div class="center"></div>
            <Pie></Pie>

        </div>
        <div class="content" style="margin-top: 0;">
            <Bar height="35vh"></Bar>
            <Ber></Ber>
            <Table></Table>
        </div>

    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import Lines from "../components/echart/echart-line.vue"
import Bar from "../components/echart/bar.vue"
import Pie from "../components/echart/pie.vue"
import Ber from "../components/echart/berthage.vue"
import Table from "../components/echart/table.vue"


export default {
    components: {
        Top,
        Lines,
        Bar,
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

    .echart-title {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #318cdd;
        font-weight: bold;
    }

}

.center {
    width: 30%;
    height: 30vh;
}
</style>
