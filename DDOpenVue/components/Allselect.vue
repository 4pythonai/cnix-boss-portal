/* eslint-disable */
<template>
  <div class="row">
    <div class="firstline">
      <el-cascader
        class="left smalltext"
        @change="changeType"
        :options="options"
        ref="prod"
        :show-all-levels="false"
      ></el-cascader>
      <el-button
        class="left marginleft"
        type="primary"
        size="mini"
        @click="SelectAviableResource"
        >选择资源V2</el-button
      >

      <el-button class="left" type="primary" size="mini" @click="SaveToDingDing"
        >保存所有V2</el-button
      >
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="操作" width="">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="deleteRow(scope.$index, tableData)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      <el-table-column prop="product_name" label="产品名称"> </el-table-column>

      <el-table-column
        prop="restext"
        label="资源"
        show-overflow-tooltip
        min-width="80%"
      >
      </el-table-column>

      <el-table-column prop="catid" label="ID" show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <div class="row">
      <br />
      <component ABCD_TAG="1234" :is="showSelectedProdSelector"></component>
    </div>
  </div>
</template>

 <script>
import Vue from "vue";
import Cabinet from "./Cabinet";
import Xpath from "./Xpath";
import Optical from "./Optical";
import Bandwidth from "./Bandwidth";
import Transfer from "./Transfer";
import Ip from "./Ip";
import Ethernet from "./Ethernet";
import Uloc from "./Uloc";
import Nothing from "./Nothing";

export default {
  components: {
    Cabinet,
    Xpath,
    Optical,
    Bandwidth,
    Transfer,
    Ip,
    Ethernet,
    Uloc,
    Nothing,
  },

  data() {
    return {
      tableData: [],
      product_name: "nothing",
      category: "nothing",
      contractno: "",
      catid: -1,
      options: [],
    };
  },

  computed: {
    showSelectedProdSelector: function () {
      return this.category;
    },
  },

  methods: {
    deleteRow(index, rows) {
      //删除
      rows.splice(index, 1);
    },

    ReceiveRes(msg) {
      console.log("ReceiveRes");
      console.log(msg);
      let tmp = {
        product_name: this.product_name,
        restext: msg,
        catid: this.catid,
      };
      this.tableData.push(tmp);
    },

    changeType(e, v) {
      console.log("资源选择变化了");
      console.log(e, v);
      this.SelectAviableResource();
    },

    SelectAviableResource() {
      console.log(this);
      let checkedsub = this.$refs.prod.getCheckedNodes();

      if (checkedsub.length == 1) {
        this.product_name = "nothing";
        this.category = "nothing";
        this.catid = "-1";

        this.product_name = checkedsub[0].data.label;
        this.category = checkedsub[0].data.category;
        this.catid = checkedsub[0].data.catid;
      }
    },

    SaveToDingDing() {
      console.log(this.tableData);
      console.log(JSON.stringify(this.tableData));
      var rawTableData = [];
      this.tableData.forEach((row, index, array) => {
        var tmp = {};
        tmp.catid = row.catid;
        tmp.product_name = row.product_name;
        tmp.restext = JSON.parse(row.restext);
        tmp.value = row.value;
        rawTableData.push(tmp);
      });

      console.log(JSON.stringify(rawTableData));
      let sendingdata = {
        biztype: "all",
        field_all: rawTableData,
      };
      console.log(sendingdata);
      if (typeof dd === "undefined") {
        //未定义
      } else {
        dd.postMessage(sendingdata);
      }
    },
  },

  mounted() {
    console.log("All selet:");
    console.log(this);

    console.log(this.$route.query.contract);
    let contract = this.$route.query.contract;
    this.$root.Bus.$on("ReceiveRes", this.ReceiveRes);

    var config = {
      headers: { "Access-Control-Allow-Origin": "*" },
    };

    this.axios
      .post(
        this.$root.URL + "/App/GetContractProductName",
        { contract: contract },
        config
      )
      .then((res) => {
        const { code, data } = res.data;
        if (code === 0) {
          this.options = data;
        }
      })
      .catch((err) => err);
  },
};
</script>

<style>
.row {
  width: 100%;
  min-width: 100%;
}

.card {
  background-color: #ebebeb;
  margin: 10px 0 10px 0;
  padding: 10px;
  width: 100%;
  min-width: 100%;
}

.operation {
  display: flex;
  width: 100%;
  min-width: 100%;
  justify-content: flex-start;
}
.left {
  float: left;
}

.marginleft {
  margin-left: 10px;
}

.dad {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.firstline {
  display: flex;
  align-items: flex-start;
}

.el-cascader-node__label {
  font-size: 0.3rem;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.smalltext {
  font-size: 0.3rem;
}

.el-cascader-node__label {
  font-size: 0.32rem;
}
</style>
