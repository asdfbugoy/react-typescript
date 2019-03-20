const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('http');
const App = express();

const appPort = 3001;
const restBase = '/goapi/rest';

App.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.sendStatus(200);
    }
    else {
    //move on
      next();
    }
});

App.post( `${restBase}/v1/quote/questions`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	let responseBody = {};
	
	switch( reqBody.product ){
		case 'SD LAN':
			responseBody = require('./node_files/SD_questions.json');
			break;
		case 'MS Cloud':
			responseBody = require('./node_files/Cloud_questions.json');
			break;
		default:
			break;
	}
	// console.log('responseBody', responseBody);
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/recommend`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	let responseBody = require('./node_files/SD_recommend.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/content/product`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_packageContent.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/profile/boms`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_BOM.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/addons`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_addons.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/price/terms`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_terms.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/boms`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_quoteBOM.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/price/summary`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_priceSummary.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/price/planner`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/SD_quote_planner.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/search/customer`, (request, response ) => {
	const reqBody = request.body;
	let responseBody = require('./node_files/Customer_Query.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/search/customer/contact`, (request, response ) => {
	const reqBody = request.body;
	let responseBody = require('./node_files/Contact_Query.json');
	response.status(200).json(responseBody);
	// return null;
});

App.post( `${restBase}/v1/dashboard/list`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/Draft_Quote_list.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v1/quote/retrieve`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/Draft_Quote_detail.json');
	response.status(200).json(responseBody);
	// return null;
});

// special for MS Cloud

// get questions
App.post( `${restBase}/v2/GetQuestions`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	let responseBody = require('./node_files/Cloud_questions_v2.json');
	// console.log('responseBody', responseBody);
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v2/GetPackageOffer`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	let responseBody = {};
	// required body { "pid": "mscloud_vm" } or {"service":"MS-CLOUD-FBR"}
	switch( reqBody.service ){
		case 'MS-CLOUD-VM':
			responseBody = require('./node_files/Cloud_product_vm.json');
			break;
		case 'MS-CLOUD-FBR':
			responseBody = require('./node_files/Cloud_product_fabric.json');
			break;
		default:
			break;
	}
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v2/GetAddons`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	let responseBody = require('./node_files/Cloud_addons.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v2/GetPriceSummary`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	let responseBody = require('./node_files/Cloud_price_summary.json');
	response.status(200).json(responseBody);
	// return null;
});
App.post( `${restBase}/v2/SavePriceSummary`, bodyParser.json(), (request, response ) => {
	const reqBody = request.body;
	response.status(200).send('224673da-f1a7-4ecf-9d6c-e40439777a15');
	// return null;
});
App.post( `${restBase}/v2/GetContractDurations`, bodyParser.json(), (request, response ) => {
	// const reqBody = request.body;
	let responseBody = require('./node_files/Cloud_terms.json');
	response.status(200).json(responseBody);
	// return null;
});

App.post(`/GOAPI/rest/v2/cyber/sec/questions`, bodyParser.json(), (request, response) => {
	const data = require('./node_files/cyber-security/questions.json');
	response.status(200).json(data);
});

App.post(`/GOAPI/rest/v2/cyber/sec/recommendations`, bodyParser.json(), (request, response) => {
	const data = require('./node_files/cyber-security/recommendations.json');
	response.status(200).json(data);
});

App.post(`/GOAPI/rest/v2/cyber/sec/overview`, bodyParser.json(), (request, response) => {
	const data = require('./node_files/cyber-security/overview.json');
	response.status(200).json(data);
});

App.post(`/GOAPI/rest/v2/cyber/sec/contract/duration`, bodyParser.json(), (request, response) => {
	const data = require('./node_files/SD_terms.json');
	response.status(200).json(data);
});

App.post(`/GOAPI/rest/v2/cyber/sec/bom`, bodyParser.json(), (request, response) => {
	const data = require('./node_files/SD_quoteBOM.json');
	response.status(200).json(data);
});

App.post(`/GOAPI/rest/v2/cyber/sec/price/summary`, bodyParser.json(), (request, response) => {
	const data = require('./node_files/Cloud_price_summary.json');
	response.status(200).json(data);
});

App.listen(
	appPort, 
	() => console.log(`Sample REST APIs are listening on port ${appPort}`) 
);