<template>
	<div class="dad">
		<div class="row">
			<el-button
				type="primary"
				size="small"
				class="left"
				icon="el-icon-s-promotion"
				@click="SaveData"
				>保存</el-button
			>
		</div>

		<div class="row">
			<Cabinettree1 ref="tree1" :bus="bus" :single="true" />
		</div>
		<div class="row">
			<Cabinettree2 ref="tree2" :bus="bus" :single="true" />
		</div>
	</div>
</template>



<script>
import Qs from "qs";
import Vue from "vue";
import CabinettreeAll from "./common/cabinettree/indexAll";
const query = Qs.parse(location.hash.substring(3));
let category = query.category;
export default {
	data() {
		return {
			select1: {},
			select2: {},
			data: null,
			category: category,
			bus: new Vue(),
			retobj: {}
		};
	},

	components: {
		Cabinettree1: CabinettreeAll,
		Cabinettree2: CabinettreeAll
	},

	methods: {
		SaveData() {
			this.select1 = this.$refs.tree1.getSelectedCabinet();
			this.select2 = this.$refs.tree2.getSelectedCabinet();
			this.retobj = { from: this.select1, to: this.select2 };
			this.$root.Bus.$emit("ReceiveRes", JSON.stringify(this.retobj));
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
