<template>
    <div class="main">
        <Top></Top>
        <div class="content">
            <Lines :data="chartData" :unit="0"></Lines>
            <div class="center">
                <img src="../assets//img/center.png">
            </div>
            <Pie :data="chartData.weigth"></Pie>

        </div>
        <div class="content">
            <Bar :height="35" :data="chartData" :unit="0"></Bar>
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
    name: 'Home',
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
            chartData: {
                weigth: [], trans: []
            }
        }
    },
    created() {
        this.getDetail()
    },
    beforeDestroy() {
        clearInterval(this.refresh)
        this.refresh = null
    },
    async mounted() {
        this.refresh = setInterval(() => {
            this.getDetail
        }, 10000)
    },
    methods: {
        async getDetail() {
            const date = new Date();
            const subtime = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0')
            const { data: weigth } = await this.$api.getGarbage({
                berthId: '',
                subtime,
                "statType": 1
            })
            const { data: trans } = await this.$api.getCar({
                berthId: '',
                subtime,
                "statType": 1
            })
            this.chartData = { weigth: weigth || [], trans: trans || [] }

        },
    }

}
</script>
<style scoped lang="scss">
::v-deep {
    .content {
        margin-top: 35px;
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
    width: 20%;
    margin: auto;
    // height: 30vh;
}
.center>img {
    width: 100%;
    height: 100%;
}
</style>
