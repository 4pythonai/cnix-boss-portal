// import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import api from '@/api/api';
// import { JSONTree } from 'react-json-tree';

// const RedisLogViewer = forwardRef((props, ref) => {
//     const [logs, setLogs] = useState([]);
//     const pollIntervalRef = useRef(null);

//     const fetchLogs = async () => {
//         try {
//             let params = { data: {} };

//             const response = await api.redislog.getRedisLog(params);
//             const newLogs = response.logs || [];
//             setLogs((prevLogs) => {
//                 const combinedLogs = [...prevLogs, ...newLogs.map((log) => log)];
//                 // 只保留最新的100条记录
//                 return combinedLogs.slice(-100);
//             });
//         } catch (error) {
//             console.error('Error fetching logs:', error);
//         }
//     };

//     useEffect(() => {
//         // 立即获取日志
//         fetchLogs();

//         // 设置轮询间隔（每5秒）
//         pollIntervalRef.current = setInterval(fetchLogs, 1000);

//         // 清理函数
//         return () => {
//             if (pollIntervalRef.current) {
//                 clearInterval(pollIntervalRef.current);
//             }
//         };
//     }, []);

//     // 清理日志的方法
//     useImperativeHandle(ref, () => ({
//         clearLogs: () => {
//             setLogs([]);
//         }
//     }));

//     return (
//         <div
//             style={{
//                 border: '1px solid #8e8989',
//                 maxHeight: props.fullhight ? '1200px' : '600px',
//                 overflowY: 'auto',
//                 padding: '10px'
//             }}>
//             <h4>运行日志:</h4>
//             <div>
//                 {logs.map((logItem, index) => {
//                     const logItemObj = JSON.parse(logItem);
//                     let logText = logItemObj.text;
//                     let color = logItemObj.color;

//                     const timestamp = logText.slice(0, 19);
//                     const content = logText.slice(19).trim();
//                     let isJson;
//                     let parsedContent;
//                     try {
//                         parsedContent = JSON.parse(content);
//                         isJson = true;
//                     } catch (e) {
//                         console.log('不是json');
//                         console.log(e);
//                         isJson = false;
//                     }

//                     return (
//                         <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
//                             <div className="time" style={{ minWidth: '150px', marginRight: '4px' }}>
//                                 {timestamp}
//                             </div>

//                             {isJson ? (
//                                 <div style={{ width: '100%', height: '100%' }}>
//                                     <JSONTree style={{ width: '1000px' }} data={parsedContent} />
//                                 </div>
//                             ) : (
//                                 <div
//                                     style={{
//                                         color: color,
//                                         maxWidth: '1100px',
//                                         wordWrap: 'break-word',
//                                         overflowWrap: 'break-word'
//                                     }}>
//                                     <div dangerouslySetInnerHTML={{ __html: content }} />
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// });

// export default RedisLogViewer;
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import api from '@/api/api';

const RedisLogViewer = forwardRef((props, ref) => {
    const [logs, setLogs] = useState([]);
    const pollIntervalRef = useRef(null);
    const viewerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const fetchLogs = async () => {
        try {
            let params = { data: {} };
            const response = await api.redislog.getRedisLog(params);
            const newLogs = response.logs || [];
            setLogs((prevLogs) => {
                const combinedLogs = [...prevLogs, ...newLogs.map((log) => log)];
                return combinedLogs.slice(-1000);
            });
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1
            }
        );

        const currentRef = viewerRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            fetchLogs();
            pollIntervalRef.current = setInterval(fetchLogs, 1000);
        } else {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        }

        return () => {
            if (pollIntervalRef.current) {
                clearInterval(pollIntervalRef.current);
            }
        };
    }, [isVisible]);

    useImperativeHandle(ref, () => ({
        clearLogs: () => {
            setLogs([]);
        }
    }));

    return (
        <div
            ref={viewerRef}
            style={{
                border: '1px solid #8e8989',
                maxHeight: props.fullHeight ? '1200px' : '600px',
                overflowY: 'auto',
                padding: '10px'
            }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <h4>运行日志:</h4>
                <button
                    onClick={() => {
                        setLogs([]);
                    }}>
                    ClearLog
                </button>
            </div>

            <div>
                {logs.map((logItem, index) => {
                    const logItemObj = JSON.parse(logItem);
                    let logText = logItemObj.text;
                    let color = logItemObj.color;
                    let fontWeight = logItemObj.fontWeight;

                    const timestamp = logText.slice(0, 19);
                    const content = logText.slice(19).trim();

                    return (
                        <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                            <div className="time" style={{ minWidth: '150px', marginRight: '4px' }}>
                                {timestamp}
                            </div>
                            <div
                                style={{
                                    color: color,
                                    maxWidth: '1100px',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    fontWeight: fontWeight
                                }}>
                                <div dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default RedisLogViewer;
