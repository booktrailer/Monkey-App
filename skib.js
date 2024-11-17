var times = [60, 180, 300];

function load_times() {
    
    var button_html = '';
    for (let i = 0; i < times.length; i++) {
        button_html += '<button id="button' + times[i].toString() + '" onclick="start_timer(' + times[i] + ')">' + (times[i]/60).toString() + ' minut</button>';
        }
    
    var button_container = document.getElementById('button_container')
    button_container.innerHTML = button_html;
}

function start_timer(time) {
    var time_num = document.getElementById('time_num')
    var curr_time = time;
    time_num.innerHTML = toString(curr_time);
    var curr_old_val = curr_time;

    setInterval(function() {
        curr_time--;
    }, 1000);

    while ( curr_time >= 0) {
        if (curr_old_val != curr_time) {
            curr_old_val = curr_time;
            time_num.innerHTML = toString(curr_time);
        }

    time_num.innerHTML = 'times up!!!';
    }
}