// hashtag manegement
const createHashtag = () =>{
    const hashtag_container = document.getElementById("container-hashtag");

    const hashtag_name = document.getElementById("hashtag-text").value;

    const hashtag_chip = document.createElement('span');
    const hashtag_chip_name = document.createTextNode(`#${hashtag_name}`);
    const closebutton = document.createElement('button');

    hashtag_chip.classList.add('badge', 'text-black', 'align-text-top', 'rounded-pill', 'bg-warning', 'hashtag', 'm-1');
    closebutton.classList.add('btn-close', 'btn-close-white');
    closebutton.id = 'button-close-chip';

    closebutton.addEventListener('click',()=>{
        closebutton.parentElement.remove();
    })

    hashtag_chip.appendChild(hashtag_chip_name);
    hashtag_chip.appendChild(closebutton);
    
    hashtag_container.appendChild(hashtag_chip);

    document.getElementById("hashtag-text").value = '';
}

const button_add_hashtag = document.getElementById("hashtag-add");
button_add_hashtag.addEventListener('click',createHashtag);

//copy text
const button_copy_text = document.getElementById('button-copy-text');
const toast_copy = document.getElementById('toast-copy');
if (button_copy_text) {
    button_copy_text.addEventListener('click', function () {
        copyText();
        let toast = new bootstrap.Toast(toast_copy);
        toast.show();
  })
}

const copyText = ()=>{
    let text = '';
    const title = document.getElementById("inputTitle").value;
    const content = document.getElementById("inputContent").value;

    const all_hashtag = document.querySelectorAll('span.hashtag');

    if (title[0] != '') {
        text += `${title}\n\n`
    }
    if (content[0] != '') {
        text += `${content}\n\n`
    }
    
    metadata_items.forEach((item) => {
        text += `${document.getElementById(item).innerHTML}\n`;
    })

    if(all_hashtag.length > 0){
        text += `\n`;
        all_hashtag.forEach((item)=>{
            text += `${item.innerText} `
        })
    }

    navigator.clipboard.writeText(text);
}

const button_preview = document.getElementById('button-preview');
const toast_preview = document.getElementById('toast-preview')
if (button_preview) {
    button_preview.addEventListener('click', function () {
        previewUpdate();
        let toast = new bootstrap.Toast(toast_preview);
        toast.show();
  })
}

const previewUpdate = () =>{
    const dom_title = document.getElementById("inputTitle");
    const dom_content = document.getElementById("inputContent");
    const toast_preview_text = document.getElementById("toast-preview-text");
    const all_hashtag = document.querySelectorAll('span.hashtag');
    
    let text = '';
    const title = dom_title.value;
    const content = dom_content.value;

    text += `${title}\n\n${content}\n\n`

    metadata_items.forEach((item) => {
        text += `${document.getElementById(item).innerHTML}\n`;
    })

    if(all_hashtag.length > 0){
        text += `\n`;
        all_hashtag.forEach((item)=>{
            text += `${item.innerText} `
        })
    }

    toast_preview_text.innerText = text;
}


window.addEventListener('keypress', (event)=>{
    if (document.activeElement.id == "hashtag-text" && event.key == "Enter") {
        event.preventDefault();
        button_add_hashtag.click();
    }
})