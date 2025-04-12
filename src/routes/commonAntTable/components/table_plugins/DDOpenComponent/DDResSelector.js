import React, { useState } from "react";
import { Button, Row, Col, message } from "antd";
import api from "@/api/api";
import OneResTypeSelector from "../DDReourceSelector/OneResTypeSelector";
import SubDeliverNoSelector from "../DDReourceSelector/SubDeliverNoSelector";


const DDResSelector = ({ maincode, contractno, area, processInstanceId, activityId, taskId, remark, result, actionerUserId, hideModal, refreshTasks }) => {
	const [resRows, setResRows] = useState([]);
	const [relatedDelivernos, setRelatedDelivernos] = useState([]);

	const handleSubTaskRemarkSummint = async () => {
		//  make sure resRows not empty
		if (resRows.length === 0) {
			message.error("请选择资源");
			return;
		}


		console.log("相关子relatedDelivernos", relatedDelivernos);
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
		const response = await api.dd.SubTaskRemarkSubmit(params);
		// alert(response.message)
		// hideModal();
		refreshTasks();
	};

	return (
		<div style={{ marginLeft: "15px" }}>
			<Row align="middle" style={{ marginBottom: "10px", marginTop: "10px" }}>
				<Col span={6}>
					<Button type="primary" onClick={handleSubTaskRemarkSummint}>
						确定提交选中的资源
					</Button>
				</Col>
			</Row>
			<div
				style={{
					border: "1px solid #f0f0f0",
					display: "flex",
					marginTop: "10px",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<OneResTypeSelector
					maincode={maincode}
					contract={contractno}
					resRows={resRows}
					setResRows={setResRows}
				/>
				<SubDeliverNoSelector setRelatedDelivernos={setRelatedDelivernos} />
			</div>
		</div>
	);
};

export default DDResSelector;
