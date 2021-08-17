 const KEYS_INVALID_TYPES_DYNAMO = /(\(S\)|\(NULL\)|\(M\))/g

 const mapperRemoveDynamoTypes = (data) => {
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
     newObj[newKey] = mapperRemoveDynamoTypes(value)
   }

   return newObj;
}

module.exports = mapperRemoveDynamoTypes;