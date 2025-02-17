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

    // Function to initialize font theme selector
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

    // Function to load and inject an SVG into the DOM
    function loadSVG(url, container) {
        fetch(url)
            .then(response => response.text())
            .then(svg => {
                container.innerHTML = svg;
            })
            .catch(error => console.error("Error loading SVG:", error));
    }

    // QR Code Style Selection (Using external SVGs)
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
                    const selectedStyle = event.target.value;
                    if (svgPaths[selectedStyle]) {
                        loadSVG(svgPaths[selectedStyle], svgContainer);
                    }
                });
            });

            // Load the default SVG
            loadSVG(svgPaths.Basic, svgContainer);
        } else {
            console.warn("QR code style selection elements not found.");
        }
    }

    // Wallpaper image URLs
    const wallpaperImages = {
        wallpaper1: "https://th.bing.com/th/id/OIP.GELKQ4d2ogvLPHMtaI4UygHaHa?rs=1&pid=ImgDetMain",
        wallpaper2: "https://th.bing.com/th/id/OIP.RVXdocs4cbENDzq9XpLkiwHaFS?rs=1&pid=ImgDetMain",
        wallpaper3: "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
    };

    // Initialize all functionalities
    initFontColorPicker();
    initBackgroundColorPicker();
    initWallpaperSelection("background-upload", "profile-demo", "BackgroundOptions", wallpaperImages);
    initWallpaperSelection("wallpaper-upload", "wallpaper-demo", "WallpaperOptions", wallpaperImages);
    initFontThemeSelector();
    initQRCodeStyleSelector();

    function codeToRun() {
        // Access the current member's information
        $memberstackDom.getCurrentMember().then(member => {
          // Set a JavaScript variable to a member property
          console.log(member);
          var memberSlug = member.data.customFields.slug; // Example: setting to member's email
          let dashURL = "https://certified-rave-dad-2-2d9b32322552267288.webflow.io/found-vibes/members/" + memberSlug;
        });
      }

    // Redirect the user to the new page after a short delay (optional)
    setTimeout(() => {
    
        if (window.$memberstackReady) {
            codeToRun(); // Run the code immediately if Memberstack is ready
            
          } else {
            // Wait for Memberstack to be ready if it's not already
            document.addEventListener("memberstack.ready", codeToRun);
          }
        
    }, 4000); // Adjust delay as needed (milliseconds)
    
});
