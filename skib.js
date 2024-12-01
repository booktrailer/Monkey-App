var timer_running = false;
var audio = new Audio('lose-sound.mp3');
var the_interval = null;
var paused = false;
var orig_time = 0; // Global variable to track remaining time
var req_time = null;
var time_left = 0; // remaining time
var times = 'not skib';

function resetTimes() {
    // testing
    times = [5, 60, 180, 300];
    load_times();
}

// get the saved times
function startup_times() {
    times = localStorage.getItem('times');
    console.log(times);
    if (!(times)) {
        console.log(times);
        console.log('not skib');
        times = [5, 60, 180, 300];
        localStorage.setItem('times', JSON.stringify(times));
    } else {
        times = JSON.parse(times);
    }

    load_times();
}

function load_times() {
    localStorage.setItem('times', JSON.stringify(times));

    var button_html = '';
    for (let i = 0; i < times.length; i++) {
        var content = '';

        if (times[i] >= 60) {
            if (times[i]%60 == 0) {
                content = (times[i]/60).toString() + ' minutes';
            } else {
                minutes = Math.floor(times[i]/60);
                content = String(minutes) + ' minutes ' + String(times[i] - 60*minutes) + ' seconds';
            }
        } else {
            content = String(times[i]) + ' seconds';
        }

        button_html += '<button id="button' + times[i].toString() + '" onclick="start_timer(' + times[i] + ')" oncontextmenu="deleteButton(' + times[i].toString() + '); return false">' + content + '</button>';
    }
    var button_container = document.getElementById('button_container');
    button_container.innerHTML = button_html;
}

function deleteButton(button_id) {
    var deleting_button = document.getElementById('button' + button_id);
    deleting_button.remove();

    var delete_index = times.indexOf(button_id);

    if (delete_index > -1) { // only splice array when item is found
        times.splice(delete_index, 1); 
    }

    load_times();
}

function start_timer(time) {
    if (!timer_running) {
        timer_running = true;
        console.log('started');

        orig_time = (Date.now())/1000; // big number when time starts
        req_time = time; // Assign the required time to the global variable

        // set the html inner thing
        var time_num = document.getElementById('time_num');
        time_num.innerHTML = String(req_time);
        

        console.log('got past part 1!!! yay');

        paused = false;

        // interval for checking curr time vs big time
        the_interval = setInterval(update_timer, 1000);
    }
}

function update_timer() {
    if (!paused) {
        // set change
        var curr_time = (Date.now())/1000;
        var changed = Math.floor(curr_time - orig_time);
        time_left = req_time - changed;

        // log stuff
        console.log(curr_time);
        console.log(changed);
        console.log(time_left);

        // do the html thing
        var time_num = document.getElementById('time_num');
        time_num.innerHTML = String(time_left);

        // if time is up
        if (time_left <= 0) {
            clearInterval(the_interval);
            time_num.innerHTML = 'times up!!!';
            timer_running = false;
            audio.play();
        }
    }
}

function stop_audio() {
    audio.pause();
    audio.currentTime = 0;
    
    if (!(timer_running)) {
        document.getElementById('time_num').innerHTML = '0';
    }
}

function new_time() {
    console.log('submitted');
    var custom_input = document.getElementById('custom_input');
    console.log(custom_input.value);

    if (custom_input.value > 0) {
        console.log('greater');
        times.push(parseInt(custom_input.value));
        console.log(times);
        load_times();
    }
}

function cancel() {
    clearInterval(the_interval);
    document.getElementById('time_num').innerHTML = '0';
    timer_running = false;
}

function pause() {
    if (timer_running) {
        if (paused) {
            console.log('Resuming timer');
            paused = false;

            // countdown from a new time
            orig_time = (Date.now())/1000;

            the_interval = setInterval(update_timer, 1000);
        } else {
            console.log('Pausing timer');
            paused = true;
            clearInterval(the_interval);

            req_time = time_left;
        }
    }
}
