document.addEventListener("DOMContentLoaded", () => {
    initializeCatalogFilterEngine();
});

function initializeCatalogFilterEngine() {
    const shopGrid = document.getElementById("shopProductsGrid");
    if (!shopGrid) return;

    const priceSlider = document.getElementById("priceRange");
    const labelMaxPrice = document.getElementById("currentPriceLabel");
    const checkboxes = document.querySelectorAll("input[name='category']");
    const searchInput = document.getElementById("shopSearchInput");

    // 1. Read URL parameters (e.g. ?category=smartphones or ?search=iphone)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');

    if (categoryParam) {
        checkboxes.forEach(chk => {
            if (chk.value === categoryParam) {
                chk.checked = true;
                const allChk = document.getElementById("filterAll");
                if (allChk) allChk.checked = false;
            }
        });
    }

    if (searchParam && searchInput) {
        searchInput.value = searchParam;
    }

    // 2. Handle "All" checkbox logic
    const filterAll = document.getElementById("filterAll");
    if (filterAll) {
        filterAll.addEventListener("change", () => {
            if (filterAll.checked) {
                // Uncheck all individual categories
                checkboxes.forEach(chk => chk.checked = false);
            }
            evaluateCatalogFilters();
        });

        // If any individual checkbox is clicked, uncheck "All"
        checkboxes.forEach(chk => {
            chk.addEventListener("change", () => {
                if (chk.checked) {
                    filterAll.checked = false;
                } else {
                    // If all unchecked, check "All"
                    const anyChecked = Array.from(checkboxes).some(c => c.checked);
                    if (!anyChecked) filterAll.checked = true;
                }
                evaluateCatalogFilters();
            });
        });
    }

    // 3. Evaluation and filtering function
    function evaluateCatalogFilters() {
        let items = [...ProductHubState.products];

        // Filter by Price
        const maxPriceAllowed = parseInt(priceSlider.value, 10);
        labelMaxPrice.textContent = `Max: NPR ${maxPriceAllowed.toLocaleString()}`;
        items = items.filter(p => p.price <= maxPriceAllowed);

        // Filter by Category
        const targetCategories = Array.from(checkboxes).filter(c => c.checked).map(c => c.value);
        if (targetCategories.length > 0 && (!filterAll || !filterAll.checked)) {
            items = items.filter(p => targetCategories.includes(p.category));
        }

        // Filter by Text Search
        const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
        if (searchQuery.length > 0) {
            items = items.filter(p => 
                p.title.toLowerCase().includes(searchQuery) ||
                p.category.toLowerCase().includes(searchQuery) ||
                p.description.toLowerCase().includes(searchQuery)
            );
        }

        renderGrid(items);
    }

    // 4. Render output
    function renderGrid(renderedProducts) {
        shopGrid.innerHTML = "";
        
        if (renderedProducts.length === 0) {
            shopGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: #fff; border: 1px solid var(--border-light); border-radius: 20px;">
                    <i class="fa-solid fa-face-frown" style="font-size: 40px; color: var(--text-muted); margin-bottom: 16px;"></i>
                    <h3 style="font-family: var(--font-outfit); font-size: 20px; color: var(--text-main); margin-bottom: 8px;">No products found</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Try relaxing your filters or typing another search query.</p>
                </div>
            `;
            return;
        }

        renderedProducts.forEach(prod => {
            const formattedPrice = typeof prod.price === 'number' ? `NPR ${prod.price.toLocaleString()}` : prod.price;
            const waUrl = ProductHubState.generateWhatsAppUrl(prod.title, prod.price);
            
            let badgeHtml = "";
            if (prod.tag) {
                const badgeClass = prod.tag.toLowerCase().replace(" ", "-");
                badgeHtml = `<div class="product-badge ${badgeClass}">${prod.tag}</div>`;
            }

            shopGrid.insertAdjacentHTML("beforeend", `
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
            `);
        });
    }

    // 5. Setup Listeners
    priceSlider.addEventListener("input", evaluateCatalogFilters);
    if (searchInput) {
        searchInput.addEventListener("input", evaluateCatalogFilters);
    }
    
    // Initial evaluation
    evaluateCatalogFilters();
}