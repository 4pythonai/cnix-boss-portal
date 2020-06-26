import { observable, action, autorun, computed } from "mobx";
import { message } from "antd";
import api from '../api/api'

class dmStore {
    constructor() {
        autorun(() => {

            if (this.current_actcode) {
                // this.initAll_v2()
                this.initAll()

            }
        });
    }


    @observable dataGrids = [];
    @observable maintableColumns = [];
    @observable biztableList = [];
    @observable current_actcode = '';
    @observable current_actname = '';
    @observable trigger_groups = [];
    @observable plugins = [];
    @observable Categories = [];
    @observable currentObj = {}
    @observable fixed_query_cfg = ''
    @observable maintable = ''
    @observable relatedtableColumns = []
    @observable relatedtable = []


    @action initAll_v2 = () => {

        console.log(this.current_actcode)

        let _current_code = this.current_actcode
        let _that = this

        var request = {


            getAllGrids: async function _getAllGrids() {

                let params = { data: {} }
                let json = await api.activity.getPortalDataGrids(params);
                return json.data;
            },


            getActCols: async function _getActCols() {

                let params = { method: 'POST', data: { "actcode": _current_code } }
                let json = await api.activity.getActCols(params);
                return json.data
            },

        };



        Promise.all([request.getAllGrids(), request.getActCols()]).then(
            (result) => {
                console.log(this)
                console.log(_that)
                console.log(result)

                this.dataGrids = result[0];
                this.maintableColumns = result[1]

            }

        )



    }


    @action setRelatedtable = table => {
        this.relatedtable = table
        this.getRelatedTableCols()
    }



    @action getRelatedTableCols = async () => {

        if (this.relatedtable == '') {
            this.relatedtableColumns = []
        } else {
            console.log('getRelatedTableCols')
            let params = { method: 'POST', data: { "table": this.relatedtable } }
            let json = await api.processmanager.getTableCols(params);
            this.relatedtableColumns = json.data;
        }
    }

    @action setCurrentActcode = actcode => {
        console.log("设置当前 Actcode")
        this.current_actcode = actcode
    }

    @action clearMaintableColumns = () => {
        this.maintableColumns = []
    }

    @action setCurrentBasetable = table => {
        this.maintable = table
    }




    @action setCurrentActName = name => {

        this.current_actname = name
    }

    @action setCurrentActObj = obj => {
        this.currentObj = obj
    }


    @action initAll = () => {

        console.log('初始化所有 dmStore 属性.')
        this.getAllGrids()
        this.getAllBiztable()
        this.getActCols()
        this.getTriggerGroups()
        this.getAllPlugins()
        this.getAllCategory()
        this.getRelatedTableCols()
        this.setCurrentBasetable()
    }



    @action getAllPlugins = async () => {
        let params = { data: {} }
        let json = await api.processmanager.getAllPlugins(params);
        this.plugins = json.data;
    }

    @action batchUpdateFieldCfg = async () => {
        console.log('批量修改字段配置', this.maintableColumns);
        let params = {
            data: {
                submitData: this.maintableColumns,
                action_code: this.current_actcode
            },
            method: 'POST'
        }
        let json = await api.activity.batchUpdateFieldCfg(params);
        if (json.code == 200) {
            await this.getActCols()
        }
    }




    @action getAllCategory = async () => {
        let params = { data: {} }
        let json = await api.activity.getAllCategory(params);
        this.Categories = json.data;
    }

    @action getActCols = async () => {
        if (this.current_actcode == '') {
            this.maintableColumns = []
        } else {
            let params = { method: 'POST', data: { "actcode": this.current_actcode } }
            let json = await api.activity.getActCols(params);
            this.maintableColumns = json.data;
        }
    }

    @action setMaintableColumns = maintableColumns => this.maintableColumns = maintableColumns





    @action getAllGrids = async () => {

        let params = { data: {} }
        let json = await api.activity.getPortalDataGrids(params);
        this.dataGrids = json.data;
    }

    @action getAllBiztable = async () => {
        let params = { data: {} }
        let json = await api.processmanager.getAllBiztable(params);
        this.biztableList = json.data;
    }

    @action getTriggerGroups = async () => {
        let params = { method: 'POST', data: { "actcode": this.current_actcode } }
        let json = await api.activity.getTriggerGroups(params);
        this.trigger_groups = json.data
    }




    @action saveTriggerGroup = async (obj) => {
        let params = { data: obj, method: 'POST' }
        console.log(obj)
        let json = await api.activity.saveTriggerGroup(params);
        message.info(json.message)
        this.getTriggerGroups()
    }

    @action deleteTriggerGroup = async (gpid) => {
        let params = { data: { groupid: gpid }, method: 'POST' }
        let json = await api.activity.deleteTriggerGroup(params);
        message.info(json.message)
        this.getTriggerGroups()
    }


    @action setFieldAttr = (field, attr, value) => {
        let maintableColumns = [...maintableColumns]
        maintableColumns.map((element, idx) => {
            if (element.Field === field) {
                element[attr] = value
            }
        });
        this.setMaintableColumns(maintableColumns)
    }

    @action saveFieldCfg = async (field) => {


        let indicator = -1;

        this.maintableColumns.forEach((element, idx) => {
            if (element.Field === field) {
                indicator = idx
            }
        })


        let obj = this.maintableColumns[indicator]
        obj.actcode = this.current_actcode


        let params = { data: obj, method: 'POST' }
        let json = await api.activity.saveFieldCfg(params);
        message.info(json.message)
        this.getActCols()
    }





}

export default new dmStore()
