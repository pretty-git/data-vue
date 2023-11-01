<template>
    <div class="main">
        <Top></Top>
        <div class="flex">
            <div class="left">
                <div>
                    <div class="title fs-22" style="color: #74fafd;">
                        {{ excelObj.name }}
                    </div>
                    <div class="choose-list">
                        <div v-for="c of excelObj.arr" :key="c.id" :label="c.id" class="choose-item"
                            :class="{ 'title': excelObj.type === c.id }" @click="getTab(c)"> {{ c.name
                            }}</div>
                    </div>
                    <div class="export" @click="export2Excel">
                        <img class="icon" src="../assets//img/excel.png">
                        <div class="export-btn">导出</div>
                    </div>
                    <div class="title fs-22">
                        查询条件
                    </div>
                    <el-form class="form" :mode="form">
                        <el-form-item label="车牌号码">
                            <el-input v-model="form.carNO" placeholder="车牌号码"></el-input>
                        </el-form-item>
                        <el-form-item label="起始日期">
                            <el-date-picker v-model="form.startTime" value-format="yyyy-MM-dd" type="date"
                                placeholder="起始日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束日期">
                            <el-date-picker v-model="form.endTime" value-format="yyyy-MM-dd" type="date" placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <div class="export-btn" style="margin: auto;" @click="getData">查询</div>
                </div>
            </div>
            <div class="right">
                <el-table :data="tableData" style="width: 98%; " height="75vh" ref="table" v-loading="loading">
                    <template v-for="item of columnsData">
                        <el-table-column :prop="item.prop" :key="item.id" :label="item.label" :width="item.width">
                            <template slot-scope="scope">
                                <span v-if="item.prop !== 'operate'">{{ scope.row[item.prop] }}</span>
                                <i class="iconfont icon-delete" @click="handleDelete(item)" v-else></i>
                            </template>
                        </el-table-column>
                    </template>
                </el-table>
                <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page.sync="pageNum" :page-size="pageSize" background layout="total, prev, pager, next"
                    :total="totalNum">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import Top from '../components/header/index.vue'
import { columns, button } from '../config/column'

export default {
    name: 'Excel',
    components: {
        Top
    },
    data() {
        return {
            pageNum: 1,
            totalNum: 0,
            pageSize: 10,
            loading: false,
            columnsData: {},
            tableData: [],
            form: {
                carNO: '',
                startTime: '',
                endTime: ''
            },
            excelObj: {
                name: "报表类型",
                type: 0,
                arr: [
                    {
                        id: 0,
                        name: '垃圾倒置查询',
                    },
                    {
                        id: 1,
                        name: '车辆信息查询'
                    }, {
                        id: 2,
                        name: '更换容器查询'
                    }]
            },
        }
    },
    created() {
        this.columnsData = columns[this.excelObj.type]
        this.getData()
    },

    methods: {
        getTab(item) {
            this.excelObj.type = item.id
            this.columnsData = columns[this.excelObj.type]
            this.getData()
        },

        async getData() {
            try {
                this.loading = true
                const { carNO, startTime, endTime } = this.form
                console.log(carNO, startTime, endTime)
                const { data, totalNum } = await this.$api.getRecordList({
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    recordType: this.excelObj.type,
                    carNO,
                    startTime: startTime ? `${startTime} 00:00:00` : '',
                    endTime: endTime ? `${endTime} 23:59:59` : '',
                })
                this.totalNum = totalNum
                this.tableData = (data || []).map(item => {
                    return {
                        ...item,
                        location: `${item.berthId}泊位`,
                        status: button[item.status],
                        garbageWeight: ((item.garbageWeight || 0) / 1000).toFixed(2),
                        cargoWeight: ((item.cargoWeight || 0) / 1000).toFixed(2),
                        vehicleWeight: ((item.vehicleWeight || 0) / 1000).toFixed(2)
                    }
                })
            } catch (error) {
                console.log(error)
                this.loading = false

            } finally {
                this.loading = false

            }

        },
        handleSizeChange(value) {
            this.pageSize = value
            this.getData()
        },
        handleCurrentChange(value) {
            this.pageNum = value
            this.getData()

        },
        export2Excel() {
            require.ensure([], () => {
                const { export_json_to_excel } = require('../config/Export2Excel');
                const tHeader = this.columnsData.map(item => item.label)
                tHeader.pop();
                // 上面设置Excel的表格第一行的标题
                const filterVal = this.columnsData.map(item => item.prop)
                // 上面的index、nickName、name是tableData里对象的属性
                const list = this.tableData;  //把data里的tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, '列表excel');
            })
        },

        formatJson(filterVal, jsonData) {
            console.log(filterVal, jsonData, jsonData.map(v => filterVal.map(j => v[j])))
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        async handleDelete(item) {
            await this.$confirm('确认删除该条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            await this.$api.deleteRecord({ recordType: this.excelObj.type, recordId: item.id })
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            await this.getData()
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
    padding: 16px 44px;
    color: #fff;
    font-size: 18px;
    border-bottom: 2px solid #63b5cf;

}



.choose-item {
    padding: 14px 40px;
    font-size: 16px;
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
    .el-input {
        width: 180px;
    }

    .el-input__inner {
        width: 180px;
    }

    .el-form-item__label {
        width: 80px;
    }

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

.fs-22 {
    font-size: 22px;
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