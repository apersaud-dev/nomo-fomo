
# NOMO FOMO

NOMO FOMO helps users mitigate the anxiety of missing events, while enabling businesses to share their event details with the public.



## Authors

- [@apersaud-dev](https://github.com/apersaud-dev)

  
## Installation 

To install this project, clone the project from [the repo](https://github.com/apersaud-dev/nomo-fomo) it from the repo and run the following commands

```bash 
  cd client
  npm install
  cd ..
  cd server
  npm install
```

## How to Run
To run this project, you will need to add the following environment variable to .env file in the client folder:

`REACT_APP_GOOGLE_MAP_API_KEY`

and the following environment variables to .env file in ther server folder:

`PORT`

`API_URL=http://localhost:`

`REACT_APP_GOOGLE_MAP_API_KEY=`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`SESSION_SECRET`

All of the values for the above variables can be found in Synapse content.


Create a MySQL database using the sqldump file submitted via synapse.

Update knexfile.js to reference the MySQL database you've created.


Start server with: 
```bash
node server.js
```
Start React app with :
```bash
npm start 
```

## Login
Use the login information found in synapse to login as a business user.

## How to Use
Once logged in to the app, you can create, read, update or delete events in your profile. These will upadte in the database. 
You can also update the business profile information, including address. If you wish to change the address, you should use the search functionality (address line 1), as this will properly autopopulate the remaining related fields AND assign an accurate latitude and longitude coordinate for the business profile (this is where the events will be displayed on the map).

To us the consumer app, click 'Explore Events' from the home screen. The starting location is hardcoded to Whitby, Ontario Canada. There isn't much test data stored in this location, so to find an area with more data, search for the address '511 King Street W, Toronto, Ontario M5V 1K4 Canada'. As you begin typing into the search field, suggestions will autopopulate below the field. You can select the corresponding area. You can also search other areas in the world, but there is no test data loaded.


## Acknowledgements

  - I would like to acknowledge the awesome education team at BrainStation for helping teach and guide me over the course of the past 12 weeks. Without their support, this project would not be possible.

  