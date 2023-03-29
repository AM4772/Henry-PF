# **BOOKSTORE APP**

![bookstore-home](/Bookstore.PNG)


## About the App

This application was the last requirement to earn the certification of Full Stack Developer offered by **`Henry's Bootcamp`**. The website had to comply with minimum requirements, which in our case was a fully functional and deployed e-commerce. An important aspect of the project consisted in team work. We were divided in groups of 8. We were allowed to use any technologies at our disposal.

We decided to build a user-friendly, scalable e-commerce to sell books, though initially we are offering ebooks. We named it **[BookStore](https://bookstore-rose.vercel.app "BookStore")**. These are the main functionalities we developed: auto-complete search, filter by author or category, pagination, register/log in as user, log in with Google, 2-step user validation, book details, add/remove favorites, add/remove cart items, add/remove book reviews, pay with MercadoPago or credit cards, several mailing features, review purchase history, complete administration module which includes analytics. 

We are currently working on adding more functionalities.

Team members: [Esteban Manrupe](https://github.com/peurman "Esteban Manrupe"), [Ignacio Losa](https://github.com/NachoLosa "Ignacio Losa"), [Tomas Borquez](https://github.com/TomasBorquez "Tomas Borquez"), [Enrique Garay](https://github.com/Quique40 "Enrique Garay"), [Mariano Ceballos Torres](https://github.com/MarianoCeballos "Mariano Ceballos Torres"), [Clara Argüello](https://github.com/ClaraArguello "Clara Argüello"), [Bruno Pizarro](https://github.com/Bruno-Pizarro "Bruno Pizarro"), and [Aldo Moro](https://github.com/AM4772 "Aldo Moro").

So far, we have used these technologies:

![JavaScript](https://img.shields.io/badge/-JavaScript-696969?style=flat&logo=javascript)   
![React](https://img.shields.io/badge/-React-696969?style=flat&logo=react)  
![Redux](https://img.shields.io/badge/-Redux-696969?style=flat&logo=redux)  
![ApexCharts](https://img.shields.io/badge/-ApexCharts-696969?style=flat&logo=ApexCharts)  
![HTML5](https://img.shields.io/badge/-HTML5-696969?style=flat&logo=HTML5)  
![CSS](https://img.shields.io/badge/-CSS-696969?style=flat&logo=CSS3&logoColor=1572B6)  
![Sass](https://img.shields.io/badge/-Sass-696969?style=flat&logo=Sass)  
![Node.js](https://img.shields.io/badge/-Node.js-696969?style=flat&logo=node.js)  
![Express](https://img.shields.io/badge/-Express-696969?style=flat&logo=express)  
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-696969?style=flat&logo=postgreSQL&logoColor=blue)   
![Sequelize](https://img.shields.io/badge/-Sequelize-696969?style=flat&logo=Sequelize)  
![Nodemailer](https://img.shields.io/badge/-Nodemailer-696969?style=flat&logo=Nodemailer)  
![Auth0](https://img.shields.io/badge/-Auth0-696969?style=flat&logo=Auth0)  
![JWT](https://img.shields.io/badge/-Json%20Web%20Tokens-696969?style=flat&logo=json-web-tokens&logoColor=pink)  
![MercadoPago](https://img.shields.io/badge/-MercadoPago-696969?style=flat&logo=MercadoPago)  
![Heroku](https://img.shields.io/badge/-Heroku-696969?style=flat&logo=Heroku)  
![Vercel](https://img.shields.io/badge/-Vercel-696969?style=flat&logo=Vercel)  
![Firebase](https://img.shields.io/badge/-Firebase-696969?style=flat&logo=Firebase)   
![Yup](https://img.shields.io/badge/-Yup-696969?style=flat&logo=Yup)   
![SweetAlert2](https://img.shields.io/badge/-SweetAlert2-696969?style=flat&logo=SweetAlert2)   
  ![Git](https://img.shields.io/badge/-Git-696969?style=flat&logo=git)  
  ![GitHub](https://img.shields.io/badge/-GitHub-696969?style=flat&logo=github)   
  ![VS](https://img.shields.io/badge/-Visual_Studio_Code-696969?style=flat&logo=visual%20studio&logoColor=blue)  

This link will take you to the web page: **[BookStore App](https://bookstore-rose.vercel.app/  "BookStore App")**, *let me know your comments and suggestions!*

<h3> 🤝🏻 &nbsp;Connect with me through: </h3>

<p align="center">
<a href="https://www.linkedin.com/in/aldo-moro/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Aldo%20Moro-blue?style=flat-square&logo=linkedin"></a>
<a href="mailto:moro_bramanti@hotmail.com"><img alt="Outlook" src="https://img.shields.io/badge/MS-Outlook-blue?style=flat-square&logo=microsoft-outlook&logoColor=white"></a>
</p>

⭐️ Link to my GitHub profile: [AM4772](https://github.com/AM4772)

## How to use it locally

- You must install in your computer:
    - A text editor like ![VS](https://img.shields.io/badge/-Visual_Studio_Code-696969?style=flat&logo=visual%20studio&logoColor=blue) or ![Sublime](https://img.shields.io/badge/-Sublime_Text-696969?style=flat&logo=sublime-text), etc.
    - ![Git](https://img.shields.io/badge/-Git-696969?style=flat&logo=git), link to instructions: [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git "Instructions Git")
    - ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-696969?style=flat&logo=postgreSQL), link to instructions: [PostgreSQL](https://www.postgresql.org/download/ "Instructions PostgreSQL")
- Up to the right of this page, you will see a green button named "Code". Click on it and copy the HTTPS address to this repository.
- In your text editor, place the cursor in the desired folder, paste the HTTPS address and hit Enter. This will download the repository to your computer. You will see the same folder structure and files as you see at the top of this page. Next, run the following commands inside the folder `npm install` and then `npm init`.
- Now you must install all the required dependencies for the front-end and back-end:
    - Front-end: place cursor inside `client`folder and run the following command:
    ```bash
        npm install axios dotenv chroma-js date-fns react-responsive firebase image-size react react-alice-carousel react-apexcharts react-datepicker react-dom react-router-dom react-scripts react-hook-form react-icons react-redux react-select redux redux-thunk sass sweetalert2 yup 
    ```
    - Back-end: place cursor inside `api`folder and run the following command:
    ```bash
        npm install axios bcrypt body-parser cookie-parser cors dotenv express image-size jsonwebtoken jspdf mercadopago morgan nodemailer nodemailer-express-handlebars pg sequelize chai mocha supertest supertest-session node
    ```
- In the `api` folder, create a `.env` file with the following content:
    ```javascript
        DB_USER=postgres
        DB_PASSWORD=`your PostgreSQL password` // this is the one you created when downloading the software
        DB_HOST=localhost
        DB_NAME=bookstore
        PASS_TOKEN=RaJwsh6NCfw4iTEu5fQpIsSlsQpUwxcPQguV3wpW60hStpAiFUKhp7laK8ONV6thYpf49mmFk0p7wm0OMiKjx0SIY8O4iU3YfA7pAqJByP2VdKhcHdXLmtv0SPo7B12fUHdht0QuI2pcw788yvzLXcZkRjyrCGrSv7CDYYDKVDmxjGm8OkDmTdociAvkNGAugc3fvmuy
        MP_TOKEN=TEST-304236252926467-071712-29f3115ab12dc5ed7152e3a819778937-1162304452
        PORT=3001
    ```
- In ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-696969?style=flat&logo=postgreSQL), you must create a new database named **bookstore**.
- In the `client` folder, create the following content:
     ```javascript
        REACT_APP_AUTH0_DOMAIN=book-storeauth0.us.auth0.com
        REACT_APP_AUTH0_CLIENT_ID=GLSGkqjPxI6uPB96f2PxTTPH5cnanvyL
        REACT_APP_BASE_URL=http://localhost:3000/
    ```
- To run the app in your localhost, first run the command `npm start` from the `api` folder and then do the same from the `client` folder. This should open up a browser where you will see the app running.

### 🤝🏻 &nbsp;Contact me if you have any problems with the instructions
