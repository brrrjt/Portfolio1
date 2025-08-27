// Toggle mobile menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - setting up galleries");
    
    // Mobile menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // Setup gallery function
    function setupGallery(openId, closeId, galleryId) {
        const openBtn = document.getElementById(openId);
        const closeBtn = document.getElementById(closeId);
        const gallery = document.getElementById(galleryId);
        
        console.log(`Setting up gallery: ${galleryId}`, {openBtn, closeBtn, gallery});
        
        if (openBtn && closeBtn && gallery) {
            openBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log(`Opening ${galleryId}`);
                gallery.classList.add("open");
                document.body.style.overflow = "hidden";
            });

            closeBtn.addEventListener("click", () => {
                console.log(`Closing ${galleryId}`);
                gallery.classList.remove("open");
                document.body.style.overflow = "";
            });

            gallery.addEventListener("click", (e) => {
                if (e.target === gallery) {
                    console.log(`Closing ${galleryId} (outside click)`);
                    gallery.classList.remove("open");
                    document.body.style.overflow = "";
                }
            });
            
            return true;
        } else {
            console.error(`Could not find elements for ${galleryId}:`, {openBtn, closeBtn, gallery});
            return false;
        }
    }

    // Setup all three galleries
    const jerseysSetup = setupGallery("openJerseys", "closeJerseys", "jerseys");
    const filmsSetup = setupGallery("openFilms", "closeFilms", "films");
    const logosSetup = setupGallery("openLogos", "closeLogos", "logos");
    
    console.log("Gallery setup results:", {
        jerseys: jerseysSetup,
        films: filmsSetup,
        logos: logosSetup
    });
    
    // Alternative: Simple event delegation approach if above doesn't work
    if (!filmsSetup || !logosSetup) {
        console.log("Trying alternative approach...");
        
        // Add click listeners to all card buttons
        document.querySelectorAll('.card-button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Determine which gallery to open based on button ID
                let galleryId;
                if (this.id === 'openJerseys') galleryId = 'jerseys';
                if (this.id === 'openFilms') galleryId = 'films';
                if (this.id === 'openLogos') galleryId = 'logos';
                
                if (galleryId) {
                    const gallery = document.getElementById(galleryId);
                    if (gallery) {
                        gallery.classList.add("open");
                        document.body.style.overflow = "hidden";
                    }
                }
            });
        });
        
        // Close buttons
        document.querySelectorAll('.closeGallery').forEach(button => {
            button.addEventListener('click', function() {
                // Find the parent gallery and close it
                const gallery = this.closest('.gallery');
                if (gallery) {
                    gallery.classList.remove("open");
                    document.body.style.overflow = "";
                }
            });
        });
        
        // Close on outside click
        document.querySelectorAll('.gallery').forEach(gallery => {
            gallery.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove("open");
                    document.body.style.overflow = "";
                }
            });
        });
    }
});