const koa = require('koa');
const Router = require('koa-router')
const {generatePDF} = require("./pdf");
const {convertHtmlToPDF} = require("./htmlToPdf");

const app = new koa();
const router  = new Router()

router.get('/pdf',generatePDF)
router.get('/html',convertHtmlToPDF)
app.use(router.routes())

app.listen(3000);
