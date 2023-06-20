const config = {
    version: "0.02",
    mode: "simple",
    totalLength: "8",
    digits: "1",
    digitsSymbols: "0123456789",
    lower: "1",
    lowerSymbols: "abcdefghijklmnopqrstuvwxyz",
    upper: "0",
    upperSymbols: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    specials: "0",
    specialsSymbols: "!@#$%^&*()",
};

const modesBlock = document.querySelector(".mode-options");
modesBlock.addEventListener("click", modeSelectHandler);


function init() {
    console.log(localStorage)
    const [selected, unselected] = getSelectedUnselected();
    setSelectedUnselected(selected, unselected);
}

function syncConfig() {
    if (localStorage.length === 0 || localStorage.version !== config.version) {
        localStorage.clear();
        for (let key in config) {
            localStorage.setItem(key, config[key]);
        }
    }
    if (localStorage.length !== config.length) {
        for (let key in config) {
            if (!localStorage[key]) localStorage.setItem(key, config[key]);
        }
    }
    else {
        for (let [key, value] of Object.entries(localStorage)) {
            config[key] = value;
        }
    }
}

function getSelectedUnselected() {
    const selected = document.querySelector(`.mode-option[data-option='${localStorage.getItem("mode")}']`);
    const unselected = document.querySelector(`.mode-option[data-option='${localStorage.getItem("mode") === "simple" ? "advanced" : "simple"}']`);
    return [selected, unselected];
}

function setSelectedUnselected(selected, unselected) {
    selected.dataset.selected = "1";
    unselected.dataset.selected = "0";
}

function modeSelectHandler(event) {
    const [selected, unselected] = getSelectedUnselected();
    if (event.target === selected || event.target === modesBlock) return;
    setSelectedUnselected(selected, unselected);
    localStorage.setItem("mode", event.target.dataset.option);
    init();
}

syncConfig();
init();