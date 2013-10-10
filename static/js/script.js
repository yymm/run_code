var cnt = 0;
function change_theme() {
	if (cnt % 2 == 0)
	{
		$("body").css({
			"background" : "url('static/css/img/light-noise.png') repeat 0 0 #fff",
			"color" : "#555"
		});
		editor.setOption("theme", "solarized dark");
	}
	else
	{
		$("body").css({
			"background" : "url('static/css/img/dark-noise.png') repeat 0 0 #fff",
			"color" : "#ccc"
		});
		editor.setOption("theme", "solarized light");
	}
	cnt += 1;
}

$(document).ready( function() {
	lang_list = new Array('html', 'python', 'ruby')
	for (var i = 0; i < lang_list.length; i++)
	{
		$('.lang-select').append('<option id=' + lang_list[i] + '>' + lang_list[i] + '</option>')
	}
});
