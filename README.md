## OPENPOI API: v1.0
#### Table of Contents

[/poi/nearby](#/poi/nearby)&nbsp;&nbsp;![GET](https://github.com/spatialdev/static-api-docs/blob/master/images/get.png?raw=true)&nbsp;&nbsp;&nbsp;&nbsp;Return set of nearby POI.


***
<br/>

#### <a id="/poi/nearby">/poi/nearby</a>&nbsp;&nbsp;![GET](https://github.com/spatialdev/static-api-docs/blob/master/images/get.png?raw=true)

Get a set of nearby POI ranked by distance from query geographic coordinates

##### Parameters
|Name|Required|Type|Description|
|---|---|---|---|
|lat|true|float|Latitude of query location|
|lng|true|float|Longitude of query location|
|limit|true|int|Number of POI to return (default: 50)|
|offset|true|int|Offset for pagination (default: 0)|
|key|false|float|API Key (currently not enforced)|
|q|false|string|Optional query parameter|

##### Success 200 (object)
|Name|Type|Description|
|---|---|---|
|message|string|Success message.|
|code|integer|Response code.|
|data|Array|Set of POIs ordered by distance (closest to farthest)|
| * id|int|OpenPOI unique identifier|
| * osm_id|string|OpenStreetMap unique identifier (if available)|
| * osm_lat|float|OpenStreetMap POI latitude|
| * osm_lng|float|OpenStreetMap POI longitude|
| * osm_name|string|OpenStreetMap POI name|
| * osm_cat|int|OpenStreetMap category identifier|
| * osm_type|string|OpenStreetMap category name|
| * distance|int|Distance from query location in feet|
| * direction|string|Direction from query location|
| * avatar|string|URL of base category icon|

##### Error 500 (Object)
|Name|Type|Description|
|---|---|---|
|message|string|Error message.|
|code|integer|Response code.|



##### Example Requests:
```
https://openpoi.org/poi/nearby?lat=38.9117609&lng=-77.0187946&key=KL2RmYfnyEqS7nd00nGo5czG25qayHdF&offset=0&limit=50&q=
```

##### Sample Response:
```json
{
	"message":"success",
	"code":200,
	"data":[
		{
			"osm_type":"School",
			"id":366,
			"osm_id":"N358954913",
			"osm_cat":21,
			"osm_lat":38.9123337,
			"osm_lng":-77.018032,
			"osm_name":"Morse School",
			"distance":301,
			"direction":"Northeast",
			"avatar":"https://openpoi.org/img/04.jpg"
		}
	]
}