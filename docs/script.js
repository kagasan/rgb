var img = new Image();

window.onload = function(){
	//ファイルを選択したときの処理を追加しておく
	document.getElementById("selectfile").addEventListener("change", 
		function(evt){
			var file = evt.target.files;
			var reader = new FileReader();
			reader.readAsDataURL(file[0]);
			reader.onload = function(){
				img.src = reader.result;
			}
		},
	false);
	
};

function Small(WLimit=512, HLimit=512){
	if(img.width<=WLimit && img.height<=HLimit)return;
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	var w = img.width;
	var h = img.height;
	if(img.width>WLimit || img.height>HLimit){
		w = WLimit;
		h = parseInt(img.height * WLimit / img.width);
		if(img.width <= img.height){
			w = parseInt(img.width * HLimit / img.height);
			h = HLimit;
		}
	}
	canvas.width = w;
	canvas.height = h;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	
	img.src = canvas.toDataURL();
}
function Pick(num){
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img,0,0);
	var Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var data = Data.data;
	
	for(var i=0;i<data.length;i+=4){
		var tmp = data[i+num];
		data[i]=tmp;
		data[i+1]=tmp;
		data[i+2]=tmp;
	}
	ctx.putImageData(Data, 0, 0);
	var dataurl = canvas.toDataURL();
	document.getElementById("Output").innerHTML += "<img src='" + dataurl + "'><br>";
}

function RGB(){
	Small();
	document.getElementById("Output").innerHTML = "";
	Pick(0);
	Pick(1);
	Pick(2);
}
