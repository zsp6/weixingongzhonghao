const xml2js = require('xml2js');
/**
 * 将xml 转换成json
 * @param {xml} xml
 */
const xmlToJson = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) {
        console.log('转换失败');
        reject(err);
      } else {
        console.log('转换成功');
        resolve(result)
      }
    });
  })

}
/**
 * 将 json 转换成 xml
 * @param {json} json
 */
const jsonToXml = (json) => {
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(json);
  return xml;
}

module.exports = {
  xmlToJson,
  jsonToXml
}


// let xml = `
//     <xml>
//     <ToUserName><![CDATA[osEWD581oAx5pW33R58rCFZhMWm0]]></ToUserName>
//     <FromUserName><![CDATA[gh_4372c149734d]]></FromUserName>
//     <CreateTime>1553253299</CreateTime>
//     <MsgType><![CDATA[text]]></MsgType>
//     <Content><![CDATA[你好]]></Content>
//     </xml>
//     `
// async function main () {
//   var json = await xmlToJson(xml);
//   console.log(json);
// }
// main();






// 测试
// let xml = `
//     <xml>
//     <ToUserName><![CDATA[osEWD581oAx5pW33R58rCFZhMWm0]]></ToUserName>
//     <FromUserName><![CDATA[gh_4372c149734d]]></FromUserName>
//     <CreateTime>1553253299</CreateTime>
//     <MsgType><![CDATA[text]]></MsgType>
//     <Content><![CDATA[你好]]></Content>
//     </xml>
//     `
// // xmlToJson(xml);
// let json = { xml:
//   { ToUserName: [ 'osEWD581oAx5pW33R58rCFZhMWm0' ],
//     FromUserName: [ 'gh_4372c149734d' ],
//     CreateTime: [ '1553253299' ],
//     MsgType: [ 'text' ],
//     Content: [ '你好' ] } }

// console.log(jsonToXml(json));
