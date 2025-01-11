<template>
	<div>
		<el-input
			type="textarea"
			readonly
			v-model="ulocstr"
			placeholder="选择的U位"
		></el-input>

		<el-tree
			:data="data"
			accordion
			show-checkbox
			ref="tree"
			node-key="id"
			@check="onCheck"
		>
		</el-tree>
	</div>
</template>



<script>
import Qs from "qs";
const query = Qs.parse(location.hash.substring(3));
let category = query.category;
export default {
	name: "rcabinettree",
	props: ["single"],

	data() {
		return {
			ulocstr: "",
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
				.get(this.$root.URL + "/Network/Cabinet_tree_rent")
				.then((response) => {
					console.log("后台返回...");
					console.log(response);
					this.data = response.data.tree;
				})
				.catch((error) => {
					console.log(error);
					this.errored = true;
				})
				.finally(() => (this.loading = false));
		},

		getSelectedUs() {
			console.log("回报:");
			console.log({ ulocstr: this.ulocstr, nodes: this.nodes });
			return { text: this.ulocstr, nodes: this.nodes };
		},

		onCheck() {
			console.log("checkedUs-->");

			let checkedUs = this.$refs.tree.getCheckedNodes();
			// let checkedUs = this.$refs.tree.getCheckedKeys()

			console.log(checkedUs);
			this.ulocstr = "";
			let _ulocstr = "";

			this.nodes = [];

			checkedUs.map((val, index, checkedUs) => {
				let xnode = this.$refs.tree.getNode(val);

				if (val.category === "uloc") {
					_ulocstr =
						_ulocstr + "[" + xnode.parent.data.label + "/#" + val.label + "位]";
					this.nodes.push(val.id);
				}
			});
			this.ulocstr = _ulocstr;
			console.log(this.nodes);
			console.log(this.ulocstr);
		},
	},

	mounted() {
		console.log(this.single);
		this.initTree();
		// this.bus.$on('getSelectedCabinet', this.getSelectedCabinet)
		this.$root.Bus.$on("getSelectedCabinet", this.getSelectedCabinet);

		//this.$root.Bus.$on()
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
/* eslint-disable */
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
