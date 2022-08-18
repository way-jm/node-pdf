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
    const stream =  await wkhtmltopdf(rendered, { pageSize: 'letter'})
    ctx.body = stream;
    // const html = `<h1 style="color:red">${value}<img src="https://s3.bmp.ovh/imgs/2022/06/30/4143fa535837202b.png"/></h1>`
    // wkhtmltopdf('https://www.baidu.com', { pageSize: 'letter' })
    //     .pipe(fs.createWriteStream('out.pdf'));

}
module.exports ={
    convertHtmlToPDF
}
