<template>
    <div class="main">
        <Top></Top>
        <div class="flex">
            <div class="left">
                <div>
                    <div class="title" style="color: #74fafd;font-size: 22px;">
                        {{ excelObj.name }}
                    </div>
                    <div class="choose-list">
                        <div v-for="c of excelObj.arr" :key="c.id" :label="c.id" class="choose-item"
                            :class="{ 'title': excelObj.type === c.id }" @click="getTime(c)"> {{ c.name
                            }}</div>
                    </div>
                    <div class="export">
                        <img class="icon" src="../assets//img/excel.png">
                        <div class="export-btn">导出</div>
                    </div>
                    <div class="title" style="font-size: 22px;">
                        查询条件
                    </div>
                    <el-form class="form" label-width="100px" :mode="form">
                        <el-form-item label="车牌号码">
                            <el-input style="width: 180px;" v-model="form.number" placeholder="车牌号码"></el-input>
                        </el-form-item>
                        <el-form-item label="起始日期">
                            <el-date-picker style="width: 180px;" v-model="form.startTime" type="date" placeholder="起始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束日期">
                            <el-date-picker style="width: 180px;" v-model="form.endTime" type="date" placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div class="export-btn" style="margin: auto;">查询</div>
                </div>
            </div>
            <div class="right">
                <el-table :data="tableData" style="width: 100%; " height="75vh">
                    <template v-for="item of columns[excelObj.type].columns">
                        <el-table-column :prop="item.prop" :key="item.id" :label="item.label" :width="item.width">
                            <template slot-scope="scope">
                                <span v-if="item.prop !== 'operate'">{{ scope[item.prop] }}</span>
                                <i class="iconfont icon-delete" v-else></i>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
                <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="currentPage" :page-size="10" background layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import { columns } from '../config/column'
export default {
    components: {
        Top
    },
    data() {
        return {
            currentPage: 1,
            total: 100,
            tableData: [],
            form: {
                number: '',
                startTime: '',
                endTime: ''
            },
            excelObj: {
                name: "报表类型",
                type: 'garbage',
                arr: [
                    {
                        id: 'garbage',
                        name: '垃圾倒置查询',
                    },
                    {
                        id: 'car',
                        name: '车辆信息查询'
                    }, {
                        id: 'change',
                        name: '更换容器查询'
                    }]
            },
        }
    },
    created() {
        this.columns = columns
    },

    methods: {
        getTime(item) {
            this.excelObj.type = item.id
        },
        handleSizeChange() {

        },
        handleCurrentChange() {

        }
    }
}
</script>
<style scoped lang="scss">
.left {
    width: 300px;
    height: 80vh;
    border-radius: 10px;
    border: 2px solid #63b5cf;
    margin-left: 4vh;
    margin-top: 8vh;
}

.choose-list {
    display: flex;
    flex-direction: column;
}

.title {
    background-color: #4b7aaf;
    padding: 20px 44px;
    color: #fff;
    font-size: 18px;
    border-bottom: 2px solid #63b5cf;

}



.choose-item {
    padding: 2vh 40px;
    font-size: 18px;
    color: #fff !important;
    cursor: pointer;

}

.flex {
    display: flex;
}

.icon {
    width: 50px;
    height: 50px;
}

.export {
    display: flex;
    align-items: center;
    padding-left: 5vh;
    margin: 20px 0;
}

.export-btn {
    width: 80px;
    height: 5vh;
    line-height: 5vh;
    text-align: center;
    color: #083e86cf;
    background-color: #20b7aa;
    font-size: 15px;
    border-radius: 12px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 2vh;
}

.form {
    margin: 5vh 0 4vh;
    padding-left: 12px;
}

::v-deep {
    .el-form-item__label {
        color: #fff;
    }

    .el-table {
        background-color: #203363;
    }

    .el-table th.el-table__cell {
        background-color: #203363;
        color: #73f7fa;

    }

    .el-table thead {
        color: #73f7fa;

    }

    .el-table__header {
        background-color: #203363;
        color: #73f7fa;
        font-size: 18px;
    }

    .el-table__row {
        background-color: #203363;
        color: #73f7fa;
    }

    .highlight-row {
        background-color: #FAD7D7 !important;
    }

    .el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
        background-color: #1a5ca5;
    }

    .el-pagination__total {
        color: #fff;
    }
}

.right {
    width: calc(100% - 400px);
    margin-top: 8vh;
    margin-left: 50px;
}

.pagination {
    margin-top: 3vh;
    display: flex;
    align-items: center;
    justify-content: center;

}
</style>