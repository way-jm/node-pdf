const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

const {getChart} = require('./dataToChart')

const Mustache = require('mustache');

const convertHtmlToPDF = async (ctx)=>{
    const url = await getChart()
     const  data = await fs.readFileSync('demo.mustache')
    const template= data.toString()
    const  rendered = Mustache.render(template, {
        name: 'Luke',
        stooges: [
            { "name": "Moe" },
            { "name": "Larry" },
            { "name": "Curly" }
        ],
        rich:'<h1>this is <i style="color: blue">rich</i> text</h1>',
        // chart:'https://s3.bmp.ovh/imgs/2022/06/30/4143fa535837202b.png',
        chart:url,
    });
    // console.log(rendered)
    ctx.set('Content-Type', 'application/pdf');
    ctx.set("Access-Control-Allow-Origin", "*");
    const stream =  await wkhtmltopdf('http://news.baidu.com', { pageSize: 'letter'})
    // 对比pdf-lib
    ctx.body = stream;
    // wkhtmltopdf('<h1>demo</h1>', { pageSize: 'letter' })
    //     .pipe(fs.createWriteStream('out.pdf'));
    // ctx.body = {
    //     status:0
    // }

}
module.exports ={
    convertHtmlToPDF
}
