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
            let maker, model;
            if (metadata.Make == undefined){
                maker = '';
            }else{
                maker = metadata.Make;
            }
            if (metadata.Model == undefined){
                model = '';
            }else{
                model = metadata.Model;
            }
            temp_value = `Machine : ${maker} ${model}`;
            break;
        
        case 'photo-f-number':
            if (metadata.FNumber == undefined){
                temp_value = 'F-number :';
            }else{
                temp_value = `F-number : f/${metadata.FNumber}`;
            }
            break;
        
        case 'photo-et':
            if (metadata.ExposureTime.numerator == undefined){
                temp_value = 'Exposure Time :';
            }else{
                temp_value = `Exposure Time : ${metadata.ExposureTime.numerator}/${metadata.ExposureTime.denominator}`;
            }
            break;
        
        case 'photo-iso':
            if (metadata.ExposureTime.numerator == undefined){
                temp_value = 'ISO';
            }else{
                temp_value = `ISO ${metadata.ISOSpeedRatings}`;
            }
            break;
        
        case 'photo-fl':
            if (metadata.ExposureTime.numerator == undefined){
                temp_value = 'Focal Length :';
            }else{
                temp_value = `Focal Length : ${parseInt(metadata.FocalLength)} mm`;
            }
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
const img = document.getElementById('img-photo');
window.api_dev.receive("chosenFile", (base64) => {
    const src = `${base64}`
    let img = document.getElementById('img-photo');
    img.setAttribute('src',src);

});

//copy text

const button_copy_text = document.getElementById('button-copy-text');
const liveToast = document.getElementById('liveToast')
if (button_copy_text) {
    button_copy_text.addEventListener('click', function () {
        copyText();
        var toast = new bootstrap.Toast(liveToast);
        toast.show();
  })
}

const copyText = ()=>{
    const object_dom_array = [];
    let text = '';
    metadata_items.forEach((item) => {
        object_dom_array.push(document.getElementById(item));
    })
    object_dom_array.forEach((item) =>{
        text += `${item.innerHTML}\n`;
    })
    navigator.clipboard.writeText(text);
}