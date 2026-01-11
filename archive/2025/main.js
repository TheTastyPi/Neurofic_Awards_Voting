const categoryList = document.getElementById("categoryList");

function addOption(catCont, cat, name, link) {
    let optCont = document.createElement("div");
    optCont.classList.add("option");
    catCont.appendChild(optCont);

    let optLabel = document.createElement("div");
    optLabel.classList.add("optLabel");
    optLabel.textContent = name;
    optCont.appendChild(optLabel);
    if (winners[cat][0] == name) {
        optCont.classList.add("goldBtn");
    } else if (winners[cat][1] == name || (cat == "Hidden Gem" && name == "white noise")) {
        optCont.classList.add("silverBtn");
    } else if (winners[cat][2] == name) {
        optCont.classList.add("bronzeBtn");
    }

    let optLink;
    optLink = document.createElement("a");
    optLink.classList.add("optLink");
    optLink.textContent = "Read Here!";
    optLink.href = link;
    optLink.target = "_blank";
    optCont.appendChild(optLink);

    let lineBreak = document.createElement("br");
    catCont.appendChild(lineBreak);
}

function addCategory(cat) {
    let catCont = document.createElement("div");
    catCont.classList.add("category");
    let catLabel = document.createElement("div");
    catLabel.classList.add("catLabel");
    catLabel.textContent = cat;
    catCont.appendChild(catLabel);
    for (let i in nominees[cat]) {
        let [name, link] = nominees[cat][i];
        addOption(catCont, cat, name, link);
    }
    categoryList.appendChild(catCont);
}

function createCategories() {
    for (let i in nominees) {
        addCategory(i);
    }
}

createCategories();