var times = [60, 180, 300];
button_list = []
button_elements = []
button_list = document.getElementById('button_container');

function load_times() {
    
    var button_html = '';
    for (let i = 0; i < times.length; i++) {
        if (!(button_list.includes('button' + times[i].toString()))) {
        button_html += '<button id="button' + times[i].toString() + '">' + (times[i]/60).toString() + ' minut</button>';
        button_list.push('button' + times[i].toString())

        button_list.innerHTML = button_html;
        button_elements.push(document.getElementById('button' + times[i].toString()));
        }
    }

    console.log(times)
    console.log(button_list)
    console.log(button_elements)

    

    
    button_list.innerHTML = button_html;
}