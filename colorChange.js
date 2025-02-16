const colorPicker = document.getElementById("QRCodecolorInput");
const div1 = document.getElementById("svg-container");
const div2 = document.getElementById("QRcodeText");

colorPicker.addEventListener("input", (event) => {
    const selectedColor = event.target.value;
    div1.style.color = selectedColor;
    div2.style.color = selectedColor;
});


const bgColorPicker = document.getElementById("QRBackgroundColor");
const bg1 = document.getElementById("qrbgcontainer");
const bg2 = document.getElementById("QRTextbgcontainer");

function hexToRGBA(hex, alpha = 0.25) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

bgColorPicker.addEventListener("input", (event) => {
    const selectedColor2 = event.target.value;
    const rgbaColor = hexToRGBA(selectedColor2, 0.25)
    bg1.style.backgroundColor = rgbaColor;
    bg2.style.backgroundColor = rgbaColor;
});
