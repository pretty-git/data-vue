<template>
    <div class="lines" :style="{ width: width }">
        <div class="echart-title" v-show="show">
            <div class="left-icon"></div>图表信息折线图
        </div>
        <dv-border-box-10 style="width: 100%;" v-if="isBorder" :style="{ height: `${height + 3}vh` }">
            <div class="chart" :style="{ height: `${height}vh` }" id="chart_left1"></div>
        </dv-border-box-10>
        <div class="chart" :style="{ height: `${height}vh` }" id="chart_left1" v-else></div>

    </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    name: 'Lines',
    data() {
        return {

        }
    },
    props: {
        show: {
            type: Boolean,
            default: true
        },
        isBorder: {
            type: Boolean,
            default: true
        },
        width: {
            type: String,
            default: '25%'
        },
        height: {
            type: Number,
            default: 35
        },
        data: {
            type: Object,
            default: () => { }
        },
        unit: {
            type: Number,
            default: 1
        }
    },

    watch: {
        data: {
            handler(value) {
                if (value) {
                    this.$nextTick(() => {
                        this.getEchartLeft1(value);
                    })
                }
            }, immediate: true,
            deep: true

        }
    },
    methods: {
        getEchartLeft1(data) {
            const garbage = data.weigth?.map(item => item.weigth)
            const car = data.trans?.map(item => item.number)
            let series = []
            const date = new Date()
            const timeObj = {
                0: `${date.getHours()}:`,
                1: `${date.getMonth() + 1}-`,
                2: `${date.getFullYear()}-`,
            }
            let myChart = echarts.init(document.getElementById('chart_left1'));
            let xAxisData = data.weigth.map(item => `${timeObj[this.unit]}${item.index < 10 ? `0${item.index}` : item.index}`)
            if (garbage.length > 0) {
                series.push(
                    {
                        name: '垃圾重量（吨）',
                        type: 'line',
                        stack: 'Total',
                        data: garbage,
                        label: {
                            show: true,
                            position: 'top',
                            valueAnimation: true,
                            color: '#fff',
                            fontSize: 16,
                        },
                        areaStyle: {
                            // 区域图渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                                { offset: 0, color: '#49a1c5' },
                                { offset: 0.5, color: '#387ea1' },
                                { offset: 1, color: '#f3f6f700' }
                            ])
                        },
                    },
                )
            }
            if (car.length > 0) {
                series.push(
                    {
                        name: '进站车次（次）',
                        type: 'line',
                        stack: 'Total',
                        data: car,
                        label: {
                            show: true,
                            position: 'top',
                            valueAnimation: true,
                            color: '#fff',
                            fontSize: 16,
                        },
                        areaStyle: {
                            // 区域图渐变色
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#38487b'
                                },
                                {
                                    offset: 1,
                                    color: '#f3f6f700'
                                }
                            ]),
                            opacity: 0.5
                        }
                    }
                )
                xAxisData = data.trans.map(item => `${timeObj[this.unit]}${item.index < 10 ? `0${item.index}` : item.index}`)

            }
            console.log(series)
            let option = {
                legend: {
                    right: '5%',
                    data: ['垃圾重量（吨）', '进站车次（次）'],
                    textStyle: {
                        color: '#ffffff'  // 将x坐标轴文字颜色设置为白色
                    },
                    type: 'scroll',
                    orient: 'vertical',
                },

                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },

                xAxis: {
                    type: 'category',
                    boundaryGap: false,
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
                series
            }

            myChart.setOption(option, true);
            window.addEventListener('resize', () => {
                myChart.resize();
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.lines {
    min-width: 600px;
}

.chart {
    width: 100%;
    margin-top: 16px;

}

::v-deep {
    .dv-border-box-10 .border-box-content {
        padding: 16px 0 0;
        margin-top: 12px;

    }
}
</style>