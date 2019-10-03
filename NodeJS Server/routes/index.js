var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Parking = require('../models/parking')

/* GET home page. */
router.get('/getData',function(req,res,next){
  Parking.find().then(response =>{
  res.json(response);});
});

router.post('/save',(req,res) => {
  // const {  } = req.body;
 
  const newPark = new Parking({
    pid: 2,
    slots:[{
      slotId:1,
      carNo: "",
      mobileNo: ""
    },{
      slotId:2,
      carNo: "",
      mobileNo: ""
    },{
      slotId:3,
      carNo: "",
      mobileNo: ""
    }]

    
  })  
 newPark
  .save()
  .then((user) => res.json(user))
})

router.post('/putData', function(req, res, next) {
 const  {parkingNo,slotNo,plateNo,mobileNo } =req.body;
 console.log(parkingNo)
Parking.findOne({pid:parkingNo}).then(response =>{
  let park=response;
  console.log(park)
  let slot;
  let mob;
  for(let i=0;i<park.slots.length;i++){
    if(park.slots[i].slotId==slotNo){
      slot=park.slots[i].carNo;
      mob=park.slots[i].mobileNo;
      park.slots[i].carNo=plateNo;
      park.slots[i].mobileNo=mobileNo;
      break;
    }
  }
  console.log(slot);
  if(slot==="" && plateNo!=""){
    console.log("alloted slot sms")
    fetch(`http://api.msg91.com/api/sendhttp.php?route=4&sender=BAGGAS&mobiles=+91${mobileNo}&authkey=273378APCP2k6r5cbcc64d&message=Your Parking Location is Parking Number:${parkingNo}and Slot Number:${slotNo}&country=91`)
  .then(res => {console.log(res)
    res.text()
  })

  }
  else if(plateNo==="" && slot!="")
  {
    console.log("car removed smss")
    fetch(`http://api.msg91.com/api/sendhttp.php?route=4&sender=BAGGAS&mobiles=+91${mob}&authkey=273378APCP2k6r5cbcc64d&message=Alert vehicle at Parking Number:${parkingNo}and Slot Number:${slotNo} is out!!!&country=91`)
  .then(res => {console.log(res)
    res.text()
  })
  }
  Parking.updateOne({pid:parkingNo},{slots:park.slots}).then(response=>{
    res.render('index', { title: 'Express' });

  }
    )
})
});

module.exports = router;
