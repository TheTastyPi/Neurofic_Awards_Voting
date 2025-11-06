var theme = "nwero";

function initThemeBtn() {
    let btn = document.createElement("div");
    btn.classList.add("themeToggleBtn");
    btn.onclick = toggleTheme;
    document.body.appendChild(btn);
}

function toggleTheme() {
    theme = theme == "nwero" ? "eliv" : "nwero";
    updateTheme();
}

function updateTheme() {
    const base = "/Neurofic_Awards_Voting";
    //const base = "/";
    let stylesheet = document.getElementById("styleTheme");
    stylesheet.setAttribute("href", base+`shared/${theme}.css`);
    saveTheme();
}

function saveTheme() {
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    let str = localStorage.getItem("theme");
    if (str) {
        theme = str;
        updateTheme();
    }
}

initThemeBtn();
loadTheme();