document.addEventListener("DOMContentLoaded", () => {
    initializeGlobalNavigation();
    initializeHeroCarousel();
    initializeHeroSearch();
    injectHomePageGrids();
});

// 1. Navigation & Header scrolled class
function initializeGlobalNavigation() {
    const header = document.getElementById("mainHeader");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.className = "fa-solid fa-xmark";
                } else {
                    icon.className = "fa-solid fa-bars";
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "fa-solid fa-bars";
            }
        });
    }
}

// 2. Hero Spotlight Carousel
function initializeHeroCarousel() {
    const container = document.getElementById("heroCarousel");
    if (!container) return;

    // Define items for the carousel (mix of hero lifestyle and flagship items)
    const carouselItems = [
        {
            title: "Premium Tech Assets",
            desc: "Converged flagship inventory systems inside Nepal.",
            price: "NPR 15.5K - 2.15L",
            image: "assets/hero_showcase.jpg",
            url: "shop.html"
        },
        {
            title: "iPhone 15 Pro 256GB",
            desc: "titanium build, pro-level cameras.",
            price: "NPR 2,15,000",
            url: "product.html?id=1"
        },
        {
            title: "MacBook Air 13\" M3",
            desc: "thin, silent, and incredibly fast with the M3 chip.",
            price: "NPR 1,85,000",
            url: "product.html?id=2"
        },
        {
            title: "Sony WH-1000XM5",
            desc: "industry-leading noise cancelling headphones.",
            price: "NPR 48,500",
            url: "product.html?id=3"
        },
        {
            title: "LG OLED C3 55\"",
            desc: "self-lit OLED pixels, alpha9 AI processor gen6.",
            price: "NPR 1,95,000",
            url: "product.html?id=4"
        },
        {
            title: "PlayStation 5 Slim",
            desc: "next-gen gaming, slimmer design, 1TB storage.",
            price: "NPR 82,000",
            url: "product.html?id=5"
        }
    ];

    // Find actual product images for spotlight references
    carouselItems.forEach((item, index) => {
        if (index > 0) {
            // Find in products
            const prod = ProductHubState.products.find(p => p.id === index);
            if (prod) item.image = prod.image;
        }
    });

    // Inject Slides and Indicators
    let slidesHtml = "";
    let dotsHtml = "";

    carouselItems.forEach((item, idx) => {
        const isActive = idx === 0 ? "active" : "";
        slidesHtml += `
            <div class="carousel-slide ${isActive}" data-index="${idx}">
                <img src="${item.image}" alt="${item.title}" class="carousel-image">
                <div class="carousel-overlay">
                    <div>
                        <div class="carousel-info-title">${item.title}</div>
                        <div class="carousel-info-desc">${item.desc}</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:16px;">
                        <span class="carousel-info-price">${item.price}</span>
                        <a href="${item.url}" class="carousel-order-btn">View Details</a>
                    </div>
                </div>
            </div>
        `;
        dotsHtml += `<span class="carousel-indicator-dot ${isActive}" data-slide-to="${idx}"></span>`;
    });

    // Prepend slides before the buttons
    const prevBtn = document.getElementById("carouselPrevBtn");
    container.insertAdjacentHTML("afterbegin", slidesHtml);
    
    const indicatorsContainer = document.getElementById("carouselIndicators");
    if (indicatorsContainer) {
        indicatorsContainer.innerHTML = dotsHtml;
    }

    let currentIndex = 0;
    const slides = container.querySelectorAll(".carousel-slide");
    const dots = container.querySelectorAll(".carousel-indicator-dot");
    const totalSlides = slides.length;
    let slideTimer;

    function showSlide(index) {
        // Reset timers
        resetTimer();

        // Remove active class
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");

        // Set index
        currentIndex = (index + totalSlides) % totalSlides;

        // Add active class
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");

        // Start timer again
        startTimer();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startTimer() {
        slideTimer = setInterval(nextSlide, 5000); // 5 seconds
    }

    function resetTimer() {
        if (slideTimer) clearInterval(slideTimer);
    }

    // Button controls
    const nextBtn = document.getElementById("carouselNextBtn");
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Indicator dots
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.getAttribute("data-slide-to"), 10);
            showSlide(index);
        });
    });

    // Start auto slide
    startTimer();
}

// 3. Hero Search Autocomplete Suggestions
function initializeHeroSearch() {
    const searchInput = document.getElementById("heroSearchInput");
    const suggestionsDropdown = document.getElementById("searchSuggestions");
    const clearBtn = document.getElementById("searchClearBtn");
    const searchBtn = document.getElementById("searchActionBtn");

    if (!searchInput || !suggestionsDropdown) return;

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        if (query.length === 0) {
            suggestionsDropdown.style.display = "none";
            if (clearBtn) clearBtn.style.display = "none";
            return;
        }

        if (clearBtn) clearBtn.style.display = "block";

        // Filter products
        const matches = ProductHubState.products.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            suggestionsDropdown.innerHTML = `
                <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 14px;">
                    No genuine electronics found matching "${searchInput.value}"
                </div>
            `;
        } else {
            let suggestionsHtml = "";
            matches.slice(0, 5).forEach(prod => {
                const formattedPrice = typeof prod.price === 'number' ? `NPR ${prod.price.toLocaleString()}` : prod.price;
                suggestionsHtml += `
                    <a href="product.html?id=${prod.id}" class="search-suggestion-item">
                        <img src="${prod.image}" class="search-suggestion-img" alt="${prod.title}">
                        <div class="search-suggestion-info">
                            <div class="search-suggestion-title">${prod.title}</div>
                            <div class="search-suggestion-cat">${prod.category}</div>
                        </div>
                        <div class="search-suggestion-price">${formattedPrice}</div>
                    </a>
                `;
            });
            suggestionsDropdown.innerHTML = suggestionsHtml;
        }

        suggestionsDropdown.style.display = "block";
    });

    // Hide dropdown on clicking outside
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.style.display = "none";
        }
    });

    // Show suggestions again on focus if there is input
    searchInput.addEventListener("focus", () => {
        if (searchInput.value.trim().length > 0) {
            suggestionsDropdown.style.display = "block";
        }
    });

    // Clear search
    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            suggestionsDropdown.style.display = "none";
            clearBtn.style.display = "none";
            searchInput.focus();
        });
    }

    // Submit search (routes to shop.html with query parameter)
    function executeSearch() {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", executeSearch);
    }

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            executeSearch();
        }
    });
}

// 4. Inject homepage grids (Editor's Picks, Categories, Latest Arrivals)
function injectHomePageGrids() {
    // 4.1 Editor's Picks (Dynamic select 4 flagship items)
    const editorsPicksGrid = document.getElementById("editorsPicksGrid");
    if (editorsPicksGrid) {
        editorsPicksGrid.innerHTML = "";
        
        // Items to display: iPhone 15 Pro, MacBook Air M3, Sony Headphones, LG OLED C3
        const featuredIds = [1, 2, 3, 4];
        const featuredItems = ProductHubState.products.filter(p => featuredIds.includes(p.id));

        featuredItems.forEach(prod => {
            const card = generateProductCardMarkup(prod);
            editorsPicksGrid.insertAdjacentHTML("beforeend", card);
        });
    }

    // 4.2 Shop by Category
    const categoriesGrid = document.getElementById("categoriesGrid");
    if (categoriesGrid) {
        categoriesGrid.innerHTML = "";

        // Calculate counts dynamically
        const categoryCounts = {};
        ProductHubState.products.forEach(p => {
            categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
        });

        // Unique categories list
        const categoriesList = [
            { id: "smartphones", title: "Smartphones", key: "smartphones" },
            { id: "laptops", title: "Laptops", key: "laptops" },
            { id: "audio", title: "Audio", key: "audio" },
            { id: "wearables", title: "Wearables", key: "wearables" },
            { id: "cameras", title: "Cameras", key: "cameras" },
            { id: "televisions", title: "Televisions", key: "televisions" },
            { id: "gaming", title: "Gaming", key: "gaming" }
        ];

        categoriesList.forEach(cat => {
            const count = categoryCounts[cat.key] || 0;
            const cardHtml = `
                <a href="shop.html?category=${cat.id}" class="category-card">
                    <div class="category-details">
                        <h4>${cat.title}</h4>
                        <p>${count} product${count !== 1 ? 's' : ''}</p>
                    </div>
                    <div class="category-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                </a>
            `;
            categoriesGrid.insertAdjacentHTML("beforeend", cardHtml);
        });
    }

    // 4.3 Latest Arrivals (Display items 5, 4, 6, 7)
    const latestArrivalsGrid = document.getElementById("latestArrivalsGrid");
    if (latestArrivalsGrid) {
        latestArrivalsGrid.innerHTML = "";

        // PS5 Slim, LG OLED C3, JBL Flip 6, Canon EOS R50
        const latestIds = [5, 4, 6, 7];
        const latestItems = ProductHubState.products.filter(p => latestIds.includes(p.id));

        latestItems.forEach(prod => {
            const card = generateProductCardMarkup(prod);
            latestArrivalsGrid.insertAdjacentHTML("beforeend", card);
        });
    }
}

// Helper: Generate card markup
function generateProductCardMarkup(prod) {
    const formattedPrice = typeof prod.price === 'number' ? `NPR ${prod.price.toLocaleString()}` : prod.price;
    const waUrl = ProductHubState.generateWhatsAppUrl(prod.title, prod.price);
    
    // Check tags
    let badgeHtml = "";
    if (prod.tag) {
        const badgeClass = prod.tag.toLowerCase().replace(" ", "-");
        badgeHtml = `<div class="product-badge ${badgeClass}">${prod.tag}</div>`;
    }

    return `
        <div class="product-card">
            ${badgeHtml}
            <div class="product-image">
                <a href="product.html?id=${prod.id}">
                    <img src="${prod.image}" alt="${prod.title}">
                </a>
            </div>
            <div class="product-info">
                <div class="product-cat">${prod.category}</div>
                <a href="product.html?id=${prod.id}" class="product-title">${prod.title}</a>
                <p class="product-desc">${prod.description}</p>
                <div class="product-footer">
                    <div>
                        <div class="product-price-label">Price</div>
                        <div class="product-price">${formattedPrice}</div>
                    </div>
                    <a href="${waUrl}" target="_blank" class="btn-order">
                        <i class="fa-brands fa-whatsapp"></i> Order
                    </a>
                </div>
            </div>
        </div>
    `;
}