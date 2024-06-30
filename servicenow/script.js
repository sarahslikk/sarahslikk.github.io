function toggleScript(id, url) {
    let scriptContent = document.getElementById(id);
    if (scriptContent.style.display === "block") {
        scriptContent.style.display = "none";
    } else {
        if (!scriptContent.src) {
            scriptContent.src = url;
            scriptContent.style.display = "block";
        } else {
            scriptContent.style.display = "block";
        }
    }
}
