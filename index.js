/**
 * Simple script to fetch webhose content
 */
const https = require('https');
const fs = require('fs');
const querystring = require('querystring');
const options = {
  key: fs.readFileSync('./api_key').toString().trim(),
};

function urlBuilder(url, params){
	return url+'?token='+options.key+'&format=json&'+querystring.stringify(params);
}
const base_url = 'https://webhose.io/productFilter';
const product_url = urlBuilder(base_url, {q: 'name:iphone 6s'});

console.log("fetching "+product_url);
fetch(product_url);

function fetch(url, callback){
    https.get(url, (res) => {
      var body = '';
      res.on('end', () => {        
        var json = JSON.parse(body.toString());
	var products = json.products;
	products.forEach(function(prod){		
	    console.log(prod);
	});
      })
      .on('data', (chunk) => {
	console.log('Receiving ...');
        body += chunk;
      });
    }).on('error', (e) => {
      console.error(e);
    });
}
