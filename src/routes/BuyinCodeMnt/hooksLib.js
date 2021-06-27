import { useState } from 'react';
var moment = require('moment');
export function useFormFields(initialState) {
    const [fields, setValues] = useState(initialState);
    const isObject = (obj) => {
        return obj != null && obj.constructor.name === 'Object';
    };

    const check_val_type = (val) => {
        if (val instanceof moment) {
            console.log('HOOK val', val, 'type is 时间');
            const cdate = moment(val).format('YYYY-MM-DD');
            return cdate;
        }

        if (val.constructor.name === 'SyntheticEvent') {
            console.log('HOOK val', val, 'type is 合成事件 SyntheticEvent');
            console.log(val.target.id, val.target.value);
            return val.target.value;
        }

        if (!isObject(val)) {
            return val;
        }
    };

    return [
        fields,
        (id, val, domid) => {
            console.log('参数 ', {
                id: id,
                val: val,
                domid: domid
            });
            let realval, realid;
            if (id.constructor.name === 'SyntheticEvent') {
                realid = event.target.id;
                realval = event.target.value;
            } else {
                realval = check_val_type(val);
                realid = id;
            }
            console.log({ 真实ID: realid, 实际值: realval });
            setValues({
                ...fields,
                [realid]: realval
            });
        }
    ];
}
