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
    mounted() {
        this.getEchartLeft3();
    },
    methods: {
        getEchartLeft3() {
            let myChart = echarts.init(document.getElementById('chart_left3'));

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
                markLine: { label: false },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: '90%',
                        label: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' }
                        ]
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
<style lang="scss" scoped> 
.pie {
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