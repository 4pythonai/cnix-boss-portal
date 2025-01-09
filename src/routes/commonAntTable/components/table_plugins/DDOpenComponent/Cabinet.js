import React from 'react';
import CabinetTree from './CabinetTree';
const Cabinet = ({ catid, product_name, bizCode }) => {


	return (
		<div className="w-full max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold">Cabinet组件XXTree</h2>
			<CabinetTree catid={catid} product_name={product_name} bizCode={bizCode} />
		</div >
	);
};
export default Cabinet;