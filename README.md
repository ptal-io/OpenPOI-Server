## OPENPOI API: v0.1 [ALPHA]
#### Table of Contents

[/poi/nearby](#/poi/nearby)&nbsp;&nbsp;![GET](https://github.com/spatialdev/static-api-docs/blob/master/images/get.png?raw=true)&nbsp;&nbsp;&nbsp;&nbsp;Return set of nearby POI.

[/checkin/get](#/checkin/get)&nbsp;&nbsp;![GET](https://github.com/spatialdev/static-api-docs/blob/master/images/get.png?raw=true)&nbsp;&nbsp;&nbsp;&nbsp;Return set of check-ins to a specified POI or by a specified user.


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
https://openpoi.org/poi/nearby?lat=38.9117609&lng=-77.0187946&key=abc123&offset=0&limit=50&q=
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
```

***
<br/>

#### <a id="/checkin/get">/checkin/get</a>&nbsp;&nbsp;![GET](https://github.com/spatialdev/static-api-docs/blob/master/images/get.png?raw=true)

Get a set of check-ins for a specified POI ID or specified USER ID.

##### Parameters
|Name|Required|Type|Description|
|---|---|---|---|
|poi or user|true|int|OpenPOI unique POI or USER identifier|
|limit|false|int|Number of check-ins to return (default: 50)|
|offset|false|int|Offset for pagination (default: 0)|
|key|false|float|API Key (currently not enforced)|

##### Success 200 (object)
|Name|Type|Description|
|---|---|---|
|message|string|Success message.|
|code|integer|Response code.|
|data|Array|Set of Check-Ins (oldest to most recent)|
| * poi|int|OpenPOI unique POI identifier|
| * user|int|OpenPOI unique USER identifier|
| * ts|timestamp with timezone|Date and time of check-in|
| * details|Object|User details Object|
| ** name|string|Full name of OpenPOI user|
| ** photo|int|Photo of OpenPOI User|


##### Error 500 (Object)
|Name|Type|Description|
|---|---|---|
|message|string|Error message.|
|code|integer|Response code.|



##### Example Requests:
```
https://openpoi.org/checkin/get?poi=366&key=abc123
https://openpoi.org/checkin/get?user=1&key=abc123
```

##### Sample Response:
```json
{
	"message":"success",
	"code":200,
	"data":[
		{
			"poi":366,
			"user":1,
			"ts":"Wed Jan 31 2018 04:32:35 GMT+0000 (UTC)",
			"userdetails":[
				{
					"id":1,
					"name": "Luke Skywalker",
					"photo": "https://static.comicvine.com/uploads/square_small/2/27836/637573-luke_skywalker.jpg"
				}

			]
		}
	]
}
```