import { observable, action, autorun, computed } from "mobx";
import api from '@/api/api'

class billingSummaryStore {


    @observable cycle_store = [];


    @observable onetime_store = [];

    @observable chargeData = [];

    @observable cycleFee_summary = 0;

    @observable onetimeFee_summary = 0;

    @observable total_summary = 0;
    
    @observable manualset_billing_itmes=[]

    @action
    async clear() {
        this.cycle_store = []
        this.onetime_store = []
    }


    @observable billingVisible = false;
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
        // 设置计费数据
        this.cycle_store = data.billing_store.cycle_store;
        this.onetime_store = data.billing_store.onetime_store;
        this.cycleFee_summary = data.cyclefee_summary;
        this.onetimeFee_summary = data.onetimefee_summary;
        this.total_summary = data.total_summary;
        this.manualset_billing_itmes = data.manualset_billing_itmes;
 
    }
}

export default new billingSummaryStore()
