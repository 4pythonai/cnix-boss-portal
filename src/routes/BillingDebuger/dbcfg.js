import React, { useState, useEffect } from 'react';
import api from '@/api/api';

const DatabaseConfig = () => {
    const [config, setConfig] = useState({ database: '', hostname: '', username: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const httpobj = await api.curd.getEnv();
            console.log('返回的结果', httpobj);
            setConfig(httpobj);
        }
        fetchData();
        // setConfig(httpobj);
    }, []);

    return (
        <div style={{ margin: '30px' }}>
            <h1>Database Configuration</h1>
            <p>
                <strong>Database:</strong> {config.database}
            </p>
            <p>
                <strong>Hostname:</strong> {config.hostname}
            </p>
            <p>
                <strong>Username:</strong> {config.username}
            </p>
        </div>
    );
};

export default DatabaseConfig;
