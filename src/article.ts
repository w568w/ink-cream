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
const cleanMarker = (contentWithMarkers: string): string => {
    contentWithMarkers = contentWithMarkers.replace(/\\\(/g, '');
    contentWithMarkers = contentWithMarkers.replace(/\\\)/g, '');
    contentWithMarkers = contentWithMarkers.replace(/\\\[/g, '');
    contentWithMarkers = contentWithMarkers.replace(/\\\]/g, '');
    return contentWithMarkers;
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
for (let img of imagesWithCaptions) {
    const figureParent = document.createElement("figure");
    const imgParent = img.parentElement;
    if (imgParent && imgParent.tagName.toLowerCase() !== "figure") {
        let oldImg = imgParent.replaceChild(figureParent, img) as HTMLImageElement;
        const caption = document.createElement("figcaption");
        caption.textContent = oldImg.alt;
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
    for (let entry of entries) {
        if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.onload = () => img.removeAttribute("data-src");
            self.unobserve(img);
        }
    }
}, config);
for (let img of images) {
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