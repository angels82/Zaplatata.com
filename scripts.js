const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_SJo0ZD6jx";
const kinveyAppSecret = "b202e6c70460467b8be4d3cc6099cb2c";
let auth = sessionStorage.getItem('authtoken');
showHideMenuLinks();
employers();
positions();
var authtemp;

 
function showView(viewID) {
    $('#menu > a').hide();
    $('#' + viewID).show();

}
function hideView(viewID) {
    //$('main > section').hide();
    $('#' + viewID).hide();

}

function showHideMenuLinks() {
    
    
    if (localStorage.getItem('authtoken') ==null || localStorage.getItem('authtoken') ==undefined) {
        $("#login").show();
        $("#home").show();
		$("#register").show();
        $("#newsalary").hide();
        $("#logout").hide();
        
    } else {
        $("#login").hide();
        $("#register").hide();
        $("#newsalary").show();
        $("#logout").show();
        $("#home").show();
        
    }
}





$(function () {

    //$("#buttonLoginView").click(login);
    //$("#buttonRegisterView").click(register);
	//$("#buttonnewsalary").click(createsalary);
	$("#findemployer").click(employers1);
	$("#findposition").click(positions1);
	$("#buttonreset").click(resetpass);
	$('#reset').click(function (){
		$('#loginUserreset').show()
	})
	$('#reset').click(function (){
		$('#buttonreset').show()
	})
	
	$('#createnewsalaryform').on('submit', function () {
    createsalary();
    return false;
});
showHideMenuLinks();
$('#findemployer').on('click', function () {
    emptyfield();
    return false;
});

function emptyfield (){
	$('#selectedemployer').empty();
}

$('#formLogin').on('submit', function () {
    login();
    return false;
});

$('#formRegister').on('submit', function () {
    register();
    return false;
});
	
	$("#home").click(gotohome);
	$("#newsalary").click(gotonewsalary);
	$("#login").click(gotologin);
	$("#register").click(gotoregister);
	$("#logout").click(logout);
	$('#errorBox').click(function (){
		$('#errorBox').hide()
	})
    showHideMenuLinks();
	sessionStorage.setItem('authtoken', auth);
    
	

    

    $(document).on({
        ajaxStart: function () {$("#loadingBox").show()},
        ajaxStop: function () {$("#loadingBox").hide()}
		
    })
   
});




function gotohome() {
	//showHideMenuLinks();
	//auth = sessionStorage.getItem('authtoken')
	
	window.location.href="main.html";
	sessionStorage.setItem('authtoken', auth)
	
	
	
	
	showHideMenuLinks();
}
function gotologin() {
	window.location.href="login.html"
	sessionStorage.setItem('authtoken', auth)
	sessionStorage.clear();
	showHideMenuLinks();
}
function gotoregister() {
	showHideMenuLinks();
	auth=sessionStorage.getItem('authtoken')
	window.location.href="register.html"
	showHideMenuLinks();
	sessionStorage.setItem('authtoken', auth)
	//sessionStorage.clear();
	showHideMenuLinks();
}
	
function gotonewsalary() {
	window.location.href="newsalary.html"
	sessionStorage.setItem('authtoken', auth)
	
	showHideMenuLinks();
}
	
function register() {
    const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };
    kinveyAuthHeaders['Content-Type'] = "application/json";
    let username = $('#registerUser').val();
	let email = $('#registeremail').val();
    let password = $('#registerPass').val();
    let method = "POST";

    let userData = {
        username: username,
		email: email,
        password: password

    };
    let request = {
        url:kinveyRegisterUrl,
        method: method,
        headers: kinveyAuthHeaders,
        data:JSON.stringify(userData),
		error: handleAjaxError
        
    }
    $.ajax(request).then(function (response) {
        auth = response._kmd.authtoken;
        sessionStorage.setItem('authtoken', auth);
		localStorage.setItem('authtoken', response._kmd.authtoken);/////////////////////////////////////
        //showHideMenuLinks();
		showInfo("You have successfully registered!");
		setTimeout(function() {
            window.location.href = "main.html"
        }, 1500);
		showHideMenuLinks();
        function registerSuccess(response) {
        auth = response._kmd.authtoken;
        sessionStorage.setItem('authtoken', auth);
        showHideMenuLinks();

        showInfo("Успешна регистрация");
		setTimeout(function() {
            window.location.href = "main.html"
        }, 1500);
		sessionStorage.setItem('authtoken', auth);
        };
    });
}

   
function handleAjaxError(data) {
    let errorMsg = JSON.stringify(data);
    if (data.readyState === 0) {
        errorMsg = "Connection failed due to network error!";
    }
    if (data.responseJSON && data.responseJSON.description)
        errorMsg = data.responseJSON.description;
    showError(errorMsg);
}



function login() {
    const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    kinveyAuthHeaders['Content-Type'] = "application/json";

    let username = $('#loginUser').val();
    let password = $('#loginPass').val();
    let method = "POST";
    let userData = {
        username: username,
        password: password

    };
    let request = {
        url:kinveyLoginUrl,
        method: method,
        headers: kinveyAuthHeaders,
        data:JSON.stringify(userData),
        error: handleAjaxError
    };
    $.ajax(request).then(function (response) {
        auth = response._kmd.authtoken;
        sessionStorage.setItem('authtoken', auth);
		localStorage.setItem('authtoken', response._kmd.authtoken);///////////////////
		showInfo("Успешно влизане в профила");
		setTimeout(function() {
            window.location.href = "main.html"
        }, 1500);
        showHideMenuLinks();
        function loginSuccess(response) {
        auth = response._kmd.authtoken;
        sessionStorage.setItem('authtoken', auth);
        showHideMenuLinks();
		
        //showInfo("You have successfully logged in!");
		window.location.href = "main.html";
		sessionStorage.setItem('authtoken', auth);
        };
    });

}


function showInfo(message) {
    $("#infoBox").text(message).show().delay(3000).fadeOut();
    //setTimeout(function () {$('#infoBox').fadeOut()}, 2500);

}

function showError(data) {
    //let errorMsg = "Error: " + JSON.stringify(data);
    //if (data.responseJSON.error == "UserAlreadyExists")
    //    errorMsg = "Error: " + data.responseJSON.error;//Invalid credentials!";
   // if (data.readyState === 0)
     //   errorMsg = "Connection failed due to network connection error!";
    //if (data.responseJSON.error == "InvalidCredentials")
       // errorMsg = "Error: " + data.responseJSON.error;
    $('#errorBox').text(data);
    $('#errorBox').show();
}


function logout(){
    sessionStorage.clear();
	auth=null;
    showHideMenuLinks();
	auth=null;
    window.location.href = "main.html";
	sessionStorage.clear();
	localStorage.clear();//////////////////////////////////////////////////////////////////////
	
	auth=null;
	showHideMenuLinks();
	
	
}

function createsalarycheck(){
	if ($('#employer').val() !='' && $('#position').val()!='' && $('#salaryamount').val()!='') createsalary();
}


function createsalary() {
    const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
    const kinveyAuthHeaders = {
        'Authorization': "Kinvey " + sessionStorage.getItem('authtoken')
    };
    let bookData = {
		salary: $('#salaryamount').val(),
		position: $('#position').val(),
        employer: $('#employerslist').val(),
		notes: $('#notes').val()
        
        

    };
    
    $.ajax({
        method: "POST",
        url: kinveyBooksUrl,
        headers: kinveyAuthHeaders,
        data: bookData,
        //success: ,
        error: handleAjaxError
    }).then(function () {
        
		console.log(bookData)
        sessionStorage.setItem('authtoken', auth);
		showInfo("Успешно създаване на нов запис");
		setTimeout(function() {
            window.location.href = "main.html";
			sessionStorage.setItem('authtoken', auth);
			
        }, 1500);
		console.log(auth)
		//loginSuccess(response);
        showHideMenuLinks();
        function loginSuccess(response) {
        
        sessionStorage.setItem('authtoken', auth);
        showHideMenuLinks();
		
        //showInfo("You have successfully logged in!");
		//window.location.href = "searchResults.html";
		//sessionStorage.setItem('authtoken', auth);
        };
    });

}

function employers (){
	
	
    if (localStorage.getItem('authtoken') == null) login1();
	if (localStorage.getItem('authtoken') != null) login2();
    
}

function positions (){
	
	
    if (localStorage.getItem('authtoken') == null) login3();
	if (localStorage.getItem('authtoken') != null) login4();
    
}

function employers1 (){
	
	
    if (localStorage.getItem('authtoken') == null) listemployers1();
	if (localStorage.getItem('authtoken') != null) listemployers();
    
}

function positions1 (){
	
	
    if (localStorage.getItem('authtoken') == null) listpositions1();
	if (localStorage.getItem('authtoken') != null) listpositions();
    
}



function loadSuccess(books, status) {
    //showInfo('Books loaded!');
		var book1=[];
        for (let book of books) {
			book1.push(book.employer)
		}
		book1 = book1.filter((x, i, a) => a.indexOf(x) == i)
        for (let book of book1) {
            $('#employerslist').append('<option value="' + book + '">')
			


            
        }
        
    
}

function loadSuccess1(books, status) {
    //showInfo('Books loaded!');
    
        
        var book1=[];
        for (let book of books) {
			book1.push(book.position)
		}
		book1 = book1.filter((x, i, a) => a.indexOf(x) == i)
        for (let book of book1) {
            $('#positionslist').append('<option value="' + book + '">')
			


            
        }
        
    
}

function login1() {
    const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    kinveyAuthHeaders['Content-Type'] = "application/json";

    let username = 'a';
    let password = 'a';
    let method = "POST";
    let userData = {
        username: username,
        password: password

    };
    let request = {
        url:kinveyLoginUrl,
        method: method,
        headers: kinveyAuthHeaders,
        data:JSON.stringify(userData),
        
    };
    $.ajax(request).then(function (response) {
        authtemp = response._kmd.authtoken;
        const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
	let userData = {
        username: 'a',
		password: 'a'}
    let authHeaders = {
        "Authorization": "Kinvey " + response._kmd.authtoken
    };
    
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loadSuccess
        //error: handleAjaxError

    });
        
        
        });
    };
	
	
	function login2() {
    //const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    //let kinveyAuthHeaders = {
    //    Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    //kinveyAuthHeaders['Content-Type'] = "application/json";
    //
    //let username = 'a';
    //let password = 'a';
    //let method = "POST";
    //let userData = {
    //    username: username,
    //    password: password
    //
    //};
    //let request = {
    //    url:kinveyLoginUrl,
    //    method: method,
    //    headers: kinveyAuthHeaders,
    //    data:JSON.stringify(userData),
    //    
    //};
    //$.ajax(request).then(function (response) {
    //    authtemp = response._kmd.authtoken;
    //    const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
	//let userData = {
    //    username: 'a',
	//	password: 'a'}
    //let authHeaders = {
    //    "Authorization": "Kinvey " + authtemp
    //};
    
	const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
    let authHeaders = {
	"Authorization": "Kinvey " + sessionStorage.authtoken}
	
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loadSuccess,
        error: redirect

    });
        
        
        
    };

	$("#formLogin").submit(function (e) {e.preventDefault(); login();});
    $("#formRegister").submit(function (e) {e.preventDefault(); register();});
    $("#createnewsalaryform").submit(function (e) {e.preventDefault(); createsalary();});
	
	
	
	
	
	
	
	
	function login3() {
    const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    kinveyAuthHeaders['Content-Type'] = "application/json";

    let username = 'a';
    let password = 'a';
    let method = "POST";
    let userData = {
        username: username,
        password: password

    };
    let request = {
        url:kinveyLoginUrl,
        method: method,
        headers: kinveyAuthHeaders,
        data:JSON.stringify(userData),
        
    };
    $.ajax(request).then(function (response) {
        authtemp = response._kmd.authtoken;
        const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
	let userData = {
        username: 'a',
		password: 'a'}
    let authHeaders = {
        "Authorization": "Kinvey " + authtemp
    };
    
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loadSuccess1
        //error: handleAjaxError

    });
        
        
        });
    };
	
	
	function login4() {
    //const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    //let kinveyAuthHeaders = {
    //    Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    //kinveyAuthHeaders['Content-Type'] = "application/json";
    //
    //let username = 'a';
    //let password = 'a';
    //let method = "POST";
    //let userData = {
    //    username: username,
    //    password: password
    //
    //};
    //let request = {
    //    url:kinveyLoginUrl,
    //    method: method,
    //    headers: kinveyAuthHeaders,
    //    data:JSON.stringify(userData),
    //    
    //};
    //$.ajax(request).then(function (response) {
    //    authtemp = response._kmd.authtoken;
    //    const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
	//let userData = {
    //    username: 'a',
	//	password: 'a'}
    //let authHeaders = {
    //    "Authorization": "Kinvey " + authtemp
    //};
    
	const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
    let authHeaders = {
	"Authorization": "Kinvey " + sessionStorage.authtoken}
	
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loadSuccess1,
        error: redirect

    });
        
        
        
    };
	
	function redirect(){
		window.location.href = "index.html";
		localStorage.clear()
	}
	
	
	var selected='';
	var selectedpos='';
	function listemployers() {
		selected=document.getElementById("selectedemployer").value;
		console.log('selected' + selected)
		
		
    
    const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
    let authHeaders = {
        "Authorization": "Kinvey " + localStorage.authtoken
    };
    
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loademployersSuccess
        //error: handleAjaxError

    });
}

function loademployersSuccess(books) {
    //showInfo('Books loaded!');
	//window.location.href = "searchResults.html";
	//		sessionStorage.setItem('authtoken', auth);
	//		showHideMenuLinks();
    $('#searchresults').empty();
	
    if (books.length == 0) {
        $('#searchresults').text('Няма записи');
    } else {
        let booksTable = $('<table>')
            
            .append(
                '<th>Работодател</th>',
                '<th>Позиция</th>',
                '<th>Заплата (нето)</th>',
				'<th>Дата на въвеждане</th>',
				'<th>Бележки</th>'

            );
        for (let book of books) {
			if (book.employer==document.getElementById("selectedemployer").value){
				console.log(book.employer)
            booksTable.append($('<tr></tr>').append(
                $('<td></td>').text(book.employer),
                $('<td></td>').text(book.position),
                $('<td></td>').text(book.salary + ' лева (нето)'),
				$('<td></td>').text(book._kmd.ect.substring(0, 10)),
				$('<td></td>').text(book.notes))


            );
        }
        $("#searchresults").append(booksTable);
    }}
	document.getElementById("selectedemployer").value=''
}



function listpositions() {
		selectedpos=document.getElementById("selectedposition").value;
		
		
    
    const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
    let authHeaders = {
        "Authorization": "Kinvey " + localStorage.authtoken
    };
    
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loadpositionsSuccess
        //error: handleAjaxError

    });
}

function loadpositionsSuccess(books) {
    //showInfo('Books loaded!');
	//window.location.href = "searchResults.html";
	//		sessionStorage.setItem('authtoken', auth);
	//		showHideMenuLinks();
    $('#searchresults').empty();
    if (books.length == 0) {
        $('#searchresults').text('There are no positions in the database');
    } else {
        let booksTable = $('<table>')
            
            .append(
                '<th>Работодател</th>',
                '<th>Позиция</th>',
                '<th>Заплата (нето)</th>',
				'<th>Дата на въвеждане</th>',
				'<th>Бележки</th>'

            );
        for (let book of books) {
			if (book.position==document.getElementById("selectedposition").value){
				
            booksTable.append($('<tr></tr>').append(
               $('<td></td>').text(book.employer),
                $('<td></td>').text(book.position),
                $('<td></td>').text(book.salary + ' лева (нето)'),
				$('<td></td>').text(book._kmd.ect.substring(0, 10)),
				$('<td></td>').text(book.notes))


            );
        }
        $("#searchresults").append(booksTable);
    }}
}




var selected1;

function listemployers1() {
		selected1=document.getElementById("selectedemployer").value;
		console.log(selected)
		const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    kinveyAuthHeaders['Content-Type'] = "application/json";

    let username = 'a';
    let password = 'a';
    let method = "POST";
    let userData = {
        username: username,
        password: password

    };
    let request = {
        url:kinveyLoginUrl,
        method: method,
        headers: kinveyAuthHeaders,
        data:JSON.stringify(userData),
        
    };
    $.ajax(request).then(function (response) {
        authtemp = response._kmd.authtoken;
        const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
	let userData = {
        username: 'a',
		password: 'a'}
    let authHeaders = {
        "Authorization": "Kinvey " + authtemp
    };
    
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loademployersSuccess
        //error: handleAjaxError

    });
        
        
        });
        
        
        
    
    
}

function loademployersSuccess(books) {
    //showInfo('Books loaded!');
	//window.location.href = "searchResults.html";
	//		sessionStorage.setItem('authtoken', auth);
	//		showHideMenuLinks();
    $('#searchresults').empty();
    if (books.length == 0) {
        $('#searchresults').text('Няма записи');
    } else {
        let booksTable = $('<table>')
            
            .append(
                '<th>Работодател</th>',
                '<th>Позиция</th>',
                '<th>Заплата (нето)</th>',
				'<th>Дата на въвеждане</th>',
				'<th>Бележки</th>'

            );
        for (let book of books) {
			if (book.employer==document.getElementById("selectedemployer").value){
				console.log(book)
            booksTable.append($('<tr></tr>').append(
                $('<td></td>').text(book.employer),
                $('<td></td>').text(book.position),
                $('<td></td>').text(book.salary + ' лева (нето)'),
				$('<td></td>').text(book._kmd.ect.substring(0, 10)),
				$('<td></td>').text(book.notes))


            );
        }
        $("#searchresults").append(booksTable);
    }}
}

function loadSuccess8(books) {
    //showInfo('Books loaded!');
	//window.location.href = "searchResults.html";
	//		sessionStorage.setItem('authtoken', auth);
	//		showHideMenuLinks();
    $('#searchresults').empty();
    if (books.length == 0) {
        $('#searchresults').text('Няма записи');
    } else {
        let booksTable = $('<table>')
            
            .append(
                '<th>Работодател</th>',
                '<th>Позиция</th>',
                '<th>Заплата (нето)</th>',
				'<th>Дата на въвеждане</th>',
				'<th>Бележки</th>'

            );
        for (let book of books) {
			if (book.employer==document.getElementById("selectedemployer").value){
				console.log(book.employer)
            booksTable.append($('<tr></tr>').append(
                $('<td></td>').text(book.employer),
                $('<td></td>').text(book.position),
                $('<td></td>').text(book.salary + ' лева (нето)'),
				$('<td></td>').text(book._kmd.ect.substring(0, 10)),
				$('<td></td>').text(book.notes))


            );
        }
        $("#searchresults").append(booksTable);
    }}
}

//function listpositions1() {
//		selectedpos=document.getElementById("selectedposition").value;
//		
//		
//    
//    const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
//    let authHeaders = {
//        "Authorization": "Kinvey " + sessionStorage.authtoken
//    };
//    
//    $.ajax({
//        method: "GET",
//        url: kinveyBooksUrl,
//        headers: authHeaders,
//        success: loadpositionsSuccess1
//        //error: handleAjaxError
//
//    });
//}

function loadpositionsSuccess(books) {
    //showInfo('Books loaded!');
	//window.location.href = "searchResults.html";
	//		sessionStorage.setItem('authtoken', auth);
	//		showHideMenuLinks();
    $('#searchresults').empty();
    if (books.length == 0) {
        $('#searchresults').text('Няма записи');
    } else {
        let booksTable = $('<table>')
            
            .append(
                '<th>Работодател</th>',
                '<th>Позиция</th>',
                '<th>Заплата (нето)</th>',
				'<th>Дата на въвеждане</th>',
				'<th>Бележки</th>'

            );
        for (let book of books) {
			if (book.position==document.getElementById("selectedposition").value){
				
            booksTable.append($('<tr></tr>').append(
                $('<td></td>').text(book.employer),
                $('<td></td>').text(book.position),
                $('<td></td>').text(book.salary + ' лева (нето)'),
				$('<td></td>').text(book._kmd.ect.substring(0, 10)),
				$('<td></td>').text(book.notes))


            );
        }
        $("#searchresults").append(booksTable);
    }}
}
var selectedpos1='';

function listpositions1() {
		selectedpos1=document.getElementById("selectedposition").value;
		console.log(selected)
		const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret)};
    kinveyAuthHeaders['Content-Type'] = "application/json";

    let username = 'a';
    let password = 'a';
    let method = "POST";
    let userData = {
        username: username,
        password: password

    };
    let request = {
        url:kinveyLoginUrl,
        method: method,
        headers: kinveyAuthHeaders,
        data:JSON.stringify(userData),
        
    };
    $.ajax(request).then(function (response) {
        authtemp = response._kmd.authtoken;
        const kinveyBooksUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/Zaplatata";
	let userData = {
        username: 'a',
		password: 'a'}
    let authHeaders = {
        "Authorization": "Kinvey " + authtemp
    };
    
    $.ajax({
        method: "GET",
        url: kinveyBooksUrl,
        headers: authHeaders,
        success: loadSuccess9
        //error: handleAjaxError

    });
        
        
        });
        
        
        
    
    
}

function loadSuccess9(books) {
    //showInfo('Books loaded!');
	//window.location.href = "searchResults.html";
	//		sessionStorage.setItem('authtoken', auth);
	//		showHideMenuLinks();
    $('#searchresults').empty();
    if (books.length == 0) {
        $('#searchresults').text('Няма записи');
    } else {
        let booksTable = $('<table>')
            
            .append(
                '<th>Работодател</th>',
                '<th>Позиция</th>',
                '<th>Заплата (нето)</th>',
				'<th>Дата на въвеждане</th>'

            );
        for (let book of books) {
			if (book.position==document.getElementById("selectedposition").value){
				console.log(book.employer)
            booksTable.append($('<tr></tr>').append(
                $('<td></td>').text(book.employer),
                $('<td></td>').text(book.position),
                $('<td></td>').text(book.salary + ' лева (нето)'),
				$('<td></td>').text(book._kmd.ect.substring(0, 10)),
				$('<td></td>').text(book.notes))


            );
        }
        $("#searchresults").append(booksTable);
    }}
}


function resetpass (){
	let loginUserreset = $('#loginUserreset').val();
	console.log(loginUserreset)
	const kinveyRegisterUrl = kinveyBaseUrl + 'rpc/' + kinveyAppKey + '/' + loginUserreset + '/user-password-reset-initiate';
    let kinveyAuthHeaders = {
        Authorization: "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };
    //kinveyAuthHeaders['Content-Type'] = "application/json";
    
    let method = "POST";

    
    let request = {
        url:kinveyRegisterUrl,
        method: method,
        headers: kinveyAuthHeaders,
		error: handleAjaxError
        
    }
    $.ajax(request).then(function (response) {
		handleAjaxError('Верификационен e-mail е изпратен на посочения от вас e-mail адрес')
        //auth = response._kmd.authtoken;
        //sessionStorage.setItem('authtoken', auth);
		//localStorage.setItem('authtoken', response._kmd.authtoken);/////////////////////////////////////
        //showHideMenuLinks();
		//showInfo("You have successfully registered!");
		//setTimeout(function() {
          //  window.location.href = "main.html"
        //}, 1500);
		//showHideMenuLinks();
        //function registerSuccess(response) {
        //auth = response._kmd.authtoken;
        //sessionStorage.setItem('authtoken', auth);
        //showHideMenuLinks();

        //showInfo("You have successfully registered!");
		//setTimeout(function() {
        //    window.location.href = "main.html"
        //}, 1500);
		//sessionStorage.setItem('authtoken', auth);
        //};
    });
}


