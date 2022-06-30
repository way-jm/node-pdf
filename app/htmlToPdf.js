const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');


const convertHtmlToPDF = async (ctx)=>{
    wkhtmltopdf('http://www.baidu.com/', { pageSize: 'letter' })
        .pipe(fs.createWriteStream('out.pdf'));
    ctx.body = {
        status:0
    };
}
module.exports ={
    convertHtmlToPDF
}
