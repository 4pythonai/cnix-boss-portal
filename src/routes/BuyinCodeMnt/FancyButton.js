import React, { useState, useEffect } from 'react';
import { Select, DatePicker, message, Button, Input, Table } from 'antd';
import { observer } from 'mobx-react';
import 'antd/dist/antd.css';

const FancyButton2 = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}xxx
    </button>
));

export default FancyButton;

function FancyButton(props) {
    return (
        <div style={{ backgroundColor: '#F2F3F4', width: '845px', margin: '10px' }}>
            <FancyButton2 />
        </div>
    );
}
