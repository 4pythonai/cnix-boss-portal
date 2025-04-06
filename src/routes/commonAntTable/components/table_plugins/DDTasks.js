import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "antd";
import DDOpen from "./DDOpen";

const DDTasks = ({ maincode, contractno, area, operationRecords, processInstanceId, tasks, hideModal }) => {
	const [inputValues, setInputValues] = useState({});
	const [openTaskId, setOpenTaskId] = useState(null);

	// Sort tasks by createTime
	const sortedTasks = [...tasks].sort(
		(a, b) => new Date(a.createTime) - new Date(b.createTime),
	);


	const handleOpenArea = (taskId) => {
		setOpenTaskId(taskId);
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
							<Col>
								<div style={{ display: "flex", gap: "8px" }}>
									<Button
										type="primary"
										onClick={() => handleOpenArea(openTaskId === task.taskId ? null : task.taskId)}
									>
										{openTaskId === task.taskId ? "关闭资源选择器" : "展示资源选择器"}
									</Button>
								</div>
								{openTaskId === task.taskId && (
									<div style={{ marginTop: "60px", border: "1px solid black", padding: "10px" }}>
										<DDOpen
											maincode={maincode}
											contractno={contractno}
											area={area}
											processInstanceId={processInstanceId}
											activityId={task.activityId}
											taskId={task.taskId}
											remark={inputValues[task.taskId]}
											result="agree"
											actionerUserId={JSON.parse(sessionStorage.getItem("userInfo")).ddUserid}
											hideModal={hideModal}
										/>
									</div>

								)}
							</Col>
						)}
					</Row>
				</Card>
			))}
		</div>
	);
};

export default DDTasks;
