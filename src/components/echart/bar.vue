<template>
    <div class="bar" :style="{ width: width }">
        <div class="echart-title" v-if="show">
            <div class="left-icon"></div>图表信息柱体图
        </div>
        <dv-border-box-10 style="width: 100%;" v-if="isBorder" :style="{ height: `${height + 4}vh` }">
            <div class="echart-title pl-12">
                <div class="left-icon"></div>图表信息柱体图
            </div>
            <div class="chart" :style="{ height: `${height}vh` }" id="chart_left2"></div>
        </dv-border-box-10>
        <div class="chart" :style="{ height: `${height}vh` }" id="chart_left2" v-else></div>

    </div>
</template>
<script>
import echarts from 'echarts';

export default {
    name: 'Bar',
    props: {
        show: {
            type: Boolean,
            default: true
        },
        isBorder: {
            type: Boolean,
            default: true
        }, width: {
            type: String,
            default: '35%'
        }, height: {
            type: Number,
            default: 35
        },
        data: {
            type: Object,
            default: () => { }
        }, unit: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {

        }
    },
    watch: {
        data: {
            handler(value) {
                if (value) {
                    this.$nextTick(() => {

                        this.getEchartLeft2(value);
                    })
                }
            }, immediate: true,
            deep: true

        }
    },

    methods: {
        getEchartLeft2(data) {
            const garbage = (data.weigth || []).map(item => (item.weigth / 1000).toFixed(2))
            const car = (data.trans || []).map(item => item.number)
            console.log(document.getElementById('chart_left2'))
            let myChart = echarts.init(document.getElementById('chart_left2'));
            let series = []
            const date = new Date()
            const timeObj = {
                0: ``,
                1: `${date.getMonth() + 1}-`,
                2: `${date.getFullYear()}-`,
            }
            const dp = this.unit === 0 ? '时' : ''
            let xAxisData = (data.weigth || []).map(item => `${timeObj[this.unit]}${item.index < 10 ? `0${item.index}` : item.index}${dp}`)

            if (garbage.length > 0) {
                series.push({
                    name: '垃圾重量（吨）',
                    type: 'bar',
                    data: garbage, // 数据1的值
                    itemStyle: {
                        color: '#4fadb8', // 设置每个柱子的颜色
                    },

                })
            }
            if (car.length > 0) {
                series.push({
                    name: '进站车次（次）',
                    type: 'bar',
                    data: car,

                    itemStyle: {
                        color: '#405289', // 设置每个柱子的颜色
                    } // 数据2的值
                })
                xAxisData = data.trans.map(item => `${timeObj[this.unit]}${item.index < 10 ? `0${item.index}` : item.index}${dp}`)
            }
            let option = {

                xAxis: {
                    type: 'category',
                    data: xAxisData,
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff'  // 将x坐标轴文字颜色设置为白色
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#00deff'
                        }
                    }
                },
                tooltip: {
                    trigger: 'axis',
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: '#ffffff'  // 将x坐标轴文字颜色设置为白色
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#00deff'
                        },
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '12%',
                    containLabel: true
                },
                legend: {
                    textStyle: { color: '#fff' },
                    right: '5%',
                    data: ['垃圾重量（吨）', '进站车次（次）'],
                    type: 'scroll',
                    orient: 'vertical',

                },

                series
            };

            myChart.setOption(option, true);
            window.addEventListener('resize', () => {
                myChart.resize();
            })
        },
    }
}
</script>
<style lang="scss" scoped> .bar {
     width: 30%;
 }

 .chart {
     width: 100%;
     margin-top: 16px;

 }

 ::v-deep {
     .dv-border-box-10 .border-box-content {
         padding: 6px 0 0;
         margin-top: 12px;

     }
 }

 .pl-12 {
     padding-left: 12px;
     padding-top: 12px;
 }
</style>