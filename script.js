

var counting = false;
var runtime;

var milliSec = 0;
var milliSecCount = 0;
var secCount = 0;
var minuteCount = 0;

var lapCount = 0;
var lap_milliSecCount = 0;
var lap_secCount = 0;
var lap_minuteCount = 0;

var lapNum = 1;
$(document).ready(function(){
	$("#start-stop-resume").click(function(){
		if(counting == false){
			$(this).text("Stop");
			$("#lap-reset").text("Lap");
			counting = true;
			runtime = setInterval(function(){
				timeCount();
			},10);
		}
		else{
			$(this).text("Resume");
			$("#lap-reset").text("Reset");
			counting = false;
			clearInterval(runtime);
		}
		
	});
	
	$("#lap-reset").click(function(){
		if($(this).text() == "Reset"){
			counting = false;
			location.reload();
		}
		else if(counting==true){
			addRecord();
			$("#lapMinute").text("00");
			$("#lapSecond").text("00");
			$("#lapMilliSec").text("00");
			$("#record").css("overflow-y", "scroll");
			lapCount = 0;
			
			
		}
	});
	
});

function editNumer(x){
	if(x < 10){
		return "0" + x;
	}
	else{
		return x;
	}
}

function timeCount(){
	milliSec++;
	secCount++;
	minuteCount++;
	
	$("#timeMilliSec").text(editNumer(milliSec%100));
	
	if(milliSecCount < 6000){
		if(secCount == 100){
			secCount = 0;
			milliSecCount++;

			$("#timeSecond").text(editNumer(Math.floor(milliSec/100)%60));
		}
	}else{
		$("#timeSecond").text("00");
		milliSecCount = 0;
	}
	
	if(minuteCount == 6000){
		minuteCount = 0;
		$("#timeMinute").text(editNumer(Math.floor(milliSec/6000)));
	}
	
	
	lapCount++;
	lap_secCount++;
	lap_minuteCount++;
	
	$("#lapMilliSec").text(editNumer(lapCount%100));
	
	if(lap_milliSecCount < 6000){
		if(lap_secCount == 100){
			lap_secCount = 0;
			lap_milliSecCount++;

			$("#lapSecond").text(editNumer(Math.floor(lapCount/100)%60));
		}
	}else{
		$("#lapSecond").text("00");
		lap_milliSecCount = 0;
	}
	
	if(lap_minuteCount == 6000){
		lap_minuteCount = 0;
		$("#lapMinute").text(editNumer(Math.floor(lapCount/6000)));
	}
}


function addRecord(){
	var newLap = '<div class="allRecord">'
					+'<span>Lap '+lapNum+'</span>'
					+'<span class="recordTime">'
					+'<span class="recordMinute">'+$("#lapMinute").text()+'</span>'
					+':'
					+'<span class="recordSecond">'+$("#lapSecond").text()+'</span>'
					+':'
					+'<span class="recordMilliSec">'+$("#lapMilliSec").text()+'</span>'
					+'</span>'
					+'</div>';
	var record = document.getElementById("record");
	record.innerHTML += newLap;
	lapNum++;
}