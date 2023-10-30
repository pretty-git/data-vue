<template>
    <!--Top Start!-->
    <div class="wp flex">
        <div class="left" @click="backHome">
            <img class="left-img" src="../../assets//img/logo.png">
        </div>
        <div class="center flex ">
            <dv-decoration-8 class="decoration" />
            <div class="top-title">中央控制管理系统</div>
            <dv-decoration-8 :reverse="true" class="decoration" />
        </div>
        <div class="right topBar">
            <div class="flex admin-content" @click="changePassword">
                <i class="iconfont icon-renyuan admin"></i>
                <div class="flex admin-name" style="flex-direction: column;">
                    <span>{{ countName }}</span>
                    <span>欢迎您使用</span>
                </div>
            </div>
            <el-dropdown @command="handleRouter">
                <span class="el-dropdown-link">
                    目录
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item of list" :key="item.id" :command="item.id">{{ item.name
                    }}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="time">
                <div class="top-time">{{ date.time }}</div>
                <div class="top-data">{{ date.day }} {{ date.date }}</div>
            </div>

            <div class="back" @click="logout">
                <i class="iconfont icon-fanhui return-icon"></i>
                退出
            </div>


        </div>
        <!--Top End!-->
        <el-dialog :showClose="false" :close-on-click-modal="false" :visible.sync="dialogVisible"
            :before-close="() => dialogVisible = false">
            <div class="dialog-content">

                <div v-if="status === 'login'" class="login">
                    <el-form :model="countForm" label-width="150px" class="demo-countForm">
                        <!-- <el-form-item label="账号：" prop="account">
                        <el-input v-model="countForm.account" placeholder="请输入账号"></el-input>
                    </el-form-item> -->
                        <el-form-item label="新账号：" prop="username">
                            <el-input v-model="countForm.username" placeholder="请输入新账号"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="原密码：" prop="pass">
                        <el-input v-model="countForm.pass" placeholder="请输入原密码"></el-input>
                    </el-form-item> -->
                        <el-form-item label="新密码：" prop="password">
                            <el-input v-model="countForm.password" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div v-else-if="status === 'control'" class="control">
                    <Control width="100%" :data="controlData" isGlobal @status="setControl"></Control>
                </div>
                <div v-else>
                    <div v-for="item of waterList" :key="item.id" class="water-item">
                        {{ item.name }}
                        <el-switch v-model="item.status" active-color="#0ef170" :active-value="item.id" :inactive-value="0"
                            style="margin-left: 12px;" @change="handleControl($event, item)">
                        </el-switch>
                        <div class="circle" :style="{ 'background-color': item.status ? '#0ef170' : '#f5222d' }"></div>
                        <span style="color: #aaa;">
                            {{ item.status ? '已打开' : '已关闭' }}

                        </span>
                    </div>

                </div>
            </div>

            <el-radio-group v-model="status" v-if="status !== 'water'">
                <el-radio label="login">平台登陆</el-radio>
                <el-radio label="control">泊位控制</el-radio>
            </el-radio-group>
            <div class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSubmit" style="background-color: #1861ad;">保 存</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog title="警告提示" :visible.sync="messageDialog" width="500px" :before-close="() => messageDialog = false">
            <div v-for="item of warningData" :key="item.alarmId">
                <span class="message-title">{{ item.title }}</span>
                <div class="message-content">
                    {{ item.content }}
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="messageDialog = false">取 消</el-button>
                <el-button type="primary" @click="handleClose">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>
<script>
import md5 from 'md5';
import Control from '../control.vue'
import { removeCookie, getCookieValue } from '../../config/env'

export default {
    name: 'Top',
    components: {
        Control
    },
    data() {
        return {
            date: {},
            controlStatus: {},
            countForm: {
                username: '',
                password: ''
            },
            dialogVisible: false,
            messageDialog: false,
            status: "login",
            warningData: [],
            controlData: {},
            waterList: [{
                id: 10,
                name: '1号泵',
                status: 0
            }, {
                id: 11,
                name: '2号泵',
                status: 0
            }],
            control: {
                controlData: 0,
                controlCmd: 0
            }
        };
    },

    created() {
        this.list = [{
            id: 1,
            name: '泊位控制',
        }, {
            id: 2,
            name: '图表信息',
        }, {
            id: 3,
            name: '报表查询',
        }, {
            id: 4,
            name: '排水控制',
        }];
        this.date = this.getTime()

        this.timeHandler = setInterval(async () => {
            this.date = this.getTime()
        }, 1000)
        this.countName = getCookieValue('COUNT_NAME')
        this.messageHandler = setInterval(async () => {
            const { data } = await this.$api.getAlarmList()
            if ((data || []).length > 0) {
                clearInterval(this.messageHandler)
                for (let item of data) {
                    await this.$confirm(`${item.content}`, `${item.title}`, {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    })
                    console.log(item)
                    await this.$api.clearAlarm({ alarmId: item.alarm_id })
                }
            }
        }, 1000)

    }, methods: {
        getTime() {
            const date = new Date();

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 使用 padStart() 方法填充月份
            const day = String(date.getDate()).padStart(2, '0'); // 使用 padStart() 方法填充日期
            const hours = String(date.getHours()).padStart(2, '0'); // 使用 padStart() 方法填充小时数
            const minutes = String(date.getMinutes()).padStart(2, '0'); // 使用 padStart() 方法填充分钟数

            const weekDay = date.getDay();
            const weekDayMap = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            const chineseWeekDay = weekDayMap[weekDay];
            return {
                time: `${hours}:${minutes}`,
                date: `${year}-${month}-${day}`,
                day: chineseWeekDay
            }

        },


        backHome() {
            this.$router.push('home');
        },
        async handleRouter(item) {
            if (item === 1) {
                this.status = 'control'
                this.dialogVisible = true;
                //     const { data } = await this.$api.getBerDetail({
                //         berthId: ''
                //     })
                // this.controlData = data

            }
            else if (item == 2) {
                this.$router.push('echart-message');
            }
            else if (item == 3) {
                this.$router.push('excel');
            }
            else {
                this.status = 'water'
                this.dialogVisible = true;

            }
        }, changePassword() {
            this.status = 'login'
            this.dialogVisible = true;
        },
        setControl(value, id) {
            this.control.controlData = value ? 1 : 0
            this.control.controlCmd = id
        },
        async handleSubmit() {
            if (this.status === 'login') {
                const { username, password } = this.countForm
                if (username && password) {
                    await this.$api.changePassword({
                        username,
                        password: md5(password)
                    })
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                    this.logout()
                } else {
                    this.$message.error('请完善账号或密码')
                }

            } else {
                const { controlData, controlCmd } = this.control
                await this.$api.sendControlCmd({ berthId: '', controlData, controlCmd })

            }
        },
        handleClose() {
            this.countForm.username = ''
            this.countForm.password = ''
            this.dialogVisible = false
        },
        logout() {
            clearInterval(this.timeHandler)
            clearInterval(this.messageHandler)
            this.messageHandler = null
            removeCookie('SET_TOKEN')
            removeCookie('BAR_SET_TOKEN')
            removeCookie('COUNT_NAME')

            this.$router.replace('login')
        },
        async handleControl(value, item) {
            this.waterList.forEach(items => {
                items.status = 0
            })
            item.status = value
            this.control.controlData = value ? 1 : 0
            this.control.controlCmd = value ? value : item.id
        },
    },
}
</script>
<style scoped lang="scss"> .scanboardWp {
     height: 100%;
     position: relative;
     z-index: 11;
 }

 .flex {
     display: flex;
     align-items: center;
 }

 .wp {
     width: 100%;
     padding: 0 2%;
     margin: 0 auto;
     height: 8vh;
     box-sizing: border-box;
     box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.06);
     position: relative;
 }

 .wp::after {
     content: "";
     position: absolute;
     bottom: -5px;
     left: 0;
     right: 0;
     height: 10px;
     background-image: linear-gradient(to top, rgb(21, 73, 133), rgba(255, 255, 255, 0));
 }



 #top .pageTit a {
     display: block;
     width: 50%;
     height: 44px;
     /* background: url(../assets/img/bj.jpg); */
     background-size: 100% 100%;
     line-height: 44px;
     text-align: center;
     font-size: 18px;
     color: #00deff;
     position: absolute;
     top: 50%;
     margin-top: -22px;
 }


 .topBar {
     font-size: 24px;

 }

 .topBar .time {
     text-align: center;
     color: #fff;
     width: 25%;
 }

 .top-time {
     font-size: 24px;
     font-weight: bold;
     margin-bottom: 6px;

 }

 .top-data {
     font-size: 12px;
 }

 .topBar .company {
     position: relative;
 }

 .topBar .company h3 {
     text-align: right;
     color: #02b6d4;
     height: 28px;
     line-height: 28px;
     font-size: 16px;
     padding: 0 15px 0 28px;
     cursor: pointer;
     position: relative;
 }

 .topBar .company h3:before {
     display: block;
     content: "";
     width: 20px;
     height: 20px;
     /* background: url(../images/s_ico1.png) no-repeat; */
     background-size: 100% 100%;
     position: absolute;
     left: 0;
     top: 3px;
 }

 #top .topBar .company h3:after {
     display: block;
     content: "";
     width: 7px;
     height: 4px;
     /* background: url(../images/s_ico2.png) no-repeat; */
     position: absolute;
     right: 0;
     top: 10px;
 }

 #top .topBar .company .dropdown {
     position: absolute;
     top: 28px;
     right: -10px;
     padding: 6px 10px;
     background: #00deff;
     border-radius: 6px;
     min-width: 100px;
     display: none;
 }

 #top .topBar .company:hover .dropdown {
     display: block;
 }

 #top .topBar .company .dropdown a {
     display: block;
     text-align: center;
     line-height: 24px;
     margin: 4px 0;
 }

 .left {
     width: 25%;
     cursor: pointer;

     .left-img {
         width: 45%;


     }
 }

 .center {
     width: 45%;
     justify-content: center;
 }

 .right {
     width: 30%;
     display: flex;
     align-items: center;
     color: #fff;
     justify-content: space-around;
 }

 .top-title {
     font-size: 28px;
     font-weight: bold;
     color: #00deff;
     width: 40%;
     text-align: center;

 }

 .el-dropdown-link {
     font-size: 28px;
     color: #00f5ff;
     font-weight: bold;
     margin-right: 5px;
 }

 .admin-content {
     margin-left: 6%;
     width: 30%;
     border-right: 3px solid #13417e;

 }

 .admin {
     font-size: 31px;
     color: aqua;
 }

 .m-12 {
     margin: 0 12px;
 }

 .admin-name {
     margin: 0 10%;
     font-size: 12px;
 }

 .return-icon {
     font-size: 16px;
     color: #00deff;
 }

 .back {
     background-color: #0e2f4a;
     border-radius: 20px;
     padding: 8px 0;
     font-size: 20px;
     cursor: pointer;
     width: 20%;
     text-align: center;
 }

 ::v-deep {
     .el-dialog {
         width: 500px;
         background-color: #152141;
         padding-right: 12px;
         height: 620px;
     }

     .el-form-item__label {
         color: #fff;
         font-size: 18px;
     }

     .el-radio__label {
         color: #fff;
         font-size: 24px;

     }

     .el-dialog__body {
         height: 350px;
         box-sizing: border-box;
     }

     .el-form-item {
         //  margin-bottom: 63px;
     }

     .el-radio-group {
         display: flex;
         justify-content: center;
         padding-top: 24px;
     }

     .el-button {
         font-size: 22px;
     }

     .el-dialog__title {
         color: #fff;
         font-size: 30px;
     }
 }

 .circle {
     width: 20px;
     height: 20px;
     border-radius: 50%;

     margin: 0 12px 0 48px;
 }

 .water-item {
     margin: 50px 0;
     font-size: 24px;
     color: #0ef1ef;
     display: flex;
     align-items: center;
     margin-left: 24px;
 }

 .decoration {
     width: 30% !important;
     height: 40px !important;
 }



 .control {
     margin: 0 20px;
 }

 .dialog-footer {
     display: flex;
     justify-content: right;
     margin-top: 60px;
 }

 .login {
     padding-bottom: 125px;
 }

 .message-title {
     font-size: 22px;
     color: #fff;
 }

 .message-content {
     font-size: 20px;
     color: #fff;
     margin-top: 12px;
 }
</style>