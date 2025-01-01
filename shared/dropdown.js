const dropdown = document.getElementsByClassName("dropdown")[0];
const dropdownContent = document.getElementsByClassName("dropdownContent")[0];

dropdown.addEventListener("click",function(e){
    dropdown.classList.toggle("active");
    if (dropdownContent.style.display == "") {
        dropdownContent.style.display = "block";
    } else {
        dropdownContent.style.display = "";
    }
});