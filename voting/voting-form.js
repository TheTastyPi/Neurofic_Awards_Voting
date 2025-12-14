const year = "2025";
const form = document.getElementById("awardForm");
var optElems = {};
var votes = {};

const endDate = new Date("2025-12-31T14:00Z");

function uncheckAll(cat, btnClassName) {
    for (let i in optElems[cat]) {
        optElems[cat][i].classList.remove(btnClassName);
        optElems[cat][i].classList.remove("checked");
    }
}

function getBtnClassName(rank) {
    switch (rank) {
        case 0:
            return "checked";
        case 1:
            return "goldBtn";
        case 2:
            return "silverBtn";
        case 3:
            return "bronzeBtn";
    }
}

function assignRank(cat, name, rank) {
    let btnClassName = getBtnClassName(rank);
    if (rank === 0) {
        uncheckAll(cat, "goldBtn");
        uncheckAll(cat, "silverBtn");
        uncheckAll(cat, "bronzeBtn");
        let cont = optElems[cat][name];
        cont.classList.add(btnClassName);
        for (let i = 1; i <= 3; i++) votes[cat+i] = name;
    } else {
        uncheckAll(cat, btnClassName);
        let cont = optElems[cat][name];
        cont.classList.remove("goldBtn");
        cont.classList.remove("silverBtn");
        cont.classList.remove("bronzeBtn");
        cont.classList.add(btnClassName);
        for (let i = 1; i <= 3; i++) {
            if (votes[cat+i] === name) votes[cat+i] = "Skip";
        }
        votes[cat+rank] = name;
    }
    saveVotes();
}

function addRankSelector(optCont, cat, name) {
    let medalBtnCont = document.createElement("div");
    medalBtnCont.classList.add("medalBtnCont");
    optCont.appendChild(medalBtnCont);

    let goldBtn = document.createElement("button");
    goldBtn.classList.add("medalBtn");
    goldBtn.classList.add("goldBtn");
    goldBtn.addEventListener("click", function(){
        assignRank(cat, name, 1);
    })
    medalBtnCont.appendChild(goldBtn);

    let silverBtn = document.createElement("button");
    silverBtn.classList.add("medalBtn");
    silverBtn.classList.add("silverBtn");
    silverBtn.addEventListener("click", function(){
        assignRank(cat, name, 2);
    })
    medalBtnCont.appendChild(silverBtn);

    let bronzeBtn = document.createElement("button");
    bronzeBtn.classList.add("medalBtn");
    bronzeBtn.classList.add("bronzeBtn");
    bronzeBtn.addEventListener("click", function(){
        assignRank(cat, name, 3);
    })
    medalBtnCont.appendChild(bronzeBtn);
}

function addOption(catCont, cat, name, link, desc) {
    let optCont = document.createElement("div");
    optCont.classList.add("option");
    catCont.appendChild(optCont);
    optElems[cat][name] = optCont;

    if (name !== "Skip") addRankSelector(optCont, cat, name)

    let optLabel = document.createElement("div");
    optLabel.classList.add("optLabel");
    optLabel.textContent = name;

    if (desc) {
        let optDesc = document.createElement("div");
        optDesc.classList.add("optDesc");
        optDesc.textContent = desc;
        optLabel.appendChild(optDesc);
    }
    
    optCont.appendChild(optLabel);

    let optLink;
    if (link) {
        optLink = document.createElement("a");
        optLink.classList.add("optLink");
        optLink.textContent = "Read Here!";
        optLink.href = link;
        optLink.target = "_blank";
        optCont.appendChild(optLink);
    }

    if (name === "Skip") {
        optCont.classList.add("checked");
        optCont.classList.add("skip");
        optCont.addEventListener("click", function(e){
            if (e.button == 0) {
                assignRank(cat, name, 0);
            }
        })
    }

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
    optElems[cat] = {};
    for (let i = 1; i <= 3; i++) votes[cat+i] = "Skip";
    for (let i in nominees[cat]) {
        let [name, link, desc] = nominees[cat][i];
        addOption(catCont, cat, name, link, desc);
    }
    addOption(catCont, cat, "Skip", undefined, undefined);
    form.appendChild(catCont);
}

function createForm() {
    for (let i in nominees) {
        addCategory(i);
    }
    let lineBreak = document.createElement("br");
    form.appendChild(lineBreak);

    let resendMsg = document.createElement("p");
    form.appendChild(resendMsg);
    resendMsg.textContent = "If you wish to edit your response, just change your votes, then press this button again!";
    resendMsg.style.display = "none";
    resendMsg.id = "resendMsg";

    let sendMissingMsg = document.createElement("p");
    form.appendChild(sendMissingMsg);
    sendMissingMsg.textContent = "There are unfinished categories! For each category, please either give your top three, or skip.";
    sendMissingMsg.style.display = "none";
    sendMissingMsg.id = "sendMissingMsg";

    let sendBtn = document.createElement("button");
    sendBtn.id = "sendBtn";
    sendBtn.textContent = "Send";
    sendBtn.addEventListener("click", function(e) {
        if (!voteIsValid()) {
            sendMissingMsg.style.display = "";
            return;
        }
        sendMissingMsg.style.display = "none";
        handleFormSubmit(e);
    });
    form.appendChild(sendBtn);
}

function saveVotes() {
    let str = JSON.stringify(votes);
    localStorage.setItem("Neurofic_Awards_Votes", str);
}

function loadVotes() {
    let str = localStorage.getItem("Neurofic_Awards_Votes");
    if (str) {
        let votesTemp = JSON.parse(str);
        if (votesTemp.year != year) return;
        if (votesTemp["Best Comedy"]) return;
        votes = votesTemp;
        for (let i in categories) {
            let cat = categories[i][0];
            for (let i = 1; i <=3; i++) {
                let name = votes[cat+i];
                if (name === "Skip") continue;
                assignRank(cat, name, i);
            }
        }
    }
}

function initDates() {
    document.getElementById("endDate").textContent = endDate.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

function voteIsValid() {
    let valid = true;
    for (let i in categories) {
        let cat = categories[i][0];
        valid &&= (votes[cat+1] === "Skip" && votes[cat+2] === "Skip" && votes[cat+3] === "Skip") ||
                  (votes[cat+1] !== "Skip" && votes[cat+2] !== "Skip" && votes[cat+3] !== "Skip");
    }
    return valid;
}

async function init() {
    initDates();
    if (await initToken()) {
        createForm();
        loadVotes();
        votes.year = year;
        votes.type = "vote";
        votes.token = JSON.stringify(token);
    }
}

init();