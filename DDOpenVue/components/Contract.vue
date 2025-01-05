<template>
	<div class="row">
		<div class="firstline">
			<div class="smalltext">
				<el-form>
					<el-form-item>
						<el-autocomplete
							class="row"
							v-model="contractno"
							:fetch-suggestions="querySearch_contract"
							placeholder="请输入合同号"
							:select="SaveData"
							:clearable="true"
							:trigger-on-focus="false"
						></el-autocomplete>
					</el-form-item>
				</el-form>
			</div>

			<div class="left marginleft">
				<el-button
					class="row"
					type="primary"
					icon="el-icon-s-promotion"
					@click="SaveData"
					>选择合同号</el-button
				>
			</div>
		</div>
	</div>
</template>

 <script>
import Vue from "vue";
export default {
	data() {
		return {
			contractnostacks: [],
			contractno: "",
			cust: "",
			resourceitems: [],
		};
	},

	methods: {
		SaveData() {
			var config = {
				headers: { "Access-Control-Allow-Origin": "*" },
			};

			this.axios
				.post(
					this.$root.URL + "/App/GetcustByContract",
					{ query: this.contractno },
					config
				)
				.then((res) => {
					console.log(res);

					const { code, data } = res.data;
					if (code === 0) {
						console.log(data.customer_name);
						this.cust = data.customer_name;
						this.resourceitems = data.resourceitems;
						console.log(dd);
						dd.postMessage({
							biztype: "contract",
							// field_contract: this.contractno,
							合同号: this.contractno,
							// field_cust: this.cust,
							客户名称: this.cust,
							resourceitems: this.resourceitems,
						});
					} else {
						console.log(dd);
					}
				})
				.catch((err) => err);
			console.log(this.contractno);
		},

		querySearch_contract(queryString, cb, e) {
			var config = {
				headers: { "Access-Control-Allow-Origin": "*" },
			};

			if (queryString === undefined) {
				console.log(queryString);
				return;
			}

			this.axios
				.post(
					this.$root.URL + "/Network/SearchContract",
					{ query: queryString },
					config
				)
				.then((res) => {
					const { code, data } = res.data;
					if (code === 0) {
						this.contractnostacks = data;
						const results = queryString
							? this.contractnostacks.filter(this.createFilter(queryString))
							: this.contractnostacks;
						cb(results);
					}
				})
				.catch((err) => err);
		},

		createFilter(queryString) {
			return (map) => {
				return (
					map.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
				);
			};
		},
	},
	mounted() {},
};
</script>


<style>
	.row,
	.el-input {
		width: 100%;
	}

	.firstline {
		display: flex;
		align-items: flex-start;
	}

	.marginleft {
		margin-left: 10px;
	}
</style>
