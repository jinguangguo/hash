/**
 * @date 2014-09-02
 * @description hash.js
 */

(function($, window) {
	
	// 存储hash监听函数
	var handlerList = {
		'ALL': []
	};
	
	// 存储原有hash值
	var keyHistory = {};
	
	// 添加hash监听事件
	var pushHandler = function (key, handler) {
	    handlerList[key] = handlerList[key] || [];
	    keyHistory[key] = pub.get(key);
	
	    if (typeof handler === 'function') {
	        handlerList[key].push(handler);
	    }
	};
	
	// 触发hash改变时的方法
	var trigger = function (key, val) {
	    var i, len;
	    
	    for (i = 0, len = handlerList[key].length; i < len; i++) {
	        handlerList[key][i](val);
	    }
	};
	
	// 当hash变更时，触发的方法
	var fn = function (newhash) {
	    var key, val;
	    
	    // 遍历历史hash
	    for (key in keyHistory) {
	        if (keyHistory.hasOwnProperty(key)) {
	            val = pub.get(key);
	            
	            // 如果历史中的hash值与现有hash值不同，则触发对应监听事件
	            if (val !== keyHistory[key]) {
	                keyHistory[key] = val;
	                trigger(key, val);
	            }
	        }
	    }
	
	    trigger('ALL');
	};
	
	(function () {
	    var fnDelay = 100,
	        hash = window.location.hash;
	
	    //判断是否支持hashchange事件
	    if (typeof window.onhashchange === 'object' || typeof window.onhashchange === 'undefined') {
	        window.setInterval(function () {
	            var newhash = window.location.hash;
	            if (newhash !== hash) {
	                fn(newhash);
	                hash = newhash;
	            }
	        }, fnDelay);
	    } else {
	        window.onhashchange = fn;
	    }
	}());
	
	var pub = {
		
		// 删除hash
	    del: function (name) {
	        var p = this.get(name);
	        if (p && p !== '') {
	            this.set(name, null);
	        }
	    },
	    
	    // 获取hash
	    get: function (name) {
	        var result = $.hash(name);
	        
	        if (typeof result === 'string') {
	            result = window.decodeURIComponent(result);
	        }
	
	        return result;
	    },
	    
	    // 设置hash
	    set: function (name, value) {
	        if (typeof value === 'string') {
	            value = window.encodeURIComponent(value);
	        }
	
	        return $.hash(name, value);
	    },
	    
	    // 监听hash
	    listen: function (keys, handler) {
	        var keyArr = [];
	
	        if (typeof keys === 'function') {
	            keyArr.push('ALL');
	            handler = keys;
	        }
	
	        if (typeof keys === 'string') {
	            keyArr = keys.split(',');
	        }
	
	        keyArr.forEach(function (key) {
	            key = key.trim();
	            pushHandler(key, handler);
	        });
	    }
	};
	
	window.hash = pub;
})(jQuery, window);
