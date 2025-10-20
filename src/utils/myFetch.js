const loadFromLocalStorage = (dataType, returnIfEmpty) => {
  const storedData = localStorage.getItem(dataType)
  return storedData ? JSON.parse(storedData) : returnIfEmpty
}
// prettier-ignore
const myFetch = async ({ url, method = 'GET', data = null, contentType='application/json' }) => {
  try {
    const options = { method: method, credentials: 'include' };

    if (method !== 'GET' && data) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
        options.headers = { 'Content-Type': contentType };
      }
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(`fetch response ${method} to ${url} not ok`);
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unknown error occurred');
    }

    const contentTypeReturned = response.headers.get('content-type');
    let result;
    if (contentTypeReturned && contentTypeReturned.includes('application/json')) result = await response.json();
    else result = await response.text(); 
    
    return result;
  } catch (error) {
    console.error('Error in fetch request:', error);
    return { message: error.message };
  }
}

export { myFetch, loadFromLocalStorage }
