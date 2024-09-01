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
