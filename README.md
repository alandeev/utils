### Utils/Functions that are help me

### About
> Writing...

### runConvertCSVToJsonFormat
```js

convertCSVToJsonFormat({
  filename_read: 'data_request.csv', // file in ./storage -> Required
  filename_save: 'data_result.json', // file in ./outputs -> Optional
  mapper: mapperCallbackItemByItem, // Callback Optional
  filter: filterCallbackItemByItem, // Callback Optional
}).then(result => {
  // console.log(result);
}).catch(error => {
  // console.log(error);
}) 

```