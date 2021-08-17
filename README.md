### Utils/Functions that are help me

### About
> Writing...

### scripts.runConvertCSVToJsonFormat
```js

convertCSVToJsonFormat({
  filenames: [ // filenames csv in ./storage -> Required
    'data.csv',
    'data2.csv',
  ],
  include_fields: ['id', 'name', 'lastname', 'age'], // Fields optional to return in each object
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
```
