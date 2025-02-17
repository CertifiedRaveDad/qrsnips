document.addEventListener("DOMContentLoaded", () => {
    // Font color picker functionality
    function initFontColorPicker() {
        const colorPicker = document.getElementById("qrcolorp");
        const div1 = document.getElementById("svg-container");
        const div2 = document.getElementById("QRcodeText");

        if (colorPicker && div1 && div2) {
            colorPicker.addEventListener("input", (event) => {
                const selectedColor = event.target.value;
                div1.style.color = selectedColor;
                div2.style.color = selectedColor;
            });
        }
    }

    // Background color picker functionality with transparency
    function initBackgroundColorPicker() {
        const bgColorPicker = document.getElementById("QRBackgroundColor");
        const bg1 = document.getElementById("qrbgcontainer");
        const bg2 = document.getElementById("QRTextbgcontainer");

        function hexToRGBA(hex, alpha = 0.25) {
            let r = parseInt(hex.substring(1, 3), 16);
            let g = parseInt(hex.substring(3, 5), 16);
            let b = parseInt(hex.substring(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        if (bgColorPicker && bg1 && bg2) {
            bgColorPicker.addEventListener("input", (event) => {
                const selectedColor = event.target.value;
                const rgbaColor = hexToRGBA(selectedColor, 0.25);
                bg1.style.backgroundColor = rgbaColor;
                bg2.style.backgroundColor = rgbaColor;
            });
        }
    }

    // Function to initialize wallpaper selection and upload functionality
    function initWallpaperSelection(fileInputId, previewAreaId, radioName, wallpaperImages) {
        const fileInput = document.getElementById(fileInputId);
        const previewArea = document.getElementById(previewAreaId);
        const wallpaperRadios = document.querySelectorAll(`input[name="${radioName}"]`);

        function setWallpaper(imageUrl) {
            previewArea.style.backgroundImage = `url(${imageUrl})`;
        }

        if (previewArea && fileInput) {
            // Handle radio button selection
            wallpaperRadios.forEach(radio => {
                radio.addEventListener("change", (event) => {
                    const selectedWallpaper = event.target.value;
                    if (wallpaperImages[selectedWallpaper]) {
                        setWallpaper(wallpaperImages[selectedWallpaper]);
                    }
                    fileInput.value = ""; // Clear file input to prevent conflicts
                });
            });

            // Handle file upload
            fileInput.addEventListener("change", (event) => {
                const file = event.target.files[0];

                if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        setWallpaper(e.target.result);
                        // Uncheck all radio buttons when a file is uploaded
                        wallpaperRadios.forEach(radio => radio.checked = false);
                    };

                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // Wallpaper image URLs
    const wallpaperImages = {
        wallpaper1: "https://th.bing.com/th/id/OIP.GELKQ4d2ogvLPHMtaI4UygHaHa?rs=1&pid=ImgDetMain",
        wallpaper2: "https://th.bing.com/th/id/OIP.RVXdocs4cbENDzq9XpLkiwHaFS?rs=1&pid=ImgDetMain",
        wallpaper3: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
    };

    function initFontThemeSelector() {
        const themeSelector = document.getElementById("PublicPageFontcolor");
        const textElements = document.querySelectorAll(".theme-text");
    
        if (themeSelector && textElements.length > 0) {
            function applyTheme() {
                const selectedTheme = themeSelector.value;
                const fontColor = selectedTheme === "Black" ? "black" : "white";
    
                textElements.forEach(element => {
                    element.style.color = fontColor;
                    element.style.transition = "color 0.3s ease"; // Smooth transition
                });
    
                console.log("Applied font color:", fontColor);
            }
    
            // Apply theme on dropdown change
            themeSelector.addEventListener("change", applyTheme);
    
            // Apply theme immediately on page load
            applyTheme();
        } else {
            console.warn("Theme selector or text elements not found.");
        }
    }

    // Initialize all functionalities
    initFontColorPicker();
    initBackgroundColorPicker();
    initWallpaperSelection("background-upload", "profile-demo", "BackgroundOptions", wallpaperImages);
    initWallpaperSelection("wallpaper-upload", "wallpaper-demo", "WallpaperOptions", wallpaperImages);
    initFontThemeSelector();
});
