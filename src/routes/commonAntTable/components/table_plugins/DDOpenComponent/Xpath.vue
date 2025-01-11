/* eslint-disable */
<template>
	<div class="dad">
		<div class="row">
			<div>
				<el-button
					size="small"
					type="primary"
					class="left"
					icon="el-icon-folder-add"
					@click="SaveData"
					>保存端口</el-button
				>
			</div>
		</div>

		<br />

		<el-input
			type="textarea"
			readonly
			v-model="total_str"
			placeholder="选择的端口"
		></el-input>
		<br />
		<div class="row">
			<div>
				<el-button
					size="small"
					type="primary"
					class="left"
					icon="el-icon-folder-add"
					@click="addLine"
					>增加ODF端口&nbsp;&nbsp;&nbsp;&nbsp;</el-button
				>
			</div>
		</div>
		<br />

		<div class="row" v-for="(item, index) in lines" :key="'odf-' + index">
			<div class="card">
				<div class="row operation">
					<div class="delbtn">
						<el-button
							size="small"
							type="danger"
							data-idx="index"
							icon="el-icon-delete"
							circle
							@click="delLine(index, item.ports)"
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
						@change="
							odfportHandler(
								item.ports,
								x_port_item.value,
								x_port_item.port,
								index
							)
						"
					>
						<el-radio :label="x_port_item.value">{{
							x_port_item.port
						}}</el-radio>
					</el-radio-group>
				</div>
			</div>
		</div>

		<div class="row">
			<el-button
				size="small"
				type="primary"
				class="left"
				icon="el-icon-folder-add"
				@click="addSwitchport"
				>增加交换机端口</el-button
			>
		</div>

		<div class="row" v-for="(item, index) in switchs" :key="'switch-' + index">
			<div class="card">
				<div class="row operation">
					<div class="delbtn">
						<el-button
							size="small"
							type="danger"
							icon="el-icon-delete"
							circle
							@click="delSwitch(index, item.ports)"
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
						@change="
							swportHandler(
								item.ports,
								x_port_item.value,
								x_port_item.port,
								index
							)
						"
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
			selected_odfports: [],
			selected_swports: [],
			total_str: "",
			total_value: "",
			retobj: {},
		};
	},

	methods: {
		addLine() {
			this.lines.push({
				odfid: "",
				portid: "",
				ports: [],
				IDX: this.lines.length,
				text: "",
			});
		},

		addSwitchport() {
			if (this.switchs.length >= 1) {
				alert("只能有一个交换机端口");
				return;
			} else {
				this.switchs.push({ switchid: "", portid: "", ports: [], text: "" });
			}
		},

		delLine(index, ports) {
			this.clearOdf(ports);
			this.lines.splice(index, 1);
			this.xtotal();
		},

		delSwitch(index, ports) {
			console.log(ports);
			this.clearSw(ports);
			this.switchs.splice(index, 1);
			this.xtotal();
		},

		xtotal() {
			let obj = {
				odfports: this.selected_odfports,
				swports: this.selected_swports,
			};
			console.log(this.lines);
			console.log(this.switchs);
			let tmp = "";
			this.total_str = "";
			this.lines.forEach((element) => {
				if (!(element.text === "")) {
					this.total_str += "[" + element.odfid + ":" + element.text + "]";
				}
			});

			this.switchs.forEach((element) => {
				if (!(element.text === "")) {
					this.total_str += "[" + element.switchid + ":" + element.text + "]";
				}
			});

			this.retobj = { text: this.total_str, value: obj };

			console.log(JSON.stringify(this.retobj));

			// dd.postMessage({
			//   'biztype': 'path',
			//   'field_path': JSON.stringify(this.retobj)
			// });
		},

		odfportHandler(ports, portvalue, porttext, serial) {
			console.log(serial);
			this.clearOdf(ports);
			this.selected_odfports.push(portvalue);
			this.lines[serial].text = porttext;
			this.xtotal();
		},

		swportHandler(ports, portvalue, porttext, serial) {
			this.clearSw(ports);
			this.selected_swports.push(portvalue);
			this.switchs[serial].text = porttext;
			this.xtotal();
		},

		//把当前odf 所有端口都从占用表格删除
		clearOdf(ports) {
			ports.forEach((element) => {
				var index = this.selected_odfports.indexOf(element.value);
				if (index > -1) {
					this.selected_odfports.splice(index, 1);
				}
			});
		},

		//把当前switch 所有端口都从占用表格删除
		clearSw(ports) {
			ports.forEach((element) => {
				var index = this.selected_swports.indexOf(element.value);
				if (index > -1) {
					this.selected_swports.splice(index, 1);
				}
			});
		},

		SaveData() {
			this.xtotal();

			this.$root.Bus.$emit("ReceiveRes", JSON.stringify(this.retobj));
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

			console.log(this.$parent.catid);

			let response = await this.axios.get(
				this.$root.URL +
					"/Network/ListOdrport?odfid=" +
					item.id +
					"&catid=" +
					this.$parent.catid
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

	.odf-container,
	.switch-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: left;
		justify-content: space-around;
	}

	.network-dev-selector {
		width: 100%;
		justify-content: flex-start;
	}

	.odfports,
	.switchports {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-content: space-between;
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


