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