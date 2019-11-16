import { observable, action, autorun, computed } from "mobx";
import { message } from "antd";
import api from '../api/api'

class dmStore {
    constructor() {
        autorun(() => {
            if (this.current_actcode) {
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


    @action setCurrentActcode = actcode => {
        console.log('setCurrentActcode to ' + actcode)
        this.current_actcode = actcode

    }

    @action setCurrentActObj = obj => {
        this.currentObj = obj
    }

    @action setCurrentActName = name => {
        this.current_actname = name

    }




    @action initAll = () => {
        console.log('initall')
        this.getAllGrids()
        this.getAllBiztable()
        this.getActCols()
        this.getTriggerGroups()
        this.getAllPlugins()
        this.getAllCategory()

    }



    @action getAllPlugins = async () => {
        let params = { data: {} }
        let json = await api.processmanager.getAllPlugins(params);
        this.plugins = json.data;
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


    @action setFieldAttr = async (field, attr, value) => {
        this.maintableColumns.forEach((element, idx) => {
            if (element.Field === field) {
                this.maintableColumns[idx][attr] = value
            }
        });
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
