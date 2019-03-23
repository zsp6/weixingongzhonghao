const express = require('express');
const wechat = require('wechat');
const app = express();
var config = {
  token: 'weixin',
  appid: 'wx855b2628bd5f1aa9',
  encodingAESKey: '6NLSIHW22EKyOYtTtFH6Jdsk0B8fnEwA14iagZ0YZmP',
  checkSignature: true, // 要不要验证签名 默认是true
}
app.use('/wechat', wechat(config, (req, res, next) => {
  console.log(req.weixin)
  // 微信输入信息都在req.weixin上
  let text = req.weixin;
  if(text.Content === 'hello'){
    // 回复
    res.reply('你好');
  } else if(text.Content === '我今天很开心') {
    res.reply('什么事呀？这么开心')
  } else if (text.Content === '哈哈'){
    res.reply({
      type: 'music',
      content: {
        title: '像我这样的男生',
        description: '沈煜伦',
        musicUrl:'https://www.kugou.com/song/#hash=8408A48D182D282D0D6B57F2B37BCF10&album_id=14469450'
      }
    })
  } else {
    res.reply([
      {
        picurl: 'https://img01.sogoucdn.com/app/a/100520021/FE215F6B426721FF231F79F02EE8B859'
      }
    ])
  }
}))

app.listen(80);
