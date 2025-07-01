import axios from 'axios';

// Function to handle POST requests
// This function takes an object with apiUrl, content_type, data, and accessToken
export const apiPostRequest = async ({ apiUrl, content_type, data, accessToken = null }) => {
    const headers = {
      'Content-Type': content_type,
      'Accept': '*/*',
    };
    
    // If accessToken is provided, add it to the headers
    // This is useful for APIs that require authentication

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    console.log(`POST Request: ${apiUrl}`);
    console.log('Headers:', headers);
    console.log('Body:', data);

    const response = await axios.post(apiUrl, data, { headers });
    console.log('raw api response = ', response.data);
    return response; // axios parses JSON by default
  
};

// Function to handle GET requests
// This function takes a request object with apiUrl, content_type, and accessToken
export const apiGetRequest = async (request) => {
    
        console.log("Calling GET API:", request);
        // console.log("Headers:", { Authorization: `Bearer ${request.accessToken}` });

        const response = await axios.get(request.apiUrl, {
            headers: {
                "accept": "*/*",
                "content-type": request.content_type,
                Authorization: `Bearer ${request.accessToken}`, // Add Bearer token here
            },
        });

        // Log the raw response for debugging
        console.log("Raw API Response:", response.data);

        return response; // Axios automatically parses JSON
   
};

// Function to handle PATCH requests
// This function takes a request object with apiUrl, content_type, data, and accessToken
export const apiPutRequest = async (request) => {
    
        const headers = {
            "accept": "*/*",
            "content-type": request.content_type,
            Authorization: `Bearer ${request.accessToken}`, // Add Bearer token here

        };
        console.log("request in apiPatchRequest", JSON.stringify(request, null, 2));

        const response = await axios.put(request.apiUrl, request.data, { headers });
        console.log("response in apiPatchRequest", response.data);
        return response;
    
};

// Function to handle DELETE requests
// This function takes a request object with apiUrl, content_type, and accessToken
export const apiDeleteRequest = async (request) => {
   
        console.log("Calling delete API:", request);
        // console.log("Headers:", { Authorization: `Bearer ${request.accessToken}` });

        const response = await axios.delete(request.apiUrl, {
            headers: {
                "accept": "*/*",
                "content-type": request.content_type,
                Authorization: `Bearer ${request.accessToken}`, // Add Bearer token here
            },
        });

        // Log the raw response for debugging
        console.log("Raw Delete API Response:", response.data);

        return response; // Axios automatically parses JSON
   
};