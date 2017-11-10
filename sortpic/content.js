var type = 0;
var numberpage = 3;

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

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            var index = 0;
            console.log('Start-->');
            var scrolltopbottom = setInterval(function () {
                if(index < numberpage){
                    index++;
                    console.log(index, document.body.scrollHeight);
                    window.scrollTo(0,document.body.scrollHeight);
                }else{
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
                    // $("body").animate({scrollTop: 0}, 500);
                    clearInterval( scrolltopbottom );
                    console.log('res: '+arrPic.length);
                    window.scrollTo(0,700);
                }
            }, 5000);
        }
    }
);