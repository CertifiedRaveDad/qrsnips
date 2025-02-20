document.addEventListener("DOMContentLoaded", function () {
    // Background URL mappings (key-value pairs)
    const backgroundURLs = {
        "wallpaper1": "https://th.bing.com/th/id/OIP.GELKQ4d2ogvLPHMtaI4UygHaHa?rs=1&pid=ImgDetMain",
        "wallpaper2": "https://th.bing.com/th/id/OIP.RVXdocs4cbENDzq9XpLkiwHaFS?rs=1&pid=ImgDetMain",
        "wallpaper3": "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
    };

    // Function to decode HTML entities
    function decodeEntities(encodedString) {
        let textarea = document.createElement("textarea");
        textarea.innerHTML = encodedString;
        return textarea.value;
    }

    const fieldValues = {
        "Device-Name-2": "{{wf {&quot;path&quot;:&quot;name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Device-Type-2": "{{wf {&quot;path&quot;:&quot;custom-item-type&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Users-Name-2": "{{wf {&quot;path&quot;:&quot;owners-name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Instagram-2": "{{wf {&quot;path&quot;:&quot;instagram-user&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "X-2": "{{wf {&quot;path&quot;:&quot;x-user&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Bluesky-2": "{{wf {&quot;path&quot;:&quot;bluesky-user&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "TikTok-2": "{{wf {&quot;path&quot;:&quot;tiktok-user&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Contact-Name-1": "{{wf {&quot;path&quot;:&quot;primary-contact&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Contact-Phone-6": "{{wf {&quot;path&quot;:&quot;primary-phone&quot;,&quot;type&quot;:&quot;Phone&quot;\} }}",
        "Contact-Name-2": "{{wf {&quot;path&quot;:&quot;contact-2&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Contact-Phone-2": "{{wf {&quot;path&quot;:&quot;phone-2&quot;,&quot;type&quot;:&quot;Phone&quot;\} }}",
        "Contact-Name-3": "{{wf {&quot;path&quot;:&quot;contact-3&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Contact-Phone-3": "{{wf {&quot;path&quot;:&quot;phone-3&quot;,&quot;type&quot;:&quot;Phone&quot;\} }}",
        "Contact-Name-4": "{{wf {&quot;path&quot;:&quot;contact-4&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Contact-Phone-4": "{{wf {&quot;path&quot;:&quot;phone-4&quot;,&quot;type&quot;:&quot;Phone&quot;\} }}",
        "Contact-Name-5": "{{wf {&quot;path&quot;:&quot;contact-5&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "Contact-Phone-5": "{{wf {&quot;path&quot;:&quot;phone-5&quot;,&quot;type&quot;:&quot;Phone&quot;\} }}",
        "wallpaper-upload": "{{wf {&quot;path&quot;:&quot;phone-wallpaper-bg&quot;,&quot;type&quot;:&quot;Link&quot;\} }}",
        "qrcolorp": "{{wf {&quot;path&quot;:&quot;qr-color&quot;,&quot;type&quot;:&quot;Color&quot;\} }}",
        "qrbgcolorhidden": "{{wf {&quot;path&quot;:&quot;qr-bgcolor-formatted&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "QRBackgroundColor": "{{wf {&quot;path&quot;:&quot;qr-bg-color&quot;,&quot;type&quot;:&quot;Color&quot;\} }}",
        "PublicPageFontcolor": "{{wf {&quot;path&quot;:&quot;qr-page-font-color&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}",
        "background-upload": "{{wf {&quot;path&quot;:&quot;found-items-page-bg&quot;,&quot;type&quot;:&quot;Link&quot;\} }}"
    };
    Object.entries(fieldValues).forEach(([id, value]) => {
        const field = document.getElementById(id);
        if (field) {
            let decodedValue = decodeEntities(value).trim();
            if (!decodedValue || decodedValue === "undefined" || decodedValue === "null") {
                if (id === "qrbgcolorhidden") {
                    field.value = "rgba(255,255,255,0.3)";
                }
                return;
            }
          
            // Special case for "Device-Name-2": Hide it if it starts with "mem_sb_cm"
            if (id === "Device-Name-2" && decodedValue.startsWith("mem_sb_cm")) {
                field.value = ""; // Clear the field value
            } else {
                field.value = decodedValue; // Inject properly decoded value
            }
            field.value = decodedValue;
        }
    });

    // Update radio button backgrounds using `thumbnailimg`
    function updateRadioBackgrounds() {
        document.querySelectorAll("input[name='WallpaperOptions']").forEach(radio => {
            let thumbnailKey = radio.getAttribute("thumbnailimg");
            if (thumbnailKey && backgroundURLs[thumbnailKey]) {
                let parentLabel = radio.closest("label");
                let radioDiv = parentLabel.querySelector(".w-radio-input");
                if (radioDiv) {
                    radioDiv.style.backgroundImage = `url(${backgroundURLs[thumbnailKey]})`;
                    radioDiv.style.backgroundSize = "cover";
                    radioDiv.style.backgroundPosition = "center";
                }
            }
        });
    }

    // Initialize wallpaper selection
    function initWallpaperSelection(fileInputId, previewAreaId, radioName) {
        const fileInput = document.getElementById(fileInputId);
        const previewArea = document.getElementById(previewAreaId);
        const wallpaperRadios = document.querySelectorAll(`input[name="${radioName}"]`);

        function setWallpaper(imageUrl) {
            previewArea.style.backgroundImage = `url(${imageUrl})`;
        }

        if (previewArea && fileInput) {
            wallpaperRadios.forEach(radio => {
                radio.addEventListener("change", (event) => {
                    const selectedWallpaper = event.target.value;
                    if (backgroundURLs[selectedWallpaper]) {
                        setWallpaper(backgroundURLs[selectedWallpaper]);
                    }
                    fileInput.value = "";
                });
            });

            fileInput.addEventListener("change", (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setWallpaper(e.target.result);
                        wallpaperRadios.forEach(radio => radio.checked = false);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // Initialize font color picker
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

    // Initialize background color picker with transparency
    function initBackgroundColorPicker() {
        const bgColorPicker = document.getElementById("QRBackgroundColor");
        const bg1 = document.getElementById("qrbgcontainer");
        const bg2 = document.getElementById("QRTextbgcontainer");
        const qrbgcolorhidden = document.getElementById("qrbgcolorhidden");

        function hexToRGBA(hex, alpha = 0.25) {
            let r = parseInt(hex.substring(1, 3), 16);
            let g = parseInt(hex.substring(3, 5), 16);
            let b = parseInt(hex.substring(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        if (bgColorPicker && bg1 && bg2) {
            bgColorPicker.addEventListener("input", (event) => {
                const selectedColor = event.target.value;
                const rgbaColor = hexToRGBA(selectedColor, 0.5);
                bg1.style.backgroundColor = rgbaColor;
                bg2.style.backgroundColor = rgbaColor;
                qrbgcolorhidden.value = rgbaColor;
            });
        }
    }

    // Font theme selector
    function initFontThemeSelector() {
        const themeSelector = document.getElementById("PublicPageFontcolor");
        const textElements = document.querySelectorAll(".theme-text");

        if (themeSelector && textElements.length > 0) {
            function applyTheme() {
                const selectedTheme = themeSelector.value;
                const fontColor = selectedTheme === "Black" ? "black" : "white";
                textElements.forEach(element => {
                    element.style.color = fontColor;
                    element.style.transition = "color 0.3s ease";
                });
            }
            themeSelector.addEventListener("change", applyTheme);
            applyTheme();
        }
    }

    // Load and inject SVG into the DOM
    function loadSVG(url, container) {
        fetch(url)
            .then(response => response.text())
            .then(svg => {
                container.innerHTML = svg;
            })
            .catch(error => console.error("Error loading SVG:", error));
    }

    // QR Code Style Selection
    function initQRCodeStyleSelector() {
        const svgContainer = document.getElementById("svg-container");
        const qrStyleRadios = document.querySelectorAll("input[name='QRCodeStyle']");

        if (svgContainer && qrStyleRadios.length > 0) {
            const svgPaths = {
                Basic: "https://cdn.prod.website-files.com/67a58d46517239e29521c97a/67b2b041abfc1045a99442af_Basic.svg",
                Trance: "https://cdn.prod.website-files.com/67a58d46517239e29521c97a/67b2b041e106ce380d5c023e_Trance.svg",
                Glitter: "https://cdn.prod.website-files.com/67a58d46517239e29521c97a/67b2b042f0dc00eabaa58555_Glitter.svg",
                Heart: "https://cdn.prod.website-files.com/67a58d46517239e29521c97a/67b2b009f0dc00eabaa56485_hearts.svg"
            };
            qrStyleRadios.forEach(radio => {
                radio.addEventListener("change", (event) => {
                    if (svgPaths[event.target.value]) {
                        loadSVG(svgPaths[event.target.value], svgContainer);
                    }
                });
            });
            loadSVG(svgPaths.Basic, svgContainer);
        }
    }

    // Initialize all functions
    initFontColorPicker();
    initBackgroundColorPicker();
    updateRadioBackgrounds();
    initWallpaperSelection("background-upload", "profile-demo", "WallpaperOptions");
    initFontThemeSelector();
    initQRCodeStyleSelector();
});
