const express = require("express");
const morgan = require('morgan');   // 打印请求日志
const cors = require('cors');
const router = require("./router");
const errorHandler = require('./middleware/error-handler');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// 设置打开的端口号
const PORT = process.env.PORT || 3001;

app.use('/api', router);

// 挂载统一处理服务端错误中间件
app.use(errorHandler());

app.listen(PORT,() => {
    console.log(`${PORT} is running...`);
})