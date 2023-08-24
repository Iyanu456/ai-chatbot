async function postData(url, endpoint, data) {
	try {
	    const response = await fetch(url + endpoint, {
	    	method: 'POST',
	      	headers: {
	        	'Content-Type': 'application/json',
	      	},
	      	body: JSON.stringify(data),
	      	redirect: 'follow',
	    });

	    if (!response.ok) {
	      	throw new Error('Request failed with status ' + response.status);
	    }

	    const contentType = response.headers.get('content-type');
	    if (contentType && contentType.includes('application/json')) {
      		// Handle JSON response
      		const responseData = await response.json();
      		//console.log(responseData)
      		return responseData;
    	} else if (response.redirected) {
      		// Handle URL redirect
      		const redirectUrl = response.url;
      		
      		//console.log(redirectUrl)
      		window.location.href = redirectUrl; // Redirect to the URL
    	} else {
      		throw new Error('Invalid response type');
    	}
	} catch (error) {
	    console.error('Error:', error);
	    throw error;
	}
}

export default postData