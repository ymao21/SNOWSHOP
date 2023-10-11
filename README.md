# SNOWSHOP

Welcome to SNOWSHOP! 

SNOWSHOP is a full-stack web application ecommerce website for my fellow winter sports lovers. It is a social ecommerce market place where users can buy and sell new and secondhand snowboards/skis, winter gears and accessories. It uses Express.js with a PostgresSQL database on the back-end, and React.js and Redux on the front-end. It uses Amazon Web Services foor image storage for users to upload products without concerning about storage issues. 

## [View Live Site](https://snow-shop.onrender.com/)


https://github.com/ymao21/SNOWSHOP/assets/103905774/6b53b05f-2e49-4b35-a419-8c398668ef83

## Inspiration:
I got into snowboarding thanks to discounted season passes from friends and their expert guidance. Now as an avid winter sports enthusiast myself, the idea of affordable winter sports gear was always at the back of my mind. The cost of gear and lessons can become a barrier for many aspiring snowboarders, so this site is a model of a platform that strives to make the sport more affordable and accessible. By offering budget-friendly used gears, and allowing users to upload/sell their used products creates an initiative to allow more people to enjoy/try the sport. 

SNOWSHOP is not only an application that replicates the functionality of an ecommerce website. It is also an approach or contribution to start building a more inclusive and passionate winter sports community. 


## Technologies Used:

- Frontend: React, JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: SQL (e.g., MySQL, PostgreSQL)
- Authentication/Authorization: JSON Web Tokens (JWT), CSRF token
- Amazon Web Services for storing images on cloud

## Key features:
- Users can browse available products, Logged-in users can create/add new products, update their own products and delete their own products

![Screen Shot 2023-07-29 at 2 40 43 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/cbeb8d4a-b7e5-4ca6-8d02-8d92932db675)

- Logged-in users can browse through reviews, create/add comments/reviews update their comments/reviews and delete their comments/reviews

![Screen Shot 2023-07-29 at 2 41 39 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/dce4e900-342e-4201-a23a-9e34867d2d1d)

- Users can browse their cart, add to their cart, update product quantities in their cart and delete products from their cart
![Screen Shot 2023-07-29 at 2 42 29 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/15b2b091-dd95-4c10-9085-3696f1c310b7)

- Users can search for desired products and view the product details by clicking into it 

![Screen Shot 2023-07-29 at 2 43 07 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/b3504ebc-64da-4137-8e44-63b9580a6aa8)

## code snippets:
- AWS implementation with creating products in both backend routes and front end requests
 ![Screen Shot 2023-07-29 at 2 53 47 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/c20fefe4-4e15-4b2d-aae1-129df84574e3)
![Screen Shot 2023-07-29 at 3 00 29 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/0edc7016-4b81-4356-b2bf-cd3c6cc28cf4)



![Screen Shot 2023-07-29 at 2 54 17 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/887fb326-590f-494e-985a-955fe6716e02)

- Compiled all modals into a single React component function to keep code DRY, while simultaneously providing the correct information to each component.
  
![Screen Shot 2023-07-29 at 2 56 20 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/7fe08b07-9c3a-4c2d-89eb-74ef789c430a)

- Implementing search <br/>
![Screen Shot 2023-07-29 at 2 57 10 PM](https://github.com/ymao21/SNOWSHOP/assets/103905774/b2cc9ce8-1e8e-4b6f-a27c-d8c0bb503f11)

## Getting Started:

 1. Clone the repository: `git clone https://github.com/ymao21/SNOWSHOP.git`
 2. Install the dependencies in both the front end and back end folder: `npm install`
 3. Set up your environment variables and create .ENV file
 4. run the seeding commands 

    npx dotenv sequelize db:seed:all
    npx dotenv sequelize db:migrate
 

 5. start the on local server by running npm start in both the front end and back end folder: `npm start`

