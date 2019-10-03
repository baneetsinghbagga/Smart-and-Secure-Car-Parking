import requests
data={'parkingNo':"1",
     'slotNo':1,
     'plateNo':"",
     'mobileNo':""
        }
requests.post('http://localhost:3000/putData',data)
