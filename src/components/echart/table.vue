<template>
    <div class="table">

        <dv-border-box-10 style="width: 100%;height: 43vh;">
            <div class="echart-title">
                <div class="left-icon"></div>车辆进出站信息
            </div>
            <div class="bar-main">
                <dv-scroll-board :config="config" style="width:90%;height:35vh;margin: 12px auto;" />
            </div>
        </dv-border-box-10>
    </div>
</template>
<script>

export default {
    name: 'Table',
    data() {
        return {
            config: {
                header: ['序号', '车牌号', '进站时间', '货物重量（吨）'],
                columnWidth: [75, 130, 230],
                headerBGC: 'transparent',
                oddRowBGC: '',
                evenRowBGC: '#0d4a92',
                align: ['center', 'center', 'center', 'center'],
                data: []
            }

        }
    },
    props: {
        data: Array,
    },
    watch: {
        data: {
            handler(newVal) {
                this.config = { ...this.config, data: newVal }
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped> .table {
     width: 30%;
 }

 .echart-title {
     padding-left: 16px;
 }


 ::v-deep {
     .dv-border-box-10 .border-box-content {
         padding: 10px 0 0;
         margin-top: 12px;

     }

     .dv-scroll-board .header {
         color: #0fb9ed;
     }
 }
</style>