from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import scrape


app = Flask(__name__)
CORS(app)

# Google Drive file ID
file_id = '1dVKzWsdiImuWDDQ9CnRFSHK0Lcr_xK6P'
# Google Drive download URL
url = f'https://drive.google.com/uc?id={file_id}'

# Read the CSV file directly from the URL into a DataFrame
df = pd.read_csv(url)


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


@app.route('/api/f1/fp_scraping', methods=['GET'])
def get_fp_data():

    arguments = request.args
    for key, val in arguments.items():
        if key not in ["location"]:
            return jsonify({"Error": "Incorrect Request - Please Check Arguments"})

    value = request.args.get("location")
    if value is not None:
        location = value

    
    FP1_results = scrape.FP_scrape_results(2023,2024,1, location)
    FP2_results = scrape.FP_scrape_results(2023,2024,2, location)
    FP3_results = scrape.FP_scrape_results(2023,2024,3, location)

    FP1_results["Driver"] = FP1_results["Driver"].apply(scrape.parse_driver_name)
    FP2_results["Driver"] = FP2_results["Driver"].apply(scrape.parse_driver_name)
    FP3_results["Driver"] = FP3_results["Driver"].apply(scrape.parse_driver_name)

    free_practice_results = FP1_results.merge(FP2_results, on=['Driver', 'season'], how='outer').merge(FP3_results, on=['Driver', 'season'], how='outer')

    free_practice_results.rename(columns={'Driver':'driver_name'}, inplace=True)
    # Return the filtered data as JSON
    return jsonify(free_practice_results.to_dict(orient='records'))


if __name__ == '__main__':
    app.run(debug=True)