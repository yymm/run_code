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
