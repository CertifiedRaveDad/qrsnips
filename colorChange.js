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

document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById('wallpaper-upload');
    const previewArea = document.getElementById('wallpaper-demo');
    const wallpaperRadios = document.querySelectorAll('input[name="WallpaperOptions"]');

    // Object mapping values to actual image URLs
    const wallpaperImages = {
        wallpaper1: "https://th.bing.com/th/id/OIP.GELKQ4d2ogvLPHMtaI4UygHaHa?rs=1&pid=ImgDetMain",
        wallpaper2: "https://th.bing.com/th/id/OIP.RVXdocs4cbENDzq9XpLkiwHaFS?rs=1&pid=ImgDetMain",
        wallpaper3: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
    };


    function setWallpaper(imageUrl) {
        previewArea.style.backgroundImage = `url(${imageUrl})`;
    }

    // Handle radio button selection
    wallpaperRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            const selectedWallpaper = event.target.value;
            if (wallpaperImages[selectedWallpaper]) {
                setWallpaper(wallpaperImages[selectedWallpaper]);
            }
            fileInput.value = ""; // Clear file input to prevent conflicts
        });
    });


    // Handle file upload
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setWallpaper(e.target.result);
                // Uncheck all radio buttons when a file is uploaded
                wallpaperRadios.forEach(radio => radio.checked = false);
            }

            reader.readAsDataURL(file);
        }
    });
});
