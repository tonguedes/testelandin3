const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const utmSource = urlParams.get("utm_source");
const utmCampaign = urlParams.get("utm_campaign");
const utmContent = urlParams.get("utm_content");
const utmTerm = urlParams.get("utm_term");

let origem = "";
let origem_completa = "";

if (utmSource) {
    if (utmSource === "google") {
        origem = "Google";
        origem_completa = `${utmCampaign}/${utmContent}/${utmTerm}`;
    } else if (utmSource === "facebook") {
        origem = "Facebook";
        origem_completa = `${utmCampaign}/${utmContent}`;
    }
} else {
    origem = "Orgânico";
    origem_completa = "Orgânico";
}

console.log(origem_completa);

document.querySelectorAll('[id^="cf_duna_origem_lead"]').forEach(function (element) {
    element.value = origem;
});

document.querySelectorAll('[id^="cf_duna_origem_completa"]').forEach(function (element) {
    element.value = origem_completa;
});

document.addEventListener("DOMContentLoaded", function () {
    function showError(container, message, input) {
        container.innerHTML = message;
        container.classList.add("show");
        container.classList.remove("success");
        input.classList.add("error");
        input.classList.remove("success");
    }

    function clearError(container, input) {
        container.innerHTML = "";
        container.classList.remove("show");
        input.classList.remove("error");
        input.classList.add("success");
    }

    function validateForm(form) {
        let name = form.querySelector(".nome");
        let email = form.querySelector(".email");
        let phone = form.querySelector(".telefone");
        let cnpj = form.querySelector(".cnpj");
        let errorContainer = form.querySelector(".error-message-container");

        let validName = name.value.length >= 3;
        let validEmail = email.value.length >= 6 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
        let validPhone = /^\d{11,}$/.test(phone.value.replace(/[^\d]/g, ""));
        let validCNPJ = /^\d{14}$/.test(cnpj.value.replace(/[^\d]/g, ""));

        if (!validName) {
            showError(errorContainer, "Por favor, insira um nome válido com pelo menos 3 caracteres.", name);
            return false;
        }

        clearError(errorContainer, name);

        if (!validEmail) {
            showError(errorContainer, "Por favor, insira um e-mail válido com pelo menos 6 caracteres.", email);
            return false;
        }

        clearError(errorContainer, email);

        if (!validPhone) {
            showError(errorContainer, "Por favor, insira um telefone válido com pelo menos 11 caracteres.", phone);
            return false;
        }

        clearError(errorContainer, phone);

        if (!validCNPJ) {
            showError(errorContainer, "Por favor, insira um CNPJ válido com pelo menos 14 caracteres.", cnpj);
            return false;
        }

        clearError(errorContainer, cnpj);


        return true;
    }

    function initializeForm(selector) {
        let form = document.querySelector(selector);
        let submitButton = form.querySelector("button[type='submit']");
        let errorContainer = form.querySelector(".error-message-container");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            errorContainer.classList.remove("show", "success", "error");
            errorContainer.classList.add("carregando");

            setTimeout(function () {
                if (validateForm(form)) {
                    document.querySelectorAll(".sumir-btn").forEach(btn => btn.style.display = "none");
                    document.querySelectorAll('button[type="submit"]').forEach(btn => btn.style.display = "none");

                    errorContainer.innerHTML = "Formulário enviado com sucesso!";
                    errorContainer.classList.add("show", "success");
                    errorContainer.classList.remove("error");
                    form.reset();

                    setTimeout(function () {
                        window.location.href = "sucesso.html";
                    }, 100);
                }
            }, 500);
        });

        form.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", function () {
                submitButton.disabled = !validateForm(form);
            });
        });
    }

    initializeForm(".contact-form-1");
    initializeForm(".contact-form-2");
    initializeForm(".contact-form-3");
});

document.querySelectorAll(".data-button").forEach(function (button) {
    button.addEventListener("click", function () {
        let content = this.getAttribute("data-button-content");
        document.querySelectorAll(".data-button-content").forEach(container => {
            container.textContent = content;
        });
        document.querySelectorAll(".local-form").forEach(input => {
            input.value = content;
        });
    });
});

const telefoneInputs = document.querySelectorAll(".mask-tel");
telefoneInputs.forEach(input => {
    input.addEventListener("input", event => {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length <= 2) {
            value = value.replace(/(\d{0,2})/, "($1");
        } else if (value.length <= 7) {
            value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        }
        event.target.value = value;
    });
});


// Seleciona o elemento <select>
const selectElement = document.querySelector('.custom-select');

// Obtém todos os elementos <option>
const options = selectElement.querySelectorAll('option');

// Cria um array para armazenar os valores dos options
const optionValues = [];

// Percorre os <option> e pega os valores
options.forEach(option => {
    if (option.value) { // Garante que não pegue o <option> desabilitado
        optionValues.push(option.value);
    }
});

// Exibe os valores no console
console.log(optionValues);

