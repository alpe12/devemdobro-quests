function validateInput(input, adderror = false){
    if (input.checkValidity()){
        input.classList.remove("error");
        input.classList.add("ok");
    } else {
        if (adderror) input.classList.add("error");
        input.classList.remove("ok");
    }
}

function validateForm() {
    inputs.forEach((input) => {
         validateInput(input, true);
    });
}

const inputs = document.querySelectorAll(".formulario input:not([type=submit]), .formulario textarea");

document.querySelector(".formulario button[type=submit]").addEventListener('click', validateForm);

inputs.forEach(input => {
    input.addEventListener('input', function(){
        validateInput(input);
    });
});