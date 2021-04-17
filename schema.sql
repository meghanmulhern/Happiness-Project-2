DROP TABLE happiness_data;
DROP TABLE country;


CREATE TABLE country (
    "country_id"  INT  PRIMARY KEY, 
    "country" VARCHAR NOT NULL,
    "region" VARCHAR NOT NULL
);

CREATE TABLE happiness_data (
	"id" SERIAL UNIQUE PRIMARY KEY, 
    "year" VARCHAR   NOT NULL,
    "country_id" INT,
    "happiness_score" FLOAT   NOT NULL,
    "gdp" FLOAT   NOT NULL,
    "life_expectancy" FLOAT   NOT NULL,
    "freedom_score" FLOAT NOT NULL,
	"trust_score" FLOAT NOT NULL,
    "generosity_score" FLOAT   NOT NULL,
	FOREIGN KEY (country_id) REFERENCES country(country_id)
);

select * from country
select * from happiness_data
