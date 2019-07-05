dashboardapp.factory('AuthInterceptor',()=> {
    return {
      request: function(config) {
        // if(localStorage)
        // {
        //   if(localStorage.tokenId){
            console.log('Request Interceptor Call');
          config.headers['auth-token'] = localStorage.tokenId;
          console.log("_________________",localStorage.tokenId);
          console.log("?????????",config.headers['auth-token'] );
        return config;

      //    }
      //  }
          
      },
  
      requestError: function(config) {
        return config;
      },
  
      response: function(res) {
        return res;
      },
  
      responseError: function(res) {
        return res;
      }
    }
  });