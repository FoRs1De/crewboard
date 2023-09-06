import axios from 'axios';
axios.defaults.withCredentials = true;

const postRequest = async (url, postObject) => {
  try {
    const response = await axios.post(url, postObject);
    console.log('Response:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code that falls out of the range of 2xx
      console.error('Request failed with status code:', error.response.status);

      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something else went wrong
      console.error('Error:', error.message);
    }
    throw error; // Re-throw the error for further handling if needed
  }
};
export default postRequest;
