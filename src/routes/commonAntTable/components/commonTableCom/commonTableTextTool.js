export default function getTextWidth(text) {
        const canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        context.font = '14px Microsoft YaHei';
        let textmetrics = context.measureText(text);
        console.log(text);
        console.log(textmetrics.width);
        return textmetrics.width;
}
