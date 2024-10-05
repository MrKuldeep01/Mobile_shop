# Backend for a mobile shop

## Packeges that may require :

- express : to easily develop the backend
- mongoose : to talk with mongoDB
- dotenv : for credentials to be secure
- jwt : for tokens
- bcrypt : for password maintaining
- multer : to handle image files
- cloudenary : for image uploading from local to cloud. & fetching data for that image.
- cors : for cors policies
- to be continue...

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
  <!-- history of item sold -->
  - history : [
    type : ObjectId,
    ref : "Product",
    ],
  - password: {
    type: String,
    required: true,
    },
  - refresher: String,

---

- **user model**
  - name : String,
  - mobile : number,
  - password : String,
  - gmail : String,
  - image : String,
  - refreshToken : String,
  - gender : enum["male","female"] default="male",
  - address : String,
  - history : [
    type: ObjectId,
    ref: "Product"
    ]

---

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
    timestamps;

## Routes & task to be performed :: /api/v1/
<!-- Auth route -->
- register :: /register  :: we can give a button on frontend to ensure the coming request form owner or user.
- login :: /login

<!-- Product route -->
- all products available here :: /products
- specific product via " id from url " :: /products/:productID,
<!-- Protected routes  -->
- add/edit a product :: /products/add/_:id_ :: if we get id then this page is opened for edit . ONLY OPEND FOR --> OWNER <--

<!-- profile route -->
- owner's details along with sold product history :: profile/owner,
- owner details edit portel :: profile/owner/edit/:ownerID,

- user's details along with product history :: /profile/userId --> we can save the user at this point in redux.
- user profile edit portel :: profile/user/edit/:ownerID,


====================
## Routes

### **Authentication Routes**:
- **Register**: `/api/v1/register`  
   Allow users and owners to sign up.  ✅
- **Login**: `/api/v1/login`  
   Allow users and owners to log in.  ✅

### **Product Routes**:
- **All Products**: `/api/v1/products`  
   Get all available products.
- **Product by ID**: `/api/v1/products/:productId`  
   Fetch a specific product by its ID.

### **Protected Routes (Owner Only)**:
- **Add Product**: `/api/v1/products/add/`  
- **Edit Product**: `/api/v1/products/edit/productId`  
- **Delete Product**: `/api/v1/products/delete/:productId`  

### **Profile Routes**:
- **Owner Profile**: `/api/v1/profile/owner`  
   View the owner’s profile along with their sold product history.
- **Edit Owner Profile**: `/api/v1/profile/owner/edit/:ownerId`  
   Edit the owner’s profile.
- **User Profile**: `/api/v1/profile/user/:userId`  
   View the user’s profile along with their purchase history.
- **Edit User Profile**: `/api/v1/profile/user/edit/:userId`  
   Edit the user’s profile.

---
====================



----
## controllers

```js
/*
Register user

read inputs 
validate inputs
check for user existence with same credetials 
hash the password 
save the user

send the response with the created user by removing the password and tokens from the user object.


*/
```





