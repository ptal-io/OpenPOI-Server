
DROP FUNCTION poi_nearby(numeric,numeric,integer,integer);

CREATE OR REPLACE FUNCTION poi_nearby(numeric, numeric, int, int, q varchar)
 RETURNS TABLE (osm_type varchar, id int, osm_id varchar, osm_cat int, osm_lat float8, osm_lng float8, osm_name varchar, distance float8, direction float8) AS
 $$
 #variable_conflict use_column
BEGIN
 IF q IS NULL THEN
 	RETURN QUERY SELECT type, id, osm_id, osm_cat, osm_lat, osm_lng, osm_name, round(st_distance_sphere(geom, st_setsrid(st_makepoint($2,$1),4326))*3.28084) as distance, round(ST_Azimuth(geom, st_setsrid(st_makepoint($2,$1),4326))*57.2958) as direction FROM poi WHERE ST_DWithin(geom, st_setsrid(st_makepoint($2,$1),4326), 0.111) ORDER BY st_distance(geom, st_setsrid(st_makepoint($2,$1),4326)) LIMIT $3 OFFSET $4;
 ELSE
 	RETURN QUERY SELECT type, id, osm_id, osm_cat, osm_lat, osm_lng, osm_name, round(st_distance_sphere(geom, st_setsrid(st_makepoint($2,$1),4326))*3.28084) as distance, round(ST_Azimuth(geom, st_setsrid(st_makepoint($2,$1),4326))*57.2958) as direction FROM poi WHERE ST_DWithin(geom, st_setsrid(st_makepoint($2,$1),4326), 0.111) AND osm_name ilike '%' || q || '%' ORDER BY st_distance(geom, st_setsrid(st_makepoint($2,$1),4326)) LIMIT $3 OFFSET $4;
 END IF;
END
$$ LANGUAGE plpgsql;