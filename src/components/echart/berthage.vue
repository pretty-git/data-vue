<template>
    <div class="berth">

        <dv-border-box-10 style="width: 100%;height: 40vh;">
            <div class="echart-title">
                <div class="left-icon"></div>泊位信息
            </div>
            <div class="tips">黄色代表温度，橙色代表压力</div>
            <div class="bar-main">
                <div v-for="item of berList" :key="item.berth_id" class="ber-item" @click="getBerDetail(item)">
                    <div class="wgxc-name">{{ item.berth_id }}号泊位</div>
                    <div class="flex">
                        <div>
                            <div class="wgxc-bar">
                                <div class="wgxc-sl-bar"
                                    :style="{ height: `${getHeight(item.used_capacity, item.capacity) > 100 ? 90 : getHeight(item.used_capacity, item.capacity) - 10}%`, backgroundColor: getHeight(item.used_capacity, item.capacity) > 0.8 ? 'red' : '#3261c9' }">
                                </div>
                                <div class="ratio">{{ getHeight(item.used_capacity, item.capacity) }}%</div>
                            </div>
                            <div class="total-name">总重：{{ item.capacity }}吨</div>
                        </div>
                        <div style="margin-left: 20px;">
                            <div class="circle temp">
                                {{ item.temperature }}°C
                            </div>
                            <div class="circle stress">
                                {{ item.pressure }}
                            </div>
                            <div class="total-name">剩余：{{ getNumber(item.capacity - item.used_capacity) }}吨</div>
                        </div>
                    </div>
                </div>
            </div>
        </dv-border-box-10>
    </div>
</template>
<script>

export default {
    name: 'Berth',
    data() {
        return {
            berList: []
        }
    },
    async created() {
        this.Authorization = this.$store.state.Authorization
        const { data } = await this.$api.getBerList()
        this.berList = data.concat(data).concat(data)
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        getHeight(use, all) {
            return this.getNumber((use / all) * 100)
        },
        getNumber(num) {
            let formattedNum = num % 1 !== 0 ? num.toFixed(2) : num.toString();
            return formattedNum
        },
        getBerDetail({ berth_id }) {
            this.$router.push({
                name: 'BerDetail',
                query: {
                    berthId: berth_id
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped> .berth {
     width: 35%;
     min-width: 600px;
 }

 .echart-title {
     float: left;
     margin-left: 12px;
 }


 ::v-deep {
     .dv-border-box-10 .border-box-content {
         padding: 18px 0;
         margin-top: 12px;

     }
 }

 .tips {
     font-size: 16px;
     color: #888686;
     float: right;
     margin-right: 10px;
 }

 .wgxc-name {
     margin-bottom: 14px;
     font-size: 21px;
 }

 .total-name {
     margin-top: 24px;
 }

 .wgxc-bar {
     width: 100px;
     height: 110px;
     position: relative;
     border-top-left-radius: 13px;
     border-top-right-radius: 13px;
     background-color: #326db5c2;
     border-bottom-left-radius: 8px;
     border-bottom-right-radius: 8px;
     position: relative;
 }

 .ratio {
     position: absolute;
     top: 46%;
     color: #fff;
     font-size: 23px;
     left: 50%;
     font-weight: bold;
     transform: translateX(-50%);
 }

 .wgxc-bar .wgxc-sl-bar {
     display: inline-block;
     width: 100%;
     height: 0;
     z-index: 0;
     position: absolute;
     bottom: 8px;
     background-color: #3261c9;
     border-top-left-radius: 7px;
     border-top-right-radius: 7px;
     left: 0px;
 }

 .wgxc-bar .wgxc-sl-bar:before {
     content: '';
     width: 100px;
     background-color: #0093ff;
     border-radius: 50%;
     height: 15px;
     position: absolute;
     top: -3px;
     left: 0px;
 }

 .wgxc-bar:before {
     content: '';
     width: 100px;
     background-color: #1562aa;
     border-radius: 50%;
     height: 19px;
     position: absolute;
     top: -3px;
     left: 0;
     z-index: 999;
 }

 .wgxc-bar:after {
     content: '';
     width: 100px;
     background-color: #1984d8;
     border-radius: 50%;
     height: 15px;
     position: absolute;
     bottom: -3px;
     left: 0px;
 }

 .bar-main {
     margin-top: 46px;
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
     width: 100%;
     overflow-y: auto;
     overflow-x: hidden;
     height: 87%;
 }

 .circle {
     border-radius: 50%;
     width: 45px;
     height: 45px;
     color: #fff;
     text-align: center;
     line-height: 45px;
     font-size: 16px;
     margin: 0 auto 5px;
 }

 .temp {
     border: 4px solid #e3c615;

 }

 .stress {
     border: 4px solid #e68908;

 }

 .ber-item {
     color: #fff;
     font-size: 16px;
     width: 45%;
     text-align: center;
     margin-bottom: 16px;
 }

 .flex {
     display: flex;
     align-items: center;
     justify-content: center;
 }</style>