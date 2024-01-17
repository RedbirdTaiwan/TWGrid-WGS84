 //由WGS84座標(與層級)取得網格編號
 //2024.1.17藝鴻修正
 function girdcode(lat, lng, level = 4) {
     let x = lng;
     let y = lat;
     let code = [];
     const init_x = 116;
     const init_y = 20;
     const max_x = 125;
     const max_y = 26 + 40 / 60;
     //只在經度116~124及緯度20~26.66666範圍內作圖
     if (lng < init_x) {
         lng = 116.00001;
     }
     if (lng > 124) {
         lng = 123.99999;
     }
     if (lat < init_y) {
         lat = 20.00001;
     }
     if (lat > 26.66666666) {
         lat = 26.66666;
     }
     const code1_y = Math.floor((y - 20) / (50 / 60)) + 24;
     const y1 = (code1_y - 24) * (50 / 60) + 20;
     const code1_x = Math.floor((x - 100));
     const x1 = code1_x + 100;
     const code2_y = Math.floor((y - y1) / (5 / 60));
     const y2 = code2_y * (5 / 60) + y1;
     const code2_x = Math.floor((x - x1) / (6 / 60));
     const x2 = code2_x * (6 / 60) + x1;
     const code3_y = Math.floor((y - y2) / (150 / 3600));
     const y3 = code3_y * (150 / 3600) + y2;
     const code3_x = Math.floor((x - x2) / (3 / 60));
     const x3 = code3_x * (3 / 60) + x2;
     const code4_y = Math.floor((y - y3) / (30 / 3600));
     const code4_x = Math.floor((x - x3) / (36 / 3600));
     code[0] = code1_y + '' + code1_x
     code[1] = code[0] + '-' + code2_y + code2_x
     code[2] = code[1] + '-' + code3_y + code3_x
     code[3] = code[2] + '-' + code4_y + code4_x
     return code[level - 1]
 }

 //由編號取得西南角座標
 function baselatlng(code) {
     var base = { level: "", lat: "", lng: "" };
     unit_x = 0.01; //最小網格之單位經度
     unit_y = (50 / 60) / 100; //最小網格之單位緯度
     //計算網格層級
     let codes = code.split("-");
     base.level = codes.length;

     //Level1座標
     if (base.level > 0) {
         base.lat = parseInt(codes[0].substr(0, 2)) / 1.2;
         base.lng = parseInt(codes[0].substr(2, 2)) + 100;
     }

     //Level2座標
     if (base.level > 1) {
         base.lat += parseInt(codes[1].substr(0, 1)) * unit_y * 10;
         base.lng += parseInt(codes[1].substr(1, 1)) * unit_x * 10;
     }

     //Level3座標
     if (base.level > 2) {
         base.lat += parseInt(codes[2].substr(0, 1)) * unit_y * 5;
         base.lng += parseInt(codes[2].substr(1, 1)) * unit_x * 5;
     }

     //Level4座標
     if (base.level > 3) {
         base.lat += parseInt(codes[3].substr(0, 1)) * unit_y;
         base.lng += parseInt(codes[3].substr(1, 1)) * unit_x;
     }

     //回傳座標
     return base
 }

 //繪製網格
 function grid(lat, lng, level = 1) {
     var g = [];
     var unit_x = 0.01;
     var unit_y = (50 / 60) / 100;
     if (level == 1) {
         unit_x = unit_x * 100;
         unit_y = unit_y * 100;
     } else if (level == 2) {
         unit_x = unit_x * 10;
         unit_y = unit_y * 10;
     } else if (level == 3) {
         unit_x = unit_x * 5;
         unit_y = unit_y * 5;
     }

     //計算網格的4個端點
     g[0] = [lat, lng];
     g[1] = [lat, lng + unit_x];
     g[2] = [lat + unit_y, lng + unit_x];
     g[3] = [lat + unit_y, lng];

     return g
 }