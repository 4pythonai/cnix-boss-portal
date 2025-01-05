<template>
	<div class="dad">
		<div class="row">
			<el-button
				size="small"
				class="left"
				type="primary"
				icon="el-icon-s-promotion"
				@click="SaveData"
				>保存机柜</el-button
			>
			<br />
		</div>

		<div class="row">
			<Cabinettree ref="tree" :single="false" />
		</div>
	</div>
</template>



<script>
import Qs from "qs";
import Vue from "vue";

import Cabinettree from "./common/cabinettree/index";
const query = Qs.parse(location.hash.substring(3));
let category = query.category;
export default {
	data() {
		return {
			cabinetstr: "",
			select: {},
			data: null,
			category: category
		};
	},

	components: {
		Cabinettree: Cabinettree
	},

	methods: {
		SaveData() {
			this.select = this.$refs.tree.getSelectedCabinet();
			console.log(this.select);
			console.log(JSON.stringify(this.select));
			this.$root.Bus.$emit("ReceiveRes", JSON.stringify(this.select));
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

	.dad {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
