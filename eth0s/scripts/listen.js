intercept = -2.5194422395886593;
stat = [];
coef = [-0.074779205, 0.545172349, -2.42E-6] //0.003514723, -0.317395595, -0.19396821, -0.000638795, 0.013969635, 0.053140112, 0.013969635, 0.011924084];

sigmoid = function() {
	var sum = 0.0;
	for (var i = 0, length=stat.length; i < length; i++) { //Sum of coefs*vals
		sum += coef[i]*(stat[i]-intercept);
	}
	//sum = sum - intercept;
	// alert("Sum minus intercept: "+sum);
	sum *= -1.0;
	// alert("Negative sum: "+sum);
	sum = 1.0+(Math.pow(Math.E, sum));
	// alert("e to the sum plus one: "+sum);
	return Math.round(1.0/sum);

};

getSiteData = function() {
	chrome.storage.local.get(null, function(items) {
    var keyList = Object.keys(items);
    stat[0] = keyList[0];
    stat[1] = keyList[1];
    stat[2] = keyList[2];
});

	// stat[0] = 16//Math.floor(Math.random()*((249)+1))+16; //URL_LENGTH
	// stat[1] = 7//Math.floor(Math.random()*((43)+1))+5; //#_OF_SPECIAL_CHAR
	// stat[2] = 263//Math.floor(Math.random()*((649263)+1))+0; //HTTP_HEADER_SIZE
	// stat[3] = 7//Math.floor(Math.random()*((1194)+1))+0; //#_OF_TCP_PACKET
	// stat[4] = 0//Math.floor(Math.random()*((708)+1))+0; //#_OF_TCP_PORT
	// stat[5] = 2//Math.floor(Math.random()*((17)+1))+0; //#_OF_IP
	// stat[6] = 700//Math.floor(Math.random()*((2362906)+1))+0; //BYTES_TRASNFERRED
	// stat[7] = 9//Math.floor(Math.random()*((1198)+1))+0; //SOURCE_PACKETS
	// stat[8] = 10//Math.floor(Math.random()*((1284)+1))+0; //REMOTE_PACKETS
	// stat[9] = 1153//Math.floor(Math.random()*((1198)+1))+0; //APP_PACKETS
	// stat[10] = 2//Math.floor(Math.random()*((20)+1))+0; //QUERY_TIME

	// stat[0] = Math.floor(Math.random()*((249)+1))+16; //URL_LENGTH
	// stat[1] = Math.floor(Math.random()*((43)+1))+5; //#_OF_SPECIAL_CHAR
	// stat[2] = Math.floor(Math.random()*((649263)+1))+0; //HTTP_HEADER_SIZE
	// stat[3] = Math.floor(Math.random()*((1194)+1))+0; //#_OF_TCP_PACKET
	// stat[4] = Math.floor(Math.random()*((708)+1))+0; //#_OF_TCP_PORT
	// stat[5] = Math.floor(Math.random()*((17)+1))+0; //#_OF_IP
	// stat[6] = Math.floor(Math.random()*((2362906)+1))+0; //BYTES_TRASNFERRED
	// stat[7] = Math.floor(Math.random()*((1198)+1))+0; //SOURCE_PACKETS
	// stat[8] = Math.floor(Math.random()*((1284)+1))+0; //REMOTE_PACKETS
	// stat[9] = Math.floor(Math.random()*((1198)+1))+0; //APP_PACKETS
	// stat[10] = Math.floor(Math.random()*((20)+1))+0; //QUERY_TIME
};

Color = {
    CRIMSON: 'crimson',
    ORANGERED: 'orangered',
    ORANGE: 'orange',
    YELLOW: 'yellow',
    LIGHTGREEN: 'lightgreen',
    GREEN: 'green'
};

getColor = function(score) {
	if (score >= 93)
		return Color.GREEN;
	else if (score >= 85)
		return Color.LIGHTGREEN;
	else if (score >= 79)
		return Color.YELLOW;
	else if (score >= 73)
		return Color.ORANGE;
	else if (score >= 55)
		return Color.ORANGERED;
	return Color.CRIMSON;
};

window.onload = function() {
	document.querySelector('#scan').addEventListener('click', e => {
		getSiteData();
		//alert("Final: "+sigmoid());
		var sec = 100-(100.0*sigmoid());
		var pri = Math.floor(Math.random() * ((100)+1));
		var ss = sec.toString();
		var ps = pri.toString();
		document.getElementById('security').style.backgroundColor = getColor(sec);
		document.getElementById('security').innerHTML = "<br>"+ss+"</br>";
		document.getElementById('privacy').style.backgroundColor = getColor(pri);
		document.getElementById('privacy').innerHTML = "<br>"+ps+"</br>";
		chrome.tabs.executeScript(null,{file:"scripts/highlight.js"});
		
	});
}