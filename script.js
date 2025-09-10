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
});

// Tab functionality - switch from default-tabs to activated-tabs
const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
const defaultTabsContainer = document.querySelector('.default-tabs');
const activatedTabsContainer = document.querySelector('.activated-tabs');

// Store swiper instances
let swiperInstances = {
    graphicDesign: null,
    videoEditing: null
};

// Function to activate a tab and switch containers
function activateTab(tab) {
    // Remove default tabs and show activated tabs
    defaultTabsContainer.style.display = 'none';
    activatedTabsContainer.style.display = 'block';
    
    // Remove active classes from all tab contents and hide them
    tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    // Remove active classes from all activated tabs
    document.querySelectorAll('.activated').forEach(activatedTab => {
        activatedTab.classList.remove('active');
    });
    
    // Add active class to clicked tab in activated container
    const targetTabId = tab.dataset.tabTarget;
    const correspondingActivatedTab = document.querySelector(`.activated[data-tab-target="${targetTabId}"]`);
    
    if (correspondingActivatedTab) {
        correspondingActivatedTab.classList.add('active');
    }
    
    // Show the corresponding content
    const targetContent = document.querySelector(targetTabId);
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
        
        // Initialize or update the swiper for this content
        initializeOrUpdateSwiper(targetTabId);
    }
    
    // Adjust the activated tab styling for perfect text fit
    const activatedCardLinks = document.querySelectorAll('.activated .card-link');
    activatedCardLinks.forEach(link => {
        const categoriesText = link.querySelector('.categories');
        if (categoriesText) {
            const textHeight = categoriesText.scrollHeight;
            link.style.height = (textHeight + 30) + 'px'; // 30px for padding
            link.style.display = 'flex';
            link.style.alignItems = 'center';
            link.style.justifyContent = 'center';
        }
    });
}

// Initialize or update swiper for a specific tab
function initializeOrUpdateSwiper(tabId) {
    const targetContent = document.querySelector(tabId);
    if (!targetContent) return;
    
    const swiperKey = tabId.replace('#', '');
    
    // Check if swiper already exists for this tab
    if (!swiperInstances[swiperKey]) {
        // Initialize new swiper
        initializeSwiper(tabId);
    } else {
        // Update existing swiper
        setTimeout(() => {
            const swiper = swiperInstances[swiperKey];
            if (swiper) {
                swiper.update();
                swiper.slideTo(0); // Reset to first slide
            }
        }, 100);
    }
}

// Initialize a specific swiper
function initializeSwiper(tabId) {
    const swiperKey = tabId.replace('#', '');
    
    const config = {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 25,
        centeredSlides: false, // Important: set to false to show all 3 slides
        watchSlidesProgress: true,
        
        // Navigation arrows
        navigation: {
            nextEl: `${tabId} .swiper-button-next`,
            prevEl: `${tabId} .swiper-button-prev`,
        },
        
        // Pagination
        pagination: {
            el: `${tabId} .swiper-pagination`,
            clickable: true,
            dynamicBullets: true,
        },
        
        // Breakpoints
        breakpoints: {
            // Mobile first
            0: {
                slidesPerView: 1,
                spaceBetween: 15,
                centeredSlides: true
            },
            640: {
                slidesPerView: 1.5,
                spaceBetween: 15,
                centeredSlides: true
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 25,
                centeredSlides: false // Don't center on desktop
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: false
            }
        }
    };
    
    swiperInstances[swiperKey] = new Swiper(`${tabId}.swiper`, config);
    
    // Fix for slide movement - update after initialization
    setTimeout(() => {
        if (swiperInstances[swiperKey]) {
            // Multiple updates to ensure proper initialization
            swiperInstances[swiperKey].update();
            swiperInstances[swiperKey].updateSlides();
            swiperInstances[swiperKey].updateSize();
            swiperInstances[swiperKey].updateSlidesClasses();
            
            // Reset to first slide
            swiperInstances[swiperKey].slideTo(0, 0);
        }
    }, 300);
}

// Add click event to default tabs
document.querySelectorAll('.default-tabs [data-tab-target]').forEach(tab => {
    tab.addEventListener('click', () => {
        activateTab(tab);
    });
});

// Add click event to activated tabs (for switching between them)
document.querySelectorAll('.activated-tabs [data-tab-target]').forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active classes from all tab contents and hide them
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        // Remove active classes from all activated tabs
        document.querySelectorAll('.activated').forEach(activatedTab => {
            activatedTab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show the corresponding content and update swiper
        const targetContent = document.querySelector(tab.dataset.tabTarget);
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block';
            initializeOrUpdateSwiper(tab.dataset.tabTarget);
        }
    });
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - setting up tabs and galleries");
    
    // Mobile menu functionality
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
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

    // Initialize tab states
    activatedTabsContainer.style.display = 'none';
    
    // Hide all tab contents initially
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Show default tabs
    defaultTabsContainer.style.display = 'block';
    
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

    // Setup all galleries
    const jerseysSetup = setupGallery("openJerseys", "closeJerseys", "jerseys");
    const filmsSetup = setupGallery("openFilms", "closeFilms", "films");
    const logosSetup = setupGallery("openLogos", "closeLogos", "logos");
    const postersSetup = setupGallery("openPosters", "closePosters", "posters");
    const printsSetup = setupGallery("openPrints", "closePrints", "prints");
    const promotionalsSetup = setupGallery("openPromotionals", "closePromotionals", "promotionals");
    const shortsSetup = setupGallery("openShorts", "closeShorts", "shorts");
    const socialsSetup = setupGallery("openSocials", "closeSocials", "socials");
    const editsSetup = setupGallery("openEdits", "closeEdits", "edits");

    console.log("Gallery setup results:", {
        jerseys: jerseysSetup,
        films: filmsSetup,
        logos: logosSetup,
        posters: postersSetup,
        prints: printsSetup,
        promotionals: promotionalsSetup,
        shorts: shortsSetup,
        socials: socialsSetup,
        edits: editsSetup
    });
    
    // Alternative: Simple event delegation approach if above doesn't work
    if (!filmsSetup || !logosSetup || !postersSetup || !printsSetup || !promotionalsSetup || !shortsSetup || !socialsSetup || !editsSetup) {
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
                if (this.id === 'openPosters') galleryId = 'posters';
                if (this.id === 'openPrints') galleryId = 'prints';
                if (this.id === 'openPromotionals') galleryId = 'promotionals';
                if (this.id === 'openShorts') galleryId = 'shorts';
                if (this.id === 'openSocials') galleryId = 'socials';
                if (this.id === 'openEdits') galleryId = 'edits';

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