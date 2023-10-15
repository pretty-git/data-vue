<template>
    <div class="main">
        <Top></Top>
        <div class="flex">
            <div class="left">
            <div >
                <div class="title">
                    {{ timeObj.name }}
                </div>
                <div class="choose-list">
                        <div v-for="c of timeObj.arr" :key="c.id" :label="c.id" class="choose-item" :class="{'title':timeObj.type === c.id}" @click="getTime(c)"> {{ c.name
                        }}</div>
                </div>
            </div>
            <div v-for="item in options" :key="item.name">
                <div class="title">
                    {{ item.name }}
                </div>
                <div>
                    <el-radio-group v-model="item.type" class="choose-list">
                        <el-radio v-for="c of item.arr" :key="c.id" :label="c.id" class="choose-item"> {{ c.name
                        }}</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <div class="right">
            <Lines width="100%" height="80vh" :isBorder="false" v-if="options['type'].type === 'line'"></Lines>
            <Bar width="100%" height="80vh" :isBorder="false" v-else></Bar>
        </div>
        </div>
   
    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import Lines from "../components/echart/lines.vue"
import Bar from "../components/echart/bar.vue"
export default {
    name:'EchartMessage',
    components: {
        Top,
        Lines,
        Bar
    },
    data() {
        return {
            timeObj: {
                name: "查询类型",
                type: 'hour',
                arr: [
                    { id: 'hour', name: '当日垃圾/小时', },
                    {
                        id: 'day',
                        name: '当月垃圾/天'
                    }, {
                        id: 'month',
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
    },methods:{
        getTime(item) {
            this.timeObj.type= item.id
        }
    }
}
</script>
<style scoped lang="scss">
.left {
    width: 300px;
    height: 80vh;
    border-radius: 10px;
    border: 2px solid #63b5cf;
    margin-left: 46px;
    margin-top: 8vh;
}

.choose-list {
    display: flex;
    flex-direction: column;
}

.title {
    background-color: #4b7aaf;
    padding: 25px 44px;
    color: #fff;
    font-size: 22px;
    border-bottom: 2px solid #63b5cf;

}

.main {
    background: url(../assets/img/bj.jpg);
    background-size: 100% 100%;
    height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;

}

.choose-item {
    padding: 3vh 40px;
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

    .left-icon {
        height: 28px;
        width: 4px;
        background-color: #00deff;
        margin-right: 12px;
    }
}
</style>