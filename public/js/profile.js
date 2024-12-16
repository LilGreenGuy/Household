const BUTTONS = {
    nameBtn: document.getElementById("editNameBtn"),
    emailBtn: document.getElementById("editEmailBtn"),
    salaryBtn: document.getElementById("editSalaryBtn"),
}
const PLACEHOLDERS = {
    namePlaceholder: document.getElementById("namePlaceholder"),
    emailPlaceholder: document.getElementById("emailPlaceholder"),
    salaryPlaceholder: document.getElementById("salaryPlaceholder"),
}

const INPUTS = {
    nameInput: document.getElementById("nameInput"),
    emailInput: document.getElementById("emailInput"),
    salaryInput: document.getElementById("salaryInput")
}

console.log(BUTTONS)

for (let button in BUTTONS) {
    BUTTONS[button].addEventListener('click', (e) => {
        e.preventDefault();
        addClass(BUTTONS[button]);
    })
}

function addClass(button) {
    if (button === BUTTONS.nameBtn) {
        if (!PLACEHOLDERS.namePlaceholder.classList.contains("d-none")) {
            PLACEHOLDERS.namePlaceholder.classList.add('d-none');
            INPUTS.nameInput.classList.remove('d-none');
        }
    } else if (button === BUTTONS.emailBtn) {
        if (!PLACEHOLDERS.emailPlaceholder.classList.contains("d-none")) {
            PLACEHOLDERS.emailPlaceholder.classList.add('d-none');
            INPUTS.emailInput.classList.remove('d-none');
        }
    } else {
        if (!PLACEHOLDERS.salaryPlaceholder.classList.contains("d-none")) {
            PLACEHOLDERS.salaryPlaceholder.classList.add('d-none');
            INPUTS.salaryInput.classList.remove('d-none');
        }
    }
}