var times = [5, 60, 180, 300];
var timer_running = false;
var audio = new Audio('lose-sound.mp3');
var the_interval = null;
var paused = false;
var curr_time = 0; // Global variable to track remaining time

function load_times() {
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

        button_html += '<button id="button' + times[i].toString() + '" onclick="start_timer(' + times[i] + ')">' + content + '</button>';
    }
    var button_container = document.getElementById('button_container');
    button_container.innerHTML = button_html;
}

function start_timer(time) {
    if (!timer_running) {
        timer_running = true;
        console.log('started');

        var time_num = document.getElementById('time_num');
        curr_time = time; // Assign the time to the global variable
        time_num.innerHTML = String(curr_time);

        console.log('got past part 1!!! yay');

        paused = false;
        the_interval = setInterval(update_timer, 1000);
    }
}

function update_timer() {
    if (!paused) {
        curr_time--;
        var time_num = document.getElementById('time_num');
        time_num.innerHTML = String(curr_time);

        if (curr_time <= 0) {
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
        times.push(custom_input.value);
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
            the_interval = setInterval(update_timer, 1000);
        } else {
            console.log('Pausing timer');
            paused = true;
            clearInterval(the_interval);
        }
    }
}
