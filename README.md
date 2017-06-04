# React Server Side Rendering Example
This is a example project of Server Side Rendering React with Redux, Hot Module Replacement and Code Splitting.

The server side of this app is a simple NodeJS using Express to handle requests.
For the app we have one `index.js` only for the client, and an app root with pages, components and redux that is shareable between client and server.
The webpack config is splitted in 3 files. One that build the client bundle, one for the prerender bundle, and another for the development mode.

I'm using here React Router 4, React Hot Loader 3 and Redux. For CSS I'm using Tachyons, and Yarn as my package manager.

Feel free to fork this project and adapt it to your needs 😃

# Running
## Production
To create the build files
```
npm run build
```
To run the server in production mode
```
npm run production
```

## Development
```
npm run development
```

---
