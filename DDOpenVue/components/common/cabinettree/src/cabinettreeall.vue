/* eslint-disable */
<template>
	<div>
		<el-input
			type="textarea"
			readonly
			v-model="cabinetstr"
			placeholder="选择的机柜"
		></el-input>

		<el-tree
			:data="data"
			accordion
			show-checkbox
			ref="tree"
			node-key="id"
			@check="onCheckHandler"
		>
		</el-tree>
	</div>
</template>



<script>
import Qs from "qs";
const query = Qs.parse(location.hash.substring(3));
let category = query.category;
export default {
	name: "cabinettreeall",
	props: ["single"],

	data() {
		return {
			cabinetstr: "",
			nodes: [],
			data: null,
			category: category,
			defaultProps: {
				children: "children",
				label: "label",
			},
		};
	},

	methods: {
		initTree() {
			this.axios
				.get(this.$root.URL + "/Network/Network_tree_all")
				.then((response) => {
					console.log("后台返回");
					console.log(response);
					this.data = response.data.tree;
				})
				.catch((error) => {
					console.log(error);
					this.errored = true;
				})
				.finally(() => (this.loading = false));
		},

		getSelectedCabinet() {
			console.log("回报:");
			console.log({ cabinetstr: this.cabinetstr, nodes: this.nodes });
			return { text: this.cabinetstr, nodes: this.nodes };
		},

		onCheckHandler() {
			let checkedCabinets = this.$refs.tree.getCheckedKeys();
			console.log("onCheckHandler checkedCabinets:");

			console.log(checkedCabinets);
			this.cabinetstr = "";
			let _cabinetstr = "";

			if (this.single) {
				if (checkedCabinets.length > 1) {
					alert("只能选择一个");
					checkedCabinets = [];
					this.$refs.tree.setCheckedKeys([]);
					return;
				}
			}

			checkedCabinets.map((val, index, checkedCabinets) => {
				console.log("ALL-----------val");
				let xnode = this.$refs.tree.getNode(val);
				_cabinetstr = xnode.data.text + "/" + _cabinetstr;
			});
			this.cabinetstr = _cabinetstr;
			this.nodes = checkedCabinets;
		},
	},

	mounted() {
		console.log(this.single);
		this.initTree();

		this.$root.Bus.$on("getSelectedCabinet", this.getSelectedCabinet);
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
