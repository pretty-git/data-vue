export const columns = {
    0:  [{
        prop: 'id',
        label: '序号',
        width: 80
    }, {
        prop: 'carNO',
        label: '车牌号',
    }, {
        prop: 'vehicleWeight',
        label: '车重（/吨）',
    }, {
        prop: 'location',
        label: '所属泊位',
    }, {
        prop: 'cargoWeight',
        label: '货重（/吨）',
    }, {
        prop: 'garbageWeight',
        label: '垃圾总重（/吨）',
    }, {
        prop: 'dumpTime',
        label: '时间',
    }, {
        prop: 'operate',
        label: '操作',
        width: 80
    }],
    1:  [
        {
            prop: 'id',
            label: '序号',

        }, {
            prop: 'carNO',
            label: '车牌号',

        }, {
            prop: 'enteTime',
            label: '进站时间',

        }, {
            prop: 'vehicleWeight',
            label: '车重（吨）',

        },
    ],
    2: [{
        prop: 'id',
        label: '序号',

    }, {
        prop: 'replaceTime',
        label: '时间',

    }, {
        prop: 'location',
        label: '位置',

    }, {
        prop: 'cargoWeight',
        label: '货重（吨）',

    }, {
        prop: 'operate',
        label: '操作',
        width: '80px',



    }],
   
}

export const berColumns = {
    0: {
        id: 0,
        columns: [{
            prop: 'id',
            label: '序号',
            width: '80px',
        }, {
            prop: 'dumpTime',
            label: '时间',
        }, {
            prop: 'location',
            label: '位置',
        }, {
            prop: 'garbageWeight',
            label: '重量（吨）',
        }, {
            prop: 'operate',
            label: '操作',
            width: '80px',

        }],
        name: '垃圾倒置查询'
    },
    2: {
        id: 2,
        columns: [{
            prop: 'id',
            label: '序号',
            width: '80px',
        }, {
            prop: 'replaceTime',
            label: '时间',

        }, {
            prop: 'isSuccess',
            label: '桶数',

        }, {
            prop: 'cargoWeight',
            label: '重量（吨）',

        }, {
            prop: 'operate',
            label: '操作',
            width: '80px',

        }],
        name: '更换容器查询'
    },
    3: {
        id: 3,
        columns: [
            {
                prop: 'id',
                label: '序号',
                width: '80px',
            }, {
                prop: 'alarmTime',
                label: '时间',

            }, {
                prop: 'status',
                label: '状态',

            }, {
                prop: 'content',
                label: '故障情况',

            },
        ],
        name: '报警故障信息查询'
    }
}
export const button = {
    0: '正常使用',
    1: '暂停使用',
    2: '更换容器'
}