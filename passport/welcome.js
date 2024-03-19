// Im Xenon !
function createOrUpdateData() {
  const uniqueIdCookie = document.cookie.match('(^|;) ?uniqueId=([^;]*)(;|$)');
  let uniqueId = uniqueIdCookie ? uniqueIdCookie[2] : null;
  if (!uniqueId) {
    const randomId = Math.random().toString(36).substr(2, 10); // Example: abcdef1234
    const date = new Date();
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    uniqueId = `${randomId}_${formattedDate}`;
    document.cookie = `uniqueId=${uniqueId}; path=/; expires=365;`; // Set cookie for 1 year
  }
  const currentUrl = window.location.href;
  const getEndpoint = 'https://script.google.com/macros/s/AKfycbwHrmw2t0IqR3r1qQ80ewPTKmqQGaiWc6Q0M3niu3AgxsKkld02AYelppNTqt5BtAs/exec/exec';
  const postEndpoint = 'https://script.google.com/macros/s/AKfycbwHrmw2t0IqR3r1qQ80ewPTKmqQGaiWc6Q0M3niu3AgxsKkld02AYelppNTqt5BtAs/exec/exec';
  const xhrGet = new XMLHttpRequest();
  xhrGet.open('GET', `${getEndpoint}?uniqueId=${uniqueId}`);
  xhrGet.onload = () => {
    let visits = 1;
    try {
      const response = JSON.parse(xhrGet.responseText);
      if (response && response.visits) {
        visits = parseInt(response.visits) + 1;
      }
    } catch (error) {}
    const xhrPost = new XMLHttpRequest();
    xhrPost.open('POST', postEndpoint);
    xhrPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrPost.onload = () => {
      console.log(xhrPost.responseText);
    };
    xhrPost.send(`uniqueId=${uniqueId}&visits=${visits}&lastUrl=${currentUrl}`);
  };
  xhrGet.send();
}
createOrUpdateData();