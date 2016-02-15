//var colorizer = require('colorizer').create('Colorizer');

// Initial Declarations
var links = [],
    descs = [],
    urls = [], 
    yahooLinks = [],
    yahooUrls = [];

var yahoo = {
    textSelect: '.w h3 a',
    urlSelect: '.w span.u'
}

// Create Casper Instance
var casper = require('casper').create();

// Function to retrieve HTML from a given selector
function getInnerHtml( selector ) {
    var links = document.querySelectorAll(selector);
    
    return Array.prototype.map.call(links, function(e) {
        return e.innerHTML;
    });
}

// Open Google.co.jp
casper.start('http://google.co.jp/', function() {
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', { q: 'サーブコープ' }, true);
});

casper.then(function() {
    // aggregate results for the 'casperjs' search
    casper.waitForSelector('li.ads-ad h3 a', function(){
        links = this.evaluate(getInnerHtml, 'li.ads-ad h3 a:last-child');
        urls = this.evaluate(getInnerHtml, 'li.ads-ad cite');
    });
    
});

casper.thenOpen('http://yahoo.co.jp/').then( function() {
    this.fill('form[name="sf1"]', { p: 'サーブコープ' }, true);
});

casper.then(function(){
    this.waitForSelector(yahoo.textSelect, function(){
        yahooLinks = this.evaluate(getInnerHtml, yahoo.textSelect);
        yahooUrls = this.evaluate(getInnerHtml, yahoo.urlSelect)
    })
})

// Post to results to console
casper.run(function() {
    // echo results in some pretty fashion
    this.echo('Google Top 3:', 'ERROR');
    for(var i = 0; i<3 ; i++){
        this.echo(i + 1 + '. ' + links[i].replace(/<.>|<\/.>/g, ''), 'INFO');
        this.echo(urls[i].replace(/<.>|<\/.>/g, ''));
    }
    
    this.echo('\n');

    this.echo('Yahoo Top 3:', 'ERROR');
    for(var i = 0; i<3 ; i++){
        this.echo(i + 1 + '. ' + yahooLinks[i].replace(/<.>|<\/.>/g, ''), 'INFO');
        this.echo(yahooUrls[i].replace(/<.>|<\/.>/g, ''));
    }
    this.exit();
});



