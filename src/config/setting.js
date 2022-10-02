const settings = {
  
    dev: {
      apiUrl: 'https://jsonplaceholder.typicode.com',
    },
    prod: {
      apiUrl: 'https://jsonplaceholder.typicode.com',
  
    },
  };
  
  const getCurrentSettings = () => {
    //   if (__DEV__) return settings.dev;
    //   if (Constants.manifest.releaseChannel === "staging") return settings.staging;
    return settings.dev;
  };
  
  export default getCurrentSettings();
  
  
  
  