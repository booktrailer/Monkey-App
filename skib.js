var times = [60, 180, 300];
var timer_running = false

function load_times() {
    
    var button_html = '';
    for (let i = 0; i < times.length; i++) {
        button_html += '<button id="button' + times[i].toString() + '" onclick="start_timer(' + times[i] + ')">' + (times[i]/60).toString() + ' minut</button>';
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

        setInterval(function() {
            curr_time--;
            time_num.innerHTML = String(curr_time);

            if (curr_time <= 0) {
                clearInterval(timerInterval)
                time_num.innerHTML = 'times up!!!';
                timer_running = false
            }
        }, 1000);

    }

}