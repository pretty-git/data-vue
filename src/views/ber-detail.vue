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
                            :class="{ 'active': +index === current }" @click="handleStatus(index)">{{
                                item }}</div>
                    </div>
                </div>
                <div class="message">
                    <div style="width: 55%; margin-bottom: 12px;">总重：{{ berObj.berthTotalCapacity || 0 }}/ 吨</div>
                    <div style="width: 45%;">剩余： {{ (berObj.berthTotalCapacity || 0 - berObj.berthUseCapacity ||
                        0).toFixed(2) }} 吨</div>
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
                    <el-table :data="tableData" style="width: 100%; " height="35vh">
                        <template v-for="item of columns[tab].columns">
                            <el-table-column :prop="item.prop" :key="item.id" :label="item.label" :width="item.width">
                                <template slot-scope="scope">
                                    <span v-if="item.prop !== 'operate'">{{ scope[item.prop] }}</span>
                                    <i class="iconfont icon-delete" v-else></i>
                                </template>
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
        </div>

        <div class="bottom-main">
            <Control :data="berObj"></Control>
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
            tab: 'garbage',
            tableData: [],
            chartData: {}
        }
    },
    created() {
        this.button = button
        this.columns = berColumns
        this.getDetail()

    }, methods: {
        changeTab(item) {
            this.tab = item.id
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
    cursor: pointer;
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