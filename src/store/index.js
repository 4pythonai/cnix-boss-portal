import navigation from './navigationStore'
import userStore from './userStore'
import commonTableStore from './commonTableStore'
import permissionManageStore from './permissionManageStore'
import FlowApprovalStore from './FlowApprovalStore'
import CandidateStore from './candidateStore'
import pmStore from './pmStore'
import dmStore from './dmStore'

import billingSummaryStore from './billingSummaryStore'
import IDC_cfg_store from './IDC_cfg_store'
 import chargeStore from './chargeStore'
import associateSelectStore from './associateSelectStore'

import triggerlineStore from '../routes/datagridmnt/container/trigger/triggerlineStore'


const store = {
    navigation,
    userStore,
    commonTableStore: new commonTableStore(),
    permissionManageStore,
    FlowApprovalStore,
    pmStore,
    dmStore,
    billingSummaryStore,
    IDC_cfg_store,
    chargeStore,
  
    CandidateStore,
    associateSelectStore
}

export default store
