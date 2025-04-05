import React, { useState, useEffect } from "react";
import { Button, Input, Card, message, Row, Col } from "antd";
import api from "@/api/api";

const DDTasks = ({ ddUserid,area, operationRecords, processInstanceId, tasks }) => {
	const [inputValues, setInputValues] = useState({});

	// Sort tasks by createTime
	const sortedTasks = [...tasks].sort(
		(a, b) => new Date(a.createTime) - new Date(b.createTime),
	);

	const handleInputChange = (taskId, value) => {
		setInputValues((prev) => ({
			...prev,
			[taskId]: value,
		}));
	};

	const handleSubmit = async (activityId, taskId) => {
		const inputValue = inputValues[taskId];
		if (!inputValue) {
			message.warning("请输入内容");
			return;
		}

		//16551695175697348 陈新
		try {
			// Call your API here
			const params = {
				data: {
					area: area,
					processInstanceId: processInstanceId,
					activityId: activityId,
					taskId: taskId,
					remark: inputValue,
					result: "agree",
					actionerUserId: ddUserid,
				},
				method: "POST",
			};
			console.log("params", params);
			const res = await api.dd.subTaskProcess(params);
			message.success("提交成功");
		} catch (error) {
			message.error("提交失败");
		}
	};

	return (
		<div style={{ marginLeft: "15px" }}>
			{sortedTasks.map((task) => (
				<Card
					key={task.taskId}
					style={{
						border: "1px solid #f0f0f0",
						marginTop: "10px",
					}}
				>
					<Row gutter={16} align="middle">
						<Col span={16}>
							<div>
								<strong>活动名称:</strong> {task.activityId}/{task.activityName}
							</div>
							<div>
								<strong>创建时间:</strong>
								{new Date(task.createTime).toLocaleString()}
							</div>
							<div>
								<strong>状态:</strong>
								{task.result === "NONE" ? "未处理" : task.result}
							</div>
							<div>
								<strong>批注:</strong>
								{task.result === "NONE" ? "" : operationRecords.find(record => record.activityId === task.activityId)?.remark || "无批注"}
							</div>

						</Col>
						{task.result === "NONE" && (
							<Col span={8}>
								<div style={{ display: "flex", gap: "8px" }}>
									<Input
										placeholder="请输入内容"
										value={inputValues[task.taskId] || ""}
										onChange={(e) =>
											handleInputChange(task.taskId, e.target.value)
										}
									/>
									<Button
										type="primary"
										onClick={() => handleSubmit(task.activityId, task.taskId)}
									>
										提交
									</Button>
								</div>
							</Col>
						)}
					</Row>
				</Card>
			))}
		</div>
	);
};

export default DDTasks;
