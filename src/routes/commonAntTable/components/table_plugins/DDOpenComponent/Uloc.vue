<template>
	<div class="dad">
		<div class="row">
			<el-button
				type="primary"
				size="small"
				class="left"
				icon="el-icon-s-promotion"
				@click="SaveData"
				>保存机位</el-button
			>
		</div>

		<div class="row">
			<Rcabinettree ref="tree" :bus="bus" :single="false" />
		</div>
	</div>
</template>



<script>
import Qs from "qs";
import Vue from "vue";

import Rcabinettree from "./common/rcabinettree/index";
const query = Qs.parse(location.hash.substring(3));
let category = query.category;
export default {
	data() {
		return {
			cabinetstr: "",
			select: {},
			data: null,
			ulocs: [],
			category: category,
			bus: new Vue()
		};
	},

	components: {
		Rcabinettree: Rcabinettree
	},

	methods: {
		SaveData() {
			this.select = this.$refs.tree.getSelectedUs();

			console.log(this.select);

			console.log(JSON.stringify(this.select));

			this.$root.Bus.$emit("ReceiveRes", JSON.stringify(this.select));

			// dd.postMessage({
			//   'biztype': 'uloc',
			//   'field_uloc': JSON.stringify(this.select)
			// });
		}
	},

	mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	.row {
		margin-bottom: 10px;
	}
</style>
