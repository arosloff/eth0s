stat = []
header = function() {
	var req = new XMLHttpRequest();
	req.open('GET', document.location, false);
	req.send(null);
	var headers = req.getAllResponseHeaders().toLowerCase();
	return headers.length;
}

special = function() {
	var count = 0;
	var s = document.URL
	for(i = 0, length=document.URL.length; i < length; i++) {
		if ((s[i]=='/') || (s[i]=='%') || (s[i]=='#') || (s[i]=='&') || (s[i]=='.') || (s[i]=='='))
			count += 1;
	}
	return count;
}

highlight = function() {
    var links = document.querySelectorAll('a');
    for(var i = 0, length=links.length; i < length; i++) {
    	var s1 = String(links[i]);
    	var s2 = document.URL;
    	s1 = s1.replace("http://","").replace('https://','').split('/')[0];
    	s2 = s2.replace("http://","").replace('https://','').split('/')[0];
    	if (s1 != s2)
    		links[i].style.backgroundColor = '#ffff11';
    	if (String(links[i]).includes("javascript"))
    		links[i].style.backgroundColor = '#dd1111';
    }
}
// stats = function() {
	stat[0] = document.URL.length;
	stat[1] = special();
	stat[2] = header();
	chrome.storage.local.set({length: stat[0]}, function() {});
	chrome.storage.local.set({special: stat[1]}, function() {});
	chrome.storage.local.set({header: stat[2]}, function() {});
	// stat[3] = header();
	// stat[4] = Math.floor(Math.random());
	// stat[5] = Math.floor(Math.random());
	// stat[6] = Math.floor(Math.random());
	// stat[7] = Math.floor(Math.random());
	// stat[8] = Math.floor(Math.random());
	// stat[9] = Math.floor(Math.random());
	// stat[10] = Math.floor(Math.random());
	// stat[11] = Math.floor(Math.random());
	// stat[12] = Math.floor(Math.random());
//}
highlight();
//stats();
