import {observable,action} from "mobx";

class billingSummaryStore {


    @observable cycle_store = [];
    @observable onetime_store = []
    @observable cust = {};
    @observable contract = {}
    @observable contract_timeline = []
    @observable cyclefee_summary = 0;
    @observable onetimefee_summary = 0;
    @observable total_summary = 0;
    @observable big_total_summary = 0;




    @action
    async clear() {

        console.log('clear')
        this.cycle_store = []
        this.onetime_store = []
        this.contract = {}
        this.contract_timeline = []
    }



    @action setBillingData = data => {
        console.log('费用数据--->',data)
        // 设置计费数据


        this.cycle_store = data.cycle_store;
        this.onetime_store = data.onetime_store;



        this.contract_timeline = data.contract_timeline
        this.cyclefee_summary = data.cyclefee_summary;
        this.onetimefee_summary = data.onetimefee_summary;
        this.total_summary = data.total_summary;
        this.cust = data.cust
        this.contract = data.contract
        this.big_total_summary = data.big_total_summary


        if(data.hasOwnProperty('big_total_summary')) {
            this.big_total_summary = data.big_total_summary

        }

    }
}

export default new billingSummaryStore()
