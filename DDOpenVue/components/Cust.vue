<template>
	<div class="row">
		<div class="row">
			<el-button type="primary" icon="el-icon-s-promotion" @click="SaveData"
				>保存</el-button
			>
		</div>
		<br />
		<div class="row operation">
			<div class="network-dev-selector">
				<el-form>
					<el-form-item>
						<el-autocomplete
							class="row"
							v-model="cust"
							:fetch-suggestions="querySearch_cust"
							placeholder="请输入客户名称"
							:select="SaveData"
							:clearable="true"
							:trigger-on-focus="false"
						></el-autocomplete>
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
			custstacks: [],
			cust: "",
		};
	},

	methods: {
		SaveData() {
			// 向钉钉发送消息
			dd.postMessage({
				biztype: "cust",
				客户名称: this.cust,
			});
		},

		querySearch_cust(queryString, cb, e) {
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
					this.$root.URL + "/Network/SearchCust",
					{ query: queryString },
					config
				)
				.then((res) => {
					const { code, data } = res.data;
					if (code === 0) {
						this.custstacks = data;
						const results = queryString
							? this.custstacks.filter(this.createFilter(queryString))
							: this.custstacks;
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
		width: 100%;
		min-width: 100%;
		justify-content: flex-start;
	}
</style>
