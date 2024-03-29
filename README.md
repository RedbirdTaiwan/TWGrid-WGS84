# TWGrid-WGS84 台灣經緯網格系統
## 簡介
一個基於WGS84座標系統，以經緯度切割劃分，適合於網頁動態呈現的台灣網格系統。
## 座標系統與範圍
 1. 基於WGS84座標系統。
 2. 網格涵蓋範圍為經度116度至124度，緯度20度至26度40分，涵蓋台灣及外島的陸、海域。
 ![台灣網格系統](/img/TWGrid.jpg)
## 網格系統與編號
網格分為4層級
### Level 1
1. 邊長：經度1度，緯度50分，長約100公里。
2. 編號：以YYXX四碼組成，以西南角的座標為基準，YY=西南角緯度x1.2，XX=西南角經度-100。  
例：西南角的座標為(116度E, 20度N)，YY=20x1.2=24，XX=116-100=16，編號=2416。
3. 面積：9174~9656平方公里，平均為9415±241平方公里。
![Level 1網格](/img/level1.png)
### Level 2: 將Level 1網格於經度及緯度各十等分
1. 邊長：經度6分，緯度5分，長約10公里。
2. 編號：以Level 1編號及短橫線接YX兩碼組成，Y以緯度十等分由南而北為0至9，X以經度十等分由西而東為0至9。  
例：網格2416的緯度第一格，經度第二格之網格編號為2416-01。
3. 面積：91.4~96.8平方公里，平均為94.1±2.7平方公里。
![Level 2網格](/img/level2.png)
### Level 3: 將Level 2網格於經度及緯度各二等分
1. 邊長：經度3分，緯度2分30秒，長約5公里。
2. 編號：以Level 2編號及短橫線接YX兩碼組成，Y以緯度二等分由南而北為0至1，X以經度二等分由西而東為0至1。  
例：網格2416-00的緯度第二格，經度第一格之網格編號為2416-00-10。
3. 面積：22.9~24.2平方公里，平均為23.55±0.65平方公里。
![Level 3網格](/img/level3.png)
### Level 4: 將Level 3網格於經度及緯度各五等分
1. 邊長：經度36秒，緯度30秒，長約1公里。
2. 編號：以Level 3編號及短橫線接YX兩碼組成，Y以緯度五等分由南而北為0至4，X以經度五等分由西而東為0至4。  
例：網格2416-00-00的緯度第一格，經度第二格之網格編號為2416-00-00-01。
3. 面積：0.91~0.97平方公里，平均為0.94±0.03平方公里。
![Level 4網格](/img/level4.png)

## 陸域網格
以內政部國土測繪中心鄉鎮市區界線(TWD97經緯度)圖資(https://data.gov.tw/dataset/7441)套疊取得網格內涵蓋陸域之編號清單: GridsinLand.txt

## 範例
1. [htmlsample/TWGRID_WGS84.html](https://redbirdtaiwan.github.io/TWGrid-WGS84/htmlsample/TWGRID_WGS84.html)網頁範例可依地圖比例尺動態呈現不同層級之網格，且可點擊地圖上任何一點獲得該位置之網格編號。  
javascript函式位於[htmlsample/TWGRID_WGS84.js](https://github.com/RedbirdTaiwan/TWGrid-WGS84/blob/master/htmlsample/TWGRID_WGS84.js)。
2. https://gapfiller.tbn.org.tw/ eBird Taiwan秋季大挑戰 使用本網格系統。
3. [Google Earth 100公里網格kmz檔](grids_100km.kmz)
4. [Google Earth 10公里台灣陸域網格kmz檔](grids_10km_land.kmz)
4. [Google Earth 5公里台灣陸域網格kmz檔](grids_5km_land.kmz)
4. [Google Earth 1公里台灣陸域網格kmz檔](grids_1km_land.kmz)
