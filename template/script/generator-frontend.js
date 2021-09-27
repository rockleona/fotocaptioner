// Reader
const dataReader = (img_object) =>{
    img_object.exifdata = null;
    EXIF.getData(img_object, function() {
        let allMetaData = EXIF.getAllTags(img_object);
        metadata_items.forEach((item) =>{elementReplacer(allMetaData,item);});
        console.log(allMetaData); // DEV
    });
}

const metadata_items =['photo-machine', 'photo-f-number', 'photo-et', 'photo-iso', 'photo-fl' ] 
const elementReplacer = (metadata , item) =>{
    const object_dom = document.getElementById(item);
    let temp_value;

    switch (item) {
        case 'photo-machine':
            temp_value = `Machine : ${metadata.Make} ${metadata.Model}`;
            break;
        
        case 'photo-f-number':
            temp_value = `F-number : f/${metadata.FNumber}`;
            break;
        
        case 'photo-et':
            temp_value = `Exposure Time : ${metadata.ExposureTime.numerator}/${metadata.ExposureTime.denominator}`;
            break;
        
        case 'photo-iso':
            temp_value = `ISO ${metadata.ISOSpeedRatings}`;
            break;
        
        case 'photo-fl':
            temp_value = `Focal Length : ${parseInt(metadata.FocalLength)} mm`;
            break;

        default:
            temp_value = `empty_value` ;
            break;
    }

    object_dom.innerHTML = temp_value;
}

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

// interval
const checkSrc = (checker) =>{
    const current_src = document.getElementById('img-photo').src;
    if (checker !== current_src){
        let img = document.getElementById('img-photo');
        img.src = checker;
        clearInterval(event_src_changed);
    }
}

const noticeMe = (msg)=>{
    console.log(msg);
}
const img = document.getElementById('img-photo');
// img.addEventListener('load', dataReader(img));
img.addEventListener('load', noticeMe('hey'));

window.api_dev.receive("chosenFile", (base64) => {
    const src = `${base64}`
    let img = document.getElementById('img-photo');
    img.setAttribute('src',src);
    // noticeMe('hey');
});
