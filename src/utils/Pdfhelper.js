import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function downloadpdf(domnode, filenme) {
    html2canvas(domnode, { scale: 2 }).then((canvas) => {
        // 返回图片dataURL，参数：图片格式和清晰度(0-1)
        const pageData = canvas.toDataURL('image/jpeg', 1.0);

        const dims = {
            a2: [1190.55, 1683.78],
            a3: [841.89, 1190.55],
            a4: [595.28, 841.89]
        };

        const pdf = new jsPDF('l', 'pt', 'a4');

        // pdf.autoTable({
        //     margin: { top: 150, left: 20, bottom: 30 }
        // });

        const a4Width = dims.a4[0];
        const a4Height = dims.a4[1];

        const contentWidth = canvas.width,
            contentHeight = canvas.height;

        const pageHeight = (contentWidth / a4Width) * a4Height;
        let leftHeight = contentHeight;
        let position = 0;
        const imgWidth = a4Width,
            imgHeight = (a4Width / contentWidth) * contentHeight;

        if (leftHeight < pageHeight) {
            // addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        } else {
            while (leftHeight > 0) {
                pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= a4Height;

                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
        }

        pdf.save(filenme);
    });
}
