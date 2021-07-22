const runConvertCSVToJsonFormat = require("./utils/format-csv-to-json-dynamo-data");

// Function to convert CSV in JSON and filter/remove invalid datas from DynamoDb export CSV
// runConvertCSVToJsonFormat({
//   filename_save: 'novodados.json', file in ./outputs
//   filename_read: 'data.csv' // file in ./storage
// })