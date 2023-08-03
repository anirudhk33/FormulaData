# FormulaData

## Table of Contents

- [Overview](#overview)
- [Motivation](#motivation)
- [Application Design](#application-design)
- [Performance & Accuracy](#performance-and-accuracy)
- [Tools & Sources](#tools-and-sources)

## Overview
**_FormulaData_** is a full-stack application that aims to elevate your Formula 1 experience through the power of machine learning. This app comprises two main components: Fantasy Builder and FormulaData API. With FormulaData, you can optimize and automate the creation of your ideal [F1 Fantasy](https://fantasy.formula1.com/en/) team with flexibility. Additionally, you gain access to an **intuitive API** that allows you to query a vast repository of F1 race data spanning all the way back to 1950.

## Motivation
FormulaData originated from my avid participation in Formula 1 fantasy leagues. Determined to gain a competitive edge, I envisioned a software solution to automate and optimize the fantasy team selection process. However, finding reliable and expansive datasets proved challenging, with many sources lacking crucial data like race weather conditions. Therefore, I consolidated a comprehensive dataset. Hoping to make this resource accessible to all, I transformed it into an intuitive API. Now, data analysts, software developers, and Formula 1 enthusiasts can leverage FormulaData API for insightful data analysis and seamless integration into their applications.

## Application Design
### Fantasy Builder Design:
* Tensorflow models trained to predict race performance metrics given an input tensor containing 100+ features
* React frontend collects minimal data from user (race-track, current budget, fantasy chips available, strategy, etc)
* Based on user-data, a python script scrapes the net for remaining essential features and fills up the input tensor
* Race performance metrics of each driver are transmitted to frontend via Flask API endpoint
* From given metrics, Javascript algorithms optimize fantasy team recommendations adhering to appropriate rules
<br/>
<p>
  <img src="https://github.com/anirudhk33/FormulaData/assets/114661218/ef38db1b-51a9-4298-b89c-d1aae1e67727" height="400"  />
  &nbsp;
  <img src="https://github.com/anirudhk33/FormulaData/assets/114661218/303a450f-e591-458c-882d-06840fb7cbdf" height="400"  />
</p>

### API Design:
* Web scraping scripts are executed monthly to maintain up-to-date Formula 1 data for every race since 1950
* Data is cleaned, semi-transformed, and stored in google database
* Multiple REST API endpoints developed via flask to query the repository conveniently (with filtering flexiblity)

## Performance and Accuracy
### Tensorflow Model Performance:
The race performance metrics predicted for each weekend include race finishing order, qualifying order, fastest lap, and a few more.
I implemented the following algorithms: Linear Regression, Logistic Regression, Decision Trees, Random Forests, Support Vector Machines, K Nearest Neighbors, Naive Bayes, FC Neural Network Regression, and FC Neural Network Classification. After tuning the hyperparameters, it seemed that FC Neural Network Classification (FCNNC) performed the best. The below table contains the performance metrics for the FCNNC. <br/>

| Prediction Type        | Accuracy| Jaro-Winkler Similarity |
|------------------------|---------|-------------------------|
| Race Finishing Order   | 78%     | 86%                     |
| Qualifying Order       | 76%     | 84%                     |
| Fastest Lap Order      | 77%     | 81%                     |

Note: "Accuracy" refers to the model's accuracy of predicting the top 5 drivers correctly.

### Fantasy Builder Performance:
The fantasy builder algorithm's performance has been measured since the start of 2022. Given below are its performance metrics.
| Year | Points Scored        | Performance in National League | Performance in Global League  | Point Margin to Global High Score |
|------|----------------------|--------------------------------|-------------------------------|-----------------------------------|
| 2022 | 4172 pts (As of Dec) | Top 1% out of 50K+ teams       | Top 1% out of 1.5 mill + teams| 594 pts                           |
| 2023 | 3518 pts (As of Aug) | Top 2% out of 50K+ teams       | Top 3% out of 2 mill + teams  | 270 pts                           |

### API Performance:
API has been stress tested via Postman and is ready for use. However, due to cloud restrictions, only limited GET requests can be made per minute. Performing cloud migration soon to prevent this issue.

## Tools and Sources
* Frontend: Vite, React, JavaScript, Tailwind CSS
* Backend: Python - Tensorflow, Beautiful Soup, Chrome Driver, Flask, and more
* Cloud & Hosting: Vercel, Render, PythonAnywhere, IBM Cloud (Watson AI), Google Cloud, Google Sheets
* Data Sources: [Formula One](https://www.formula1.com/), [Wikipedia](https://en.wikipedia.org/), [Google Developers](https://developers.google.com/public-data/docs/canonical/countries_csv), [World Meteorological Organization](https://worldweather.wmo.int/)
