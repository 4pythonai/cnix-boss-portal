import React from 'react';
import { Input } from 'antd'


export default class CabinetPowerQuantity extends React.Component {
    constructor(props) {

        super(props)
        
        console.log(props)
    }
    componentDidMount(){
        
    }

    render() {
        const json=[{loc:'酒仙桥',
            building:'111',
            floor:'222',
            room:'505A',
            amper:'13A',
            number:'3',
            powertype:'N+1'},{loc:'酒仙桥',
            building:'111',
            floor:'222',
            room:'505A',
            amper:'13A',
            number:'3',
            powertype:'N+1'}]
        // if(this.props.value.length!=undefined){
        //     var json=this.props.value
        //     this.props.onChange(json)
        // }else{
        //     var obj=this.props.value
        //     var datakey=Object.keys(obj)
        //     var json=[]
        //     for(var i=0;i<datakey.length;i++){
        //         json.push(obj[datakey[i]])
        //     }
        //     this.props.onChange(json)
        // }
        
        
        return (
            <div>
                {json.length!=undefined?
                    json.map((item,index)=>{
                        return <p key={item}>
                            所在IDC：{item.loc}；所在楼宇：{item.building}；所在楼层：{item.floor}；所在房间：{item.room}；规格：{item.amper}；数量：{item.number}；电源路数：{item.powertype}
                        </p>
                    // return <p>规格：{item[0]} 数量：{item[1]}（台） {item[2]?'电源路数：'+item[2]:''}</p>
                    }):null
                }
                
            </div>
        );
    }
}