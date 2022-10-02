const settings = {
  
    dev: {
      apiUrl: 'https://jsonplaceholder.typicode.com',
    },
    prod: {
      apiUrl: 'https://delivery-app-june.herokuapp.com/api/v1',
  
    },
  };
  
  const getCurrentSettings = () => {
    //   if (__DEV__) return settings.dev;
    //   if (Constants.manifest.releaseChannel === "staging") return settings.staging;
    return settings.prod;
  };
  
  export default getCurrentSettings();
  
  
  
  