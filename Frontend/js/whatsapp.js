document.addEventListener("DOMContentLoaded", () => {
    populateProductDetails();
});

function populateProductDetails() {
    const titleEl = document.getElementById("productTitle");
    const priceEl = document.getElementById("productPrice");
    const imgEl = document.getElementById("mainProductImg");
    const descEl = document.getElementById("productDescription");
    const catEl = document.getElementById("productCategory");
    const starsEl = document.getElementById("productRatingStars");
    const reviewsEl = document.getElementById("productReviewsCount");
    const orderBtn = document.getElementById("whatsappOrderBtn");

    if (!titleEl) return; // Not on the product detail page

    // 1. Get ID from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10) || 1; // Default to first product if missing

    // 2. Find product
    const product = ProductHubState.products.find(p => p.id === productId);

    if (!product) {
        // Handle product not found
        document.querySelector(".product-detail-layout").innerHTML = `
            <div style="grid-column: 1 / -1; padding: 80px 20px; text-align: center; background: #fff; border: 1px solid var(--border-light); border-radius: 24px;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 48px; color: var(--danger); margin-bottom: 20px;"></i>
                <h2 style="font-family: var(--font-outfit); font-size: 24px; color: var(--text-main); margin-bottom: 8px;">Product Not Found</h2>
                <p style="color: var(--text-muted); margin-bottom: 24px;">The electronic item you are looking for is no longer in our stock matrix.</p>
                <a href="shop.html" class="btn-black">Back to Shop</a>
            </div>
        `;
        return;
    }

    // 3. Populate page contents
    titleEl.textContent = product.title;
    document.title = `${product.title} | Details - ProductHubNepal`;

    const formattedPrice = typeof product.price === 'number' ? `NPR ${product.price.toLocaleString()}` : product.price;
    priceEl.textContent = formattedPrice;

    imgEl.src = product.image;
    imgEl.alt = product.title;

    descEl.textContent = product.description;
    
    if (catEl) {
        catEl.textContent = product.category;
    }

    // Generate stars dynamically based on rating (all are currently 5, but let's handle rating)
    if (starsEl) {
        let starsHtml = "";
        const rating = Math.round(product.rating || 5);
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i>';
            }
        }
        starsEl.innerHTML = starsHtml;
    }

    if (reviewsEl) {
        reviewsEl.textContent = `(${product.reviewsCount || 10} customer reviews)`;
    }

    // 4. Set up click action for order
    if (orderBtn) {
        orderBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const waUrl = ProductHubState.generateWhatsAppUrl(product.title, product.price);
            window.open(waUrl, "_blank");
        });
    }
}