const {PDFDocument, StandardFonts, rgb} = require('pdf-lib')
const fs = require('fs');
const echarts = require("echarts");
const { createCanvas } = require("canvas");
const generatePDF = async (ctx)=>{
    const pdfDoc = await PDFDocument.create()
    // Embed the Times Roman font
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    // Add a blank page to the document
    // const page = pdfDoc.addPage()

    // Get the width and height of the page

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

    const png = canvas.toBuffer("image/png")
    const pngImage = await pdfDoc.embedPng(png)

    const pngDims = pngImage.scale(0.5)

    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()

    page.drawImage(pngImage, {
        x: page.getWidth() / 2 - pngDims.width / 2 + 75,
        y: page.getHeight() / 2 - pngDims.height + 250,
        width: pngDims.width,
        height: pngDims.height,
    })

    // // Draw a string of text toward the top of the page
    const fontSize = 30
    page.drawText('HLI PDF export TEST!', {
        x: 5,
        y: height -  fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
    })

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('test.pdf', pdfBytes);
    ctx.body = {
        status:0
    };
}
module.exports ={
    generatePDF
}
