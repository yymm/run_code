var cnt = 0;
function change_theme() {
	if (cnt % 2 == 0)
	{
		$("body").css({
			"background" : "url('static/css/img/light-noise.png') repeat 0 0 #fff",
			"color" : "#555"
		})
	}
	else
	{
		$("body").css({
			"background" : "url('static/css/img/dark-noise.png') repeat 0 0 #fff",
			"color" : "#ccc"
		})
	}
	cnt += 1;
}
