// Date parsing
for (const elem of document.getElementsByClassName("date-parser")) {
    const timestamp = elem.getAttribute("data-timestamp");
    if (timestamp) {
        const date = new Date(parseInt(timestamp) * 1000);
        // Format the date to a human-readable format
        elem.textContent = date.toLocaleDateString();
    }
}

// Auto-hide navbar
const navbar = document.getElementById("navbar");
if (navbar !== null) {
    let lastScrollTop = 0;
    const updateNavbar = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
}