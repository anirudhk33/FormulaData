print("Imports have started")
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import scrape
from tensorflow import keras
import numpy as np
import requests
print("Imports complete")

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Backup season average Data
avgFP1Pos = {
    "Max Verstappen": 2.4,
    "Lewis Hamilton": 8.2,
    "Sergio Perez": 3.7,
    "Fernando Alonso": 4.7,
    "Carlos Sainz": 7.1,
    "George Russell": 11.1,
    "Charles Leclerc": 5.8,
    "Esteban Ocon": 12.6,
    "Lando Norris": 11.2,
    "Pierre Gasly": 12.4,
    "Lance Stroll": 7.6,
    "Yuki Tsunoda": 14.3,
    "Oscar Piastri": 12.4,
    "Zhou Guanyu": 14.2,
    "Valtteri Bottas": 12.9,
    "Nico Hulkenberg": 14.5,
    "Daniel Ricciardo": 12.8,
    "Kevin Magnussen": 12.8,
    "Alexander Albon": 12.3,
    "Logan Sargeant": 17.3,
}

# Data for avgFP2Pos
avgFP2Pos = {
    "Max Verstappen": 2.0,
    "Lando Norris": 9.4,
    "Lewis Hamilton": 9.6,
    "Oscar Piastri": 14.2,
    "George Russell": 9.0,
    "Sergio Perez": 4.4,
    "Fernando Alonso": 4.4,
    "Alexander Albon": 13.5,
    "Charles Leclerc": 5.8,
    "Carlos Sainz": 5.6,
    "Logan Sargeant": 17.7,
    "Valtteri Bottas": 13.4,
    "Nico Hulkenberg": 10.0,
    "Lance Stroll": 9.8,
    "Zhou Guanyu": 13.7,
    "Yuki Tsunoda": 15.7,
    "Daniel Ricciardo": 17.4,
    "Pierre Gasly": 10.2,
    "Kevin Magnussen": 14.4,
    "Esteban Ocon": 9.8,
}

# Data for avgFP3Pos
avgFP3Pos = {
    "Max Verstappen": 1.8,
    "Lando Norris": 12.4,
    "Lewis Hamilton": 7.1,
    "Oscar Piastri": 13.6,
    "George Russell": 9.8,
    "Sergio Perez": 5.7,
    "Fernando Alonso": 5.9,
    "Alexander Albon": 12.8,
    "Charles Leclerc": 4.8,
    "Carlos Sainz": 5.4,
    "Logan Sargeant": 16.5,
    "Valtteri Bottas": 12.9,
    "Nico Hulkenberg": 13.2,
    "Lance Stroll": 8.3,
    "Zhou Guanyu": 13.4,
    "Yuki Tsunoda": 13.8,
    "Daniel Ricciardo": 16.0,
    "Pierre Gasly": 10.2,
    "Kevin Magnussen": 13.5,
    "Esteban Ocon": 12.9,
}

driver_team_mapping = {
    'max_verstappen': 'red_bull_racing',
    'fernando_alonso': 'aston_martin',
    'lewis_hamilton': 'mercedes',
    'charles_leclerc': 'ferrari',
    'carlos_sainz': 'ferrari',
    'sergio_perez': 'red_bull_racing',
    'alexander_albon': 'williams',
    'esteban_ocon': 'aston_martin',
    'lance_stroll': 'aston_martin',
    'valtteri_bottas': 'alfa_romeo',
    'oscar_piastri': 'mclaren',
    'pierre_gasly': 'renault',
    'lando_norris': 'mclaren',
    'yuki_tsunoda': 'toro_rosso',
    'nico_hulkenberg': 'haas',
    'zhou_guanyu': 'alfa_romeo',
    'kevin_magnussen': 'haas',
    'daniel_ricciardo': 'toro_rosso',
    'george_russell': 'mercedes',
    'logan_sargeant': 'williams'
}

locationRounds = [
  "Bahrain",
  "Saudi Arabia",
  "Australia",
  "Azerbaijan",
  "Miami",
  "Monaco",
  "Spain",
  "Canada",
  "Austria",
  "Great Britain",
  "Hungary",
  "Belgium",
  "Netherlands",
  "Singapore",
  "Japan",
  "Qatar",
  "United States",
  "Mexico",
  "Brazil",
  "Las Vegas",
  "Abu Dhabi"
]

def convert_location_string(word):
    words_list = word.split('-')
    capitalized_words = [w.capitalize() for w in words_list]
    return ' '.join(capitalized_words)


def get_location_details(location, df):
    location_data = df[df['location'] == location]
    if location_data.empty:
        return [0,0,4.5]
    latitude = location_data['latitude'].values[0]
    longitude = location_data['longitude'].values[0]
    circuit_length = location_data['circuit_length'].values[0]
    try:
        circuit_length = float(circuit_length[0:3])
    except:
        circuit_length = 4.85
    return [latitude, longitude, circuit_length]


def get_race_results_with_fp(map, season, round, location, location_arr, weather, XX, model, fps):
    race_results = {}
    weather_dict = {'dry': 0, "cloudy": 1, "wet": 2}
    latitude = location_arr[0]
    longitude = location_arr[1]
    circuit_length = location_arr[2]

    datapoints = []
    drivers = []
    teams = []

    for driver, team in map.items():
        datapoint = [0] * XX.shape[1]
        datapoint[0] = season
        datapoint[1] = round
        datapoint[2] = weather_dict[weather]
        try:
            datapoint[3] = float(fps[driver][0])
        except:
            datapoint[3] = 20
        try:
            datapoint[4] = float(fps[driver][1])
        except:
            datapoint[4] = 20
        try:
            datapoint[5] = float(fps[driver][2])
        except:
            datapoint[5] = 20
        datapoint[6] = circuit_length
        datapoint[7] = latitude
        datapoint[8] = longitude

        loc = location.lower().replace(' ', '_')
        location_index = XX.columns.get_loc(f'location_{loc}')
        datapoint[location_index] = 1

        driver_index = XX.columns.get_loc(f'driver_name_{driver}')
        team_index = XX.columns.get_loc(f'constructor_name_{team}')
        datapoint[driver_index] = 1
        datapoint[team_index] = 1

        datapoints.append(datapoint)
        drivers.append(driver)
        teams.append(team)

    df = pd.DataFrame(datapoints, columns=XX.columns)
    test_predictions = model.predict(df, verbose=0)

    for i in range(len(drivers)):
        race_results[drivers[i]] = test_predictions[i][0]

    return race_results



def get_fps(fpdf):
    fpdf = fpdf.fillna(20)
    fp_dict = {}
    for index, row in fpdf.iterrows():
        driver_name = row['driver_name']
        words = driver_name.lower().split(' ')
        driver_name = '_'.join(words)
        fp1_pos = row['fp1_pos']
        fp2_pos = row['fp2_pos']
        fp3_pos = row['fp3_pos']
        fp_dict[driver_name] = [fp1_pos, fp2_pos, fp3_pos]
    return fp_dict
    



df_avgFP1Pos = pd.DataFrame(avgFP1Pos.items(), columns=["Driver", "fp1_pos"])
df_avgFP1Pos["season"] = 2023
df_avgFP2Pos = pd.DataFrame(avgFP2Pos.items(), columns=["Driver", "fp2_pos"])
df_avgFP2Pos["season"] = 2023
df_avgFP3Pos = pd.DataFrame(avgFP3Pos.items(), columns=["Driver", "fp3_pos"])
df_avgFP3Pos["season"] = 2023

print("Function Definitions Over")

# Google Drive file ID
file_id = '1dVKzWsdiImuWDDQ9CnRFSHK0Lcr_xK6P'
# Google Drive download URL
url = f'https://drive.google.com/uc?id={file_id}'

# Read the CSV file directly from the URL into a DataFrame
df = pd.read_csv(url)

print("Downloaded URL")


# df = pd.read_csv('/Users/anirudhkrishna/GitHub/FormulaData/csv-data/cleaned_race_data.csv')
string_columns = df.select_dtypes(include='object').columns.tolist()
int_columns = df.select_dtypes(include='int64').columns.tolist()
float_columns = df.select_dtypes(include='float64').columns.tolist()
drivers_and_constructors = df[['driver_name', 'constructor_name']].drop_duplicates(
    subset=['driver_name', 'constructor_name'])
circuit_details = df[['location', 'latitude', 'longitude', 'circuit_length',
                      'circuit_full_name']].drop_duplicates(subset=['location'])
grand_prix_details = df[['season', 'round', 'location', 'circuit_full_name', 'latitude',
                         'longitude', 'circuit_length', 'date', 'weather']].drop_duplicates(subset=['season', 'round'])
key_data = df[['season', 'round', 'location', 'weather', 'driver_name',
               'constructor_name', 'race_finishing_position', 'grid_position', 'points']]


@app.route('/api/f1', methods=['GET'])
def get_full_filtered_data():
    filters = {}
    arguments = request.args
    for key, val in arguments.items():
        if key not in df.columns:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    # Get the query parameters
    for column in df.columns:
        value = request.args.get(column)
        if value is not None:
            filters[column] = value

    # Apply the filters
    filtered_df = df
    for column, value in filters.items():
        if column in string_columns:
            filtered_df = filtered_df[filtered_df[column].astype(str) == value]
        elif column in float_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                int) == int(value)]
        else:
            filtered_df = filtered_df[filtered_df[column] == value]

    # Return the filtered data as JSON
    return jsonify(filtered_df.to_dict(orient='records'))


@app.route('/api/f1/key_data', methods=['GET'])
def get_key_filtered_data():
    filters = {}
    arguments = request.args
    for key, val in arguments.items():
        if key not in df.columns:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    # Get the query parameters
    for column in df.columns:
        value = request.args.get(column)
        if value is not None:
            filters[column] = value

    # Apply the filters
    filtered_df = key_data
    for column, value in filters.items():
        if column in string_columns:
            filtered_df = filtered_df[filtered_df[column].astype(str) == value]
        elif column in float_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                int) == int(value)]
        else:
            filtered_df = filtered_df[filtered_df[column] == value]

    # Return the filtered data as JSON
    return jsonify(filtered_df.to_dict(orient='records'))


@app.route('/api/f1/drivers_and_constructors', methods=['GET'])
def get_drivers_and_constructors_data():
    filters = {}
    arguments = request.args
    for key, val in arguments.items():
        if key not in df.columns:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    # Get the query parameters
    for column in df.columns:
        value = request.args.get(column)
        if value is not None:
            filters[column] = value

    # Apply the filters
    filtered_df = drivers_and_constructors
    for column, value in filters.items():
        if column in string_columns:
            filtered_df = filtered_df[filtered_df[column].astype(str) == value]
        elif column in float_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                int) == int(value)]
        else:
            filtered_df = filtered_df[filtered_df[column] == value]

    # Return the filtered data as JSON
    return jsonify(filtered_df.to_dict(orient='records'))


@app.route('/api/f1/grand_prix_data', methods=['GET'])
def get_grand_prix_data():
    filters = {}
    arguments = request.args
    for key, val in arguments.items():
        if key not in df.columns:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    # Get the query parameters
    for column in df.columns:
        value = request.args.get(column)
        if value is not None:
            filters[column] = value

    # Apply the filters
    filtered_df = grand_prix_details
    for column, value in filters.items():
        if column in string_columns:
            filtered_df = filtered_df[filtered_df[column].astype(str) == value]
        elif column in float_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                int) == int(value)]
        else:
            filtered_df = filtered_df[filtered_df[column] == value]

    # Return the filtered data as JSON
    return jsonify(filtered_df.to_dict(orient='records'))


@app.route('/api/f1/circuit_data', methods=['GET'])
def get_circuit_data():
    filters = {}
    arguments = request.args
    for key, val in arguments.items():
        if key not in df.columns:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    # Get the query parameters
    for column in df.columns:
        value = request.args.get(column)
        if value is not None:
            filters[column] = value

    # Apply the filters
    filtered_df = circuit_details
    for column, value in filters.items():
        if column in string_columns:
            filtered_df = filtered_df[filtered_df[column].astype(str) == value]
        elif column in float_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(
                int) == int(value)]
        else:
            filtered_df = filtered_df[filtered_df[column] == value]

    # Return the filtered data as JSON
    return jsonify(filtered_df.to_dict(orient='records'))


@app.route('/api/f1/predictions', methods=['GET'])
def get_predictions():

    arguments = request.args
    for key, val in arguments.items():
        if key not in ["location", "fp"]:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    value = request.args.get("location")
    if value is not None:
        location = value
    
    value = request.args.get("fp")
    if value is not None:
        scrapePractice = value

    if scrapePractice == "yes":
        print("Scraping Data")
        FP1_results = scrape.FP_scrape_results(2023,2024,1, location)
        FP2_results = scrape.FP_scrape_results(2023,2024,2, location)
        FP3_results = scrape.FP_scrape_results(2023,2024,3, location)
        print("Scraped Data")

    try:
        FP1_results["Driver"] = FP1_results["Driver"].apply(scrape.parse_driver_name)
    except:
        try:
            FP1_results = df_avgFP1Pos
            mask = (df['season'] == 2022) & (df['location'] == convert_location_string(location))
            prev_df = df.loc[mask, ['driver_name', 'fp1_position']]
            if prev_df.empty:
                raise AssertionError("DataFrame 'df' is empty.")
            prev_df.rename(columns={'driver_name':'Driver'}, inplace=True)
            merged_df = FP1_results.merge(prev_df, on=['Driver'], how='left').fillna(20)
            merged_df['fp1_pos'] = (merged_df['fp1_position'] + merged_df['fp1_pos']) / 2.0
            merged_df.drop(columns=['fp1_position'], inplace=True)
            FP1_results = merged_df
        except:
            FP1_results = df_avgFP1Pos
    try:
        FP2_results["Driver"] = FP2_results["Driver"].apply(scrape.parse_driver_name)
    except:
        try:
            FP2_results = df_avgFP2Pos
            mask = (df['season'] == 2022) & (df['location'] == convert_location_string(location))
            prev_df = df.loc[mask, ['driver_name', 'fp2_position']]
            if prev_df.empty:
                raise AssertionError("DataFrame 'df' is empty.")
            prev_df.rename(columns={'driver_name':'Driver'}, inplace=True)
            merged_df = FP2_results.merge(prev_df, on=['Driver'], how='left').fillna(20)
            merged_df['fp2_pos'] = (merged_df['fp2_position'] + merged_df['fp2_pos']) / 2.0
            merged_df.drop(columns=['fp2_position'], inplace=True)
            FP2_results = merged_df
        except:
            FP2_results = df_avgFP2Pos

    try:
        FP3_results["Driver"] = FP3_results["Driver"].apply(scrape.parse_driver_name)
    except:
        try:
            FP3_results = df_avgFP3Pos
            mask = (df['season'] == 2022) & (df['location'] == convert_location_string(location))
            prev_df = df.loc[mask, ['driver_name', 'fp3_position']]
            if prev_df.empty:
                raise AssertionError("DataFrame 'df' is empty.")
            prev_df.rename(columns={'driver_name':'Driver'}, inplace=True)
            merged_df = FP3_results.merge(prev_df, on=['Driver'], how='left').fillna(20)
            merged_df['fp3_pos'] = (merged_df['fp3_position'] + merged_df['fp3_pos']) / 2.0
            merged_df.drop(columns=['fp3_position'], inplace=True)
            FP3_results = merged_df
        except:
            FP3_results = df_avgFP3Pos
    
    try:
        free_practice_results = FP1_results.merge(FP2_results, on=['Driver', 'season'], how='outer').merge(FP3_results, on=['Driver', 'season'], how='outer')
    except:
        free_practice_results = df_avgFP1Pos.merge(df_avgFP2Pos, on=['Driver', 'season'], how='outer').merge(df_avgFP3Pos, on=['Driver', 'season'], how='outer')

    free_practice_results.rename(columns={'Driver':'driver_name'}, inplace=True)

    race_model = keras.models.load_model("race_model.h5")
    quali_model = keras.models.load_model("quali_model.h5")
    fl_model = keras.models.load_model("fl_model.h5")
    X_sample = pd.read_csv("sample_data.csv")

    race_data = X_sample.iloc[:]
    race_data["in_top_5"] = race_data['race_finishing_position'].apply(lambda x: 1 if x<=5 else 0)
    race_data = race_data.drop(["grid_position", "has_fastest_lap","race_laps_completed","points", "fastest_lap_position", "race_finishing_position"], axis = 1)
    X_race = race_data.drop('in_top_5', axis=1)  
    quali_data = X_sample.iloc[:]
    quali_data["in_top_5"] = quali_data['grid_position'].apply(lambda x: 1 if x<=5 else 0)
    quali_data = quali_data.drop(["grid_position", "has_fastest_lap","race_laps_completed","points", "fastest_lap_position", "race_finishing_position"], axis = 1)
    X_quali = quali_data.drop('in_top_5', axis=1) 
    fl_data = X_sample.iloc[:]
    fl_data["in_top_5"] = fl_data['fastest_lap_position'].apply(lambda x: 1 if x<=5 else 0)
    fl_data = fl_data.drop(["grid_position", "has_fastest_lap","race_laps_completed","points", "fastest_lap_position", "race_finishing_position"], axis = 1)
    X_fl = fl_data.drop('in_top_5', axis=1) 


    print("Scraping Location Details")
    fps = get_fps(free_practice_results)
    location_arr = get_location_details(convert_location_string(location), circuit_details)
    round = locationRounds.index(convert_location_string(location))+1

    
    print("Models have started running")

    results_fl = get_race_results_with_fp(driver_team_mapping, 2023, round, convert_location_string(location), location_arr, 'dry', X_fl, fl_model, fps)
    results_quali = get_race_results_with_fp(driver_team_mapping, 2023, round, convert_location_string(location), location_arr, 'dry', X_quali, quali_model, fps)
    results_race = get_race_results_with_fp(driver_team_mapping, 2023, round, convert_location_string(location), location_arr, 'dry', X_race, race_model, fps)

    print("Models have run")

    driver_results = {}

    for driver, prob_race in results_race.items():
        prob_quali = results_quali.get(driver, None)
        prob_fl = results_fl.get(driver, None)

        driver_dict = {
            "race_probability": str(prob_race),
            "quali_probability": str(prob_quali),
            "fl_probability": str(prob_fl)
        }
        driver_results[driver] = driver_dict
    print("Returning Results")
    return jsonify(driver_results)


if __name__ == '__main__':
    app.run(debug=False)