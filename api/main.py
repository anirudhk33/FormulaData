from flask import Flask, jsonify, request
import pandas as pd
import gdown

app = Flask(__name__)

# Google Drive file ID
file_id = '1dVKzWsdiImuWDDQ9CnRFSHK0Lcr_xK6P'
# Download the CSV file from Google Drive
url = f'https://drive.google.com/uc?id={file_id}'
output = 'data.csv'
gdown.download(url, output, quiet=False)
# Read the CSV file into a DataFrame
df = pd.read_csv(output)
# df = pd.read_csv('/Users/anirudhkrishna/GitHub/FormulaData/csv-data/cleaned_race_data.csv')
string_columns = df.select_dtypes(include='object').columns.tolist()
int_columns = df.select_dtypes(include='int64').columns.tolist()
float_columns = df.select_dtypes(include='float64').columns.tolist()
drivers_and_constructors = df[['driver_name', 'constructor_name']].drop_duplicates(subset=['driver_name', 'constructor_name'])
circuit_details = df[['location', 'latitude', 'longitude', 'circuit_length', 'circuit_full_name']].drop_duplicates(subset=['location'])
grand_prix_details = df[['season', 'round', 'location', 'circuit_full_name', 'latitude', 'longitude', 'circuit_length', 'date', 'weather']].drop_duplicates(subset=['season', 'round'])
key_data = df[['season', 'round', 'location', 'weather', 'driver_name', 'constructor_name', 'race_finishing_position', 'grid_position', 'points']]

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
            filtered_df = filtered_df[filtered_df[column].astype(float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(int) == int(value)]
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
            filtered_df = filtered_df[filtered_df[column].astype(float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(int) == int(value)]
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
            filtered_df = filtered_df[filtered_df[column].astype(float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(int) == int(value)]
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
            filtered_df = filtered_df[filtered_df[column].astype(float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(int) == int(value)]
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
            filtered_df = filtered_df[filtered_df[column].astype(float) == float(value)]
        elif column in int_columns:
            filtered_df = filtered_df[filtered_df[column].astype(int) == int(value)]
        else:
            filtered_df = filtered_df[filtered_df[column] == value]

    # Return the filtered data as JSON
    return jsonify(filtered_df.to_dict(orient='records'))


# @app.route('/api/f1/drivers_and_constructors', methods=['GET'])
# def get_drivers_and_constructors():
#     json_data_drivers_and_constructors = drivers_and_constructors.to_dict(orient='records')
#     return jsonify(json_data_drivers_and_constructors)


# @app.route('/api/f1/circuit_details', methods=['GET'])
# def get_circuit_details():
#     json_data_circuit = circuit_details.to_dict(orient='records')
#     return jsonify(json_data_circuit)


# @app.route('/api/f1/grand_prix_details', methods=['GET'])
# def get_grand_prix_details():
#     json_data_gps = grand_prix_details.to_dict(orient='records')
#     return jsonify(json_data_gps)


if __name__ == '__main__':
    app.run(debug=True)