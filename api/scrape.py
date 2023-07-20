import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup

def parse_driver_name(row):
    words = row.split()
    parsed_string = ' '.join(words[:-1])
    return parsed_string



def FP_scrape_results(start, end, num, location):
    num = str(num)
    FP_results = pd.DataFrame()
    
    for year in range(start, end):
        races_url = f'https://www.formula1.com/en/results.html/{year}/races.html'
        response = requests.get(races_url)
        soup = BeautifulSoup(response.text, 'html.parser')

        race_links = []
        filter_links = soup.find_all('a', attrs={'class': 'resultsarchive-filter-item-link FilterTrigger'})
        for link in filter_links:
            href = link.get('href')
            if f'/en/results.html/{year}/races/' in href:
                race_links.append(href)

        year_df = pd.DataFrame()

        for race_link in race_links:
            # Check if "italy" exists in the URL
            if location in race_link.split('/'):
                FP_link = race_link.replace('race-result.html', f'practice-{num}.html')
                try:
                    df = pd.read_html(f'https://www.formula1.com{FP_link}')[0]
                    df = df[['Pos','Driver']]
                except Exception as e:
                    print(f"Error occurred: {e}")
                    try: 
                        ignore = pd.read_html(f'https://www.formula1.com{race_link}')[0]
                        continue
                    except:
                        continue
                df['season'] = year
                df = df.loc[:, ~df.columns.str.contains('Unnamed')]
                year_df = pd.concat([year_df, df], ignore_index=True)

        FP_results = pd.concat([FP_results, year_df], ignore_index=True)
    
    FP_results.rename(columns={'Pos': f'fp{num}_pos'}, inplace=True)
    return FP_results


# FP1_results = FP_scrape_results(2023,2024,1)
# FP2_results = FP_scrape_results(2023,2024,2)
# FP3_results = FP_scrape_results(2023,2024,3)

# FP1_results["Driver"] = FP1_results["Driver"].apply(parse_driver_name)
# FP2_results["Driver"] = FP2_results["Driver"].apply(parse_driver_name)
# FP3_results["Driver"] = FP3_results["Driver"].apply(parse_driver_name)

# free_practice_results = FP1_results.merge(FP2_results, on=['Driver', 'season', 'round'], how='outer').merge(FP3_results, on=['Driver', 'season', 'round'], how='outer')

# free_practice_results.rename(columns={'Driver':'driver_name'}, inplace=True)