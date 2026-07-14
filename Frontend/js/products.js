const ProductHubState = {
    products: [
        {
            id: 1,
            title: "iPhone 15 Pro 256GB",
            category: "smartphones",
            price: 215000,
            rating: 5,
            reviewsCount: 32,
            image: "assets/iphone_15_pro.jpg",
            description: "titanium build, pro-level cameras.",
            tag: "NEW"
        },
        {
            id: 2,
            title: "MacBook Air 13\" M3",
            category: "laptops",
            price: 185000,
            rating: 5,
            reviewsCount: 24,
            image: "assets/macbook_air_m3.jpg",
            description: "thin, silent, and incredibly fast with the M3 chip.",
            tag: ""
        },
        {
            id: 3,
            title: "Sony WH-1000XM5",
            category: "audio",
            price: 48500,
            rating: 5,
            reviewsCount: 41,
            image: "assets/sony_wh_1000xm5.jpg",
            description: "industry-leading noise cancelling headphones.",
            tag: ""
        },
        {
            id: 4,
            title: "LG OLED C3 55\"",
            category: "televisions",
            price: 195000,
            rating: 5,
            reviewsCount: 15,
            image: "assets/lg_oled_c3.jpg",
            description: "self-lit OLED pixels, alpha9 AI processor gen6.",
            tag: "SOLD OUT"
        },
        {
            id: 5,
            title: "PlayStation 5 Slim",
            category: "gaming",
            price: 82000,
            rating: 5,
            reviewsCount: 18,
            image: "assets/ps5_slim.jpg",
            description: "next-gen gaming, slimmer design, 1TB storage.",
            tag: "NEW"
        },
        {
            id: 6,
            title: "JBL Flip 6 Speaker",
            category: "audio",
            price: 15500,
            rating: 4,
            reviewsCount: 12,
            image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23111827'/><rect x='50' y='100' width='200' height='100' rx='50' fill='%231f2937' stroke='%2310b981' stroke-width='4'/><circle cx='95' cy='150' r='30' fill='%23111827'/><circle cx='205' cy='150' r='30' fill='%23111827'/><rect x='110' y='140' width='80' height='20' rx='5' fill='%2310b981'/><text x='50%' y='35%' dominant-baseline='middle' text-anchor='middle' fill='%23f3f4f6' font-family='sans-serif' font-size='16'>JBL Flip 6</text></svg>",
            description: "portable waterproof speaker with bold JBL sound.",
            tag: ""
        },
        {
            id: 7,
            title: "Canon EOS R50 Kit",
            category: "cameras",
            price: 128000,
            rating: 5,
            reviewsCount: 22,
            image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23111827'/><rect x='70' y='100' width='160' height='120' rx='10' fill='%231f2937' stroke='%2310b981' stroke-width='4'/><rect x='110' y='70' width='80' height='30' rx='5' fill='%231f2937'/><circle cx='150' cy='160' r='40' fill='%23111827' stroke='%2310b981' stroke-width='3'/><circle cx='150' cy='160' r='20' fill='%231f2937'/><text x='50%' y='40%' dominant-baseline='middle' text-anchor='middle' fill='%23f3f4f6' font-family='sans-serif' font-size='16'>Canon EOS R50</text></svg>",
            description: "compact mirrorless with 4K video and dual pixel AF.",
            tag: ""
        },
        {
            id: 8,
            title: "Apple Watch Series 9",
            category: "wearables",
            price: 55000,
            rating: 5,
            reviewsCount: 15,
            image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><rect width='300' height='300' fill='%23111827'/><rect x='100' y='70' width='100' height='160' rx='30' fill='%231f2937' stroke='%2310b981' stroke-width='4'/><rect x='115' y='95' width='70' height='110' rx='15' fill='%23000'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2310b981' font-family='sans-serif' font-weight='bold' font-size='14'>WATCH 9</text></svg>",
            description: "advanced health tracking, brighter display.",
            tag: "NEW"
        }
    ],
    phoneConfiguration: "9840921600",
    countryPrefix: "977",
    generateWhatsAppUrl: function(productName, productPrice) {
        const formattedPrice = typeof productPrice === 'number' ? `Rs. ${productPrice.toLocaleString()}` : productPrice;
        const message = `Hello TheProductHub,\n\nI want to order this product.\n\nProduct: ${productName}\nPrice: ${formattedPrice}\n\nIs it available?`;
        return `https://wa.me/${this.countryPrefix}${this.phoneConfiguration}?text=${encodeURIComponent(message)}`;
    }
};