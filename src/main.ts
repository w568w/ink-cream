for (const elem of document.getElementsByClassName("date-parser")){
    const timestamp = elem.getAttribute("data-timestamp");
    if (timestamp) {
        const date = new Date(parseInt(timestamp) * 1000);
        // Format the date to a human-readable format
        elem.textContent = date.toLocaleDateString();
    }
}