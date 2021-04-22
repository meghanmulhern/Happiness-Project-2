import numpy as np
from flask import Flask, jsonify
import pandas as pd
from flask import Flask, jsonify, Response
from flask_cors import CORS
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)
engine = create_engine("sqlite:///happiness_db.sqlite")


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
# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/happiness_db<br/>"
#     )

@app.route("/api/v1.0/happiness_db/countries")
def countries_data():
    """Return the happiness_db data as json"""
# @app.route("/api/v1.0/happiness_db/countries")
# def countries_data():
#     """Return the happiness_db data as json"""

    # Create our session (link) from Python to the DB
    session = Session(engine)
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(countries.country, countries.country_id, countries.region).all()
#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(countries.country, countries.country_id, countries.region).all()

    session.close()
#     session.close()

    country_data = []
    for country, country_id, region in results:
        nation_dict = {}
        nation_dict["country_id"] = country_id
        nation_dict["region"] = region
        nation_dict["country"] = country
        country_data.append(nation_dict)
#     country_data = []
#     for country, country_id, region in results:
#         nation_dict = {}
#         nation_dict["country_id"] = country_id
#         nation_dict["region"] = region
#         nation_dict["country"] = country
#         country_data.append(nation_dict)

    return jsonify(country_data)
#     return jsonify(country_data)


    # return jsonify(country_names)
@app.route("/api/v1.0/happiness_db/happiness_data")
def happiness_func():
    """Return the happiness_db data as json"""
#     # return jsonify(country_names)
# @app.route("/api/v1.0/happiness_db/happiness_data")
# def happiness_func():
#     """Return the happiness_db data as json"""

    # Create our session (link) from Python to the DB
    session = Session(engine)
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(happiness_data.happy_id, happiness_data.year, happiness_data.country_id, happiness_data.happiness_score, happiness_data.gdp, happiness_data.life_expectancy, happiness_data.freedom_score, happiness_data.trust_score, happiness_data.generosity_score).all()
#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(happiness_data.happy_id, happiness_data.year, happiness_data.country_id, happiness_data.happiness_score, happiness_data.gdp, happiness_data.life_expectancy, happiness_data.freedom_score, happiness_data.trust_score, happiness_data.generosity_score).all()

    session.close()
#     session.close()

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
#     # Convert list of tuples into normal list
#     happiness_dict = []
#     for happy_id, year, country_id, happiness_score, gdp, life_expectancy, freedom_score, trust_score, generosity_score in results:
#         happy_dict = {}
#         happy_dict["happy_id"] = happy_id
#         happy_dict["year"] = year
#         happy_dict["country_id"] = country_id
#         happy_dict["happiness_score"] = happiness_score
#         happy_dict["gdp"] = gdp
#         happy_dict["life_expectancy"] = life_expectancy
#         happy_dict["freedom_score"] = freedom_score
#         happy_dict["trust_score"] = trust_score
#         happy_dict["generosity_score"] = generosity_score
#         happiness_dict.append(happy_dict)

    return jsonify(happiness_dict)
#     return jsonify(happiness_dict)


# @app.route("/")
# def welcome():
#     return (
#         f"Welcome to the Justice League API!<br/>"
#         f"Available Routes:<br/>"
#         f"/api/v1.0/justice-league"
#     )
@app.route("/api/v1.0/happiness")
def happiness(): 
    # session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    # results = session.query(happiness_data.happy_id, happiness_data.year, happiness_data.country_id,    
    #     happiness_data.happiness_score, happiness_data.gdp, happiness_data.life_expectancy, 
    #     happiness_data.freedom_score, happiness_data.trust_score, happiness_data.generosity_score,
    #         countries.country, countries.country_id, countries.region).filter(
    #         happiness_data.country_id == countries.country_id
    #     ).all()
    happiness_df = pd.read_sql('SELECT * FROM happiness_data', engine)
    countries_df = pd.read_sql('SELECT * FROM country', engine)
    joined_df = pd.merge(happiness_df, countries_df, on = "country_id")
    print(len(joined_df))
    print(len(happiness_df))
    print(len(countries_df))

    # session.close()
    return Response(joined_df.to_json(orient = "records"),mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True)