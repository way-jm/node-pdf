const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

const {getChart} = require('./dataToChart')

const Mustache = require('mustache');

const convertHtmlToPDF = async (ctx)=>{
    const url = await getChart()
    fs.readFile('demo.mustache',function(err,data){
        const template= data.toString()
        const  rendered = Mustache.render(template, {
            name: 'Luke',
            rich:'<h1>this is <i style="color: blue">rich</i> text</h1>',
            // chart:'https://s3.bmp.ovh/imgs/2022/06/30/4143fa535837202b.png',
            chart:url,
        });
        // console.log(rendered)
        wkhtmltopdf(rendered, { pageSize: 'letter' })
            .pipe(fs.createWriteStream('out.pdf'));
    })
    // const html = `<h1 style="color:red">${value}<img src="https://s3.bmp.ovh/imgs/2022/06/30/4143fa535837202b.png"/></h1>`
    // wkhtmltopdf('https://www.baidu.com', { pageSize: 'letter' })
    //     .pipe(fs.createWriteStream('out.pdf'));
    ctx.body = {
        status:0
    };
}
module.exports ={
    convertHtmlToPDF
}
