const express = require('express');
const app = express();
const {xmlToJson, jsonToXml} = require('./utils/index');
const sha1 = require('sha1');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.get('/', (res) => {
//   res.send('hello, nodejs');
// })
app.get('/wechat', (req, res) => {
  // 1.将token、timestamp、nonce上参数进行字典排序
  // console.log(req.query);
  // console.log('helloword');
  let signature = req.query.signature;
  let echostr = req.query.echostr;
  let timestamp = req.query.timestamp;
  let nonce = req.query.nonce;
  const TOKEN = 'weixin';
  let arr = [TOKEN, timestamp, nonce].sort();
  // 2.将三个参数字符创拼接成一个字符串进行sha1加密
  let str = arr.join('');
  let str2 = sha1(str); // 加密之后的字符串
  // 3、开发者获得加密后的字符串可与signature对比，如果相等，只需要返回 echostr 参数回去代表请求验证ok是来自微信的请求。否则失败，请随便返回一点东西就ok
  if (str2 === signature) {
    console.log('验证成功');
    res.send(echostr);
  } else {
    console.log('验证失败');
    res.send('error');
  }
})

app.post('/wechat', (req, res) => {
  // 如何得到发送过来的xml数据？
  let buf = '';
  req.on('data', (chunk) => {
    buf += chunk;
  })

  req.on('end', async () => {
    // console.log(buf);
    // 1. 解析接收到的xml的数据结构。（转JSON）xml2js模块
    // 创建一个 utils 文件夹。里面放置一个index.js 然后里面弄两个方法一个xmlToJson jsonToXml
    let json = await xmlToJson(buf)
    // console.log(json);
    // 2. 取出json中 发送者和接收者
    let ToUserName = json.xml['ToUserName'];
    let FromUserName = json.xml['FromUserName'];
    // console.log(ToUserName, FromUserName);
    // 3. 构建自己的xml结构
    let myJson = json;
    myJson.xml['ToUserName'] = FromUserName;
    myJson.xml['FromUserName'] = ToUserName;
    // 4. 将myJson 转成 xml
    res.send(jsonToXml(myJson));

    // let xml = `
    //   <xml>
    //   <ToUserName><![CDATA[osEWD581oAx5pW33R58rCFZhMWm0]]></ToUserName>
    //   <FromUserName><![CDATA[gh_4372c149734d]]></FromUserName>
    //   <CreateTime>1553253299</CreateTime>
    //   <MsgType><![CDATA[text]]></MsgType>
    //   <Content><![CDATA[你好]]></Content>
    //   </xml>
    // `
    // res.send(xml);
  })

  // req.on('end', async () => {
  //   // 1. 解析接受到的xml的数据结构。（转JSON）xml2js 模块
  //   // 创建一个 utils 文件夹， 里面放置一个index.js 然后里面弄两个方法一个 xmlToJson jsonToXml
  //   let json = await xmlToJson(buf);
  //   // console.log(json);
  //   // 2.取出json中 发送者和接受者
  //   let ToUserName = josn.xml['ToUserName'];
  //   let FromUserName = json.xml['FromUserName'];
  //   // 3. 构建自己的xml结构
  //   let myJson = json;
  //   myJson.xml['ToUserName'] = FromUserName;
  //   myJson.xml['FromUserName'] = ToUserName;
  //   // 4. 将 myJson 转成 xml
  //   res.send(jsonToxml(myJson));
  // })
})
app.listen(80);
