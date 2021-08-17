const csv = require('csv-parser');
const fs = require('fs');

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

const getAllRows = async (filenames) => {
  const rows = []
  
  for(const filename of filenames) {
    const result = await readFileCSVAsync(__dirname+`/../../storage/`+filename)
  
    rows.push(...result)
  }

  return rows;
}

const formatByFields = (data, fields) => {
  return data.map(obj => {
    const newObj = {}
    for(const key of fields) {
      if(obj[key]) {
        newObj[key] = obj[key];
      }

    }
    return newObj;
  })
}

const convertCSVToJsonFormat = async ({
  filenames = [], // String Required
  include_fields = [], // Fields to mapper in each object
  mappers = [],  // Callback Optional
  filters = [] // Callback Optional
}) => {
  const rows = await getAllRows(filenames);

  let data = [ ...rows ]; // new array

  for(const mapper of mappers)  {
    data = data.map(mapper)
  }

  for(const filter of filters)  {
    data = data.filter(filter)
  }

  if(include_fields.length > 0) {
    data = formatByFields(data, include_fields)
  }

  return data;
}

module.exports = convertCSVToJsonFormat;