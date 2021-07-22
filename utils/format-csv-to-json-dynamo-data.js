const csv = require('csv-parser');
const fs = require('fs');

const KEYS_INVALID_TYPES_DYNAMO = /(\(S\)|\(NULL\)|\(M\))/g

const removeDynamoTypes = (data) => {
  const isString = typeof data === 'string'
  if(isString) {
    if(data[0] !== '{' && data[data.length-1] !== '}') {
      return data; 
    }
  }

  const dataObject = isString ? JSON.parse(data) : data;

  if(dataObject.S) {
    return dataObject.S;
  }

  const newObj = {}
  for(const [key, value] of Object.entries(dataObject)) {
    const newKey = key.split(KEYS_INVALID_TYPES_DYNAMO)[0].trim()
    newObj[newKey] = removeDynamoTypes(value)
  }

  return newObj;
}

const readFileCSVAsync = (path) => {
  return new Promise(resolve => {
    const rows = []
    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
    }
  )
}

const runConvertCSVToJsonFormat = async ({
  filename_read,
  filename_save
}) => {
  const fileStorage = __dirname+`/../storage/${filename_read}`;
  const fileOutPut = __dirname+`/../outputs/${filename_save}`;
  
  const rows = await readFileCSVAsync(fileStorage)
  
  const data = rows.map(removeDynamoTypes)

  fs.writeFile(fileOutPut, JSON.stringify(data, 0, 2), {
    encoding: 'utf-8'
  }, () => {})
}

module.exports = runConvertCSVToJsonFormat;