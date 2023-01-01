
window.onload = () => {

    let drawing = document.getElementById("drawing")
    let svgDoc = drawing.contentDocument.getElementById('Layer_1')

    const menu = document.querySelector(".menu")
    let checked = document.querySelector(".checked")
    let color = window.getComputedStyle(checked).getPropertyValue('background-color')

    const newDrawing = document.querySelector(".menu-draw")
    let first = document.querySelector('.selected')

    let test = document.querySelector('.test')
    let download = document.querySelector('.download')


    svgDoc.addEventListener('click', (e) => {
        if (e.target.parentNode.id != 'Black' && e.target.id != 'Layer_1'){
            e.target.style.fill = color
        }
    })

    newDrawing.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.classList.contains('btn-draw')) {
            first.classList.remove('selected')
            e.target.classList.add('selected')
            first = document.querySelector('.selected')
            drawing.setAttribute('data', e.target.value)
            drawing.onload = () => {
                svgDoc = drawing.contentDocument.getElementById('Layer_1')
                svgDoc.addEventListener('click', (e) => {
                    if (e.target.parentNode.id != 'Black' && e.target.id != 'Layer_1'){
                        e.target.style.fill = color
                    }
                })            
            }
        }
    })

    menu.addEventListener('click', (e) => {
        e.preventDefault()
        if (e.target.classList.contains("btn-color")) {
        color = window.getComputedStyle(e.target).getPropertyValue('background-color')
        checked.classList.remove("checked");
        e.target.classList.add("checked");
        checked = e.target;
        }
      });
      
      test.addEventListener('click', (e) => {
        alert('hi')
        e.preventDefault()
        // download.setAttribute('href', svgDoc)
        downloadString("a,b,c\n1,2,3", "image", "myCSV.jpg")
      })

    let clear = document.querySelector('.clear')
    clear.addEventListener('click', (e) => {
        e.preventDefault()
        let test = svgDoc.querySelectorAll('#Color > path')
        test.forEach((element) => {
            element.style.fill = '#fff'
        })
    })


    function downloadSVGAsText() {
        const svg = svgDoc;
        const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
        const a = document.createElement('a');
        const e = new MouseEvent('click');
        a.download = 'download.svg';
        a.href = 'data:image/svg+xml;base64,' + base64doc;
        a.dispatchEvent(e);
    }   


    const downloadSVG = document.querySelector('#downloadSVG');
    downloadSVG.addEventListener('click', downloadSVGAsText);


    // function downloadSVGAsText() {
    //     const svg = svgDoc;
    //     const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    //     const a = document.createElement('a');
    //     const e = new MouseEvent('click');
    //     a.download = 'download.svg';
    //     a.href = 'data:image/svg+xml;base64,' + base64doc;
    //     a.dispatchEvent(e);
    //   }
}

