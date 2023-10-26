<template>
    <div class="main">
        <Top></Top>
        <div class="contents">
            <div class="left-main">
                <div class="echart-title">
                    <div class="left-icon"></div>{{ berObj.berthId }}号泊位信息
                </div>
                <div class="flex mt-12">
                    <div class="left">
                        <div class="circle-t">
                            {{ (berObj.berthUseCapacity / berObj.berthTotalCapacity).toFixed(2) }} %
                        </div>
                        <div class="flex" style="justify-content: space-between;">
                            <div class="circle-l">
                                {{ berObj.temperature || 0 }}°C
                            </div>
                            <div class="circle-r">
                                <p>{{ berObj.pressure || 0 }}</p>
                                <span class="">压力</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div v-for="(item, index) in button" :key="index" class="button"
                            :class="{ 'active': +index === current }">{{
                                item }}</div>
                    </div>
                </div>
                <div class="message">
                    <div style="width: 55%; margin-bottom: 12px;">总重：{{ handleTurn(berObj.berthTotalCapacity) }}/ 吨</div>
                    <div style="width: 45%;">剩余： {{ handleTurn(berObj.berthTotalCapacity || 0 - berObj.berthUseCapacity ||
                        0) }} 吨</div>
                    <div>状态：{{ button[current] }}</div>
                </div>
            </div>

            <div class="right-main">
                <div class="flex table-list">
                    <div v-for="item in columns" :key="item.name" class="tab-item"
                        :class="{ 'tab-active': item.id === tab }" @click="changeTab(item)">
                        {{ item.name }}
                    </div>
                </div>

                <div class="right-table">
                    <el-table :data="tableData" style="width: 98%; " height="35vh">
                        <template v-for="item of columns[tab].columns">
                            <el-table-column :prop="item.prop" :key="item.id" :label="item.label" :width="item.width">
                                <template slot-scope="scope">
                                    <span v-if="item.prop !== 'operate'">{{ scope.row[item.prop] }}</span>
                                    <i class="iconfont icon-delete" @click="handleDelete(scope.row)" v-else></i>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
        </div>

        <div class="bottom-main">
            <Control :data="berObj" :is-global="false"></Control>
            <div class="bottom-right">
                <div class="echart-title">
                    <div class="left-icon"></div>图表信息
                </div>
                <div style="display: flex;align-items: baseline;justify-content: space-around;">
                    <Lines :data="chartData" :height="36" :show="false" width="48%" :isBorder="false"></Lines>
                    <Bar :data="chartData" :height="36" :show="false" width="48%" :isBorder="false"></Bar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import Lines from "../components/echart/echart-line.vue"
import Bar from "../components/echart/bar.vue"
import Control from '../components/control.vue'
import { berColumns, button } from '../config/column'
export default {
    name: 'Detail',
    components: {
        Top,
        Lines,
        Bar,
        Control
    },
    data() {
        return {
            berObj: {},
            current: 0,
            tab: 0,
            tableData: [],
            chartData: {}
        }
    },
    created() {
        this.button = button
        this.columns = berColumns
        this.getDetail()
        this.getTable()


    }, methods: {
        changeTab(item) {
            this.tab = item.id
            this.getTable()
        },
        handleTurn(data) {
            console.log(data, 'data')
            if (!data) return 0
            return (data * 0.001).toFixed(2)
        },
        async getTable() {
            const { data } = await this.$api.getRecordList({
                pageNum: 1,
                berthId: +this.$route.query.berthId,
                recordType: this.tab,
            })
            this.tableData = (data || []).map(item => {
                return {
                    ...item,
                    location: `${item.berthId}泊位`,
                    status: button[item.status],
                    garbageWeight: ((item.garbageWeight || 0) / 1000).toFixed(2),
                    cargoWeight: ((item.cargoWeight || 0) / 1000).toFixed(2),
                    vehicleWeight: ((item.vehicleWeight || 0) / 1000).toFixed(2)
                }
            })
        },
        async getDetail() {
            const date = new Date();
            const subtime = date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0')
            const { data } = await this.$api.getBerDetail({
                berthId: +this.$route.query.berthId
            })
            this.berObj = data
            const { data: weigth } = await this.$api.getGarbage({
                berthId: +this.$route.query.berthId,
                subtime,
                "statType": 1
            })
            const { data: trans } = await this.$api.getCar({
                berthId: +this.$route.query.berthId,
                subtime,
                "statType": 1
            })
            this.chartData = { weigth, trans }

        },
        handleStatus(index) {
            this.current = +index
        },
        async handleDelete(item) {
            await this.$confirm('确认删除该条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            await this.$api.deleteRecord({ recordType: this.tab, recordId: item.id })
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            await this.getTable()
        }
    }
}
</script>
<style>
.echart-title {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
}
</style>
<style scoped lang="scss">
.contents {
    width: 95%;
    margin: 30px auto 0;
    display: flex;
}

.left-main {
    width: 30%;
    min-width: 600px;
}


.circle-t {
    border-radius: 50%;
    border: 18px solid red;
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 150px;
    font-size: 26px;
    color: #fff;
    margin: auto;
}

.circle-l {
    border-radius: 50%;
    border: 10px solid #e3c615;
    width: 70px;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 14px;
    color: #fff;
}

.circle-r {
    border-radius: 50%;
    border: 10px solid #e68908;
    width: 80px;
    height: 80px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.flex {
    display: flex;
    align-items: center;
}

.left-ber {
    margin-bottom: 24px;
}

.mt-12 {
    margin-top: 12px;
}

.left {
    width: 40%;
}

.right {
    width: 60%;
}

.button {
    width: 200px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #06ffea;
    background-color: #083e86cf;
    font-size: 15px;
    border-radius: 28px;
    font-weight: bold;
    margin: 0 auto 48px;
}

.active {
    background-color: #00c6ffdb !important;
    color: #d37f0d !important;
}

.right-main {
    width: 70%;

}

.tab-item {
    font-size: 22px;
    color: #00deff;
    cursor: pointer;
}

.table-list {
    justify-content: space-around;
    margin-bottom: 32px;
}

.tab-active {
    color: #74fafd !important;
    font-size: 26px;
    font-weight: bold;
}


.message {
    font-size: 20px;
    color: #74fafd !important;
    font-weight: bold;
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
}




.bottom-main {
    width: 95%;
    margin: 3vh auto 0;
    display: flex;
    justify-content: space-between;
}

.bottom-right {
    width: 58%;
}

::v-deep {

    .el-table {
        background-color: #203363;
    }

    .el-table th.el-table__cell {
        background-color: #203363;

        color: #73f7fa;

    }

    .el-table thead {
        color: #73f7fa;

    }

    .el-table__header {
        background-color: #203363;
        color: #73f7fa;
        font-size: 18px;
    }

    .el-table__row {
        background-color: #203363;


        color: #73f7fa;
    }

    .highlight-row {
        background-color: #FAD7D7 !important;
    }

    .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
        background-color: #1a5ca5;
    }
}
</style>