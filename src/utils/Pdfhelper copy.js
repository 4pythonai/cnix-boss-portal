import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function downloadpdf(domnode, filenme) {
    html2canvas(domnode, { scale: 2 }).then((canvas) => {
        // 返回图片dataURL，参数：图片格式和清晰度(0-1)
        // const pageData = canvas.toDataURL('image/jpeg', 1.0);

        // const dims = { a4: [595.28, 841.89] };

        // const pdf = new jsPDF('l', 'pt', 'a4');

        // const a4Width = dims.a4[0];
        // const a4Height = dims.a4[1];

        // const contentWidth = canvas.width,
        //     contentHeight = canvas.height;

        // const pageHeight = (contentWidth / a4Width) * a4Height;
        // let leftHeight = contentHeight;
        // let position = 0;
        // const imgWidth = a4Width,
        //     imgHeight = (a4Width / contentWidth) * contentHeight;

        // if (leftHeight < pageHeight) {
        //     // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
        //     pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        // } else {
        //     while (leftHeight > 0) {
        //         pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
        //         leftHeight -= pageHeight;
        //         position -= a4Height;

        //         if (leftHeight > 0) {
        //             pdf.addPage();
        //         }
        //     }
        // }

        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 592.28) * 841.89;
        //未生成pdf的html页面高度
        var leftHeight = contentHeight;
        //页面偏移
        var position = 0;
        //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
        var imgWidth = 595.28;
        var imgHeight = (592.28 / contentWidth) * contentHeight;

        var pageData = canvas.toDataURL('image/jpeg', 1.0);

        var pdf = new jsPDF('', 'pt', 'a4');

        //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
        //当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                //避免添加空白页
                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }

        pdf.save(filenme);
    });
}
