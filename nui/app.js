$(document).ready(function() {
    var code = [];
    var trycount = 0;

    window.onload = function(e) {
        window.addEventListener("message", (event) => {
            var msg = event.data;

            if (msg !== undefined && msg.type === "ui") {
                if (msg.display === true)  { startGame(); }
                if (msg.display === false) { $('#mg_hack').hide(); }
            }
        })
    }

    //wait for keyup event
    $('input').keyup(function(e) {
        if (!$('#mg_hack').is(':visible')) { return; }

        var inputbox = parseInt(this.id)-1;
        
        if (e.which == 27) {
            fetch(`https://${GetParentResourceName()}/exitgame`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8', },
                body: JSON.stringify({})
            }).then();
        }
        if (e.which == 8) {
            $('#'+inputbox).val("");
            $('#'+inputbox).focus();
        }

        if (trycount >= 10) { return; }        
        if (this.value.length > 1) { this.value = ""; return; }
        if (!Number.isInteger(this.valueAsNumber)) { this.value = ""; return; }
        
        if (this.id=="4") { submit(); }
        else {
            $(this).next().focus();
        }
    });

    function startGame() {
        code = [];
        trycount = 0;

        //create the random four digit code
        //check that digit only appears once
        while (code.length < 4) {
            var tmp = Math.floor(Math.random() * 10);

            if (!code.includes(tmp)) { code.push(tmp); }
        }
        
        //show nui
        $('#histroy').empty();
        $('#mg_hack').show();
        $('#1').prop('disabled', false);
        $('#2').prop('disabled', false);
        $('#3').prop('disabled', false);
        $('#4').prop('disabled', false);
        $('#1').focus();
    }

    function submit() {
        trycount++;
        $("#trycount").text(trycount);
        var input = [
            parseInt($('#1').val()),
            parseInt($('#2').val()),
            parseInt($('#3').val()),
            parseInt($('#4').val())
        ];

        var output = "<div class=\"tryrow\">";
        for (let i = 0; i < 4; i++) {
            if (input[i] == code[i]) { output += "<div class=\"trynumber green\" id=try"+trycount+"num"+i+">"+input[i]+"</div>"; }
            else if (code.includes(input[i])) { output += "<div class=\"trynumber yellow\" id=try"+trycount+"num"+i+">"+input[i]+"</div>"; }
            else { output += "<div class=\"trynumber red\" id=try"+trycount+"num"+i+">"+input[i]+"</div>"; }
        }
        output += "</div>";
        $("#histroy").append(output);

        if (input[0] === code[0] &&
            input[1] === code[1] &&
            input[2] === code[2] &&
            input[3] === code[3]) { endGame(true); }
        else if (trycount >= 10) { endGame(false); }
        else { clearKeypad(); }
    }

    function endGame(win) {
        clearKeypad();
        $('#1').focus();
        $('#1').prop('disabled', true);
        $('#2').prop('disabled', true);
        $('#3').prop('disabled', true);
        $('#4').prop('disabled', true); 
        $('#mg_hack').hide();
        
        if (win == 'exit') { return; }
        fetch(`https://${GetParentResourceName()}/endgame`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8', },
            body: JSON.stringify({
                win: win
            })
        }).then();
    }

    function clearKeypad() {
        $('#1').val("");
        $('#2').val("");
        $('#3').val("");
        $('#4').val("");
        $('#1').focus();
    }
});