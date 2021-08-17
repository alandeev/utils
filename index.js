const { 
  scripts,
  mappers
} = require("./utils");

const fs = require('fs')

const filterUsersActive = (user) => user.status === "ACTIVE"

// Function to convert CSV in JSON and filter/remove invalid datas from DynamoDb export CSV
scripts.convertCSVToJsonFormat({
  filenames: [
    'data.csv',
    'data2.csv',
  ],
  include_fields: ['id', 'name', 'lastname', 'age'],
  mappers: [ // Callback Optional  
    mappers.mapperRemoveDynamoTypes
  ],
  filters: [ // Callback Optional
    filterUsersActive 
  ],
}).then(result => {
  // Result: final object
}).catch(error => {
  // console.log(error);
}) 
