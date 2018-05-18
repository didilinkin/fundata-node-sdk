# FunData dota2 node SDK
## 安装
```
npm install fundata
```
## 用法
```javascript
const Dota = require('fundata')
let dota = new Dota('your_apikey', 'your_apisecret')
let uri='/data-service/dota2/pro/league/ti/rank-player'
let params = { limit: 15, page: 2 }
dota.api(uri,params).then((data) => {
    console.log(data)
})
```
### 具体api用法请参考[`FunData-VARENA`官方文档](http://open.varena.com/)。