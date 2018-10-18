
var Cache = {
    setItem(key,value){
        if(typeof plus != "undefined"){
            plus.storage.setItem(key,this._setBefore(value));
        } else {
            window.localStorage.setItem(key,this._setBefore(value))
        }
    },
    getItem(key){
        if(typeof plus != "undefined"){
            return this._getAfter(plus.storage.getItem(key));
        } else {
            return this._getAfter(window.localStorage.getItem(key));
        }
    },
    //获取之后，再转化为相应类型
    _getAfter(op) {
        op = JSON.parse(op)
        let cs = {
            _string: function (val) {
                return val
            },
            _number: function (val) {
                return +val
            },
            _boolean: function (val) {
                return val === 'true'
            },
            _undefined: function (val) {
                return undefined
            },
            _object: function (val) {
                return JSON.parse(val)
            },
            _function: function (val) {
                return eval('(' + val + ')')
            },
            _array: function (val) {
                return JSON.parse(val)
            },
            _date: function (val) {
                return new Date(val)
            },
            _regexp: function (val) {
                return new RegExp(val)
            },
            _null: function (val) {
                return null
            }
        }
        return cs[op.type](op.value)
    },
    //保存之前，先转化为字符串
    _setBefore(obj = null) {
        let type = '_' + Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

        return function (v, t) {
            var sz = {
                _string: function (val) {
                    return val
                },
                _number: function (val) {
                    return val
                },
                _boolean: function (val) {
                    return val ? 'true' : 'false'
                },
                _undefined: function (val) {
                    return 'undefined'
                },
                _object: function (val) {
                    return JSON.stringify(val)
                },
                _function: function (val) {
                    return val.toString()
                },
                _array: function (val) {
                    return JSON.stringify(val)
                },
                _date: function (val) {
                    return val.getTime()
                },
                _regexp: function (val) {

                    return val.toString().replace(/[(^\/)|($\/)]/g, '')
                },
                _null: function (val) {
                    return 'null'
                }
            }
            return JSON.stringify({
                type: type,
                value: sz[t](v)
            })
        } (obj, type)
    }
}

module.exports = Cache