
	if ('serviceWorker' in navigator) {
	  window.addEventListener('load', function() {
	    navigator.serviceWorker.register('/sworker.js').then(function(registration) {
	      // Registration was successful
	      console.log('ServiceWorker registration successful with scope: ', registration.scope);
	    }, function(err) {
	      // registration failed :(
	      console.log('ServiceWorker registration failed: ', err);
	    });
	  });
	}


			// share apps
	   $('#shareIt').click(function() {
		  if (navigator.share) {
			  navigator.share({
			      title: 'MWS Google Developer Kejar',
			      text: 'RSUREGAR - MWS Google Developer Kejar 2018',
			      url: 'https://pwa-mws.firebaseapp.com/',
			  })
			    .then(() => console.log('Successful share'))
			    // .catch((error) => myApp.addNotification({message:'Membatalkan membagi'}, error));
			}else{
				if (navigator.share === undefined) {
        		alert('Only work on mobile device vro!');
      		}
		}
		});
	
