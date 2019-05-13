# forza_vs

## Project setup

```
npm install
npm install --save vue-resource
npm install --save vue-router
npm install --save vuex
npm install --save axios
npm install --save emailjs-com
npm install --save-dev node-sass sass-loader
npm i vue bootstrap-vue bootstrap
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm install -g firebase-tools
npm run build
firebase login
firebase deploy

```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### JSON structure

```
games:{
	gameId:0.1
	gameId2:0.1
}
gameId:{
	"cars":[{
		"acceleration":5.6
		"braking":5.4,
		"class":"C",
		"handling":5.8,	
		"id":3,
		"launch":6.9,
		"manufacturer":"Acura",
		"name":"Acura Integra Type-R",
		"pi":596,
		"rarity":"Common",
		"speed":6.3,
		"type":"Retro hot hatch",
		"value":"CR 25,000",
		"vehicle": "Integra Type-R",
		"year":2001
	}],
	"manufacturers":["Acura"],
	"metadata":{
	"id":"gameId",
	"version":0.1
	}
	"types":["Retro hot hatch"]
}
gameId2:{
	...
}
```
