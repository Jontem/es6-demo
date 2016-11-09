define(function () {
   return function (url, callback) {
       var httpRequest = new XMLHttpRequest();

       httpRequest.onreadystatechange = function(){
           if (httpRequest.readyState === XMLHttpRequest.DONE) {
               if (httpRequest.status === 200) {
                   var data = JSON.parse(httpRequest.responseText);
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
});