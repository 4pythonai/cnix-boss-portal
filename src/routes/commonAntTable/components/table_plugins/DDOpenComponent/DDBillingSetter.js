import React, { useState } from "react";
import { Button, Row, Col, DatePicker, message } from "antd";
import api from "@/api/api";
import moment from 'moment';


const DDBillingSetter = ({ maincode, contractno, area, processInstanceId, activityId, taskId, remark, result, actionerUserId, refreshTasks, _bossOpenValue }) => {

	const [billingDate, setBillingDate] = useState(null);

	const DDSetBillingDate = async () => {
		if (!billingDate) {
			message.error('计费时间不能为空.');
			return;
		}

		if (_bossOpenValue.saveId == null) {
			message.error('无法找到提交的资源选择情况');
			return;
		}


		const formattedBillingDate = moment(billingDate).format('YYYY-MM-DD');
		console.log("🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲formattedBillingDate", formattedBillingDate);
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
				_bossOpenValue: _bossOpenValue,
				billingDate: formattedBillingDate,
				saveId: _bossOpenValue.saveId
			},
			method: "POST",
		};



		console.log("🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲params", params);
		const response = await api.dd.DDSetBillingDate(params);
		refreshTasks();
	};

	return (
		<div style={{ marginTop: '30px', border: "1px solid black", padding: "10px" }}>
			<div>
				<DatePicker onChange={(value) => setBillingDate(value)} />
				<Button style={{ marginLeft: "20px", color: "green" }} onClick={DDSetBillingDate}>
					确定计费日期
				</Button>

			</div>
		</div >
	);
};

export default DDBillingSetter;
