import navigation from './navigationStore'
import userStore from './userStore'
import commonTableStore from './commonTableStore'
import permissionManageStore from './permissionManageStore'
import FlowApprovalStore from './FlowApprovalStore'
import pmStore from './pmStore'
import dmStore from './dmStore'

import OneContractBillingStore from '@/routes/commonAntTable/components/table_plugins/bill/OneContractBillingStore'
import triggerlineStore from '../routes/datagridmnt/container/trigger/triggerlineStore'


const store = {
    navigation,
    userStore,
    commonTableStore: new commonTableStore(),
    permissionManageStore,
    FlowApprovalStore,
    pmStore,
    dmStore,
    OneContractBillingStore,
}

export default store
