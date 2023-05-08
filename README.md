# EBuilding App

## Description

EBuilding App is a full-stack application built using Next.js and Strapi. The application includes the following features:
- A home page with a dynamic zone that fetches data from Strapi using React Query
- Signup and Login pages for user authentication
- MongoDB for database and Express as middleware
- User authentication using JWT, Passport, Local Strategy, and Bcrypt
- Logout and Refresh Token functionality
- Two components: Header and Footer
- Tailwind CSS for styling
- Jest for testing

## Installation

1. Clone the Next.js repository and install dependencies:

```bash
git clone https://github.com/andresfelipear/EBuilding-Nextjs-App.git
cd EBuilding-Nextjs-App
npm install
```

2. Set the following environmental variables in a `.env.local` file:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:4000
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.zlzjl.mongodb.net/ebuilding
NEXT_PUBLIC_JWT_SECRET=<Secret key for JWT>
NEXT_PUBLIC_REFRESH_TOKEN_SECRET=<Secret key for refresh tokens>
NEXT_PUBLIC_SESSION_EXPIRY=<Time in seconds until the session expires>
NEXT_PUBLIC_REFRESH_TOKEN_EXPIRY=<Time in seconds until the refresh token expires>
NEXT_PUBLIC_COOKIE_SECRET=<Secret key for cookies>
NEXT_PUBLIC_WHITELIST_DOMAINS=<List of domains that can access the app>
```
Note: Replace <username> and <password> with your MongoDB Atlas credentials.

3. Start the Next.js server:

```bash
npm run dev
```

4. Clone the Strapi repository and install dependencies:

```bash
git clone https://github.com/andresfelipear/STRAPI-EBuilding-App.git
cd STRAPI-EBuilding-App
npm install
```
5. Start the Strapi server:

```bash
npm run develop
```

## Usage

Once the servers are running, you can access the EBuilding App at `http://localhost:3000`. You can create a user account by visiting the `/signup` page, or log in with an existing account at the `/login` page.

## Testing

To run the tests, simply run the following command:

```bash
npm run test
```
The app includes four tests: 
- two for the client to test the footer component.
- two for the backend:
    - Test the server is running, default route /api/.
    - Test the route /signup is working (i.e., User is created and saved in the database, token is returned).

## Contribution

If you'd like to contribute to EBuilding App, please fork the repository and create a pull request.