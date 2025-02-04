
//let socket;
$(function () {
    
    var oldID = localStorage.getItem("user_id");
    if(!oldID){
        var userID = document.getElementById('user_id').getAttribute('data-user-id');
        localStorage.setItem("user_id", userID);
    }
    //var userID = document.getElementById('user_id').getAttribute('data-user-id');

    var userID =localStorage.getItem("user_id")
    console.log("User ID NEW : ",userID)

    if (userID){  
        const socket = new WebSocket('ws://192.168.0.252:3021');
        // Handle connection open
        socket.onopen = () => {
            console.log('Connected to WebSocket server');
            socket.send(JSON.stringify({ type: 'userID', userID: userID }));
        };
         // Handle incoming messages
        socket.onmessage = (event) => {
            document.querySelector('#notificationModal2 .modal-body').innerHTML = `<p>${event.data}</p>`;
            $('#notificationModal2').modal('show');
        };
        // Handle connection close
        socket.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };     
    }
   
});


