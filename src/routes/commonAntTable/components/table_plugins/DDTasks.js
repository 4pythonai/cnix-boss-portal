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

	const renderParentBossValue = (task) => {
		if (task._bossOpenValue?.saveId) {
			return <div style={{ marginBottom: '10px' }}>
				<div
					style={{
						padding: '10px 2px 10px 2px',
						border: "1px solid  black",
						clear: "left",
						display: "flex",
						gap: "8px",
					}}
				>
					<strong>前置处理结果:</strong><br />
					{task._bossOpenValue.formattedText}
				</div>
			</div>
		}
	}

	return (
		<div style={{ marginLeft: "15px" }}>
			{sortedTasks.map((task) => (
				<div key={task.activityId} style={{ border: '3px solid #343434', margin: '10px' }}>
					<Card
						key={task.taskId}
						style={{
							border: "1px solid #f0f0f0",
							marginTop: "10px",
						}}
					>
						<Row gutter={24} align="middle">
							<Col span={24}>
								{renderParentBossValue(task)}
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
									<br />		<br />
								</div>

							</Col>
							{task.result === "NONE" && (task.activityName.includes('BOSS占用')) && (
								<Col>
									<div style={{ clear: "left", display: "flex", gap: "8px" }}>
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
									<div style={{ clear: "left", display: "flex", gap: "8px" }}>
										<Button
											style={{ color: "green" }}
											onClick={() => handleOpenResSelector(openTaskId === task.taskId ? null : task.taskId)}
										>
											{openTaskId === task.taskId ? "关闭计费设置器" : "展示计费设置器"}
										</Button>
									</div>
									{openTaskId === task.taskId && (

										<div>
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
												refreshTasks={refreshTasks}
												_bossOpenValue={task._bossOpenValue}
											/>
										</div>
									)}
								</Col>
							)}
						</Row>
					</Card>

				</div>
			))}
		</div>
	);
};

export default DDTasks;
