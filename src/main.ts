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

// Hamburger menu toggle
const hamburger = document.getElementById("mobile-menu-toggle");
const menu = document.getElementById("mobile-menu");

if (hamburger !== null && menu !== null) {
    const dismissClasses = ["opacity-0", "invisible", "translate-y-2"];
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        for (const cls of dismissClasses) {
            menu.classList.toggle(cls);
        }
    });
    // 点击页面其他地方关闭菜单
    document.addEventListener("click", () => {
        menu.classList.add(...dismissClasses);
    });
    // 阻止点击菜单时关闭菜单
    menu.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}