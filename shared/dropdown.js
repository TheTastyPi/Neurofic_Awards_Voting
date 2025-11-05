const dropdown = document.getElementsByClassName("dropdown")[0];
const startYear = 2024;
const yearsElapsed = 1;

function initDropdownContent() {
    let content = document.createElement("div");
    content.classList.add("dropdownContent");
    for (let i = startYear; i < startYear + yearsElapsed; i++) {
        let link = document.createElement("a");
        link.href = `https://thetastypi.github.io/Neurofic_Awards_Voting/archive/${i}/`;
        link.textContent = i;
        content.appendChild(link);
    }
    dropdown.appendChild(content);
    
    dropdown.addEventListener("click",function(e){
        dropdown.classList.toggle("active");
        if (content.style.display == "") {
            content.style.display = "block";
        } else {
            content.style.display = "";
        }
    });
}

function initDropdown() {
    let label = document.createElement("button");
    label.classList.add("dropdownLabel");
    label.textContent = "Past Results";
    dropdown.appendChild(label);

    initDropdownContent()
}

initDropdown();