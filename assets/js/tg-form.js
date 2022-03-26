document
    .querySelector("form.pure-form")
    .addEventListener("submit", function (e) {
        // to prevent
        e.preventDefault();

        // to get date and time
        var today = new Date();
        var date =
            today.getFullYear() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate() +
            "::::" +
            today.getHours() +
            "-" +
            today.getMinutes() +
            "-" +
            today.getSeconds();

        // to get input values
        var nameInput = document.getElementById("name").value;
        var emailInput = document.getElementById("email").value;
        var input_message = document.getElementById("message").value;
        var message = input_message.replace(/(\r\n|\n|\r|\n|\t)/gm, " "); //remove those line breaks for textarea

        if (nameInput === "") {
            swal("Name !", "Invalid name", "error");
            // return false;
        } else if (nameInput.length < 2) {
            swal("Name !", "Invalid name", "error");
            // return false;
        } else if (emailInput === "") {
            swal("Email !", "Invalid email", "error");
            // return false;
        } else if (emailInput.length < 2) {
            swal("Email !", "Invalid email", "error");
            // return false;
        } else if (message === "") {
            swal("Message !", "Invalid message", "error");
            // return false;
        } else if (message.length < 2) {
            swal("Message !", "Invalid message", "error");
            // return false;
        } else {
            var send_message =
                date +
                "%0A%0A<b>Name:</b> " +
                nameInput +
                "%0A<b>Email:</b> " +
                emailInput +
                "%0A<b>Message:</b> " +
                message;

            // declearing bot token and chat id
            var bot_token = "5158312648:AAFQYMf2CAhdLxpdFXOJpy1S1FPDclW7Hc0"; // bot token
            var chat_id = 788765432; // my chat id

            // creating url using bot token, chat id and message
            var url =
                "https://api.telegram.org/bot" +
                bot_token +
                "/sendMessage?chat_id=" +
                chat_id +
                "&text=" +
                send_message +
                "&parse_mode=html";

            // creating request
            var xhttp = new XMLHttpRequest();

            // loading status
            var loadingMsg = document.getElementById("loading-message");
            loadingMsg.style.display = "block";

            // sending request
            xhttp.open("GET", url, true);
            xhttp.send();

            // response message
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    // printing the responses on console
                    console.log("xhttp.readyState=", xhttp.readyState);
                    console.log("xhttp.status=", xhttp.status);
                    console.log("response=", xhttp.responseText);

                    // storing the responses
                    var data = JSON.parse(xhttp.responseText);
                    var uploadResult = data["ok"];
                    console.log("uploadResult=", uploadResult);

                    // conditions to show response messages
                    if (uploadResult === true) {
                        var sentMsg = document.getElementById("sent-message");
                        loadingMsg.style.display = "none";
                        sentMsg.style.display = "block";
                        console.log("successfully uploaded file");
                    } else {
                        var errorMsg = document.getElementById("error-message");
                        loadingMsg.style.display = "none";
                        errorMsg.style.display = "block";
                        console.log("failed to upload file");
                    }
                }
            };
        }
    });