<template>
    <div class="bar" :style="{ width: width }">
        <div class="echart-title" v-show="show">
            <div class="left-icon"></div>图表信息柱体图
        </div>
        <dv-border-box-10 style="width: 100%;" v-if="isBorder" :style="{ height:height }">
            <div class="chart" :style="{ height: height }" id="chart_left2"></div>
        </dv-border-box-10>
        <div class="chart" :style="{ height: height }" id="chart_left2" v-else></div>

    </div>
</template>
<script>
import * as echarts from 'echarts';

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
            default: '25%'
        }, height: {
            type: String,
            default: '30vh'
        },
        data: {
            type: Object,
            default: () => null
        }
    },
    data() {
        return {

        }
    },
    watch: {
        data(value) {
            if (value) {
                this.getEchartLeft2(value);

            }
        }
    },
    mounted() {
    },
    methods: {
        getEchartLeft2(data) {
            const garbage = data.weigth.map(item=>item.weigth)
            const car = data.trans.map(item=>item.number)
            let myChart = echarts.init(document.getElementById('chart_left2'));

            let option = {

                xAxis: {
                    type: 'category',
                    data: data.weigth.map(item=>item.index),
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
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                legend: {
                    textStyle: { color: '#fff' },
                    right: '5%',
                    data: ['垃圾重量（吨）', '进站车次（次）'],
                    type: 'scroll',
                    orient: 'vertical',

                },

                series: [
                    {
                        name: '垃圾重量（吨）',
                        type: 'bar',
                        data: garbage, // 数据1的值
                        itemStyle: {
                            color: '#4fadb8', // 设置每个柱子的颜色
                        }
                    },
                    {
                        name: '进站车次（次）',
                        type: 'bar',
                        data: car,
                        itemStyle: {
                            color: '#405289', // 设置每个柱子的颜色
                        } // 数据2的值
                    }
                ]
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
     margin-top: 24px;
     min-width: 300px;

 }

 .chart {
     width: 100%;
     margin-top: 16px;

 }

 ::v-deep {
     .dv-border-box-10 .border-box-content {
         padding: 22px 0;
         margin-top: 12px;

     }
 }
</style>