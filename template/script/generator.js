// Reader
let meta; // DEV
const dataReader = (img_object) =>{
    EXIF.getData(img_object, function() {
        let allMetaData = EXIF.getAllTags(this);
        metadata_items.forEach((item) =>{elementReplacer(allMetaData,item);});

        meta = allMetaData; //DEV
        console.log(allMetaData);
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

const button_demo = document.getElementById('button-demo');
button_demo.addEventListener('click', ()=> triggerLoad());