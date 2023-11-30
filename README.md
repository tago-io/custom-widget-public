 TagoIO Line Chart Custom Widget

 This project is a custom widget for TagoIO that displays a line chart. It uses the ECharts library for chart rendering and Luxon for date and time manipulation.
 
 ## Setup
 
 1. Clone this repository to your local machine.
 2. Navigate to the project directory using the command:
    ```sh
    $ cd directory/where/I/put/the/project
    ```
 3. Install the necessary dependencies with:
    ```sh
    $ npm install
    ```
 
 ## Development
 
 To start the development server, run:
 ```sh
 $ npm run start
 ```
 This will start the Vite development server. You can view your widget at localhost:1234 (or the port specified in your vite.config.ts file).
 
 ## Building
 
 Before building the project, you need to update the build script in the package.json file. Replace /6021b441fc48a400183c9604/storage/chart with your specific TagoIO profile ID and chart folder. The updated line should look like this:
 
 ```json
 "build": "vite build --base /PROFILE_ID/storage/CHART_FOLDER",
 ```
 
 Then, you can build the project with:
 ```sh
 $ npm run build
 ```
 This will create a production-ready build of your widget in the _dist directory.
 
 # Sending Data to the Widget
 This widget expects to receive one or more variables in the following format:
  ```json
  {
    "variable": "variable_name",
    "unit": "%",
    "group": "unique_group_value",
    "value": "Label of the variable in the chart",
    "metadata": {
        "2023-01-01T00:00:00.000Z": 10,
        "2023-01-02T00:00:00.000Z": 15,
        "2023-01-03T00:00:00.000Z": 20,
        "2023-01-04T00:00:00.000Z": 25,
        "2023-01-05T00:00:00.000Z": 30,
        "2023-01-06T00:00:00.000Z": 35,
        "2023-01-07T00:00:00.000Z": 40,
        "2023-01-08T00:00:00.000Z": 45,
        "2023-01-09T00:00:00.000Z": 50,
        "2023-01-10T00:00:00.000Z": 55,
    }
  }
  ```
Notice that the metadata size must not exceed 10 kbytes.
