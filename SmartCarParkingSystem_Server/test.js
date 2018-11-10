data = {"A1":"0", "A2":"0", "B1":"0", "B2":"0"}

var slots = [];

for (k in data){
    let slot = {}
    slot.slotName = k;
    slot.slotValue = data[k];
    slots.push(slot);
}

console.log(slots);