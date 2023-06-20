const config = {
    mode: "simple",
    numbers: "0123456789",
    lower: "",
};

const modes = {
    simple: document.querySelector(".mode-option[data-option='simple']"),
    advanced: document.querySelector(".mode-option[data-option='advanced']")
};

const modesBlock = document.querySelector(".mode-options");
modesBlock.addEventListener("click", modeSelectHandler);


function init() {
    console.log(config)
    const [selected, unselected] = getSelectedUnselected();
    setSelectedUnselected(selected, unselected);
}

function getSelectedUnselected() {
    const selected = document.querySelector(`.mode-option[data-option='${config.mode}']`);
    const unselected = document.querySelector(`.mode-option[data-option='${config.mode === "simple" ? "advanced" : "simple"}']`);
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
    config.mode = event.target.dataset.option;
    init();
}

init();