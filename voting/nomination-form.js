const form = document.getElementById("awardForm");
var inputs = {};
var votes = {};

function inputName(cat, name) {
    let input = inputs[cat];
    input.value = name;
    votes[cat] = name;
    saveVotes();
}

function addCategory(cat, desc) {
    votes[cat] = "";
    let catCont = document.createElement("div");
    catCont.classList.add("category");
    let catLabel = document.createElement("div");
    catLabel.classList.add("catLabel");
    catLabel.textContent = cat;
    catCont.appendChild(catLabel);
    let catDesc = document.createElement("div");
    catDesc.classList.add("catDesc");
    catDesc.textContent = desc;
    catCont.appendChild(catDesc);
    let catInput = document.createElement("textarea");
    catInput.classList.add("catInput");
    catInput.addEventListener("selectionchange", (e)=>{
        inputName(cat, e.target.value);
    });
    inputs[cat] = catInput;
    catCont.appendChild(catInput);
    form.appendChild(catCont);
}

function createForm() {
    for (let i in categories) {
        addCategory(categories[i][0], categories[i][1]);
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
    let str = JSON.stringify(votes);
    localStorage.setItem("Neurofic_Awards_Nominations", str);
}

function loadVotes() {
    let str = localStorage.getItem("Neurofic_Awards_Nominations");
    if (str) {
        let votesTemp = JSON.parse(str);
        if (votesTemp.year != '2025') return;
        votes = votesTemp;
        for (let i in categories) {
            let cat = categories[i][0];
            let name = votes[cat];
            inputName(cat, name)
        }
    }
}

async function init() {
    if (await initToken()) {
        createForm();
        loadVotes();
        votes.year = year;
        votes.type = "nomination";
        votes.token = JSON.stringify(token);
    }
}

init();