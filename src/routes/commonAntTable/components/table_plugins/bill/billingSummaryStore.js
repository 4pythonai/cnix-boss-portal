import { observable, action, autorun, computed } from "mobx";

class billingSummaryStore {


    @observable cycle_store = [];


    @observable onetime_store = [];

    @observable cycleFee_summary = 0;

    @observable onetimeFee_summary = 0;

    @observable total_summary = 0;

    @action
    async clear() {

        console.log('clear')
        this.cycle_store = []
        this.onetime_store = []
    }



    @action setBillingData = data => {
        console.log('费用数据', data)
        // 设置计费数据
        this.cycle_store = data.billing_store.cycle_store;
        this.onetime_store = data.billing_store.onetime_store;
        this.cycleFee_summary = data.cyclefee_summary;
        this.onetimeFee_summary = data.onetimefee_summary;
        this.total_summary = data.total_summary;
    }
}

export default new billingSummaryStore()
