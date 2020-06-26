import navigation from './navigationStore'
import userStore from './userStore'
import commonTableStore from './commonTableStore'
import permissionManageStore from './permissionManageStore'
import FlowApprovalStore from './FlowApprovalStore'
<<<<<<< HEAD
import CandidateStore from './candidateStore'
import pmStore from './pmStore'
import dmStore from './dmStore'

import billingSummaryStore from './billingSummaryStore'
import IDC_cfg_store from './IDC_cfg_store'
 import chargeStore from './chargeStore'
import associateSelectStore from './associateSelectStore'

=======
import pmStore from './pmStore'
import dmStore from './dmStore'

import OneContractBillingStore from '@/routes/commonAntTable/components/table_plugins/bill/OneContractBillingStore'
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
import triggerlineStore from '../routes/datagridmnt/container/trigger/triggerlineStore'


const store = {
    navigation,
    userStore,
    commonTableStore: new commonTableStore(),
    permissionManageStore,
    FlowApprovalStore,
    pmStore,
    dmStore,
<<<<<<< HEAD
    billingSummaryStore,
    IDC_cfg_store,
    chargeStore,
  
    CandidateStore,
    associateSelectStore
=======
    OneContractBillingStore,
>>>>>>> 16482705d48c1725f42552d58acdbf73fea41778
}

export default store
