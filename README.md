# Getting Started nutrition

# Nutrition

## HYPNOS  application React :  
### Gestion de reservation d'une chaine hoteliere
[Link to react App](https://nutrition-jp.herokuapp.com/)

### You need first to install locally API server
[Link to API documentation](https://nutrition-jp-api.herokuapp.com/api/docs)  
[Link GITHUB to API-rest back-end application](https://github.com/jpLedos/nutrition-api)  

## Getting Started to deploy it locally
First , in you project folder :

```
git clone https://github.com/jpLedos/nutrition-front.git yourProject
cd yourProject
npm install
```

Second step , run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## verify API server url : 
in config.js :

```
export const API_URL = 'https://localhost:8000/api/'
//export const API_URL = 'https://hypnos-back.herokuapp.com/api/'
  
  ```


## Getting Started to deploy it in heroku

1. create a new app on heroku    
2. Connect your github repository  
3. heroku config:set NODE_OPTIONS='--max_old_space_size=460 (if you use free DYNO)
4. Deploy branch master  


