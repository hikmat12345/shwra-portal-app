# 1- list all lawyer availability schedules

Request URL: any new endpoint 

Request Method: GET

Description: List all lawyer availability schedules for a specific lawyer.

Note: * we have reserved ids for seven days in a week.
      "dayId": "monday",
      "dayId": "tuesday",
      ...

      * intervals are in 24 hours format. 00:00 - 23:59
      * you will get lawyer id from the request auth token. 
         
response:
[
   {
      "dayId": "monday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ] 
   },
   {
      "dayId": "tuesday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "wednesday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "thursday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "friday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "saturday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "sunday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   }
]



# asynchoronous availability schedules

Request URL: any new endpoint

Request Method: POST or PUT

Description: this endpoint is used to asyncronously lawyer availability schedules with backend database.

Note: * this payload is the same as the one in the previous endpoint response.
      * you will get lawyer id from the request auth token.

payload :
[
   {
      "dayId": "monday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ] 
   },
   {
      "dayId": "tuesday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "wednesday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "thursday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "friday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "saturday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   },
   {
      "dayId": "sunday",
      "intervals": [
         {
            "from": "08:00",
            "to": "08:30"
         },
         {
            "from": "08:30",
            "to": "09:00"
         }
      ]
   }
]
