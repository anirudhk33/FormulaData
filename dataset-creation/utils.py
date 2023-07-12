def parse_driver_name(row):
    words = row.split()
    parsed_string = ' '.join(words[:-1])
    return parsed_string


def parse_car_name(row):
    try:
        words = row.split()
    except:
        return row
    parsed_string = ' '.join(words)
    return parsed_string


def parse_location_name(link):
    country = link.split('/')[6]
    country_list = country.split('-')
    for i, word in enumerate(country_list):
        country_list[i] = word[0].upper() + word[1:]
    country = ' '.join(country_list)
    return country


def parse_weather_info(weather_string):
    weather_words = re.split(r'[^a-zA-Z]', weather_string)
    for i, word in enumerate(weather_words):
        weather_words[i] = word.lower()
    for word in wet:
        if word in weather_words:
            return 'wet'
    for word in cloudy:
        if word in weather_words:
            return 'cloudy'
    for word in dry:
        if word in weather_words:
            return 'dry'
    return 'dry'
        

def parse_date(date_string):
    modified_string = re.sub(r'[^a-zA-Z0-9]', ' ', date_string)
    modified_string = re.sub(r'\s+', ' ', modified_string)
    date_words = modified_string.split()

    if len(date_words)!=3:
        return None

    if date_words[1].isdigit() and not date_words[0].isdigit():
        temp = date_words[0]
        date_words[0] = date_words[1]
        date_words[1] = temp
    date = ' '.join(date_words[:2])+', '+date_words[2]
    return date



def has_fastest_lap(x):
    if x == 1.0:
        return 1
    else:
        return 0
    

def net_positions_gained(df):
    try:
        return int(df['grid_position']) - int(df['finishing_position'])
    except:
        try:
            if df['grid_position'] == "NC":
                return 20-int(df['finishing_position']) 
            if df['finishing_position'] == "NC":
                return int(df['grid_position']) - 20
            return None
        except:
            return None


def sprint_race_adjustments(driver_name, season, round, points_to_add, practices_to_remove, df):
    condition = (df['driver_name'] == driver_name & df['season']==season & df['round'] == round)
    df.loc[condition, 'points'] += points_to_add
    for i in range(3,3-practices_to_remove,-1):
        df.loc[condition, f'fp{i}_pos'] = None
    return df


def convert_to_int(x):
    try:
        return x.astype(int)
    except:
        return x