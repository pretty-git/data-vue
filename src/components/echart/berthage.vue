<template>
    <div class="berth">

        <dv-border-box-10 style="width: 100%;height: 40vh;">
            <div class="echart-title">
                <div class="left-icon"></div>泊位信息
            </div>
            <div class="tips">黄色代表温度，橙色代表压力</div>
            <div class="bar-main">
                <div v-for="item of berList" :key="item.berthId" class="ber-item" @click="getBerDetail(item)">
                    <div class="wgxc-name">{{ item.berthId }}号泊位</div>
                    <div class="flex">
                        <div>
                        <div class="wgxc-bar">
                            <span class="wgxc-sl-bar" style="height:30%"></span>
                            <div class="ratio">{{ (item.berthUseCapacity / item.berthTotalCapacity).toFixed(2) }}</div>
                        </div>
                        <div class="total-name">总重：{{ item.berthTotalCapacity }}吨</div>
                    </div>
                   <div style="margin-left: 20px;">
                    <div class="circle temp">
                        {{ item.temperature }}°C
                    </div>
                    <div class="circle stress">
                        {{ item.pressure }}
                    </div>
                    <div>剩余：{{ item.berthUseCapacity }}吨</div>
                   </div>
                    </div>
                    

                </div>

            </div>

        </dv-border-box-10>
    </div>
</template>
<script>
import {getBerList} from '../../config/logic'

export default {
    name: 'Berth',
    data() {
        return {
            berList: []
        }
    },
    async created() {
        this.Authorization = this.$store.state.Authorization
        this.berList =  await   getBerList()
    },
     mounted() {
        
    },
    methods: {
        getBerDetail({berthId}) {
            this.$router.push({
                name:'BerDetail',
                query:{
                    berthId
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped> .berth {
     width: 30%;
     min-width: 550px;
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
    margin-bottom: 6px;
}
.total-name {
    margin-top: 12px;
}
 .wgxc-bar {
     width: 100px;
     height: 100px;
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
    left: 28%;
    font-weight: bold;
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
 }
</style>