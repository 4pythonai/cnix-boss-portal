import React, { useState } from "react";
import { Button, Row, Col, DatePicker } from "antd";
import api from "@/api/api";


const DDBillingSetter = ({ maincode, contractno, area, processInstanceId, activityId, taskId, remark, result, actionerUserId, hideModal, refreshTasks }) => {

	const DDSetBillingDate = async () => {
		const params = {
			data: {
				area: area,
				processInstanceId: processInstanceId,
				activityId: activityId,
				taskId: taskId,
				remark: remark,
				result: result,
				actionerUserId: actionerUserId,
				maincode: maincode,
				contractno: contractno,
				resRows: resRows,
				relatedDelivernos: relatedDelivernos,
			},
			method: "POST",
		};
		const response = await api.dd.DDSetBillingDate(params);
		// alert(response.message)
		// hideModal();
		refreshTasks();
	};

	return (
		<div style={{ marginTop: '60px', border: "1px solid black", padding: "10px" }}>
			<div>
				{/* add Date selector */}
				<DatePicker />

				<Button style={{ marginLeft: "20px" }} type="primary" onClick={DDSetBillingDate}>
					确定计费日期
				</Button>

			</div>
		</div >
	);
};

export default DDBillingSetter;
