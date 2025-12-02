const form = document.getElementById("awardForm");

const worksReadCat = [
    "30-50",
    "51-75",
    "76-100",
    "101-200",
    "201+"
]

var worksReadInputs = {};
var inputs = {};
var votes = {
    "Works Read": worksReadCat[0]
};
const startDate = new Date("2025-12-01T14:00Z");
const endDate = new Date("2025-12-08T14:00Z");

function addWorksReadQ() {
    let worksReadQ = document.createElement("div");
    worksReadQ.classList.add("worksReadQ");
    worksReadQ.append("Please tell us how many Neuroverse works you have read! Just give an estimate; it doesn't have to be exact.");
    worksReadQ.appendChild(document.createElement("br"));
    worksReadQ.append("This question is just for fun and has no impact on your nominations.");
    let inputContainer = document.createElement("div");
    let inputList = document.createElement("div");
    inputList.classList.add("worksReadInputs");
    for (let i in worksReadCat) {
        let catName = worksReadCat[i];
        let input = document.createElement("input");
        input.type = "radio";
        input.id = catName;
        input.name = "worksReadQ";
        input.value = catName;
        input.addEventListener("click", function(){
            votes["Works Read"] = catName;
            saveVotes();
        });
        if (i == 0) input.checked = true;
        worksReadInputs[catName] = input;
        let label = document.createElement("label");
        label.for = catName;
        label.textContent = catName;
        inputList.appendChild(input);
        inputList.appendChild(label);
        inputList.appendChild(document.createElement("br"));
    }
    inputContainer.appendChild(inputList);
    worksReadQ.appendChild(inputContainer);
    form.appendChild(worksReadQ);
}

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

    catCont.appendChild(document.createElement("br"));

    let catInput = document.createElement("textarea");
    catInput.classList.add("catInput");
    catInput.placeholder = "Put a nomination here...\nMaybe even another one...";
    catInput.addEventListener("selectionchange", (e)=>{
        inputName(cat, e.target.value);
    });
    inputs[cat] = catInput;
    catCont.appendChild(catInput);

    form.appendChild(catCont);
}

function createForm() {
    addWorksReadQ();

    for (let i in categories) {
        addCategory(categories[i][0], categories[i][1]);
    }
    form.appendChild(document.createElement("br"));

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
        if (!votesTemp["Works Read"]) votesTemp["Works Read"] = worksReadCat[0];
        votes = votesTemp;
        worksReadInputs[votes["Works Read"]].checked = true;
        for (let i in categories) {
            let cat = categories[i][0];
            let name = votes[cat];
            if (!name) continue;
            inputName(cat, name);
        }
    }
}

function initDates() {
    document.getElementById("startDate").textContent = startDate.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
    document.getElementById("endDate").textContent = endDate.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

async function init() {
    initDates();
    if (await initToken()) {
        createForm();
        loadVotes();
        votes.year = year;
        votes.type = "nomination";
        votes.token = JSON.stringify(token);
    }
}

init();