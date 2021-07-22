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

const convertCSVToJsonFormat = async ({
  filename_read, // String Required
  filename_save, // String Optional
  filter = null, // Callback Optional
  mapper = null  // Callback Optional
}) => {
  const fileStorage = __dirname+`/../storage/${filename_read}`;
  const fileOutPut = __dirname+`/../outputs/${filename_save}`;
  
  const rows = await readFileCSVAsync(fileStorage)
  
  let data = rows;

  if(mapper) {
    data = data.map(mapper)
  }
  
  if(filter) {
    data = data.filter(filter);
  }

  if(filename_save) {
    fs.writeFile(fileOutPut, JSON.stringify(data, 0, 2), {
      encoding: 'utf-8'
    }, () => {
      console.log({
        message: `Saved in ${fileOutPut}`,
        hits: data.length
      })
    })
  }

  return data;
}

module.exports = convertCSVToJsonFormat;