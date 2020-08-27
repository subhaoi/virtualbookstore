// Handles the actions and interactions in the floating chat box

$(document).ready(function(){  
    var socket = io.connect("http://localhost:4000");
    var ready = false;
	
    $("#submit").submit(function(e) {
		e.preventDefault();
		$("#nick").hide();
		$("#chat").show();
		var name = $("#nickname").val();
		var time = new Date();
		$("#name").html(name);
		$("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

		ready = true;
		socket.emit("join", name);

	});

	$("#namesubmit").click(function(e) {
		e.preventDefault();
		$("#nick").hide();
		$("#chat").show();
		var name = $("#nickname").val();
		var time = new Date();
		$("#name").html(name);
		var hours = time.getHours();
		var minutes = time.getMinutes();
		var ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
			$("#time").html('First login: ' + strTime);

		ready = true;
		socket.emit("join", name);

	});

	$("#close").click(function(e) {
		console.log("closing");
		e.preventDefault();
		$("#nick").show();
		$("#chat").hide();
		socket.disconnect(true);
	});

	$("#textarea").keypress(function(e){
        if(e.which == 13) {
        	var text = $("#textarea").val();
        	$("#textarea").val('');
			var time = new Date();
			var hours = time.getHours();
			var minutes = time.getMinutes();
			var ampm = hours >= 12 ? 'pm' : 'am';
			hours = hours % 12;
			hours = hours ? hours : 12; // the hour '0' should be '12'
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var strTime = hours + ':' + minutes + ' ' + ampm;
					$(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + strTime + '</time></div></li>');
					
					socket.emit("send", text);
					// automatically scroll down
					document.getElementById('bottom').scrollIntoView();
        }
	});
	
	$("#chatsubmit").click(function(e){
        	var text = $("#textarea").val();
        	$("#textarea").val('');
        	var time = new Date();
					$(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
					
					socket.emit("send", text);
					// automatically scroll down
					document.getElementById('bottom').scrollIntoView();
    });



    socket.on("update", function(msg) {
    	if (ready) {
    		$('.chat').append('<li class="info">' + msg + '</li>')
    	}
    }); 

    socket.on("chat", function(client,msg) {
    	if (ready) {
				var time = new Date();
				$(".chat").append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
				
    	}
    });




});

