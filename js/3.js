const colorPicker = document.querySelector("#paint");
const previousColors = document.querySelector(".previous-colors");
let chosenColor = "#FFFFFFF";
const paths = document.querySelectorAll("path");
const undo = document.querySelector(".undo");
let history = [];
// const clear = document.querySelector(".clear");

//constante download
const download = document.querySelector(".download");


paint.onchange = function () {
    chosenColor = colorPicker.value;
    previousColors.innerHTML += `<div class="prev-color" style="background-color: ${chosenColor}", margin:2%"></div>`; //agrega el color en un cuadradito. Con el += se van agregando cuadraditos de colores (historial de colores seleccionados)
}

//Para poder elegir el color previo (circulos)
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

//Descarga ed SVG
function downloadSVGAsText() {
    const svg = document.querySelector('svg');
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = 'download.svg';
    a.href = 'data:image/svg+xml;base64,' + base64doc;
    a.dispatchEvent(e);
}

// function downloadSVGAsPNG(e) {
//     const canvas = document.createElement("canvas");
//     const svg = document.querySelector('svg');
//     const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
//     const w = parseInt(svg.getAttribute('width'));
//     const h = parseInt(svg.getAttribute('height'));
//     const img_to_download = document.createElement('img');
//     img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
//     console.log(w, h);
//     img_to_download.onload = function () {
//         console.log('img loaded');
//         canvas.setAttribute('width', w);
//         canvas.setAttribute('height', h);
//         const context = canvas.getContext("2d");
//         //context.clearRect(0, 0, w, h);
//         context.drawImage(img_to_download, 0, 0, w, h);
//         const dataURL = canvas.toDataURL('image/png');
//         if (window.navigator.msSaveBlob) {
//             window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
//             e.preventDefault();
//         } else {
//             const a = document.createElement('a');
//             const my_evt = new MouseEvent('click');
//             a.download = 'download.png';
//             a.href = dataURL;
//             a.dispatchEvent(my_evt);
//         }
//         // canvas.parentNode.removeChild(canvas);
//     }
// }

const downloadSVG = document.querySelector('#downloadSVG');
downloadSVG.addEventListener('click', downloadSVGAsText);
// const downloadPNG = document.querySelector('#downloadPNG');
// downloadPNG.addEventListener('click', downloadSVGAsPNG);

//Boton RESET
// let drawing = document.getElementById("Capa_1")
// let svgDoc = drawing.contentDocument.getElementById('Capa_1')

// let clear = document.querySelector('.clear')
//     clear.addEventListener('click', (e) => {
//         e.preventDefault()
//         let test = svgDoc.querySelectorAll('#Color > path')
//         test.forEach((element) => {
//             if (e.target.parentNode.id != 'Black' && e.target.id != 'Capa_1'){
//                 element.style.fill = '#fff'
//             }
//         })
//     })


// clear.onclick = function () {
//     // history.splice(0, history.length);
//     // history.length = 0;
//     // console.log(history);
//     let test = svgDoc.querySelectorAll('#Color > path')
//     test.forEach((element) => {
//         if (e.target.parentNode.id != 'Black' && e.target.id != 'Capa_1') {
//             element.style.fill = '#fff'
//         }
//     })
// }

// let drawing = document.getElementById("Capa_1")
// let svgDoc = drawing.contentDocument.getElementById('Capa_1')
// let clear = document.querySelector('.clear')
// clear.addEventListener('click', (e) => {
//     e.preventDefault()
//     let test = svgDoc.querySelectorAll('#Color > path')
//     test.forEach((element) => {
//         element.style.fill = '#fff'
//     })
// })

function svgClear() {
    $(svgColor).each(function(){
      TweenMax.to(this, fillSpeed, { fill: "#FFF" });
    })
  }

$.fn.btnClear     = function() {
    btnClear = this
    $(btnClear).on('click', svgClear)
    }
  