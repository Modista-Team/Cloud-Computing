# Documentation
## Architecture
![Logo](documentation/arcitecture.png)
## Cloud SQL Database Structure
![Logo](documentation/Design_db_modista.jpg)

## Recap Endpoints

| Route                        | HTTP Method | Description                     | Auth         |
|------------------------------|-------------|---------------------------------|--------------|
| /login                       | POST        | Log in a user                   | Not Required |
| /loginWithGoogle             | POST        | Log in a user                   | Not Required |
| /register                    | POST        | Register a new user             | Not Required |
| /logout                      | POST        | Log out a user                  | Not Required |
| /users/{user_id}             | GET         | Get user by ID                  | Required     |
| /users/address/{user_id}     | PUT         | Edit user address               | Required     |
| /products                    | GET         | Get all products                | Required     |
| /products/{product_id}       | GET         | Get product details by ID       | Required     |
| /search                      | GET         | Search products                 | Required     |
| /cart/{user_id}              | GET         | Get cart by user ID             | Required     |
| /cart/add                    | POST        | Add data to cart                | Required     |
| /cart/update/{cart_id}       | PUT         | Update cart                     | Required     |
| /cart/delete/{cart_id}       | DELETE      | Delete cart                     | Required     |
| /orders/add/{user_id}        | POST        | Create order                    | Required     |
| /orders/user/{user_id}       | GET         | Get all user orders             | Required     |
| /orders/{order_id}           | GET         | Get specific order by ID        | Required     |

## Documentation

[API Documentation](documentation/endpoint.md)

