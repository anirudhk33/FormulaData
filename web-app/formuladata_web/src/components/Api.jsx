import React from "react";

export const Api = () => {
  return (
    <div className="flex items-center justify-center mt-[120px] mb-40">
      <div className="flex flex-row items-center py-[6px] px-14 bg-grey overflow-scroll rounded-[30px] mb-3 w-4/5 pb-12">
        <p className="w-full h-full max-w-full max-h-full font-poppins font-normal text-white text-[15px] leading-[30px] ml-2">
          <div className="flex items-center justify-center mt-8 ">
            <h2 className=" text-[32px] font-bold mt-10 leading-[50px]">
              FormulaData API Documentation
            </h2>
          </div>
          <div className="container mx-auto px-4 mt-20">
            <div className="">
              <h2 className="text-[24px] font-bold mb-6">Table of Contents</h2>
              <ul className="space-y-2 text-[17px]">
                <li>
                  <a
                    href="#Introduction"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Introduction
                  </a>
                </li>
                <li>
                  <a
                    href="#Endpoints"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Endpoints
                  </a>
                </li>
                <li>
                  <a
                    href="#RequestExamples"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Request Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#Python"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Accessing API from Python
                  </a>
                </li>
                <li>
                  <a
                    href="#Java"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Accessing API from Java
                  </a>
                </li>
                <li>
                  <a
                    href="#React"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Accessing API from React
                  </a>
                </li>
                <li>
                  <a
                    href="#C++"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Accessing API from C++
                  </a>
                </li>
                <li>
                  <a
                    href="#DataDescription"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Data Description
                  </a>
                </li>
                <li>
                  <a
                    href="#Sources"
                    className="text-yellow-500 hover:text-yellow-400"
                  >
                    Data Sources and Acknowledgements
                  </a>
                </li>
              </ul>
            </div>

            <h2 id="Introduction" className="text-2xl font-semibold mb-5 mt-20">
              Introduction
            </h2>
            <p className="">
              The FormulaData REST API is a comprehensive solution for querying
              and filtering Formula 1 data spanning from 1950 to the present.
              With its intuitive interface and powerful capabilities, the API
              empowers users to access a wide range of data related to seasons,
              rounds, locations, weather conditions, race results, drivers,
              constructors, circuits, and more. By utilizing the API's diverse
              endpoints and flexible query parameters, developers and
              researchers can tailor their data requests to extract specific
              information based on their unique needs. Whether you're conducting
              in-depth research, building engaging data visualizations, or
              analyzing race statistics, the FormulaData API serves as a
              valuable resource for exploring and leveraging the rich world of
              Formula 1 data. This documentation provides a comprehensive
              overview of the available endpoints and their usage, enabling you
              to seamlessly integrate Formula 1 data into your applications and
              unlock new insights.
            </p>

            <h2 id="Endpoints" className="text-2xl font-semibold mb-5 mt-20">
              Endpoints
            </h2>
            <p className="mb-6">
              The base URL for accessing the API is:{" "}
              <code className="text-blue-200">
                https://formuladataapi.pythonanywhere.com/api/f1
              </code>
              .
            </p>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                1. Get Full Filtered Data
              </h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Endpoint:</span>{" "}
                  <code>/api/f1</code>
                </li>
                <li>
                  <span className="font-semibold">Method:</span>{" "}
                  <code>GET</code>
                </li>
                <li>
                  <span className="font-semibold">Description:</span> Retrieves
                  the full filtered data based on the specified query
                  parameters.
                </li>
                <li>
                  <span className="font-semibold">Data Features:</span> See Data
                  Description.
                </li>
                <li>
                  <span className="font-semibold">Query Parameters:</span> Each
                  query parameter represents a column name in the dataset.
                  Provide the desired value to filter the data.
                </li>
                <li>
                  <span className="font-semibold">Response:</span> The API
                  returns a JSON response containing the filtered data.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                2. Get Key Filtered Data
              </h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Endpoint:</span>{" "}
                  <code>/api/f1/key_data</code>
                </li>
                <li>
                  <span className="font-semibold">Method:</span>{" "}
                  <code>GET</code>
                </li>
                <li>
                  <span className="font-semibold">Description:</span> Retrieves
                  only key filtered data based on the specified query
                  parameters.
                </li>
                <li>
                  <span className="font-semibold">Data Features:</span> season,
                  round, location, weather, driver_name, constructor_name,
                  race_finishing_position, grid_position, points
                </li>
                <li>
                  <span className="font-semibold">Query Parameters:</span> Each
                  query parameter represents a column name in the dataset.
                  Provide the desired value to filter the data.
                </li>
                <li>
                  <span className="font-semibold">Response:</span> The API
                  returns a JSON response containing the filtered data.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                3. Get Drivers and Constructors Data
              </h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Endpoint:</span>{" "}
                  <code>/api/f1/drivers_and_constructors</code>
                </li>
                <li>
                  <span className="font-semibold">Method:</span>{" "}
                  <code>GET</code>
                </li>
                <li>
                  <span className="font-semibold">Description:</span> Retrieves
                  data related to drivers and constructors based on the
                  specified query parameters.
                </li>
                <li>
                  <span className="font-semibold">Data Features:</span>
                  driver_name, constructor_name - for all driver constructor
                  combinations
                </li>

                <li>
                  <span className="font-semibold">Query Parameters:</span> Each
                  query parameter represents a column name in the dataset.
                  Provide the desired value to filter the data.
                </li>
                <li>
                  <span className="font-semibold">Response:</span> The API
                  returns a JSON response containing the filtered data.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                4. Get Grand Prix Data
              </h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Endpoint:</span>{" "}
                  <code>/api/f1/grand_prix_data</code>
                </li>
                <li>
                  <span className="font-semibold">Method:</span>{" "}
                  <code>GET</code>
                </li>
                <li>
                  <span className="font-semibold">Description:</span> Retrieves
                  data related to all or any Grand Prix events based on the
                  specified query parameters.
                </li>
                <li>
                  <span className="font-semibold">Data Features:</span> season,
                  round, location, circuit_full_name, latitude, longitude,
                  circuit_length, date, weather - for all Grand Prix
                </li>

                <li>
                  <span className="font-semibold">Query Parameters:</span> Each
                  query parameter represents a column name in the dataset.
                  Provide the desired value to filter the data.
                </li>
                <li>
                  <span className="font-semibold">Response:</span> The API
                  returns a JSON response containing the filtered data.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">
                5. Get Circuit Data
              </h3>
              <ul className="list-disc list-inside">
                <li>
                  <span className="font-semibold">Endpoint:</span>{" "}
                  <code>/api/f1/circuit_data</code>
                </li>
                <li>
                  <span className="font-semibold">Method:</span>{" "}
                  <code>GET</code>
                </li>
                <li>
                  <span className="font-semibold">Description:</span> Retrieves
                  data related to all or any circuits based on the specified
                  query parameters.
                </li>
                <li>
                  <span className="font-semibold">Data Features:</span>{" "}
                  location, latitude, longitude, circuit_length,
                  circuit_full_name - for all circuits
                </li>
                <li>
                  <span className="font-semibold">Query Parameters:</span> Each
                  query parameter represents a column name in the dataset.
                  Provide the desired value to filter the data.
                </li>
                <li>
                  <span className="font-semibold">Response:</span> The API
                  returns a JSON response containing the filtered data.
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h2
                id="RequestExamples"
                className="text-2xl font-semibold mb-6 mt-20"
              >
                Request Examples
              </h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-white font-semibold mb-2">
                  Get full filtered data for races in the season 2020:
                </p>
                <code className="text-yellow-500">GET /api/f1?season=2020</code>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 mt-4">
                <p className="text-white font-semibold mb-2">
                  Get key filtered data for races in which Lewis Hamilton
                  finished first:
                </p>
                <code className="text-yellow-500">
                  GET /api/f1/key_data?driver_name=Lewis
                  Hamilton&amp;race_finishing_position=1
                </code>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 mt-4">
                <p className="text-white font-semibold mb-2">
                  Get data for all drivers and constructors:
                </p>
                <code className="text-yellow-500">
                  GET /api/f1/drivers_and_constructors
                </code>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 mt-4">
                <p className="text-white font-semibold mb-2">
                  Get data for a specific Grand Prix event:
                </p>
                <code className="text-yellow-500">
                  GET /api/f1/grand_prix_data?season=2021&amp;round=1
                </code>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 mt-4">
                <p className="text-white font-semibold mb-2">
                  Get data for circuits in a specific location:
                </p>
                <code className="text-yellow-500">
                  GET /api/f1/circuit_data?location=Monaco
                </code>
              </div>
              <div className="my-6">
                <h2 id="Python" className="text-2xl font-semibold mb-5 mt-20">
                  Accessing API from Python
                </h2>
                <p className="mb-4">
                  Here's an example of how to call the Formula 1 Data API using
                  Python:
                </p>

                <pre className="bg-gray-900 rounded p-4 text-[12px] leading-[18px] font-mono text-white container">
                  <code className="w-full h-full max-w-full max-h-full">
                    {`import requests\n\n# Specify the API URL\nurl = 'https://formuladataapi.pythonanywhere.com/api/f1'\n\n# Define the query parameters\nparams = {\n    'season': 2022,\n    'weather': 'wet',\n    'driver_name':'Fernando Alonso'\n}\n\n# Send the GET request\nresponse = requests.get(url, params=params)\n\n# Check if the request was successful\nif response.status_code == 200:\n    # Print the response content (JSON data)\n    data = response.json()\n    print(len(data))\nelse:\n    # Print the error message\n    print(f'Request failed with status code {response.status_code}')`}
                  </code>
                </pre>

                <p className="mb-4 mt-3">
                  <span className="font-semibold">Explanation:</span> The code
                  above demonstrates how to access the Formula 1 Data API using
                  the <code>requests</code> library in Python. It starts by
                  specifying the API URL and defining the query parameters.
                  Then, it sends a GET request to the API with the provided
                  parameters. If the request is successful (status code 200), it
                  prints the length of the response data. Otherwise, it prints
                  the error message along with the status code.
                </p>
              </div>
              <div className="my-6">
                <h2 id="Java" className="text-2xl font-semibold mb-5 mt-20">
                  Accessing API from Java
                </h2>
                <p className="mb-4">
                  Here's an example of how to call the Formula 1 Data API using
                  Java:
                </p>

                <pre className="container bg-gray-900 rounded p-4 text-[12px] leading-[18px] font-mono text-white">
                  <code className="w-full h-full max-w-full max-h-full">
                    {`import java.io.IOException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Formula1DataAPIExample {
    public static void main(String[] args) {
        // Specify the API URL
        String url = "https://formuladataapi.pythonanywhere.com/api/f1?driver_name=Fernando%20Alonso&weather=wet&season=2022";

        // Create an OkHttpClient instance
        OkHttpClient client = new OkHttpClient();

        // Create a Request object
        Request request = new Request.Builder()
                .url(url)
                .build();

        try {
            // Send the request and get the response
            Response response = client.newCall(request).execute();

            // Check if the response is successful
            if (response.isSuccessful()) {
                // Get the response body as a string
                String responseBody = response.body().string();
                System.out.println(responseBody);
            } else {
                System.out.println("Request failed with status code: " + response.code());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`}
                  </code>
                </pre>

                <p className="mb-4 mt-3">
                  <span className="font-semibold">Explanation:</span> The code
                  above demonstrates how to access the Formula 1 Data API using
                  Java with the help of the <code>OkHttpClient</code> library.
                  It starts by specifying the API URL and creating an instance
                  of the <code>OkHttpClient</code> class. Then, it creates a{" "}
                  <code>Request</code> object with the URL and sends the request
                  using the <code>execute()</code> method. If the response is
                  successful, it retrieves the response body as a string and
                  prints it. Otherwise, it prints the error message along with
                  the status code.
                </p>
              </div>

              <div className="my-6">
                <h2 id="React" className="text-2xl font-semibold mb-5 mt-20">
                  Accessing API from React
                </h2>
                <p className="mb-4">
                  To call the FormulaData API from a React application, you can
                  make use of libraries like <code>axios</code> for sending HTTP
                  requests. Here's an example:
                </p>

                <pre className="container bg-gray-900 rounded p-4 text-[12px] leading-[18px] font-mono text-white">
                  <code className="w-full h-full max-w-full max-h-full">
                    {`import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://formuladataapi.pythonanywhere.com/api/f1', {
      params: {
        season: 2022,
        weather: 'wet',
        driver_name: 'Fernando Alonso'
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error('Request failed:', error);
  }
};`}
                  </code>
                </pre>

                <p className="mb-4 mt-3">
                  <span className="font-semibold">Explanation:</span> The code
                  above demonstrates how to call the FormulaData API from a
                  React application using the <code>axios</code> library. It
                  defines an <code>async</code> function <code>fetchData</code>{" "}
                  that sends a GET request to the API endpoint with the
                  specified query parameters. If the request is successful, it
                  logs the response data to the console. If there's an error, it
                  logs the error message.
                </p>
              </div>
              <div className="my-6">
                <h2 id="C++" className="text-2xl font-semibold mb-5 mt-20">
                  Accessing API from C++
                </h2>
                <p className="mb-4">
                  Here's an example of how to call the Formula 1 Data API using
                  C++:
                </p>

                <pre className="w-full h-full container bg-gray-900 rounded p-4 text-[12px] leading-[18px] font-mono text-white">
                  <code className="w-full h-full max-w-full max-h-full">
                    {`#include <iostream>
#include <curl/curl.h>
#include <string>

// Callback function to write response data
size_t writeCallback(char* contents, size_t size, size_t nmemb, std::string* response) {
    size_t totalSize = size * nmemb;
    response->append(contents, totalSize);
    return totalSize;
}

int main() {
    // Specify the API URL
    std::string url = "https://formuladataapi.pythonanywhere.com/api/f1?driver_name=Fernando%20Alonso&weather=wet&season=2022";

    // Initialize CURL
    CURL* curl = curl_easy_init();

    if (curl) {
        // Set the API URL
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

        // Set the write callback function to capture the response data
        std::string response;
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

        // Send the request
        CURLcode result = curl_easy_perform(curl);

        // Check if the request was successful
        if (result == CURLE_OK) {
            std::cout << response << std::endl;
        } else {
            std::cout << "Request failed with error: " << curl_easy_strerror(result) << std::endl;
        }

        // Cleanup CURL
        curl_easy_cleanup(curl);
    }

    return 0;
}`}
                  </code>
                </pre>

                <p className="mb-4 mt-3">
                  <span className="font-semibold">Explanation:</span> The code
                  above demonstrates how to access the Formula 1 Data API using
                  C++ with the help of the <code>curl</code> library. It starts
                  by specifying the API URL and initializing the CURL library
                  using <code>curl_easy_init()</code>. Then, it sets the URL and
                  the write callback function to capture the response data. The
                  response data is stored in a string variable. After sending
                  the request with <code>curl_easy_perform()</code>, it checks
                  the result code and prints the response or error message
                  accordingly. Finally, it cleans up the CURL resources with{" "}
                  <code>curl_easy_cleanup()</code>.
                </p>
              </div>
              <div className="my-6">
                <h2
                  id="DataDescription"
                  className="text-2xl font-semibold mb-5 mt-20"
                >
                  Data Description
                </h2>
                <table className="w-full bg-gray-700 border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Field
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Description
                      </th>
                      <th className="py-2 px-4 border-b border-gray-300">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        season
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The year of the season
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        2022
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        round
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The round number of the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">1</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        location
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The location of the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Monaco
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        weather
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The weather conditions during the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        dry, wet, or cloudy
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        date
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The date of the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        7 November, 2021
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        race_finishing_position
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The finishing position of the driver in the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">1</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        driver_name
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The name of the driver
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Lewis Hamilton
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        constructor_name
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The name of the constructor
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Mercedes
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        car_number
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The number of the car
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">44</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        net_positions_gained
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The net number of positions gained by the driver
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        5, -6, etc
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        has_fastest_lap
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Indicates if the driver has the fastest lap in the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        1 or 0
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        race_laps_completed
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The number of laps completed by the driver in the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">53</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        race_time
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The total time taken by the driver to complete the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        1:33:45.678
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        points
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The points earned by the driver in the race
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">25</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        qualifying_time
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The time recorded by the driver in the qualifying
                        session
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        1:25.789
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        grid_position
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The starting position of the driver on the grid
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">3</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        fp1_position
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The position of the driver in the first practice session
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">4</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        fp2_position
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The position of the driver in the second practice
                        session
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">2</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        fp3_position
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The position of the driver in the third practice session
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">1</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        fastest_lap_position
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The position of the driver in the fastest lap rankings
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">2</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        fastest_lap_number
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The lap number of the fastest lap recorded by the driver
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">25</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        fastest_lap_time
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The time of the fastest lap recorded by the driver
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        1:20.345
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        circuit_full_name
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The full name of the circuit
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        Monza Circuit
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        circuit_length
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The length of the circuit in kilometers
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        5.793
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        latitude
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The latitude coordinate of the race location
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        45.6196
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        longitude
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The longitude coordinate of the race location
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        9.2811
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-gray-300">
                        wikipedia_link
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        The Wikipedia link for more information about the Grand
                        Prix
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <a
                          href="https://en.wikipedia.org/wiki/2021_Abu_Dhabi_Grand_Prix"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-700"
                        >
                          Abu Dhabi GP - 2021
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="my-6">
                <h2 id="Sources" className="text-2xl font-semibold mb-5 mt-20">
                  Data Sources and Acknowledgements
                </h2>
                <p className="mb-4">
                  The data extraction methodology involved web scraping
                  techniques using Python. The following tools were used in the
                  data collection process:
                </p>
                <ul className="list-none list-inside mb-4">
                  <li>
                    <span className="font-semibold">Beautiful Soup:</span> A
                    Python library for pulling data out of HTML and XML files.
                    It was used to parse the HTML structure of web pages and
                    extract relevant data.
                  </li>
                  <li>
                    <span className="font-semibold">Chrome Driver:</span> A
                    WebDriver tool that enables programmatic control of web
                    browsers. It was used to automate the browsing process and
                    interact with web pages.
                  </li>
                </ul>

                <p className="mb-4">
                  The dataset used in this API is sourced from the official
                  Formula 1 website and Wikipedia. The data includes
                  comprehensive information about Formula 1 races, drivers,
                  constructors, circuits, and various race statistics. The web
                  scraping process involved navigating through the official
                  Formula 1 website and Wikipedia pages to collect race data,
                  driver details, constructor information, circuit data, and
                  more. The extracted data was then cleaned and transformed into
                  a structured format suitable for API consumption.
                </p>
                <p className="mb-4">
                  We would like to acknowledge the official Formula 1 website
                  and Wikipedia for providing valuable data and information that
                  powers this API. Their dedication to the sport of Formula 1
                  and the availability of public data make it possible for
                  enthusiasts and developers to explore and analyze Formula 1
                  statistics.
                </p>
              </div>

              {/*  */}
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};
