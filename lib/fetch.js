const axios = require('axios')
const md5 = require('js-md5')
const qs = require('qs')

axios.defaults.baseURL = 'http://api.varena.com'
axios.defaults.timeout = 5000

function randomWord(randomFlag, min, max) {
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1))
        str += arr[pos]
    }
    return str
}
function fetch(uri, params,accept_apikey,api_secret) {
    let accept_apinonce = randomWord(true, 5, 10)
    let api_time = Math.round(new Date() / 1000)
    let params_string = qs.stringify(params)
    let sign = md5(accept_apinonce + '|' + api_secret + '|' + api_time + '|' + uri + '|'+params_string).toUpperCase()
    let config={
        url: uri,
        params: params
    }
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Accept-ApiKey': accept_apikey,
                'Accept-ApiNonce': accept_apinonce,
                "Accept-ApiTime": api_time,
                'Accept-ApiSign': sign
            }
        });
        instance(config).then(res => {
           // console.log(res);
            resolve(res.data);
        }).catch(err => {
            console.log(err);
            reject(err);
        })
    });
}
//
module.exports = fetch