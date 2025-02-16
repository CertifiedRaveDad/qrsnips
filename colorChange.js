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

        bgColorPicker.addEventListener("input", (event) => {
            const selectedColor2 = event.target.value;
            bg1.style.color = selectedColor2;
            bg2.style.color = selectedColor2;
});
