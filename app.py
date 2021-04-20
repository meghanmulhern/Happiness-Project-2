import numpy as np
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from credentials import username, password


#################################################
# Database Setup
#################################################
rds_connection_string = (f'{username}:{password}@localhost:5432/happiness_db')
engine = create_engine(f'postgresql://{rds_connection_string}')

# engine = create_engine('sqlite:///happiness_db.sqlite')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
countries = Base.classes.country
happiness_data = Base.classes.happiness_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/happiness_db<br/>"
    )

@app.route("/api/v1.0/happiness_db/countries")
def countries_data():
    """Return the happiness_db data as json"""

    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(countries.country, countries.country_id, countries.region).all()

    session.close()

    country_data = []
    for country, country_id, region in results:
        nation_dict = {}
        nation_dict["country_id"] = country_id
        nation_dict["region"] = region
        nation_dict["country"] = country
        country_data.append(nation_dict)

    return jsonify(country_data)


    # return jsonify(country_names)
@app.route("/api/v1.0/happiness_db/happiness_data")
def happiness_func():
    """Return the happiness_db data as json"""

    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(happiness_data.happy_id, happiness_data.year, happiness_data.country_id, happiness_data.happiness_score, happiness_data.gdp, happiness_data.life_expectancy, happiness_data.freedom_score, happiness_data.trust_score, happiness_data.generosity_score).all()

    session.close()

    # Convert list of tuples into normal list
    happiness_dict = []
    for happy_id, year, country_id, happiness_score, gdp, life_expectancy, freedom_score, trust_score, generosity_score in results:
        happy_dict = {}
        happy_dict["happy_id"] = happy_id
        happy_dict["year"] = year
        happy_dict["country_id"] = country_id
        happy_dict["happiness_score"] = happiness_score
        happy_dict["gdp"] = gdp
        happy_dict["life_expectancy"] = life_expectancy
        happy_dict["freedom_score"] = freedom_score
        happy_dict["trust_score"] = trust_score
        happy_dict["generosity_score"] = generosity_score
        happiness_dict.append(happy_dict)

    return jsonify(happiness_dict)


# @app.route("/")
# def welcome():
#     return (
#         f"Welcome to the Justice League API!<br/>"
#         f"Available Routes:<br/>"
#         f"/api/v1.0/justice-league"
#     )


if __name__ == "__main__":
    app.run(debug=True)
