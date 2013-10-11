/* Glide Instance */
var glide = $('.slider').glide({
		autoplay: 1000000,
		arrowRightText: '>',
		arrowLeftText: '<'
});
$('.slider-arrow--right').css("text-decoration", "none");
$('.slider-arrow--left').css("text-decoration", "none");

/* CodeMirror Instance */
editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "shell",
	theme: "solarized light"
});

/* linedtextarea Instance */
lineNo_suffix = "";
lineNo_prefix = "";
$(function() {
	$(".lined").linedtextarea(
		{selectedLine: 0}
	);
});

/* change a editor mode */
$('.lang-select').change( function() {
	var value = $('.lang-select').val();
	editor.setOption("mode", value);
});

/* socket */
$(function(){
	var host = "ws://localhost:8000/status";
	var socket = new WebSocket(host);
	
	socket.onmessage = function(message){
		$("#status").val($("#status").val() + message.data);
		console.log(message.data);
	}
	
	$("#run-btn").on("click",function(){
		message = $(".CodeMirror").find("textarea").val();
		$("#status").val("");
		socket.send(message);
	});
})
