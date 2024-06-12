## Register

- METHOD : POST
- URL : /register
- Auth: Not Required
**Request:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "address": "string",
  "phone": "string"
}
```
**Response:**
- Success(201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id":"int",
    "username": "string",
    "password": "hashed_string",
    "email": "string",
    "fullName": "string",
    "address": "string",
    "phone": "string"
  }
}
```
- Error(400)
```json
{
     "error": "All fields are required"
}
```
```json
{
  "error": "Invalid email format"
}
```
```json
{
  "error": "Invalid phone number"
}
```
```json
{
  "error": "Username already exists"
}
```
```json
{
  "error": "Email already exists"
}
```
- Error(500)
```json
{
  "error": "Internal Server Error"
}
```

## Login

- METHOD : POST
- URL : /login
- Auth: Not Required
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
- Success(200)
```json
{
  "message": "Login successful",
  "token": "string",
  "data":{
    "id":"int",
    "username":"string"
  }
}
```
- Error(400)
```json
{
  "error": "Username and password are required"
}
```
- Error(401)
```json
{
  "error": "Invalid username or password"
}
```
- Error(500)
```json
{
  "error": "Internal Server Error"
}
```

## Logout

- METHOD : POST
- URL : /logout
- Auth: Not Required


**Response:**
- Success(200)
```json
{
  "message": "Logout successful"
}
```

## Get Userdetail by Id

- METHOD : GET
- URL : /users/{user_id}
- Auth: Required


**Response:**
- Success(200)
```json
 {
    "id": 2,
    "name": "hafiz",
    "email": "hafiz@example.com",
    "pass": "$2b$10$uVYQanRCmBXuy/16vEwg0eHiftDp8V9Y4c2fAW.5hnV1jk.EorZOG",
    "phone": "08524778304",
    "alamat": "Jakarta"
}
```
- Error(404)
 ```json
{
  "message": "User not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Edit User Address

- METHOD : PUT
- URL : /users/address/{user_id}
- Auth: Required

**Request:**
```json
{
  "address": "string"
}
```

**Response:**
- Success(200)
```json
{
  "success": true,
  "message": "Address updated successfully",
  "data": {
    "id": "integer",
    "username": "string",
    "address": "string"
  }
}
```
- Error(404)
 ```json
{
  "message": "User not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```


## Create Order

- METHOD : POST
- URL : /orders/add/{user_id}
- Auth: Required

**Request:**
```json
{
  "items": [
    {
      "product_id": "integer",
      "quantity": "integer"
    },
    {
      "product_id": "integer",
      "quantity": "integer"
    }
  ]
}
```

**Response:**
- Success(201)
```json
{
  "data": {
    "order_id": "integer",
    "user_id": "integer",
    "total_amount": "decimal",
    "products": [
      {
        "product_name": "string",
        "quantity": "integer"
      }
    ]
  }
}

```
- Error(404)
 ```json
{
  "error": "Product with id {product_id} not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Get All Orders by User ID

- METHOD : POST
- URL : /orders/user/{user_id}
- Auth: Required


**Response:**
- Success(201)
```json
[
  {
    "order_id": "integer",
    "user_id": "integer",
    "total_amount": "decimal",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Get Order by Order ID

- METHOD : GET
- URL : /orders/{order_id}
- Auth: Required


**Response:**
- Success(201)
```json
{
  "order_id": "integer",
  "user_id": "integer",
  "total_amount": "decimal",
  "created_at": "datetime",
  "updated_at": "datetime"
}

```
- Error(404)
 ```json
{
  "error": "Order not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Get All Product


- METHOD : GET
- URL : /products
- Auth: Required

**Response:**
- Success(201)
```json
[
  {
    "id_product": "integer",
    "product_name": "string",
    "description": "string",
    "price": "decimal",
    "stock": "integer",
    "image_url": "string",
    "category_id": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]
```

- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Get Product Details by Product ID

- METHOD : GET
- URL : /products/{product_id}
- Auth: Required


**Response:**
- Success(201)
```json
{
  "id_product": "integer",
  "product_name": "string",
  "description": "string",
  "price": "decimal",
  "stock": "integer",
  "image_url": "string",
  "category_id": "integer",
  "created_at": "datetime",
  "updated_at": "datetime"
}

```
- Error(404)
 ```json
{
  "error": "Product not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Search Products

- METHOD : GET
- URL : /search
- Auth: Required

**Request:**
```json
{}
```

**Response:**
- Success(200)
```json
[
  {
    "id_product": "integer",
    "product_name": "string",
    "description": "string",
    "price": "decimal",
    "stock": "integer",
    "image_url": "string",
    "category_id": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]

```
- Error(404)
 ```json
{}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```


## Detail Cart by {user_id}

- METHOD : GET
- URL : /cart/{user_id}
- Auth: Required


**Response:**
- Success(200)
```json
[
  {
    "id_cart": "integer",
    "user_id": "integer",
    "product_id": "integer",
    "quantity": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]

```
- Error(404)
 ```json
{
  "error": "Product not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Add cart

- METHOD : POST
- URL : /cart/add
- Auth: Required

**Request:**
- Body:
 user_id (integer): ID pengguna.
 product_id (integer): ID produk.
 quantity (integer): Jumlah produk yang ditambahkan.
 created_at (datetime): Waktu pembuatan entri keranjang.

**Response:**
- Success(201)
```json
{
  "success": true,
  "data": {
    "id_cart": "integer",
    "user_id": "integer",
    "product_id": "integer",
    "quantity": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
}

```

- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Update cart

- METHOD : PUT
- URL : /cart/update/{cart_id}
- Auth: Required

**Request:**
- URL Parameters:
cart_id (integer): ID entri keranjang.

- Body:
quantity (integer): Jumlah produk yang diperbarui.

**Response:**
- Success(200)
```json
{
  "success": true,
  "data": {
    "id_cart": "integer",
    "user_id": "integer",
    "product_id": "integer",
    "quantity": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
}

```
- Error(404)
 ```json
{
  "error": "Cart not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```

## Delete cart

- METHOD : Delete
- URL : /cart/delete/{cart_id}
- Auth: Required

**Request:**
- URL Parameters:
cart_id (integer): ID entri keranjang.

**Response:**
- Success(200)
```json
{
  "success": true,
  "message": "Cart deleted successfully"
}

```
- Error(404)
 ```json
{
  "error": "Cart not found"
}
```
- Error(500)
 ```json
{
  "error": "Internal Server Error"
}
```
