var times = [5, 60, 180, 300];
var timer_running = false
var audio = new Audio('lose-sound.mp3');
var the_interval = null;

function load_times() {
    
    var button_html = '';
    for (let i = 0; i < times.length; i++) {
        button_html += '<button id="button' + times[i].toString() + '" onclick="start_timer(' + times[i] + ')">' + times[i].toString() + ' seconds' + '</button>';
        }
    
    var button_container = document.getElementById('button_container');
    button_container.innerHTML = button_html;
}

function start_timer(time) {
    if (!(timer_running)) {
        timer_running = true
        console.log('started');

        var time_num = document.getElementById('time_num');
        var curr_time = time;
        time_num.innerHTML = String(curr_time);
        var curr_old_val = curr_time;

        console.log('gotpastpart1!!! yay');

        the_interval = setInterval(function() {
            curr_time--;
            time_num.innerHTML = String(curr_time);

            if (curr_time <= 0) {
                clearInterval(the_interval);
                time_num.innerHTML = 'times up!!!';
                timer_running = false;
                audio.play();
            }
        }, 1000);

    }

}

function stop_audio() {
    audio.pause();
    audio.currentTime = 0;
}

function new_time() {
    console.log('submitted');
    custom_input = document.getElementById('custom_input');
    console.log(custom_input.value)

    if (custom_input.value > 0) {
        console.log('greater')
        times.push(custom_input.value);
        console.log(times);
        load_times();
    }

}

function cancel() {
    clearInterval(the_interval);
    time_num.innerHTML = 'cancelled successfully';
}