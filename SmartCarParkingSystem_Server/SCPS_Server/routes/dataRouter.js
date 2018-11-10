var express = require('express');
var dataRouter = express.Router();
const bodyParser = require('body-parser');
dataRouter.use(bodyParser.json());
var data1 = require('../shared/data');

dataRouter.route('/')
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
    console.log(slots);
    data1.prevdata = slots;
    req.app.io.emit('currentData', slots)
});

//module.exports.data = data;
module.exports = dataRouter;
