/* Glide Instance */
var glide = $('.slider').glide({
		autoplay: 1000000,
		arrowRightText: '>',
		arrowLeftText: '<',
}).data('api_glide');
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
	var host = "ws://192.168.5.7:5902/status";
	var socket = new WebSocket(host);
	
	socket.onmessage = function(message){
		$("#status").val($("#status").val() + message.data);
		console.log(message.data);
	}
	
	$("#run-btn").on("click",function(){
		message = editor.getValue();
		$("#status").val("");
		glide.jump(2, console.log("jump"));
		socket.send(message);
	});
})
