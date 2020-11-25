import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


import {Divider} from 'antd';
import {Timeline,Icon} from 'antd';
import {Modal,Descriptions,message,InputNumber,Table,Radio,Checkbox,Slider,Row,Col,Input,Button} from 'antd';

import "./401.css";


export default class custportal extends React.Component {

    funnouse = () => {
        // 2019-04-09  09:09-10:06  84元   滴滴          公司-格林小镇 
        // ??? -10:59   14元   路边出租      
        // 11:14-11:28  15     滴滴         亦庄工行(亦庄隆盛大厦)  -税务局
        // 11:38          
    }


    saveAs = (uri,filename) => {

        var link = document.createElement('a');

        if(typeof link.download === 'string') {

            link.href = uri;
            link.download = filename;

            //Firefox requires the link to be in the body
            document.body.appendChild(link);

            //simulate click
            link.click();

            //remove the link when done
            document.body.removeChild(link);

        } else {
            window.open(uri);
        }
    }



    downloadpdf = () => {
        html2canvas(this.refs.pdf,{scale: 1}).then(canvas => {


            // var wid: number
            // var hgt: number
            // var img = canvas.toDataURL("image/png", wid = canvas.width, hgt = canvas.height);
            // var hratio = hgt/wid
            // var doc = new jsPDF('p','pt','a4');
            // var width = doc.internal.pageSize.width;    
            // var height = width * hratio
            // doc.addImage(img,'JPEG',20,20, width, height);
            // doc.save('Test.pdf');


            this.saveAs(canvas.toDataURL(),'file-name.png');
            //返回图片dataURL，参数：图片格式和清晰度(0-1)
            // let imgData = canvas.toDataURL('image/jpeg',1.0);


            //  let pdf = new jsPDF('p','pt','a2');

            //   const imgProps= pdf.getImageProperties(imgData);
            //   const pdfWidth = pdf.internal.pageSize.getWidth();
            //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            // //   const pdfHeight=400;
            //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            //   pdf.save('download.pdf');

            // let dims = {
            //     a2: [1190.55,1683.78],
            //     a3: [841.89,1190.55],
            //     a4: [595.28,841.89]
            // }
            // //方向默认竖直，尺寸ponits，格式a2
            // let pdf = new jsPDF('p','pt','a2');

            // let a4Width = dims['a2'][0];
            // let a4Height = dims['a2'][1];

            // let contentWidth = canvas.width,
            //     contentHeight = canvas.height;

            // let pageHeight = contentWidth / a4Width * a4Height;
            // let leftHeight = contentHeight;
            // let position = 0;
            // let imgWidth = a4Width,
            //     imgHeight = a4Width / contentWidth * contentHeight;
            //  if(leftHeight < pageHeight) {
            //     //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
            //     pdf.addImage(pageData,'JPEG',0,0,imgWidth,imgHeight);
            // } else {
            //     while(leftHeight > 0) {
            //         pdf.addImage(pageData,'JPEG',0,position,imgWidth,imgHeight);
            //         leftHeight -= pageHeight;
            //         position -= a4Height;

            //         if(leftHeight > 0) {
            //             pdf.addPage();
            //         }
            //     }
            // }

            // pdf.save("qw.pdf");


        });

    }


    render() {
        return (


            <div style={{margin: '100px'}}>

                <div>
                    <Button type="primary" onClick={this.downloadpdf}>下载PDF</Button>
                </div>

                <div class="pdfwrapper" ref="pdf">

                    <h3>时间线:</h3>
                    <Divider />



                    <Timeline mode={'left'}>

                        <Timeline.Item ><div>2020-08-25 晚上</div>
                           手机短信秦文女士,"合同的事儿我也很吃惊,我都搞不清发生了啥,咱们这两天<br />
                           找个时间好好聊聊,看什么妥善处理,微信不要把我拉黑,有什么事情咱们好好聊聊,<br />
                           毕业证和户口本您能给我不,懒得再办" <br />
                           无回应 <br /><br /><br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2020-08-25 晚上</div>
                           秦文打电话给我,问"你打那些合同干嘛呀?" ,
                           感觉她在录音,然后秦文继续说"我现在在外面,过两天找你",
                           后续微信被拉黑.
                            <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2020-08-25 下午</div>
                           秦文直接到本人公司,并发微信"拿车钥匙"到以前我和她以及另外一位朋友的聊天群,
                           ,本人因市内外出,路上回让"她等",<br />
                           期间秦私自翻动电脑包,并尝试进入笔记本(输入密码),后发现合同,拍照,
                           翻动笔记本包,发现车钥匙,然后起身打电话,把钥匙放回包内,离开,
                           当我回来后,我在公司楼下咖啡馆给秦打电话和微信语音,均无反馈,
                           此时她应该正在翻动我的东西,有公司监控视频,后秦匆匆离开.

                           <br />
                             <br /><br /><br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2020-08-24 下午</div>
                           秦文继续到公司要"谈谈",因为本人已经知道"合同"之事,因此谈话有录音<br />
                           其中本人明确提出过"让你住在我的房子里",并明确提出"把房子卖掉,
                           商量下怎么分钱,好聚好散",秦文均顾左右而言它.
                           <br />
                            <br /><br /><br /><br /><br />
                        </Timeline.Item>





                        <Timeline.Item ><div>2020-08-17</div> 第一次发现房屋已被"出售"给秦树人(秦文弟弟),
                    本人与秦树人先生并不熟悉,互相无微信号,通讯录无电话号码,从无直接通话记录,从无短信记录,
                    从无单独见面过,见面次数不应该超过10次.  <br /><br /><br /><br /><br />
                        </Timeline.Item>





                        <Timeline.Item ><div>2020-07-25</div> 回亦庄拿毕业证准备换工作,发现门锁被换,发短信问秦文"门锁换了?",无回应,打电话不接. <br /><br /><br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2020-07-18</div> 继续来公司要和我"谈谈" ,谈话非常扰人,车轱辘话来回说,
                    重点: <ul>
                                <li> 秦:"我一直给你留着余地呢,",本人认为是她到处宣扬隐私,因此本人回应:"我建议您找洪X,他人头最熟,
                    而且嘴巴大,很快天下皆知",秦回以冷笑.</li>

                                <li> 秦:"你不说辞职吗? 还呆着干嘛呀"
                        </li>
                                <li> 秦找我直接领导希望把我辞退, 领导回应:"他要走我肯定不拦着,但我不能因为私人事务就辞掉他"
                        </li>


                            </ul>


                            <br /><br /><br /><br /><br />
                        </Timeline.Item>

                        <Timeline.Item ><div>2020-07-??</div> 大概下午4:30,秦文来公司要和我"谈谈",本人因约人谈软件开发项目,直接打车去东直门派出所.  <br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2020-07-18</div>秦文来公司质问我"为什么要杀她?",我对酒醉事情确实无记忆.
                         我个人毫无记忆.
                          <br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2020-07-16</div> 继续到公司找我"谈谈", 因为怕打扰同事工作,
                        在公司楼下咖啡馆大概谈了一会,期间我提到我以前还买了"比特币",秦文女士态度变得很和善,
                        为了能早点回去,同意了她一起吃饭的要求,期间本人饮酒,中间发生的事情记得不是特别清楚,
                        可能因为她一直要求我当天晚上回亦庄,导致发送口角,大概凌晨秦文报警,我从派出所想法独自离开,
                        离开时间大概凌晨4点.
                        
                        <br />
                        <br />
                        
                        
                        
                        <br /><br />
                        </Timeline.Item>








                        <Timeline.Item ><div>2020-07-15</div> 期间以"拿回车钥匙"为由,数次来公司要和我"谈谈",并问我"什么时候辞职", 
                        本人因为她前期不给我身份证,导致我出差非常麻烦,因此说"你把车锁换了呗,我车钥匙找不到了." <br /><br />
                        </Timeline.Item>





                        <Timeline.Item ><div>2020-07-02</div> 来公司要和我"谈谈",持续12小时,从下午4点到凌晨4点,因为第二天要开会,打110去东直门派出所,  <br /><br />
                    在派出所警察了解详情,本人陈述:"无婚姻关系,她住在我买的房子里,我都出来自己租房了,我只想把手上的项目干完,我真不知道她折腾啥",
                    警察让我们"好好聊聊",秦文表示还要聊"2个小时".
                   </Timeline.Item>





                        <Timeline.Item ><div>2020-06-XX</div> 来公司和我"谈谈",故意大声喧哗,试图让我离职 <br /><br />
                        </Timeline.Item>

                        <Timeline.Item ><div>2020-06-XX</div> 来公司和我谈谈,故意大声喧哗,试图让我离职 <br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2020-05-XX</div> 来公司和我谈谈,故意大声喧哗,试图让我离职 <br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2020-05-25</div> 找共同朋友来公司找我"谈话",试图让我搬回去.<br /><br /><br />
                        </Timeline.Item>

                        <Timeline.Item ><div>2019-07-??</div> 秦文用备用车钥匙将本田雅阁汽车开走,我停放于公司停车场,但我仍然有一套车钥匙. <br /><br /><br /><br /><br />
                        </Timeline.Item>




                        <Timeline.Item ><div>2019-06-13</div> 不堪其扰,租房于公司附近 <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2019-06-09</div> 秦文服用多枚"褪黑素",本人无奈被迫打两次120, 第二次送亦庄协和医院洗胃 <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2019-06-06</div> 秦文打印两种文件(房屋无偿赠予, 200万元现金欠款),让我签字,不让我上班,
                    因为当天上位我要面试新员工,本人摔坏自己的电脑显示屏方脱身 <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2019-04-21</div> 因 {'<<北京融金云投资有限公司>>'}经营困难,本人要求朋友尽快支付 软件开放项目款项,并立刻微信转账给秦文.   <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div class="big" >2019-04-09</div> 打电话让我去亦庄办理银行抵押贷款手续,实际去了不动产大厅. <br /><br /><br /><br /><br />
                        </Timeline.Item>
                        
                        <Timeline.Item ><div class="big" >2019-03-28</div> 秦文让我陪去融金云的股东会议,"田总"一直答应会融资,成为大股东.   <br /><br /><br /><br /><br />
                        </Timeline.Item>
                        
                         

                        <Timeline.Item ><div>2019-03-??</div> 打电话让我去工商银行亦庄分行,签了文件,具体内容不记得.时间为下午,有小雨.  <br /><br /><br /><br /><br />
                        </Timeline.Item>





                        <Timeline.Item ><div class="big" >2019-03-??</div> 秦文开车带我去黄村办理房产证,房产证一直由秦文保存.  <br /><br />
                      记忆中一共去过两次,第一次是因为建行周六/周日建行没有上班<br /><br /><br />
                        </Timeline.Item>





                        <Timeline.Item ><div>2019-03-18</div> 秦文提议由我作为法人去建设银行知春路支行进行企业贷款, 当天我先去建行等着,
                        秦文和秦丹到后,我在建行二楼进行了贷款面谈,秦丹做陪,秦文未上去,在附近等待.后应该未成功.<br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2019-03-07</div> 北京融金云投资有限公司经营异常.<br /><br /><br /><br /><br />
                        </Timeline.Item>




                        <Timeline.Item ><div>2019-02-25</div> 秦文将  {'<<北京采灵科技有限公司>>'}法人变更为唐<br /><br /><br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2019-02-20</div> 秦文与员工秦丹打电话约本人去大望路"七月南风"酒吧,签了很多文件,
                        具体内容忘记,由于当时她们带的空白纸张不够,本人还去附件的"美丽印图文"购买了一包空白打印纸.
                        主题应该是准备替融金云做银行贷款事宜, 并在大概5张空白纸上签名. 时间是大概下午3点左右,本人
                        从公司打车去,后本人离开回公司加班.

                    <br /><br /><br /><br /><br />
                        </Timeline.Item>




                        <Timeline.Item ><div>2017????-00-00</div> 因{'<<北京融金云投资有限公司>>'} 经营困难,建设银行贷款逾期,员工工资支付困难  <br /><br /><br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div class="big">2017-12-07</div>
                     P2P网贷风险专项整治工作领导小组办公室向各地P2P整治联合工作办公室下发了 <br />
                    《关于做好P2P网络借贷风险专项整治整改验收工作的通知》（57号文）
                     秦文多次向本人抱怨:"股东不齐心,我是法人,连退都退不了"
                    </Timeline.Item>



                        <Timeline.Item ><div>2017</div> 秦文贷款购买河北固安孔雀城别墅,本人后期给予多次装修款与贷款,有微信转账记录 <br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2017-07</div> 秦文投资 {'<<苏州六壶茶企业管理中心>>'} <br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2016-07</div> 秦文参与  {'<<北京尚鼎轩餐饮有限公司>>'} <br /><br /><br /><br /><br />
                        </Timeline.Item>

                        <Timeline.Item ><div>2016-03</div> 秦文参与  {'<<江苏薇甘菊电子商务有限公司>>'} 监事 <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item ><div>2015-07</div> 秦文参与  {'<<北京融金云投资有限公司>>'} 监事,后期经验困难,本人多次给予微信转账资金支持 <br /><br /><br /><br /><br />
                        </Timeline.Item>



                        <Timeline.Item ><div>2013-08 </div> 秦文参与  {'<<北京漫云科技有限公司>>'},任法人 <br /><br /><br /><br /><br />
                        </Timeline.Item>


                        <Timeline.Item><div>2006-10</div> 本人(唐)从中国网通(现中国联通)离职</Timeline.Item>


                        <Timeline.Item><div>2006-04</div> 秦文女士牵头成立 {'<<中泰医药网络科技发展有限公司>>'} <br />
                        秦文因"我(秦)还在网通工作不合适担任法人",由本人担任法人.<br />
                        但实际业务沟通,洽谈都由秦文牵头,
                        本人只负责感兴趣的技术工作,包括网站建立等.
                    </Timeline.Item>


                        <Timeline.Item><div>2005-XX-YY</div> 秦文要开办公司,向本人借款约12万开设公司,只有口头约定,
                    "回头有钱还你"-(秦) <br />
                    "借啥借,你拿着用就是了"-(唐) <br />
                        </Timeline.Item>

                        <Timeline.Item><div>2005-11-30</div> 秦文拟与MBA同学建立做企业通信服务的公司,成立 {'<<北京采灵科技有限公司>>'}
                      本人只负责感兴趣的技术支持工作.
                    </Timeline.Item>

                        <Timeline.Item><div>2003-4</div> 因公司从金融街搬至亦庄,独立贷款购买住房</Timeline.Item>

                        <Timeline.Item><div>2002-10</div> 去过秦文在亚运村的房子,该房屋应为她在广州公司的老总赠予,
                    后期应该办理了过户手续.  </Timeline.Item>

                        <Timeline.Item><div>2002-7</div> 与秦女士相识</Timeline.Item>
                        <Timeline.Item><div>1999-09</div> 加入中国网通(现中国联通)</Timeline.Item>
                    </Timeline>


                </div>
            </div>

        )
    }
}