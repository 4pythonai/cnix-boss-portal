<template>
	<div class="dad">
		<div class="row">
			<el-button
				size="small"
				class="left"
				type="primary"
				icon="el-icon-s-promotion"
				@click="SaveData"
				>保存IP</el-button
			>
		</div>
		<br />

		<el-input
			type="textarea"
			readonly
			v-model="getTTotalStr"
			placeholder="选择的IP"
		></el-input>

		<div class="row">
			<div>
				<br />
				<el-button
					type="primary"
					class="left"
					size="small"
					icon="el-icon-folder-add"
					@click="addIP"
					>增加IP</el-button
				>
			</div>
		</div>
		<br />

		<div class="row" v-for="(item, index) in ipaddreses" :key="'odf-' + index">
			<div class="card">
				<div class="row operation">
					<div class="delbtn">
						<el-button
							type="danger"
							data-idx="index"
							size="small"
							icon="el-icon-delete"
							circle
							@click="delIP(index)"
						></el-button>
					</div>

					<div class="network-dev-selector">
						<el-form>
							<el-form-item>
								<el-autocomplete
									v-model="item.ipaddress"
									:fetch-suggestions="querySearch_ipaddr"
									placeholder="请输入IP地址"
									:clearable="true"
									:trigger-on-focus="false"
									@select="handleSelect_ipaddr(item, index)"
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

 <script>
import Vue from "vue";
export default {
	data() {
		return {
			ipaddreses: [], // ip array
			total_str: "",
			odfstacks: [], // 暂用的栈
			retobj: {},
		};
	},

	computed: {
		getTTotalStr: {
			get() {
				console.log(this.ipaddreses);
				let result = this.ipaddreses.map((item) => item.ipaddress);
				this.total_str = result.join(",");
				return this.total_str;
			},
			set() {},
		},
	},

	methods: {
		querySearch_ipaddr(queryString, cb, e) {
			console.log(e);
			var config = {
				headers: { "Access-Control-Allow-Origin": "*" },
			};

			if (queryString === undefined) {
				console.log(queryString);
				return;
			}

			this.axios
				.post(
					this.$root.URL + "/Network/SearchIPaddr",
					{ query: queryString },
					config
				)
				.then((res) => {
					const { code, data } = res.data;
					if (code === 0) {
						this.odfstacks = data;
						const results = queryString
							? this.odfstacks.filter(this.createFilter(queryString))
							: this.odfstacks;
						cb(results);
					}
				})
				.catch((err) => err);
		},

		async handleSelect_ipaddr(item, index) {
			console.log("您选择了[....");
			console.log(item);
			console.log(index);
			console.log("....]");
		},

		createFilter(queryString) {
			return (map) => {
				return (
					map.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
				);
			};
		},

		addIP() {
			this.ipaddreses.push({ ipaddress: "", IDX: this.ipaddreses.length });
		},

		delIP(index) {
			this.ipaddreses.splice(index, 1);
			this.xtotal();
		},

		xtotal() {
			console.log(this.ipaddreses);
			let result = this.ipaddreses.map((item) => item.ipaddress);
			this.total_str = result.join(",");
		},

		SaveData() {
			this.xtotal();
			let onlyiparr = { text: this.ipaddreses.map((item) => item.ipaddress) };
			this.$root.Bus.$emit("ReceiveRes", JSON.stringify(onlyiparr));
		},
	},
	mounted() {},
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
		padding: 2px;
		width: 100%;
		min-width: 100%;
	}

	.operation {
		display: flex;
		width: 100%;
		min-width: 100%;
		justify-content: flex-start;
	}

	.network-dev-selector {
		width: 100%;
		justify-content: flex-start;
	}

	.left {
		float: left;
	}

	.dad {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>


