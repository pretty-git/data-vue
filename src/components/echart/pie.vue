<template>
    <div class="pie">
        <div class="echart-title">
            <div class="left-icon"></div>图形统计
        </div>
        <div class="chart" id="chart_left3"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
    name: 'pie',
    data() {
        return {

        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }, unit: {
            type: Number,
            default: 0
        }
    },
    watch: {
        data: {
            handler(value) {
                if (value) {
                    this.$nextTick(() => {
                        this.getEchartLeft3(value);
                    })
                }
            }, immediate: true,
            deep: true

        }
    },
    methods: {
        getEchartLeft3(value) {
            let myChart = echarts.init(document.getElementById('chart_left3'));
            const date = new Date()
            const timeObj = {
                0: ``,
                1: `${date.getMonth() + 1}-`,
                2: `${date.getFullYear()}-`,
            }
            const dp = this.unit === 0 ? '时' : ''

            const data = value.map(item => {
                return {
                    value: item.weigth,
                    name: `${timeObj[this.unit]}${item.index < 10 ? `0${item.index}` : item.index}${dp}`
                }
            })
            let option = {

                tooltip: {
                    trigger: 'item',
                    show: false
                },
                legend: {
                    textStyle: { color: '#fff' },
                    orient: 'vertical',
                    left: 'right',
                    align: 'left'
                },
                grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '3%',
                    containLabel: true
                },
                markLine: { label: false },
                series: [
                    {
                        name: '垃圾重量图表',
                        type: 'pie',
                        radius: '90%',
                        center: ['30%', '50%'],
                        label: {
                            show: false
                        },
                        data
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
<style lang="scss" scoped> .pie {
     width: 35%;
     margin-top: 16px;
     height: 30vh;
 }

 .chart {
     width: 100%;
     height: 30vh;
     margin-top: 16px;

 }

 ::v-deep {
     .dv-border-box-10 .border-box-content {
         padding: 22px 0;
         margin-top: 12px;

     }
 }
</style>