// 미리보기용 코드
var img_file;

$('section li').hover(function(e) {
    var temp = $(this).children('a').attr('href');
    var pointer_y = e.pageY-10, pointer_x = e.pageX+100, lyPos;


    img_file = temp.substring(0,temp.lastIndexOf("/")+1)  + 'capture/' + temp.substring(temp.lastIndexOf("/") + 1, temp.lastIndexOf(".")) + '.png';
    htlm_file = temp;

    getHeadertoFile(htlm_file);
    // 파일체크하여 없을 경우 노이미지 노출
    if(fileChecker(img_file)) {
        $(this).append('<div class="capture_ly"><img src="' + img_file + '"></div>');
        lyPos=500;
    }
    else {
        $(this).append('<div class="capture_ly noimg">No Image</div>');
        lyPos=90;
    }

    // 레이어 위치 지정
    if(pointer_y >= $(document).height()-500) pointer_y = e.pageY-lyPos;
    $('.capture_ly').css({
        'top' : pointer_y,
        'left' : pointer_x
    });

}, function() {
    $(this).find('.capture_ly').remove();
});

var today = new Date();
var commiterList = []; // 커미터 정보
commiterList = exec();

// 마지막 수정일자 표시
var listTotalLength = $('section li').length;
var listCurrentLength = 0;
$('body').append('<div class="svg_spinner_box"><div class="svg_spinner"><svg width="100%" height="100%" viewBox="0 0 100 100"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="15%" style="stop-color:#1c90fb;stop-opacity:1"></stop><stop offset="59%" style="stop-color:rgba(255,255,255,0);stop-opacity:1"></stop></linearGradient></defs><circle cx="50" cy="50" r="45" fill="transparent" stroke="url(#grad1)" stroke-width="10"></circle></svg><svg width="100%" height="100%" viewBox="0 0 100 100" class="add_svg"><defs></defs><circle cx="50" cy="50" r="45" fill="transparent" stroke="#1c90fb" stroke-width="10"></circle></svg><div class="svg_circle"></div></div><p class="svg_spinner_text">Loading..<span class="svg_spinner_loadingtext"></span></p></div>');
$('body').addClass('dimmed');

$('section li').each(function() {
    var htlm_file = $(this).children('a').attr('href');

    setTimeout(() => {
        var checkDate = getHeadertoFile(htlm_file);
        var _gmt = new Date(checkDate);  // 최종 수정일자를 가져옴
        var year = _gmt.getFullYear();
        var month = _gmt.getMonth() +1;
        var day = _gmt.getDate();
        var allTimeText;
        var btMs = today.getTime() - _gmt.getTime();
        var btDay = parseInt(btMs / (1000*60*60*24));
        var btDayClass = "";
        var fileCommiter = "";
        // var hours = _gmt.getHours();
        // var minutes = _gmt.getMinutes();
        // var seconds = _gmt.getSeconds();
        // allTimeText = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        // console.log(fileUrl, _gmt, allTimeText);

        // 오늘날짜와 차이 계산
        if(btDay > 30) {
            btDayClass = 'v2';
        }
        else if(btDay > 14) {
            btDayClass = 'v1';
        }

        allTimeText = year + '.' + (('00'+month.toString()).slice(-2)) + '.' + (('00'+day.toString()).slice(-2)); // 헤더에서 가져온 날짜정보를 보기좋게 변경하여 출력


        // 최종수정자(커미터) 정보가 있다면,
        if(commiterList[0]) {
            $.each(commiterList,function(idx) { // 파일이름으로 해당 커미터 찾기
                if(commiterList[idx].filename == htlm_file) {
                    switch(commiterList[idx].commiter) { // git에 등록된 이름을 실사용자명으로 변경
                        case 'gundam' :
                        case '김 건 일' :
                            fileCommiter = '@김건일';
                            break;
                        case '0x5e0x5e' :
                            fileCommiter = '@임상문';
                            break;
                        case 'sujinryu' :
                            fileCommiter = '@류수진';
                            break;
                        case 'Heo seong eun' :
                        case 'seongeun' :
                            fileCommiter = '@허성은';
                            break;
                        case 'Tobby Kim' :
                            fileCommiter = '@김동혁';
                            break;
                        case '노 은 찬' :
                        case 'roh eun chan' :
                            fileCommiter = '@노은찬';
                            break;
                        case 'JaeHoon Yu' :
                            fileCommiter = '@유재훈';
                            break;
                        case 'kimss' :
                            fileCommiter = '@김성섭';
                            break;
                        case 'kimdaepa' :
                            fileCommiter = '@김대환';
                            break;
                        default :
                            fileCommiter = '@' + commiterList[idx].commiter;
                    }
                    
                }
            });

            $(this).children('a').append("<span class='indexDate " + btDayClass + "'>" +  allTimeText + "</span><span class='commiter'>" + fileCommiter + "</span>");
        }
        else { // 커미터 정보 없을 경우
            $(this).children('a').append("<span class='indexDate " + btDayClass + "'>" +  allTimeText + "</span>");
        }
        listCurrentLength++;
        // console.log(listTotalLength, listCurrentLength);
        $('.svg_spinner_loadingtext').html(parseInt((listCurrentLength/listTotalLength)*100) + '%'); // loading 진행율 표시
        if(listTotalLength == listCurrentLength) {
            $('body').removeClass('dimmed');
        }
    }, 100);
});

function fileChecker(imgpath) {
    let check;
    $.ajax({
         url: imgpath,
         type: 'HEAD',
         async:false,
         timeout: 1000,
         success: function () {
              check = true;
         },
         error: function () {
             check = false;
         }
    });
    return check;
}

// 파일을 열어서 HTTP 헤더의 정보를 가져옵니다.
function getHeadertoFile(fileUrl) {
	var request = new XMLHttpRequest();

	request.open("GET", fileUrl, false);
	request.send();

	var data = new Object();

	// 헤더 정보를 가져온다.
	var headers = request.getAllResponseHeaders();
	var aHeaders = headers.split('\n');
	var j =0;

    // console.log(request.status);
    // if (request.status != 200) {
    //     return false;
    // }

	for (j= 0; j < aHeaders.length; j++) {
			var thisItem = aHeaders[j];
			var key = thisItem.substring(0, thisItem.indexOf(':'));
			var value = thisItem.substring(thisItem.indexOf(':')+1);
			data[key] = value;
	}

	return data['last-modified'];
}

// json 파일 가져오기
function getJson(jsonFile){ 
    const response = fetch(jsonFile);
    return response.then(res => res.json());
}

// json 파일 동기식 처리
async function exec(){ 
    try {
        commiterList = await getJson('commiter.json');
        console.log(commiterList);
        return commiterList;
        
    }
    catch(error){
      console.log(error);
    }
}
