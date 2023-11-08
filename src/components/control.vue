<template>
    <div class="bottom-left" :style="{ width: width }">
        <div class="echart-title">
            <div class="flex" v-show="!isGlobal">
                <div class="left-icon"></div>
                <span>
                    泊位控制
                </span>
            </div>
            <template v-if="isLogin">
                <div class="exit-icon" @click="handleExit">
                    退出
                </div>
                <div class="flex">
                    泊位自动
                    <el-switch class="ml-12" @change="handleChange($event, 'selfMotion', 1)" :active-value="1"
                        :inactive-value="0" v-model="controlStatus.selfMotion" active-color="#13ce66" inactive-color="#eee">
                    </el-switch>
                </div>
            </template>
        </div>
        <template v-if="isLogin">
            <div class="list">
                <div v-for="item of list" :key="item.id" class="flex mb-30">
                    <div class="label">
                        {{ item.name }}
                    </div>
                    <el-switch @change="handleChange($event, item.key, item.id)" :active-value="item.id" :inactive-value="0"
                        :width="50" class="ml-12" v-model="controlStatus[item.key]" active-color="#13ce66"
                        inactive-color="#eee">
                    </el-switch>
                </div>
            </div>
        </template>

        <div class="form" v-if="!isLogin">
            <el-form label-width="100px" :model="form">
                <el-form-item label="账号:" required>
                    <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码:" required>
                    <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <button class="login-btn" @click.stop="login">
                登录
            </button>
        </div>
    </div>
</template>
<script>
import { Message } from 'element-ui';
import md5 from 'md5';
import { getCookieValue, removeCookie, handleList, autoList } from '../config/env'
export default {
    data() {
        return {
            controlStatus: {
                selfMotion: 0
            },
            form: {
                account: '',
                password: '',
            },
            list: handleList,
            isLogin: false,

        }
    },
    props: {
        data: {
            type: Object,
            default: () => { }
        }, width: {
            type: String,
            default: '35%'
        },
        isGlobal: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        data: {
            handler(value) {
                this.controlStatus = value || {}
                this.list = value.selfMotion ? autoList : handleList
            },
            deep: true,
            immediate: true
        }
    },

    created() {
        if (getCookieValue('IS_LOGIN')) {
            this.isLogin = true
        }

        console.log('控制')
        this.list = handleList
    },
    methods: {
        handleExit() {
            this.isLogin = false
            removeCookie('IS_LOGIN')
        },
        async login() {
            if (!this.form.password || !this.form.account) {
                Message.error("请输入帐号和密码")
                return
            }
            const param = {
                username: this.form.account,
                password: md5(this.form.password)
            }

            console.log(param)
            await this.$api.loginControl(param)
            document.cookie = `IS_LOGIN=true; `;
            this.isLogin = true

        },
        handleChange(item, key, id) {
            if (key === 'selfMotion') {
                this.list = item ? autoList : handleList
                this.$emit('update', true)
            } else if (id == 6 && item) {
                this.$api.sendControlCmd({ berthId: +this.$route.query.berthId, controlData: 0, controlCmd: 7 })
                this.controlStatus.boltUnlock = 0
            } else if (id == 7 && item) {
                this.$api.sendControlCmd({ berthId: +this.$route.query.berthId, controlData: 0, controlCmd: 6 })
                this.controlStatus.boltLock = 0
            } else if (id == 4 && item) {
                this.$api.sendControlCmd({ berthId: +this.$route.query.berthId, controlData: 0, controlCmd: 5 })
                this.controlStatus.capDown = 0
            } else if (id == 5 && item) {
                this.$api.sendControlCmd({ berthId: +this.$route.query.berthId, controlData: 0, controlCmd: 4 })
                this.controlStatus.capUp = 0
            }
            this.controlStatus[key] = item
            this.$emit('status', item, id)
            if (!this.sGlobal) {
                this.$api.sendControlCmd({ berthId: +this.$route.query.berthId, controlData: item ? 1 : 0, controlCmd: id })

            }
        }
    }
}
</script>
<style scoped lang="scss">
.bottom-left {
    display: flex;
    flex-direction: column;
}

.echart-title {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 20px;
}



::v-deep {
    .el-switch__core {
        width: 50px !important;
    }

    .el-form-item__label {
        color: #fff;
    }

    .el-input__inner {
        background-color: transparent;
        box-shadow: none;
        border: none;
    }

    .el-form-item {
        margin-bottom: 10px;
        border: 1px solid #1a5ca5;
        border-radius: 5px;
    }

}

.form {
    width: 70%;
    height: auto;
    padding: 35px 30px 25px;
    margin: 12px auto 0;
}

.login-btn {
    width: 100px;
    padding: 6px 0;
    border: 1px solid #1a5ca5;
    font-size: 18px;
    color: #12c9ff;
    cursor: pointer;
    background: transparent;
    border-radius: 4px;
    margin: 10px 0 0 34%;
}

.exit-icon {
    color: red;
    border: 1px solid red;
    padding: 4px 10px;
    border-radius: 6px;
    cursor: pointer;
    margin: 0 30px;
}

.flex {
    display: flex;
    align-items: center;
}

.ml-12 {
    margin-left: 12px;
}

.mb-30 {
    margin-bottom: 34px;
    width: 50%;
}

.label {
    font-size: 22px;
    color: #00f5ff;
    width: 130px;
    text-align: left;
}

.list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 20px;
}
</style>