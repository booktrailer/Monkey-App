var times = [60, 180, 300];

function load_times() {
    var button_html = '';
    for (let i = 0; i < times.length; i++) {
        button_html += '<button id="button' + times[i].toString() + '">' + (times[i]/60).toString() + '</button>';
    }

    button_list = document.getElementById('button_container');
    button_list.innerHTML = button_html;
}