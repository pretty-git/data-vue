<template>
    <div class="main">
        <Top></Top>
        <div class="content mt-20 ">
            <Lines :data="chartData" :unit="0"></Lines>
            <div class="center">
                <img src="../assets//img/car.png">
            </div>
            <Pie :data="chartData.weigth"></Pie>

        </div>
        <div class="content">
            <Bar :height="39" :show="false" :data="chartData" :unit="0"></Bar>
            <Ber></Ber>
            <Table :data="carList"></Table>
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
            },
            carList: []
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
            this.getDetail()
        }, 30000)
    },
    methods: {
        async getDetail() {
            const date = new Date();
            const subtime = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0')
            const { data: weigth } = await this.$api.getGarbage({
                berthId: '',
                subtime,
                "statType": 0
            })
            const { data: trans } = await this.$api.getCar({
                berthId: '',
                subtime,
                "statType": 0
            })
            this.chartData = { weigth: weigth || [], trans: trans || [] }
            const time = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate() + 1).padStart(2, '0')}`
            const { data } = await this.$api.getRecordList({
                pageSize: 20,
                recordType: 1,
                startTime: `${time} 00:00:00`,
                endTime: `${time} 23: 59: 59`
            })
            this.carList = (data || []).map(item => {
                return [
                    item.id,
                    item.carNO,
                    item.enteTime,
                    (item.cargoWeight / 1000).toFixed(2)]
            })
        },
    }

}
</script>
<style scoped lang="scss">
.mt-20 {
    margin-top: 20px;
}

::v-deep {

    .content {

        box-sizing: border-box;
        padding: 0 40px;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: 44vh;
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
    width: 34%;
    margin: auto;
    height: 100%;
    text-align: center;
}

.center>img {
    // width: 100%;
    height: 100%;
}
</style>
