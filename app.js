const container = document.querySelector("#container");
const colorA = document.querySelector("#fill-1");
const colorB = document.querySelector("#fill-2");
const colorC = document.querySelector("#fill-3");
let colorList = ["white", colorA.value, colorB.value, colorC.value];

let bIsMouseDown = false;
document.body.onmousedown = function() {
    bIsMouseDown = true;
}
document.body.onmouseup = function() {
    bIsMouseDown = false;
}

colorA.onchange = () => UpdateColors();
colorB.onchange = () => UpdateColors();
colorC.onchange = () => UpdateColors();

const UpdateColors = () => {

    const root = document.querySelector(':root');

    root.style.setProperty('--color-a', colorA.value);
    root.style.setProperty('--color-b', colorB.value);
    root.style.setProperty('--color-c', colorC.value);
}

let idNum = 0;
const defaultSize = 32;

container.setAttribute("style",
    "grid-template-columns:repeat(" + defaultSize + ", 1fr); " +
    "grid-template-rows:repeat(" + defaultSize + ", 1fr) "
);

for(let i = 0; i < defaultSize; i++)
{
    for(let j = 0; j < defaultSize; j++)
    {
        GeneratePixel();
    }
}

const reset = document.querySelector("#reset-btn");
reset.addEventListener("click", () => {

    let size = parseInt(prompt("Enter Canvas Size: "));

    if(size != null) {
        let clampedSize;
        clampedSize = Math.max(1, size);

        container.setAttribute("style",
            "grid-template-columns:repeat(" + clampedSize + ", 1fr); " +
            "grid-template-rows:repeat(" + clampedSize + ", 1fr) "
        );

        container.innerHTML = "";
        idNum = 0;
        for(let i = 0; i < clampedSize; i++) {
            for(let j = 0; j < clampedSize; j++) {
                GeneratePixel();
            }
        }
    }
});

function GeneratePixel()
{
    // Create Pixel element in container grid
    let div = document.createElement("div");
    div.setAttribute("id", "block-" + idNum);
    div.setAttribute("data-fill", "0");
    div.setAttribute("draggable", "false");
    div.classList.add("fill-0");

    div.addEventListener('dragstart', (e) => e.preventDefault());

    div.addEventListener("mouseenter", event => {
        if(!bIsMouseDown) return;

        // cache last fill value
        let fillVal = div.getAttribute("data-fill");
        // remove old fill attribute
        event.target.classList.remove("fill-" + fillVal)
        // add new fill attribute
        div.setAttribute("data-fill", Math.min(parseInt(fillVal) + 1, 3).toString());
        event.target.classList.add("fill-" + Math.min(parseInt(fillVal) + 1, 3).toString())

        //event.target.style.backgroundColor = colorList[div.getAttribute("data-fill")];
    });

    container.appendChild(div);

    idNum++;
}