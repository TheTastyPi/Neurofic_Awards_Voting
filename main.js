const nominees = {
    "Best Comedy": [
        ["Hot Singles In Your Area (Literally, It's Hell)", "https://archiveofourown.org/works/60263542"],
        ["Neuro-sama is incoherent and is fucking doing stupid cartoon stuff", "https://archiveofourown.org/works/55732900"],
        ["Ass Lyk Dat", "https://archiveofourown.org/works/58494925"],
        ["The One-hundredth Neurofic", "https://archiveofourown.org/works/59003392"]
    ],
    "Best Fluff": [
        ["Mission: be a good big sister!", "https://archiveofourown.org/works/55579519"],
        ["With her own two hands", "https://archiveofourown.org/works/52664911"],
        ["What It Means To Be Human", "https://archiveofourown.org/works/52971631"],
        ["Magnum opus", "https://archiveofourown.org/works/53231548"],
        ["Your Gentle Warmth", "https://archiveofourown.org/works/57175498"],
        ["Happy Family", "https://archiveofourown.org/works/60025285"]
    ],
    "Best Hurt/Comfort": [
        ["Loving Persistence", "https://archiveofourown.org/works/55460185"],
        ["Mission: Be a good big sister!", "https://archiveofourown.org/works/55579519"],
        ["A Programmers Fifteen Daughters", "https://archiveofourown.org/works/58720972"],
        ["Broken Code", "https://archiveofourown.org/works/55465057"]
    ],
    "Best Angst": [
        ["A Programmer's Fifteen Daughters", "https://archiveofourown.org/works/58720972"],
        ["Connection Lost", "https://archiveofourown.org/works/57870754"],
        ["You Don't Need Me Anymore, Neuro", "https://archiveofourown.org/works/52770286"],
        ["Broken Code", "https://archiveofourown.org/works/55465057"],
        ["The Final Drop", "https://archiveofourown.org/works/56087128"]
    ],
    "Best Action": [
        ["Cybersyte: Vedalpunk", "https://archiveofourown.org/works/58888804"],
        ["Faster Than Light: Tale of Two AIs", "https://archiveofourown.org/works/59246377"],
        ["Perfect Paradise", "https://archiveofourown.org/works/53590756"],
        ["Tower of Evil", "https://archiveofourown.org/works/57073243"],
        ["Free From Humanity", "https://archiveofourown.org/works/55556647"]
    ],
    "Best Adventure": [
        ["Artificial Heroes", "https://archiveofourown.org/works/56135356"],
        ["Faster Than Light: Tale of Two AIs", "https://archiveofourown.org/works/59246377"],
        ["Dungeons & AI", "https://archiveofourown.org/works/55903927"],
        ["The Hell We Helped Create", "https://archiveofourown.org/works/60115030"]
    ],
    "Best Plot": [
        ["Cybersyte: Vedalpunk", "https://archiveofourown.org/works/58888804"],
        ["Perfect Paradise", "https://archiveofourown.org/works/53590756"],
        ["Connection Lost", "https://archiveofourown.org/works/57870754"],
        ["The Way She's Turing Our Lives Upsidedown", "https://archiveofourown.org/works/51183124"],
        ["dearest Diary", "https://archiveofourown.org/works/59355313"]
    ],
    "Best Characters": [
        ["A Programmers Fifteen Daughters", "https://archiveofourown.org/works/58720972"],
        ["Creepy Crawlies in Your Closet", "https://archiveofourown.org/works/57616888"],
        ["Binary Bonds", "https://archiveofourown.org/works/53962120"],
        ["The Neynatesven Household", "https://archiveofourown.org/works/56805121"],
        ["Artificial Heroes", "https://archiveofourown.org/works/56135356"]
    ],
    "Best World-Building": [
        ["Creepy Crawlies In Your Closet", "https://archiveofourown.org/works/57616888"],
        ["Artificial Heroes", "https://archiveofourown.org/works/56135356"],
        ["The Hell We Helped Create", "https://archiveofourown.org/works/60115030"],
        ["You Don't Need Me Anymore, Neuro", "https://archiveofourown.org/works/52770286"],
        ["Dungeons & AI", "https://archiveofourown.org/works/55903927"]
    ],
    "Best Atmosphere": [
        ["A normal sunrise", "https://archiveofourown.org/works/58691521"],
        ["Cybersyte: Vedalpunk", "https://archiveofourown.org/works/58888804"],
        ["Empty Space", "https://archiveofourown.org/works/56967493"],
        ["The Final Drop", "https://archiveofourown.org/works/56087128"]
    ],
    "Best Story": [
        ["Cybersyte: Vedalpunk", "https://archiveofourown.org/works/58888804"],
        ["The Way She's Turing Our Lives Upsidedown", "https://archiveofourown.org/works/51183124"],
        ["A Programmers Fifteen Daughters", "https://archiveofourown.org/works/58720972"],
        ["Connection Lost", "https://archiveofourown.org/works/57870754"],
        ["Artificial Heroes", "https://archiveofourown.org/works/56135356"]
    ]
}
const form = document.getElementById("awardForm");
var catElems = {};

function uncheckAll(cat) {
    for (let i = 1; i < catElems[cat].children.length; i++) {
        catElems[cat].children[i].classList.remove("checked");
    }
}

function checkOption(cat, cont, input) {
    input.checked = "checked";
    cont.classList.add("checked");
}

function addOption(catCont, cat, name, link) {
    let optCont = document.createElement("div");
    optCont.classList.add("option");
    catCont.appendChild(optCont);

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
            uncheckAll(cat);
            checkOption(cat, optCont, optInput);
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
    catElems[cat] = catCont;
    for (let i in nominees[cat]) {
        let [name, link] = nominees[cat][i];
        addOption(catCont, cat, name, link, parseInt(i)+1);
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
    resendMsg.textContent = "If you wish to edit your response, just change your votes, then press this button again to resubmit!";
    resendMsg.style.display = "none";
    resendMsg.id = "resendMsg";

    let sendBtn = document.createElement("button");
    sendBtn.id = "sendBtn";
    sendBtn.textContent = "Send";
    form.appendChild(sendBtn);
}

createForm();