var urls = ['http://virtualoffice.servcorp.co.jp', 'http://virtualoffice.servcorp.co.jp/en', 'http://virtualoffice.servcorp.co.jp/osaka', 'http://virtualoffice.servcorp.co.jp/osaka/en'];
var mainUrls = ['http://www.servcorp.co.jp/ja/contact-us'];
var localUrls = ['http://www.rentaloffice-tokyo.jp/contact_tokyo'];

function startFormVoPage(url) {
	casper.echo('Opening ' + url);
	casper.click('.btn a');
	casper.echo('Waiting for box...');
	casper.wait(1000, function(){
		casper.echo('Proceeding to form...');
	});
}

function fillFormVoPage() {
		casper.waitForSelector('input.form-control', function(){

		casper.fill('form[method="post"]', {
			name_: 'test',
			email_: 'test@test.com',
			phone_: '08012341234',
			comments_: 'This is a test.'
		}, false);

		casper.click('.button a#button_');
		casper.wait(1000, function(){
			casper.echo('Finishing up...');
		});	
	});
}

//Create instance
var casper = require('casper').create();

//Testing JA VO
casper.start(urls[0], function(){
	startFormVoPage(urls[0]);
});

casper.then(function(){
	fillFormVoPage();
});

//Testing EN VO
casper.thenOpen(urls[1], function(){
	startFormVoPage(urls[1]);
})

casper.then(function(){
	fillFormVoPage();
})

// Testing JA Main Contact us
casper.thenOpen(mainUrls[0], function(){
	casper.echo('Testing ' + mainUrls[0]);
});

casper.then(function(){
	casper.fill('form[method="post"]', {
		'Product': 'Office',
		'Country': 'JP',
		'Salutation':'Mr.',
		'Firstname':'test',
		'Surname':'test',
		'Email':'test@a.com',
		'Phone':'08012341234'
	}, false);
	
	casper.echo('Waiting for AJAX...');
	
	casper.wait(500, function(){
	
		casper.fill('form[method="post"]', {
			'City':'Tokyo'
		}, false);
	
		casper.echo('Waiting for AJAX again...');
	
		casper.wait(500, function(){
			casper.fill('form[method="post"]', {
				'Location':'MTT'
			}, true);
		});
	
	});

});

//Testing for Local site
casper.thenOpen(localUrls[0], function(){
	casper.echo('Opening ' + localUrls[0] + '...');
});

casper.then(function(){
	casper.fill('form[method="post"]', {
		'ctl00$ctl00$ctl00$ContentPlaceHolderDefault$servcorp_local_contact_form$20130123_keibackup_ServcorpInquiry_13$_contactName': 'test',
		'ctl00$ctl00$ctl00$ContentPlaceHolderDefault$servcorp_local_contact_form$20130123_keibackup_ServcorpInquiry_13$_contactTel': '08012341234',
		'ctl00$ctl00$ctl00$ContentPlaceHolderDefault$servcorp_local_contact_form$20130123_keibackup_ServcorpInquiry_13$_contactEmail': 'test@a.com',
		'ctl00$ctl00$ctl00$ContentPlaceHolderDefault$servcorp_local_contact_form$20130123_keibackup_ServcorpInquiry_13$_aboutList': 'サービス付レンタルオフィス',
		'ctl00$ctl00$ctl00$ContentPlaceHolderDefault$servcorp_local_contact_form$20130123_keibackup_ServcorpInquiry_13$_contactMessage' :'This is a test.',
	}, false);
	casper.click('input[name="ctl00$ctl00$ctl00$ContentPlaceHolderDefault$servcorp_local_contact_form$20130123_keibackup_ServcorpInquiry_13$_contactNextButton"]');
	casper.echo('Waiting for confirmation page...');

	casper.waitForSelector('body', function(){
		casper.click('input[text="submit"]');
		casper.echo('Finishing up.');
	})
});

casper.run(function(){
	this.echo('all done.');
	casper.exit();
})

