const form = document.getElementById("awardForm");
const code = (new URLSearchParams(window.location.search)).get('code');
var token = null;
var optElems = {};
var votes = {};

function uncheckAll(cat) {
    for (let i in optElems[cat]) {
        optElems[cat][i].classList.remove("checked");
    }
}

function checkOption(cat, name) {
    uncheckAll(cat);
    let cont = optElems[cat][name];
    cont.children[0].checked = "checked";
    cont.classList.add("checked");
    votes[cat] = name;
    saveVotes();
}

function addOption(catCont, cat, name, link) {
    let optCont = document.createElement("div");
    optCont.classList.add("option");
    catCont.appendChild(optCont);
    optElems[cat][name] = optCont;

    let optInput = document.createElement("input");
    optInput.classList.add("optInput");
    optInput.name = cat;
    optInput.type = "radio";
    optInput.value = name;
    if (name == "Skip") {
        optInput.checked = "checked";
        optCont.classList.add("checked");
        optCont.classList.add("skip");
    }
    optCont.appendChild(optInput);

    let optLabel = document.createElement("div");
    optLabel.classList.add("optLabel");
    optLabel.textContent = name;
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

    optCont.addEventListener("click", function(e){
        if (link && e.target == optLink) return;
        if (e.button == 0) {
            checkOption(cat, name);
        }
    })

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
    votes[cat] = "Skip";
    for (let i in nominees[cat]) {
        let [name, link] = nominees[cat][i];
        addOption(catCont, cat, name, link);
    }
    addOption(catCont, cat, "Skip", undefined);
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

    let sendBtn = document.createElement("button");
    sendBtn.id = "sendBtn";
    sendBtn.textContent = "Send";
    form.appendChild(sendBtn);
}

function saveVotes() {
    votes.year = '2025';
    let str = JSON.stringify(votes);
    localStorage.setItem("Neurofic_Awards_Votes", str);
}

function loadVotes() {
    let str = localStorage.getItem("Neurofic_Awards_Votes");
    if (str) {
        votes = JSON.parse(str);
        if (votes.year != '2025') return;
        delete votes.year;
        for (let i in votes) {
            if (i == "username") continue;
            let name = votes[i];
            checkOption(i, name);
        }
    }
}

function saveToken() {
    let str = JSON.stringify(token);
    localStorage.setItem("Neurofic_Awards_Discord_Token", str);
}

function loadToken() {
    let str = localStorage.getItem("Neurofic_Awards_Discord_Token");
    if (str) token = JSON.parse(str);
}

async function getToken() {
    let response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncode({code:code})
    });
    response = await response.json();
    if (response.result === "error") return false;
    token = JSON.parse(response.token);
    token.created_on = Math.floor(Date.now() / 1000);
    saveToken();
    return true;
}

async function refreshToken() {
    let response = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncode({refresh_token:token.refresh_token})
    });
    response = await response.json();
    if (response.result === "error") return false;
    token = JSON.parse(response.token);
    token.created_on = Math.floor(Date.now() / 1000);
    saveToken();
    return true;
}

async function init() {
    loadToken();
    if (token !== null || code !== null) {
        document.getElementById("loading").style.display = "block";
        document.getElementById("discordAuthSect").style.display = "none";
        if (token === null) {
            let status = await getToken();
            if (!status) {
                document.getElementById("discordAuthSect").style.display = "";
                document.getElementById("discordAuthErrorMsg").style.display = "block";
                document.getElementById("loading").style.display = "";
                return;
            }
        } else if (Math.ceil(Date.now()/1000)-token.created_on > token.expires_in*6/7) {
            let status = await refreshToken();
            if (!status) {
                document.getElementById("discordAuthSect").style.display = "";
                document.getElementById("discordAuthErrorMsg").style.display = "block";
                document.getElementById("loading").style.display = "";
                return;
            }
        }
        document.getElementById("loading").style.display = "";
        createForm();
        loadVotes();
    }
}

init();