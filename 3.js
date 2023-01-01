const colorPicker = document.querySelector("#paint");
const previousColors = document.querySelector(".previous-colors");
let chosenColor = "#FFFFFFF";
const paths = document.querySelectorAll("path");
const undo = document.querySelector(".undo");
let history = [];

//constante download
const download = document.querySelector(".download");


paint.onchange = function () {
    chosenColor = colorPicker.value;
    previousColors.innerHTML += `<div class="prev-color" style="background-color: ${chosenColor}"></div>`; //agrega el color en un cuadradito. Con el += se van agregando cuadraditos de colores (historial de colores seleccionados)
}

//Para poder elegir el color previo (cuadraditos)
previousColors.onclick = function (event) {
    chosenColor = event.target.style.backgroundColor;
}

paths.forEach(function (path) {
    path.onclick = function (event) {
        let originalColor = "rgb(181,181,181)";
        if (event.target.style.fill) {
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
undo.onclick = function () {
    const lastItemIndex = history.length - 1;
    history[lastItemIndex].element.style.fill = history[lastItemIndex].previousColor;

}

//Descargar jpg (INTENTO 1)
// const svg = document.getElementById('Capa_1');
// const {x, y, width, height} = svg.viewBox.baseVal;
// const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'});
// const url = URL.createObjetcURL(blob);
// const image = document.createElement('img');
// image.src = url;
// image.addEventListener('load', () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = width;
//     canvas.height = height;
//     const context = canvas.getContext('2d');
//     context.drawImage(image, x, y, width, height);
//     const link = canvas.toDataURL();
//     URL.revokeObjectURL(url);
// })

//Descargar jpg (INTENTO 2)

//Se crea un elemento <a> con href y lo clickea
// function download(href, name) {
//     var a = document.createElement('a');

//     a.download = name;
//     a.href = href;

//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
// }
// //Descrgar inline SVG
// download(window.URL.createObjectURL(new Blob(['code of inline SVG'], {type: 'image/svg'})), 'svg');

//Convertir inline SVG a PNG y descargar
// download.onclick = function downloadPNG() {
//     // specify png with and height in pixels
//     var png_width = 1024;
//     var png_height = 768;

//     var inline_svg = ''; // code of inline SVG

//     var canvas = document.createElement("canvas"); // create <canvas> element
//     // The 2D Context provides objects, methods, and properties to draw 
//     // and manipulate graphics on a canvas drawing surface.
//     var context = canvas.getContext("2d");

//     // set canvas with and height equal to png with and height
//     canvas.width = png_width;
//     canvas.height = png_height;

//     let image = new Image; // create <img> element
//     image.onload = function () {
//         // define fill (specify 'no-repeat' if you don't want it to repeat
//         context.fillStyle = context.createPattern(image, 'repeat'); 
//         // fill rectangle with defined fill
//         context.fillRect(0, 0, canvas.width, canvas.height); 
//         this.download(canvas.toDataURL("image/png"), 'example.png');
//     }.bind(this);

//     // btoa — binary string to ASCII (Base64-encoded)
//     image.src = 'data:image/svg+xml;base64,' + btoa('inline svg'); 
// }


//Descargar jpg (INTENTO 3)
// download.onclick = function svgDownloadSVG() {
//     var svgInfo = $(svgObject).clone();
//     console.clear()
//     console.log(svgInfo)
//     $(this).attr({
//              href:"data:image/svg+xml;base64,"+svgInfo.toString(),
//              download:'coloringBook.svg',
//              target:"_blank"
//      });
//    }


//Descargar PNG (INTENTO 4)

function downloadSVGAsText() {
    const svg = document.querySelector('svg');
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = 'download.svg';
    a.href = 'data:image/svg+xml;base64,' + base64doc;
    a.dispatchEvent(e);
}

function downloadSVGAsPNG(e) {
    const canvas = document.createElement("canvas");
    const svg = document.querySelector('svg');
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const w = parseInt(svg.getAttribute('width'));
    const h = parseInt(svg.getAttribute('height'));
    const img_to_download = document.createElement('img');
    img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
    console.log(w, h);
    img_to_download.onload = function () {
        console.log('img loaded');
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        const context = canvas.getContext("2d");
        //context.clearRect(0, 0, w, h);
        context.drawImage(img_to_download, 0, 0, w, h);
        const dataURL = canvas.toDataURL('image/png');
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
            e.preventDefault();
        } else {
            const a = document.createElement('a');
            const my_evt = new MouseEvent('click');
            a.download = 'download.png';
            a.href = dataURL;
            a.dispatchEvent(my_evt);
        }
        // canvas.parentNode.removeChild(canvas);
    }
}

const downloadSVG = document.querySelector('#downloadSVG');
downloadSVG.addEventListener('click', downloadSVGAsText);
const downloadPNG = document.querySelector('#downloadPNG');
downloadPNG.addEventListener('click', downloadSVGAsPNG);

//Intento 5

