const colorPicker = document.querySelector("#paint");
const previousColors = document.querySelector(".previous-colors");
let chosenColor = "#FFFFFFF";
const paths = document.querySelectorAll("path");
const undo = document.querySelector(".undo");
let history = [];

paint.onchange = function () {
    chosenColor = colorPicker.value;
    previousColors.innerHTML += `<div class="prev-color" style="background-color: ${chosenColor}"></div>`; //agrega el color en un cuadradito. Con el += se van agregando cuadraditos de colores (historial de colores seleccionados)
}

//Para poder elegir el color previo (cuadraditos)
previousColors.onclick = function(event){
    chosenColor = event.target.style.backgroundColor;
}

paths.forEach(function(path) {
    path.onclick = function(event) {
        let originalColor = "rgb(181,181,181)";
        if(event.target.style.fill){
            originalColor = event.target.style.fill;
        }
        const action = {
            element: event.target,
            previousColor: originalColor,
        }
        history.push(action);
        console.log(history);
        event.target.style.fill = chosenColor;
    }
})

//Deshacer
undo.onclick = function() {
    const lastItemIndex = history.length -1;
    history[lastItemIndex].element.style.fill = history[lastItemIndex].previousColor;

}


//svg a img
// const svg = `
// <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="300" height="200">
//    <rect width="100%" height="100%" fill="red" />
//    <circle cx="150" cy="100" r="80" fill="green" />
//    <text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text>
// </svg>
// `
// svgToPng(svg, (imgData) => {
//   const pngImage = document.createElement('img');
//   document.body.appendChild(pngImage);
//   pngImage.src = imgData;
// });
// function svgToPng(svg, callback) {
//   const url = getSvgUrl(svg);
//   svgUrlToPng(url, (imgData) => {
//     callback(imgData);
//     URL.revokeObjectURL(url);
//   });
// }
// function getSvgUrl(svg) {
//   return URL.createObjectURL(new Blob([svg], {
//     type: 'image/svg+xml'
//   }));
// }
// function svgUrlToPng(svgUrl, callback) {
//   const svgImage = document.createElement('img');
//   document.body.appendChild(svgImage);
//   svgImage.onload = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = svgImage.clientWidth;
//     canvas.height = svgImage.clientHeight;
//     const canvasCtx = canvas.getContext('2d');
//     canvasCtx.drawImage(svgImage, 0, 0);
//     const imgData = canvas.toDataURL('image/png');
//     callback(imgData);
//     document.body.removeChild(imgPreview);
//   };
//   svgImage.src = svgUrl;
// }
