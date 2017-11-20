var type = 0;

function convertTextToInt(textVal) {
	var endkey = textVal.charAt(textVal.length - 1).toLowerCase();
	textVal = textVal.split(',').join('.');
	if (endkey === 'k') {
		return parseFloat(textVal) * 1000
	}
	if (endkey === 'm') {
		return parseFloat(textVal) * 1000000
	}
	return parseFloat(textVal);
}

function compare(a, b) {
	var aDataElm = $("._4crj > a", a);
	var aVal = convertTextToInt($(aDataElm[type]).text());

	var bDataElm = $("._4crj > a", b);
	var bVal = convertTextToInt($(bDataElm[type]).text());

	if (aVal > bVal)
		return -1;
	if (aVal < bVal)
		return 1;
	return 0;
}

function removeAlert() {
	setTimeout(function () {
		$('#sortpic-alert').hide().html('');
	}, 3000);
}

function showAlert(alert) {
	if(!$('#sortpic-alert').length){
		$("<div id='sortpic-alert'></div>").css({
			position: "fixed",
			padding: "15px",
			width: "200px",
			left: 0,
			top: 0,
			zIndex: 1000000,
			background: '#ddd',
			border: '5px solid coral'
		}).appendTo($('body').css('position', 'relative'));
	}
	$('<p>'+alert+'</p>').appendTo($('#sortpic-alert').show());
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.message === "clicked_browser_action") {
			chrome.storage.sync.get({
				number_page: 3,
				time_page: 5
			}, function (items) {
				var index = 0;
				var numberpage = parseInt(items.number_page);
				var time = parseInt(items.time_page)*1000;
				showAlert('Number page: ' + numberpage + ' - Time: ' + time);
				showAlert('Start: '+ $('._2eea').length + ' pictures');
				var scrolltopbottom = setInterval(function () {
					if (index < numberpage) {
						index++;
						showAlert('Page:' + index + ' ...');
						window.scrollTo(0, document.body.scrollHeight);
					} else {
						$('._4crl').remove();
						$('._4crk').remove();
						$('._ohe').remove();
						$('div._ohf').removeClass().css('text-align', 'center');
						$('._4crj a').css('font-size', '14px');
						$('._3t_i').show().css('background-color', 'black');
						var arrPic = $('._2eea').sort(compare);
						// Get all picture
						$('._2eec').html('');
						$(arrPic).each(function () {
							$('._2eec').append($(this));
						});
						clearInterval(scrolltopbottom);
						showAlert('Success: ' + arrPic.length + ' pictures');
						window.scrollTo(0, 700);
						removeAlert();
					}
				}, time);
			});
		}
	}
);