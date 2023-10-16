export  const columns = {
    'garbage': {
        id: 'garbage',
        columns: [{
            prop: 'id',
            label: '序号',
        }, {
            prop: 'time',
            label: '车牌号',
        }, {
            prop: 'location',
            label: '车重（/吨）',
        }, {
            prop: 'weight1',
            label: '所属泊位',
        },  {
            prop: 'weight2',
            label: '货重（/吨）',
        }, {
            prop: 'weight3',
            label: '垃圾总重（/吨）',
        },  {
            prop: 'weight4',
            label: '时间',
        },  {
            prop: 'operate',
            label: '操作',
        }],
        name: '垃圾倒置查询'
    },
    'change': {
        id: 'change',
        columns: [{
            prop: 'id',
            label: '序号',

        }, {
            prop: 'time',
            label: '时间',

        }, {
            prop: 'number',
            label: '位置',

        }, {
            prop: 'weight',
            label: '货重（吨）',

        }, {
            prop: 'operate',
            label: '操作',

        }],
        name: '更换容器查询'
    },
    "car": {
        id: 'bug',
        columns: [
            {
                prop: 'id',
                label: '序号',

            }, {
                prop: 'time',
                label: '时间',

            }, {
                prop: 'status',
                label: '状态',

            }, {
                prop: 'case',
                label: '故障情况',

            },
        ],
        name: '车辆信息查询'
    }
}

export const  berColumns = {
    'garbage': {
        id: 'garbage',
        columns: [{
            prop: 'id',
            label: '序号',
        }, {
            prop: 'time',
            label: '时间',
        }, {
            prop: 'location',
            label: '位置',
        }, {
            prop: 'weight',
            label: '重量（吨）',
        }, {
            prop: 'operate',
            label: '操作',
        }],
        name: '垃圾倒置查询'
    },
    'change': {
        id: 'change',
        columns: [{
            prop: 'id',
            label: '序号',

        }, {
            prop: 'time',
            label: '时间',

        }, {
            prop: 'number',
            label: '桶数',

        }, {
            prop: 'weight',
            label: '重量（吨）',

        }, {
            prop: 'operate',
            label: '操作',

        }],
        name: '更换容器查询'
    },
    "bug": {
        id: 'bug',
        columns: [
            {
                prop: 'id',
                label: '序号',

            }, {
                prop: 'time',
                label: '时间',

            }, {
                prop: 'status',
                label: '状态',

            }, {
                prop: 'case',
                label: '故障情况',

            },
        ],
        name: '报警鼓掌信息查询'
    }
}
export const  button = {
    0: '正常使用',
    1: '暂停使用',
    2: '更换容器'
}