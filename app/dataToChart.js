const echarts = require("echarts");
const { createCanvas } = require("canvas");
const getChart = async (ctx)=>{
    const canvas = createCanvas(400, 300);
    const chart = echarts.init(canvas);
    chart.setOption({
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
            type: "value"
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: "bar"
            }
        ]
    });
    // const png = canvas.toBuffer("image/png")
    // console.log(canvas.toDataURL())
    return canvas.toDataURL();
    // const pngImage = await pdfDoc.embedPng(png)

}
module.exports ={
    getChart
}
