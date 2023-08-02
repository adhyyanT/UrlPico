# Pico Url - URL Shortening Service

Pico Url is a powerful URL shortening service that can scale horizontally to handle large volumes of shortening requests efficiently. This web application is built on a robust microservices architecture, taking advantage of message brokers for seamless data transfer between microservices. RabbitMQ, a reliable message broker, is used to facilitate asynchronous data exchange between the microservices.

## <b> Microservices</b>

## <b>SetUrl Microservice</b>

The SetUrl microservice plays a crucial role in generating short URLs for long URLs. It fetches a common counter from the database and utilizes base62 encoding to generate a unique base62 string. This string is then mapped in the database to associate it with the corresponding long URL.

## <b>GetUrl Microservice</b>

The GetUrl microservice is responsible for fetching the long URL associated with a short URL. It first checks the Redis cache for the short URL. If found, it returns the corresponding long URL. If the short URL is not in the cache, it fetches the long URL from MongoDB and stores it in the cache for faster retrieval in subsequent requests.

## <b>Working</b>

1.  A counter is stored in the database and is accessed by all instances of the SetUrl microservice. This ensures that each generated short URL is unique and avoids conflicts during concurrent requests.

2.  To prevent race conditions and ensure data consistency, a persistent layer is created. Only this layer is allowed to query the database. All other instances of the microservices fetch data from this persistent layer using RabbitMQ. This setup ensures that all microservices operate on the most up-to-date data and maintain data integrity.

## <b>Tech Stack</b>

The technology stack used in the Pico Url application includes:

- Node.js: For server-side development and handling microservices.
- Express.js: As the web application framework for Node.js.
- MongoDB: For storing and managing long URLs and their corresponding short URLs.
- React.js: For building an interactive and user-friendly frontend for the application.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
