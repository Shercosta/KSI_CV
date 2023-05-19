//get element by id "print-btn" add event listener "click" and call function printResume
document.getElementById("print-btn").addEventListener("click", printResume);

//function printResume
function printResume() {
    //call window.print() method
    window.print();
}