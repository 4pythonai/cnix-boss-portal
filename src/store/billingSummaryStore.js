import { observable, action, autorun, computed } from "mobx";
<<<<<<< HEAD
import api from '@/api/api'
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

class billingSummaryStore {


    @observable cycle_store = [];


    @observable onetime_store = [];

<<<<<<< HEAD
    @observable chargeData = [];

=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    @observable cycleFee_summary = 0;

    @observable onetimeFee_summary = 0;

    @observable total_summary = 0;
<<<<<<< HEAD
    
    @observable manualset_billing_itmes=[]
=======
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778

    @action
    async clear() {
        this.cycle_store = []
        this.onetime_store = []
    }


    @observable billingVisible = false;
<<<<<<< HEAD
    @observable chargeVisible = false;

    /******************* 手工添加计费条目 *************************/
    @observable addBillingItemsVisible = false;

    @action addBillingItemsHandler = () => {
        this.addBillingItemsVisible = true;
    }

    @action hideBillingItemsModal = () => {
        this.addBillingItemsVisible = false;
    }




    @action showBillingModal = () => this.billingVisible = true;
    @action showchargeModal = async (contract_no) => {
        let params = {
            data: {
                contract_no: contract_no
            },
            method: 'POST'
        }
        let res = await api.contract_api.getChargeCompare(params)
        if (res.code == 200) {
            this.chargeData = res.data
        } else {
            return
        }
        this.chargeVisible = true
    };
    @action hidechargeModal = () => this.chargeVisible = false;
    @action hideBillingModal = () => this.billingVisible = false;
    
    @action set_manualset_billing_itmes=(items)=>{
        this.manualset_billing_itmes=[];
        let that=this
        items.forEach(function(item) {
            that.manualset_billing_itmes.push(item)
        });

        
        
    }
    

    @action setBillingData = data => {
        console.log('费用数据', data)
=======


    @action showBillingModal = () => this.billingVisible = true;
    @action hideBillingModal = () => this.billingVisible = false;

    @action setBillingData = data => {
        console.log('费用数据--->', data)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
        // 设置计费数据
        this.cycle_store = data.billing_store.cycle_store;
        this.onetime_store = data.billing_store.onetime_store;
        this.cycleFee_summary = data.cyclefee_summary;
        this.onetimeFee_summary = data.onetimefee_summary;
        this.total_summary = data.total_summary;
<<<<<<< HEAD
        this.manualset_billing_itmes = data.manualset_billing_itmes;
 
=======
        console.log(this)
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
    }
}

export default new billingSummaryStore()
