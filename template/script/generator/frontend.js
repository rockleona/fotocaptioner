// Trigger
const triggerLoad = ()=>{
    let img = document.getElementById('img-photo');
    dataReader(img);
}

// DOM Listener
let new_src, event_src_changed;
const button_select_photo = document.getElementById('button-select-photo');
button_select_photo.addEventListener('click', () => {
    // window.api_dev.send('toMain','here');
    window.api_dev.send('chooseFile');
});

const button_demo = document.getElementById('button-demo');
button_demo.addEventListener('click', ()=> triggerLoad());

