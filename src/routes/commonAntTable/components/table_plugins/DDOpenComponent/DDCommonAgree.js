import React, { useState } from "react";
import { Button, message, Input } from "antd";
import api from "@/api/api";


const DDCommonAgree = ({ maincode, contractno, area, processInstanceId, activityId, taskId, remark, result, actionerUserId, refreshTasks, _bossOpenValue }) => {

	const [memoText, setMemoText] = useState("Agree");
	const AgreeTask = async () => {

		const params = {
			data: {
				area: area,
				processInstanceId: processInstanceId,
				activityId: activityId,
				taskId: taskId,
				remark: memoText,
				result: result,
				actionerUserId: actionerUserId,
			},
			method: "POST",
		};
		console.log("🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲params", params);
		const response = await api.dd.AgreeTask(params);
		refreshTasks();
	};

	return (
		<div style={{ marginTop: '30px', border: "1px solid black", padding: "10px" }}>
			<div>
				<Input style={{ width: '100px' }} onChange={(e) => setMemoText(e.target.value)} />
				<Button style={{ marginLeft: "20px", color: "green" }} onClick={AgreeTask}>
					同意审批
				</Button>

			</div>
		</div >
	);
};

export default DDCommonAgree;