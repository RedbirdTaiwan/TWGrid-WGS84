//由WGS84座標(與層級)取得網格編號
function girdcode(lat,lng,level=4){
    var code = [];
    var init_x = 116; //起啟經度
    var init_y = 20;  //啟始緯度
    var unit_x = 0.01; //最小網格之單位經度
    var unit_y = (50/60)/100; //最小網格之單位緯度
	
	//只在經度116~124及緯度20~26.66666範圍內作圖
    if(lng < init_x){lng = 116.00001;}
    if(lng > 124){lng = 123.99999;}
    if(lat < init_y){lat = 20.00001;}
    if(lat > 26.66666666){lat = 26.66666;}
	
	//Level1網格編號
    var code1_x = Math.floor(init_x - 100) + Math.floor((lng-init_x)/(unit_x*100))
    var code1_y = Math.floor(init_y * 1.2) + Math.floor((lat-init_y)/(unit_y*100))
    code[0] = code1_y.toString() + code1_x.toString()
    
	//Level2網格編號
	var code2_x = Math.floor(((lng-init_x)%(unit_x*100))/(unit_x*10))
    var code2_y = Math.floor(((lat-init_y)%(unit_y*100))/(unit_y*10))
    code[1] = code[0] + "-" + code2_y.toString() + code2_x.toString()
    
	//Level3網格編號
	var code3_x = Math.floor((((lng-init_x)%(unit_x*100))%(unit_x*10))/(unit_x*5))
    var code3_y = Math.floor((((lat-init_y)%(unit_y*100))%(unit_y*10))/(unit_y*5))
    code[2] = code[1] + "-" + code3_y.toString() + code3_x.toString()
    
	//Level4網格編號
	var code4_x = Math.floor(((((lng-init_x)%(unit_x*100))%(unit_x*10))%(unit_x*5))/unit_x)
    var code4_y = Math.floor(((((lat-init_y)%(unit_y*100))%(unit_y*10))%(unit_y*5))/unit_y)
    code[3] = code[2] + "-" + code4_y.toString() + code4_x.toString()
    
	//回傳指定層級之網格編號
	return code[level-1]
}

//由編號取得西南角座標
function baselatlng(code){
    var base = {level:"",lat:"",lng:""};
    unit_x = 0.01; //最小網格之單位經度
    unit_y = (50/60)/100; //最小網格之單位緯度
	//計算網格層級
    codes = code.split("-");
    base.level = codes.length; 
	
	//Level1座標
    if (base.level > 0) {
        base.lat = parseInt(codes[0].substr(0,2)) / 1.2;
        base.lng = parseInt(codes[0].substr(2,2)) + 100;
    }
	
	//Level2座標
    if (base.level > 1 ){
        base.lat += parseInt(codes[1].substr(0,1)) * unit_y * 10;
        base.lng += parseInt(codes[1].substr(1,1)) * unit_x * 10;
    }
	
	//Level3座標
    if (base.level > 2 ){
        base.lat += parseInt(codes[2].substr(0,1)) * unit_y * 5;
        base.lng += parseInt(codes[2].substr(1,1)) * unit_x * 5;
    }
	
	//Level4座標
    if (base.level > 3 ){
        base.lat += parseInt(codes[3].substr(0,1)) * unit_y;
        base.lng += parseInt(codes[3].substr(1,1)) * unit_x;
    }
	
	//回傳座標
    return base
}

//繪製網格
function grid(lat,lng,level=1){
    var g = [];
    var unit_x = 0.01;
    var unit_y = (50/60)/100;
    if(level==1){
        unit_x = unit_x * 100;
        unit_y = unit_y * 100;
    }else if(level==2){
        unit_x = unit_x * 10;
        unit_y = unit_y * 10;
    }else if(level==3){
        unit_x = unit_x * 5;
        unit_y = unit_y * 5;
    }
	
	//計算網格的4個端點
    g[0] = [lat,lng];
    g[1] = [lat,lng+unit_x];
    g[2] = [lat+unit_y,lng+unit_x];
    g[3] = [lat+unit_y,lng];
	
    return g
}