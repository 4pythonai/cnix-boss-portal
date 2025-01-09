import React from 'react';
import CabinetTree from './CabinetTree';
const Cabinet = ({ appendrows, catid, product_name, bizCode }) => {


	return (
		<div className="w-full max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold">选择机柜:</h2>
			<CabinetTree appendrows={appendrows} catid={catid} product_name={product_name} bizCode={bizCode} />
		</div >
	);
};
export default Cabinet;