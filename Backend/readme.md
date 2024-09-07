# Backend for a mobile shop 

## Models 

- **owner model** 
    - name : String, 
    - mobile : number,
    - gmail : String,
    - payment : String,
    - image : String,
    - gender : enum["male","female"] default="male",
    - experience : Date,
    - rating : enum["1","2","3","4","5"],

---
- **user model**
    - name : String, 
    - mobile : number,
    - password : String,
    - gmail : String,
    - image : String,
    - refreshToken : String,
    - gender : enum["male","female"] default="male",

- **product model** 
    - name : Sting,
    - image : String,
    - price : number,
    - desc : String, 
    - catagory : [
        String 
    ]
        [
            "mobiles", "chargers", "earphones", "cables", "assesories", "covers", "skins",
            [
                "recharges", "sim-port", "new sim card"
            ],
            [
                "parts", "mick", "speaker", "battery", "display", "folder", "case"
            ],
            [
                "Bluetooth", "headphones", "speakers","neckbends"
            ],
        ],
        timestamps


     