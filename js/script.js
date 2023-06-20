const config = {
    mode: "simple",
    numbers: "0123456789",
    lower: "",
};

const modesBlock = document.querySelector(".mode-options");
modesBlock.addEventListener("click", modeSelectHandler);


function init() {
    console.log(localStorage)
    const [selected, unselected] = getSelectedUnselected();
    setSelectedUnselected(selected, unselected);
}

function syncConfig() {
    if (localStorage.length === 0) {
        for (let key in config) {
            localStorage.setItem(key, config[key]);
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
    if (event.target === selected) return;
    setSelectedUnselected(selected, unselected);
    localStorage.setItem("mode", event.target?.dataset.option);
    init();
}

syncConfig();
init();