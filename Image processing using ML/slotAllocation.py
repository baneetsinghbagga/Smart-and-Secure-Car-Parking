def getSlot(data):
        for i in data:
                for j in i["slots"]:
                        if(j["carNo"]==""):
                                return (i["pid"],j["slotId"])        
        
from main import *
import json
import requests
mob=input('Enter Mobile Number:');
r = requests.get('http://localhost:3000/getData')
x=r.json()
slot=getSlot(x)
print(slot)
car=text
print(text)
data={'parkingNo':slot[0],
     'slotNo':slot[1],
     'plateNo':car,
     'mobileNo':mob
        }
requests.post('http://localhost:3000/putData',data)
 
