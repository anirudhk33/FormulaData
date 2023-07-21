print("Pre lib")
from tensorflow import keras
import pandas as pd
import requests
import collections

print("Pre Load")
race_model = keras.models.load_model("race_model.h5")
quali_model = keras.models.load_model("quali_model.h5")
fl_model = keras.models.load_model("fl_model.h5")
X_sample = pd.read_csv("sample_data.csv")

# print("Pre Cleaning")
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
    'nyck_de_vries': 'toro_rosso',
    'george_russell': 'mercedes',
    'logan_sargeant': 'williams'
}



def get_location_details(location):
    url = 'https://formuladataapi.pythonanywhere.com/api/f1/circuit_data'
    filters = {}
    filters['location'] = location
    response = requests.get(url, params=filters)
    data = response.json()
    try:
      latitude = data[0]['latitude']
      longitude = data[0]['longitude']
      circuit_length = float(data[0]['circuit_length'][0:3])
    except:
      return None
    return [latitude, longitude, circuit_length]



def get_fp_details(driver, season, round):
    url = 'https://formuladataapi.pythonanywhere.com/api/f1'
    filters = {}
    filters['driver_name'] = driver
    filters['round'] = round
    filters['season'] = season
    response = requests.get(url, params=filters)
    data = response.json()
    try:
      fp1 = int(data[0]['fp1_position'])
    except:
      fp1 = None
    try:
      fp2 = int(data[0]['fp2_position'])
    except:
      fp2 = None
    try:
      fp3 = int(data[0]['fp3_position'])
    except:
      fp3 = None
    return [fp1, fp2, fp3]



def get_race_results_with_fp(map, season, round, location, location_arr, weather, XX, model, fps):
    race_results = {}
    weather_dict = {'dry':0, "cloudy":1, "wet":2}
    latitude = location_arr[0]
    longitude = location_arr[1]
    circuit_length = location_arr[2]

    for driver, team in map.items():
        datapoint = [0]*XX.shape[1]
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

        df = pd.DataFrame([datapoint], columns=XX.columns)
        test_prediction = model.predict(df ,verbose=0)
        race_results[driver] = test_prediction[0][0]
    # sorted_results = sorted(race_results.items(), key=lambda x: x[1], reverse = True)
    # sorted_results = collections.OrderedDict(sorted_results)
    return race_results

def get_fps(driver_team_mapping, season, round):
    fps = {}
    for driver, _ in driver_team_mapping.items():
        drivers = driver.split('_')
        for d in range(len(drivers)):
            drivers[d] = drivers[d][0].upper() + drivers[d][1:]
        driver_parsed = ' '.join(drivers)
        fps[driver] = get_fp_details(driver_parsed, season, round)
    return fps

# print("Pre FPS")
fps = get_fps(driver_team_mapping, 2023, 6)
# print("Pre locations")
location_arr = get_location_details("Monaco")
# print("POST locations")

results_fl = get_race_results_with_fp(driver_team_mapping, 2023, 6, "Monaco", location_arr, 'wet', X_fl, fl_model, fps)
# arr_fl = []
# for key, val in results_fl.items():
#     arr_fl.append((key,"{:.2f}".format(float(val))))
# for item in arr_fl:
#     print(item[0], item[1])



results_quali = get_race_results_with_fp(driver_team_mapping, 2023, 6, "Monaco", location_arr, 'wet', X_quali, quali_model, fps)
# arr_quali = []
# for key, val in results_quali.items():
#     arr_quali.append((key,"{:.2f}".format(float(val))))
# for item in arr_quali:
#     print(item[0], item[1])



results_race = get_race_results_with_fp(driver_team_mapping, 2023, 6, "Monaco", location_arr, 'wet', X_race, race_model, fps)
# arr_race = []
# for key, val in results_race.items():
#     arr_race.append((key,"{:.2f}".format(float(val))))
# for item in arr_race:
#     print(item[0], item[1])

print(results_race)