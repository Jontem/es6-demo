export function fetchData(url, callback) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const data = JSON.parse(httpRequest.responseText);
                callback(data);
            } else {
                alert('There was a problem with the request.');
            }
        }
    };

    httpRequest.open('GET', url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.send(null);
}