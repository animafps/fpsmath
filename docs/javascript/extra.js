location$.subscribe(function (url) {
	umami.trackView(url);
});
