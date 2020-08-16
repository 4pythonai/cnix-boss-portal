import navigation from './navigationStore'
import userStore from './userStore'
import commonTableStore from './commonTableStore'
import permissionManageStore from './permissionManageStore'
import pmStore from './pmStore'
import dmStore from './dmStore'

import billingSummaryStore from '@/routes/commonAntTable/components/table_plugins/bill/billingSummaryStore'


import associateSelectStore from './associateSelectStore'

import triggerlineStore from '../routes/datagridmnt/container/trigger/triggerlineStore'


const store = {
    navigation,
    userStore,
    commonTableStore: new commonTableStore(),
    permissionManageStore,
    pmStore,
    dmStore,
    billingSummaryStore,
    associateSelectStore
}

export default store
