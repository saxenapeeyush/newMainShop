const mongoose = require('../../../connection');
const indexCountSchema = mongoose.Schema;
const indexCount = new indexCountSchema({
    counterIndex:{type:Number}
});
const indexCountDOD = mongoose.model('indexCountDods',indexCount);
module.exports=indexCountDOD;