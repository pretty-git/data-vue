<template>
    <div class="main">
        <Top></Top>
        <div class="flex">
            <div class="left">
                <div>
                    <div class="title">
                        {{ timeObj.name }}
                    </div>
                    <div class="choose-list">
                        <div v-for="c of timeObj.arr" :key="c.id" :label="c.id" class="choose-item"
                            :class="{ 'title': timeObj.type === c.id }" @click="getTime(c)"> {{ c.name
                            }}</div>
                    </div>
                </div>
                <div v-for="item in options" :key="item.name">
                    <div class="title">
                        {{ item.name }}
                    </div>
                    <div>
                        <el-radio-group v-model="item.type" class="choose-list" @change="getOPtions">
                            <el-radio v-for="c of item.arr" :key="c.id" :label="c.id" class="choose-item"> {{ c.name
                            }}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
            </div>
            <div class="right">
                <Lines width="100%" :unit="unit" :height="85" :data="data" :isBorder="false"
                    v-if="options['type'].type === 'line'">
                </Lines>
                <Bar width="100%" :unit="unit" :height="85" :data="data" :isBorder="false" v-else></Bar>
            </div>
        </div>

    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import Lines from "../components/echart/echart-line.vue"
import Bar from "../components/echart/bar.vue"
export default {
    name: 'EchartMessage',
    components: {
        Top,
        Lines,
        Bar
    },
    data() {
        return {
            unit: 0,
            data: { weigth: [], trans: [] },
            timeObj: {
                name: "查询类型",
                type: 0,
                arr: [
                    {
                        id: 0,
                        name: '当日垃圾/小时',
                    },
                    {
                        id: 1,
                        name: '当月垃圾/天'
                    }, {
                        id: 2,
                        name: '当年垃圾/月'
                    }]
            },
            options: {
                'content': {
                    name: "显示内容",
                    type: 'wcar',
                    arr: [{
                        id: 'wcar',
                        name: '净重和车次'
                    }, {
                        id: 'weight',
                        name: '只显示净重'
                    }, {
                        id: 'car',
                        name: '只显示车次'
                    }]
                },
                type: {
                    type: 'line',
                    name: "图表类型",
                    arr: [{
                        id: 'line',
                        name: '折线图'
                    }, {
                        id: 'bar',
                        name: '柱状图'
                    }]
                }
            }
        }
    },
    created() {
        this.handleSearch()
    },
    methods: {
        getTime(item) {
            this.timeObj.type = item.id
            this.handleSearch()
        },
        getOPtions() {
            this.handleSearch()
        },
        async handleSearch() {
            const date = new Date();
            const dataObj = {
                0: date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0'),
                1: date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0'),
                2: date.getFullYear()
            }

            this.unit = this.timeObj.type
            const subtime = dataObj[this.timeObj.type] + ''
            const statType = this.timeObj.type
            this.data = { weigth: [], trans: [] }
            if (this.options.content.type !== 'car') {
                const { data: weigth } = await this.$api.getGarbage({
                    berthId: '',
                    subtime,
                    statType
                })
                this.data.weigth = weigth || []
            }
            if (this.options.content.type !== 'weight') {
                const { data: trans } = await this.$api.getCar({
                    berthId: '',
                    subtime,
                    statType
                })
                this.data.trans = trans || []
            }

        },


    }
}
</script>
<style scoped lang="scss">
.left {
    width: 300px;
    height: 80vh;
    border-radius: 10px;
    border: 2px solid #63b5cf;
    margin-left: 4vh;
    margin-top: 8vh;
}

.choose-list {
    display: flex;
    flex-direction: column;
}

.title {
    background-color: #4b7aaf;
    padding: 20px 44px;
    color: #fff;
    font-size: 22px;
    border-bottom: 2px solid #63b5cf;

}


.choose-item {
    padding: 20px 40px;
    font-size: 18px;
    color: #fff !important;
    cursor: pointer;

}

.flex {
    display: flex;
}

.right {
    width: 80%;
    margin-top: 5vh;
    margin-left: 5%;
}

::v-deep {
    .echart-title {
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #fff;
        font-weight: bold;
    }
}
</style>