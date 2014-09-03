# hash

主要对现有的jquery.hash.js这个小插件进行一定的封装，并添加对hash改变的监听。

### 添加hash

```javascript
hash.set('key', 'value');
```

### 获取hash

```javascript
hash.get('key');
```

### 删除hash

```javascript
hash.del('key');
```

### 添加hash监听

```javascript
// 同一个key添加多个监听
hash.listen('key', function(value) {
	// do something of the value
	console.log('my first listen of key: ' + value);
});

// 同一个key添加多个监听
hash.listen('name', function(value) {
	// do something of the value
	console.log('my second listen of key: ' + value);
});
```

### 添加hash全局监听

```javascript
hash.listen(function() {
	// do some common method
	console.log('hash change ...');
});
```
