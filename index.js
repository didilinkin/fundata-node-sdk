const fetch=  require('./lib/fetch')
class Dota {
    constructor(accept_apikey, api_secret) {
        this.accept_apikey = accept_apikey
        this.api_secret = api_secret
    }
    api(uri,params){

        return fetch(uri, params,this.accept_apikey,this.api_secret)
    }
}

module.exports = Dota