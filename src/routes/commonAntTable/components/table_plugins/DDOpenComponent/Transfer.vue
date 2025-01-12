/* eslint-disable */
<template>
	<div class="dad">
		<div class="row">
			<el-button
				size="small"
				class="left"
				type="primary"
				icon="el-icon-s-promotion"
				@click="SaveData"
				>保存传输</el-button
			>
		</div>
		<br />

		<el-input
			type="textarea"
			readonly
			v-model="total_str"
			placeholder="选择的传输"
		></el-input>

		<div class="card">
			<div class="oneport odfports">
				<el-radio-group
					v-model="site1_value"
					v-for="(x_site, x_idx) in sites"
					:key="x_idx"
					@change="siteHandler(sites, x_site, x_idx, 1)"
				>
					<el-radio :label="x_site.value">{{ x_site.text }}</el-radio>
				</el-radio-group>
			</div>
		</div>

		<div class="card">
			<div class="oneport odfports">
				<el-radio-group
					v-model="site2_value"
					v-for="(x_site, x_idx) in sites"
					:key="x_idx"
					@change="siteHandler(sites, x_site, x_idx, 2)"
				>
					<el-radio :label="x_site.value">{{ x_site.text }}</el-radio>
				</el-radio-group>
			</div>

			<div class="network-dev-selector">
				<el-form>
					<el-form-item>
						<el-input
							v-model="bandwidth"
							placeholder="请输入带宽"
							:clearable="true"
							:trigger-on-focus="false"
						>
						</el-input>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

 <script>
import Vue from "vue";
export default {
	data() {
		return {
			site1_value: "",
			site2_value: "",
			site1_text: "",
			site2_text: "",
			total_str: "",
			total_value: "",
			retobj: {},
			bandwidth: "",
			sites: [],
		};
	},

	created() {
		var config = {
			headers: { "Access-Control-Allow-Origin": "*" },
		};

		this.axios
			.post(this.$root.URL + "/Network/SelectTransfer", {}, config)
			.then((res) => {
				const { code, data } = res.data;
				if (code === 0) {
					this.sites = data;
				}
			})
			.catch((err) => err);
	},

	methods: {
		xtotal() {
			console.log(this.site1_value);
			console.log(this.site2_value);
			console.log(this.site1_text);
			console.log(this.site2_text);
			console.log(this.bandwidth);

			this.retobj = {
				t1: this.site1_text,
				t2: this.site2_text,
				bw: this.bandwidth,
				s1: this.site1_value,
				s2: this.site2_value,
			};

			console.log(JSON.stringify(this.retobj));

			// dd.postMessage({
			//   'biztype': 'transfer',
			//   'field_transfer': JSON.stringify(obj)
			// });
		},

		siteHandler(sites, x_site, x_idx, key) {
			if (key == 1) {
				this.site1_value = sites[x_idx].value;
				this.site1_text = sites[x_idx].text;
			}

			if (key == 2) {
				this.site2_value = sites[x_idx].value;
				this.site2_text = sites[x_idx].text;
			}
			this.xtotal();
		},

		SaveData() {
			this.xtotal();
			this.$root.Bus.$emit("ReceiveRes", JSON.stringify(this.retobj));
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


