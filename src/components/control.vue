<template>
    <div class="bottom-left" :style="{ width: width }">
        <div class="echart-title">
            <div class="flex">
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
                    <el-switch class="ml-12" @change="handleChange($event, 'selfMotion')" :active-value="1"
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
                    <el-switch
                        :disabled="!!controlStatus.selfMotion && !['platformRise', 'platformDrop'].includes(item.key)"
                        @change="handleChange($event, item.key)" :active-value="1" :inactive-value="0" :width="50"
                        class="ml-12" v-model="controlStatus[item.key]" active-color="#13ce66" inactive-color="#eee">
                    </el-switch>
                </div>
            </div>
        </template>

        <div class="form" v-if="!isLogin">
            <el-form label-width="80px" :model="form">
                <el-form-item label="账号:" required>
                    <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码:" required>
                    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
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
            isLogin: true,
            list: [{
                id: 1,
                name: '平台上升',
                key: "platformRise",
            }, {
                id: 2,
                name: '平台下降',
                key: "platformDrop",
            }, {
                id: 3,
                name: '上盖上翻',
                key: "capUp",
            }, {
                id: 4,
                name: '上盖下翻',
                key: "capDown",
            }, {
                id: 5,
                name: '插销锁住',
                key: "boltLock",
            }, {
                id: 6,
                name: '插销松开',
                key: "boltUnlock",
            }, {
                id: 7,
                name: '进料口上翻',
                key: "feedportUp",
            }, {
                id: 8,
                name: '进料口下翻',
                key: "feedportDown",
            },],
        }
    },
    props: {
        data: {
            type: Object,
            default: () => { }
        }, width: {
            type: String,
            default: '35%'
        }
    }, watch: {
        data: {
            handler(value) {
                this.controlStatus = value || {}

            },
            deep: true,
            immediate: true
        }
    },


    methods: {
        handleExit() {
            this.isLogin = false
        },
        login() {
            if (this.form.password || !this.form.account) {
                Message.error("请输入帐号和密码")
                return
            }
            this.isLogin = true

        },
        handleChange(item, key) {
            this.controlStatus[key] = item
            if (key === 'selfMotion' && item === 1) {
                this.list.forEach(item => {
                    this.$set(this.controlStatus, item.key, 0)
                })
            }
            this.$api.sendControlCmd({ berthId: +this.$route.query.berthId, controlCmd: 1 })
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
    width: 50%;
    height: auto;
    padding: 35px 30px 25px;
    margin: 5vh auto 0;
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
}

.label {
    font-size: 24px;
    color: #00f5ff;
    width: 130px;
    text-align: left;
}

.list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
}
</style>