var express = require('express');
var dataRouter = express.Router();
const bodyParser = require('body-parser');
var data1 = require('../shared/data');
dataRouter.use(bodyParser.json());

dataRouter.route('/:id')
.post((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    data = {
        "success":"true"
    }
    res.json(data);
    console.log(req.body);
    let slots = []
    for (k in req.body){
        let slot = {}
        slot.slotName = k;
        slot.slotValue = req.body[k];
        JSON.stringify(slot);
        slots.push(slot);
    }
    console.log("ID: "+req.params.id+"  Data: "+slots);
    if(req.params.id == 1) {
        data1.prevdata1 = slots;
        req.app.io.emit('currentData1', slots)
    }
    else if(req.params.id == 2) {
        data1.prevdata2 = slots;
        req.app.io.emit('currentData2', slots)
    }
    else if(req.params.id == 3) {
        data1.prevdata3 = slots;
        req.app.io.emit('currentData3', slots)
    }
    else{

    }
});

//module.exports.data = data;
module.exports = dataRouter;
