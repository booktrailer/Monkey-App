var timer_running = false;
var sounds = [];
var audio = new Audio('default.mp3');
var audio_file = null;
var the_interval = null;
var paused = false;
var orig_time = 0; // Global variable, track remaining time
var req_time = null;
var time_left = 0; // remaining time
var times = [];
var theTheme = 'no theme';

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
    getFile();

    // load the themes
    var loaded_themes = localStorage.getItem('themes');
    console.log(loaded_themes);
    if (!(loaded_themes)) {
        console.log('not skib');
        theTheme = 'red';
        localStorage.setItem('themes', theTheme);
    } else {
        theTheme = loaded_themes;
    }

    set_theme();

    /*
    // load the sounds
    var loaded_sounds = localStorage.getItem('sounds');
    console.log(loaded_sounds);

    if (!(loaded_sounds)) {
        console.log('not skib');
        audio = new Audio('default.mp3');
        localStorage.setItem('sounds', audio);
    }*/

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
                content = String(minutes) + ' min ' + String(times[i] - 60*minutes) + ' seconds';
            }
        } else {
            content = String(times[i]) + ' sec';
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

    if (delete_index > -1) { // splice array when item is found
        times.splice(delete_index, 1); 
    }

    load_times();
}

function start_timer(time) {
    if (!timer_running) {
        timer_running = true;
        console.log('started');

        orig_time = (Date.now())/1000; // big number when time starts
        req_time = time; 

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

        // change header
        var header_text = document.getElementById('webpage-title');
        document.title = String(time_left);

        // if time is up
        if (time_left <= 0) {
            clearInterval(the_interval);
            time_num.innerHTML = '!!!';
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

        var header_text = document.getElementById('webpage-title');
        header_text.innerHTML = '<title>Timerly</title>';
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

    var header_text = document.getElementById('webpage-title');
    header_text.innerHTML = '<title>Timerly</title>';
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

function swap_theme(theme) {
    theTheme = theme;
    set_theme();
}

function set_theme() {
    var styles = document.getElementById('stylestuff');
    if (theTheme == null) {
        theTheme = 'red';
        styles.innerHTML = '<link rel="stylesheet" href="' + theTheme + '.css">';
    } else {
        styles.innerHTML = '<link rel="stylesheet" href="' + theTheme + '.css">';
    }
    localStorage.setItem('themes', theTheme);
    console.log(theTheme);
}

/////////////////////////////////////////////////////////////////////////////////////
// THIS IS STUFF FOR UPLOAD SOUND, DOES NOT WORK
/////////////////////////////////////////////////////////////////////////////////////


// called from button press
function upload_sound() {
    var fileInput = document.getElementById('fileInput');
    // if empty
    if (fileInput.files.length === 0) {
        alert('Please select a file!');
        return;
    }

    // might need changing
    setSoundJSON(fileInput.files[0]);
    try {
        audio = new Audio(fileInput.files[0]);
    } catch (e) {
        alert('failed');
    }
}

function setSoundJSON(file) {
    if (!file) {
        alert('No file selected');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const base64String = event.target.result;

        // Check file size in base64
        if (base64String.length > 8000000) {
            alert('File might be too large, try a different file');
            return;
        }

        try {
            localStorage.setItem('sounds', base64String);
            alert(`File successfully saved. File type: ${file.type}`);
            alert(base64String);
        } catch (e) {
            alert('Upload failed, check file size or format');
            console.error('Error saving to localStorage:', e);
        }
    };

    reader.onerror = function () {
        alert('Error reading file');
        console.error('FileReader error:', reader.error);
    };

    reader.readAsDataURL(file); // Read the file as a base64-encoded string
}

// Broken Code
/*
function setSoundJSON(file) {
    const reader = new FileReader();

    // add file to local storage
    var base64String = ''
    reader.onload = function (event) {
        
        base64String = event.target.result;
        if (base64String.length > 8000000) {
            alert('file might be too large, try a different file');
            return;
        }
    }

    try {
        localStorage.setItem('sounds', file);
        alert('set local storage succeeded succeeded', file.type());
    } catch (e) {
        alert('upload failed, check file size or format');
    }
}*/

// run on startup
function getFile() {
    var sound = localStorage.getItem('sounds');
    if (!(sound)) {
        setSoundJSON(audio_file);
    } else {
        audio = new Audio(base64toFile(sound));
        audio_file = base64toFile(sound);
    }
}

function base64toFile(base64){
    // set Base64 string
    const base64String = base64;

    // turn base64 into binary data
    const base64Data = base64String.split(",")[1]; // Remove the prefix
    const binaryData = atob(base64Data); // Decode Base64

    // Convert
    const binaryArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        binaryArray[i] = binaryData.charCodeAt(i);
    }

    // Create a Bob
    const blob = new Blob([binaryArray], { type: "audio/mp3" }); 

    // Convert Blob to a File and return it
    const mp4File = new File([blob], "audio.mp3", { type: "audio/mp3" });
    return mp4File;

    // Generate Object URL - returns as a audio, not a file
    /*const url = URL.createObjectURL(blob);

    // create the elemnt
    const created_audio = new Audio();
    created_audio.src = url;
    return created_audio;*/

    //cleanup
    //!!!! does not work
    /*
    audio.onended = () => {
        URL.revokeObjectURL(url);
    };
    */
}


// play sound
function playSound() {
    audio.play();
    console.log('audio played');
}