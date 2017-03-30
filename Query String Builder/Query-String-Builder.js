var QueryStringMaker = function(url, queryKeys){
  this.url = url;
  this._query = [];
  this.required = [];
  this.defaults = [];
  var that = this;
  Object.keys(queryKeys)
        .forEach(function(key){
          that.prototype[key] = function(val){
            //vcheck
            //vtransform
            //ktransform
            //this.query.push[transformedKey] = checkedAndTransformedValue

            //if key.required this.required.push(key)
            //if value.default this.defaults[transformedKey] = checkedAndTransformedValue
          }
        })
}



QueryStringMaker.prototype.toString = function(){
  var query = this._query;
  //check if all required once are in the query
  //complement query with default values

  return this.url + '?' + Object.keys(this._query).map(function(k){k + '=' + query[k]}).join("&")};
}


googleAccount = new QueryStringMaker("https://accounts.google.com/o/oauth2/auth",
{ client_id: {
    value: {
      default:
      check:
      transform:
    }
    key: {
      required:
      transform:
    }
  }
}
check, keyMap)

googleAccount
  .client_id(`1084945748469-eg34imk572gdhu83gj5p0an9fut6urp5.apps.googleusercontent.com`)
  .redirect(`http://localhost/oauth2callback`)
  .scope(`https://www.googleapis.com/auth/youtube`)
  .response_type(`token`)

  `https://accounts.google.com/o/oauth2/auth?
  client_id=1084945748469-eg34imk572gdhu83gj5p0an9fut6urp5.apps.googleusercontent.com
  &redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback
  &scope=https://www.googleapis.com/auth/youtube
  &response_type=token`
