import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "antd";
import DDResSelector from "./DDResSelector";
import DDBillingSetter from "./DDBillingSetter";

const DDTasks = ({ maincode, contractno, area, operationRecords, processInstanceId, tasks, hideModal, refreshTasks }) => {
	const [inputValues, setInputValues] = useState({});
	const [openTaskId, setOpenTaskId] = useState(null);

	// Sort tasks by createTime,且只包含"BOSS占用"||"确认计费日期"类型的节点
	const sortedTasks = [...tasks].filter(task => task.activityName.includes('BOSS占用') || task.activityName.includes('确认计费日期')).sort(
		(a, b) => new Date(a.createTime) - new Date(b.createTime),
	);


	const handleOpenResSelector = (taskId) => {
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
						{task.result === "NONE" && (task.activityName.includes('BOSS占用')) && (
							<Col>
								<div style={{ display: "flex", gap: "8px" }}>
									<Button
										type="primary"
										onClick={() => handleOpenResSelector(openTaskId === task.taskId ? null : task.taskId)}
									>
										{openTaskId === task.taskId ? "关闭资源选择器" : "展示资源选择器"}
									</Button>
								</div>
								{openTaskId === task.taskId && (
									<div style={{ marginTop: "60px", border: "1px solid black", padding: "10px" }}>
										<DDResSelector
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
											refreshTasks={refreshTasks}
										/>
									</div>

								)}
							</Col>
						)}
						{task.result === "NONE" && (task.activityName.includes('确认计费日期')) && (
							<Col>
								<div style={{ display: "flex", gap: "8px" }}>
									<Button
										type="primary"
										onClick={() => handleOpenResSelector(openTaskId === task.taskId ? null : task.taskId)}
									>
										{openTaskId === task.taskId ? "关闭计费设置器" : "展示计费设置器"}
									</Button>
								</div>
								{openTaskId === task.taskId && (
									<DDBillingSetter
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
										refreshTasks={refreshTasks}
									/>
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
