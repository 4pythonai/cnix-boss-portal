
var commonTableStore = require('@/store/commonTableStore').default
var serve = {
    add: function () {
        if(!commonTableStore.selectedRows[0]){
            return
        }
        alert(commonTableStore.selectedRows[0].uuid) 

                   
    },
    add1: function () {
        alert('测试按钮1-2')
    },
    sss:function(){
        alert('我是我的按钮')
    },
    ggg:function(){
        alert('你的按钮')
    },
    wbtest:function(){
        console.log(233232)
    }
}
module.exports = serve