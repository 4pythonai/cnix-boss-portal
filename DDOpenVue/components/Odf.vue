<template>
	<div>
		<h1>bbb</h1>
		<el-button type="primary" icon="el-icon-s-promotion" @click="SaveData"
			>保存</el-button
		>
		<br />
		<div>
			<el-button type="primary" icon="el-icon-folder-add" @click="addLine"
				>增加</el-button
			>
		</div>

		<div v-for="(item, index) in lines" :key="'odf-' + index">
			<div class="card">
				<div class="row operation">
					<div class="delbtn">
						<el-button
							type="danger"
							icon="el-icon-delete"
							circle
							@click="delLine"
						></el-button>
					</div>

					<div class="network-dev-selector">
						<el-form>
							<el-form-item>
								<el-autocomplete
									v-model="item.odfid"
									:fetch-suggestions="querySearch_odf"
									placeholder="请输入ODF名称"
									:clearable="true"
									:trigger-on-focus="false"
									@select="handleSelect_odf"
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</div>
				</div>

				<div class="oneport odfports">
					<el-radio-group
						v-model="item.portid"
						v-for="(x_port_item, x_idx) in item.ports"
						:key="x_idx"
					>
						<el-radio :label="x_port_item.value">{{
							x_port_item.port
						}}</el-radio>
					</el-radio-group>
				</div>
			</div>
		</div>

		<el-button type="primary" icon="el-icon-folder-add" @click="addSwitchport"
			>增加交换机端口</el-button
		>

		<div v-for="(item, index) in switchs" :key="'switch-' + index">
			<div class="card">
				<div class="row operation">
					<div class="delbtn">
						<el-button
							type="danger"
							icon="el-icon-delete"
							circle
							@click="delSwitch"
						></el-button>
					</div>

					<div class="network-dev-selector">
						<el-form>
							<el-form-item>
								<el-autocomplete
									v-model="item.switchid"
									:fetch-suggestions="querySearch_switch"
									placeholder="请输入交换机名称"
									:clearable="true"
									:trigger-on-focus="false"
									@select="handleSelect_switch"
								></el-autocomplete>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<div class="switchports">
					<el-radio-group
						v-model="item.portid"
						v-for="(x_port_item, x_idx) in item.ports"
						:key="x_idx"
					>
						<div class="sw-port">
							<el-radio :label="x_port_item.value">{{
								x_port_item.port
							}}</el-radio>
						</div>
					</el-radio-group>
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
			lines: [], // odf端口数组
			currentODF: {},
			odfstacks: [], // 暂用的栈
			switchstacks: [], // 暂用的栈
			switchs: [], //只能有一条记录

			switch: { switchid: "", switchportid: "" },
		};
	},

	methods: {
		addLine() {
			console.log("addline");
			this.lines.push({ odfid: "", portid: "", ports: [] });
		},

		addSwitchport() {
			console.log("addSwitchport");
			this.switchs.push({ switchid: "", portid: "", ports: [] });
		},

		delLine(index) {
			console.log("delLine");
			this.lines.splice(index, 1);
		},

		delSwitch(index) {
			console.log("delSwitch");
			this.switchs.splice(index, 1);
		},

		SaveData() {
			console.log(this.lines);
			console.log(this.switchs);
		},

		querySearch_odf(queryString, cb, e) {
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
					this.$root.URL + "/Network/SearchOdf",
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

		querySearch_switch(queryString, cb) {
			var config = {
				headers: { "Access-Control-Allow-Origin": "*" },
			};

			if (queryString === undefined) {
				console.log(queryString);
				return;
			}

			this.axios
				.post(
					this.$root.URL + "/Network/SearchSwitch",
					{ query: queryString },
					config
				)
				.then((res) => {
					const { code, data } = res.data;
					if (code === 0) {
						this.switchstacks = data;
						const results = queryString
							? this.switchstacks.filter(this.createFilter(queryString))
							: this.switchstacks;
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

		async handleSelect_odf(item) {
			console.log("您选择了....");
			let response = await this.axios.get(
				this.$root.URL + "/Network/ListOdrport?odfid=" + item.id
			);
			let currentODF = this.lines.filter((dev) => dev.odfid === item.odf); // 找到当前的ODF
			currentODF[0].ports = response.data.data;
		},

		async handleSelect_switch(item) {
			console.log("您选择了交换机....");
			let response = await this.axios.get(
				this.$root.URL + "/Network/ListSwitchport?switchid=" + item.id
			);
			let currentSwitch = this.switchs.filter(
				(dev) => dev.switchid === item.value
			);
			currentSwitch[0].ports = response.data.data;
		},
	},
	mounted() {},
};
</script>　

<style>
	.row {
		width: 100%;
	}

	.card {
		background-color: #ebebeb;
		margin: 10px 0 10px 0;
		padding: 2px;
	}

	.operation {
		display: flex;
		justify-content: flex-start;
	}

	.odf-container,
	.switch-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: left;
		justify-content: space-around;
	}

	.network-dev-selector {
		justify-content: flex-start;
	}

	.odfports,
	.switchports {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-content: space-between;
	}

	.sw-port {
		width: 33.3%;
		float: left;
	}
</style>


