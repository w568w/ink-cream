// Code highlighting
import 'highlight.js/styles/github-dark-dimmed.min.css';
const hasCodeBlocks = document.querySelectorAll("pre code").length > 0;
if (hasCodeBlocks) {
    import("highlight.js").then(hljs => {
        hljs.default.highlightAll();
    });
}

// Math rendering
import 'katex/dist/katex.min.css';
const hasMath = document.querySelectorAll(".math").length > 0;
const macros = {};
const cleanMarker = (content: string): string => {
    return content.replace(/\\[()[\]]/g, '');
};
if (hasMath) {
    import("katex").then(katex => {
        for (let element of document.getElementsByClassName("math")) {
            if (element.textContent !== null) {
                katex.render(cleanMarker(element.textContent), element as HTMLElement, {
                    throwOnError: false,
                    macros,
                    displayMode: element.classList.contains("display"),
                });
            }
        }
    });
}

// Image captions
const imagesWithCaptions = document.querySelectorAll(".cream-prose img[alt]:not([alt=''])");
for (const img of imagesWithCaptions) {
    const figureParent = document.createElement("figure");
    const imgParent = img.parentElement;
    if (imgParent && imgParent.tagName.toLowerCase() !== "figure") {
        const oldImg = imgParent.replaceChild(figureParent, img) as HTMLImageElement;
        const caption = document.createElement("figcaption");
        caption.innerHTML = oldImg.alt;
        figureParent.appendChild(oldImg);
        figureParent.appendChild(caption);
    }
}

// Image lazy loading
const images = document.querySelectorAll(".cream-prose img[data-src]");
const config = {
    rootMargin: "0px 0px 200px 0px",
    threshold: 0
};
const observer = new IntersectionObserver((entries, self) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.onload = () => img.removeAttribute("data-src");
            self.unobserve(img);
        }
    }
}, config);
for (const img of images) {
    observer.observe(img);
}

// Comment section
const hasComment = document.getElementById("vcomments") !== null;
if (hasComment) {
    import("valine").then(Valine => {
        new Valine.default({
            el: '#vcomments',
            appId: import.meta.env.VITE_VALINE_APP_ID,
            appKey: import.meta.env.VITE_VALINE_APP_KEY
        })
    });
}