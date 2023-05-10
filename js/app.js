//////////////////////////////// DOM capture elements
let canvas      = document.querySelector('#canvas');
let penBtn      = document.querySelector('#lapiz');
let borraBtn    = document.querySelector('#goma');
let colorInput  = document.querySelector('#color');
let clearBtn    = document.querySelector('#clear');
let saveBtn     = document.querySelector('#save');
let fileInput   = document.querySelector('#upload');
let uploadButton = document.querySelector('#uploadButton');
let cleanImg    = document.querySelector('#cleanImg'); 
let filtesBtn   = document.querySelectorAll('.filters');
let rangeFilter = document.querySelectorAll('.rangeFilter');
let rangePen    = document.querySelector('#rangePen');
let rangeGoma   = document.querySelector('#rangeGoma');

//////////////////////////////// Setup global variables
let canvasWidth  = canvas.width;
let canvasHeight = canvas.height;
let ctx = canvas.getContext('2d');
let mouseUp = true;
let mouseDown = false;
let backColor = 'white';
let ancho = 0;
let pen = null;
let clicPen = false;
let clicBorrar = false;
let colorPen = colorInput.value; 
let picture = null;
let penSize = rangePen.value;
let gomaSize = rangeGoma.value;

//////////////////////////////// Principal

function main(){
    clearCanvas();
}


//////////////////////////////// Listeners de buttons

//////// BUTTONS event

// COLOR 
colorInput.addEventListener('change', () => {
    if(clicPen)
        colorPen = colorInput.value;    
});

// CARGAR IMAGEN 
uploadButton.addEventListener('click', () => {
    fileInput.click();
});
fileInput.addEventListener('change', () => {
    clearCanvas();
    let src = URL.createObjectURL(fileInput.files[0]);
    picture = new Picture(canvasWidth, canvasHeight, ctx, src);
    picture.draw();
});

// SAVE 
saveBtn.addEventListener('click', () =>{
    let link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// CLEAR CANVAS
clearBtn.addEventListener('click', () =>{
    clearCanvas();

});

// CLEAR IMAGEN
cleanImg.addEventListener('click', () =>{
    picture.clear();

});


// PEN
penBtn.addEventListener('click', () =>{
    if(clicPen){
        clicPen = false;
        penBtn.classList.remove('active-btn');
        rangePen.classList.remove('expand');
    }else{
        if(clicBorrar){
            clicBorrar = false;
            borraBtn.classList.remove('active-btn');
            rangeGoma.classList.remove('expand');
        }
        clicPen = true;
        penBtn.classList.add('active-btn');
        rangePen.classList.add('expand');
        colorPen = colorInput.value;   
        ancho = penSize;
    }
});

// TAMAÑO PEN
rangePen.addEventListener('change', () =>{
    penSize = rangePen.value;
    ancho = penSize;
});
rangeGoma.addEventListener('change', () =>{
    gomaSize = rangeGoma.value;
    ancho = gomaSize;
});

// ERASER
borraBtn.addEventListener('click', (e) => {
  
    if(clicBorrar){
        clicBorrar = false;
        borraBtn.classList.remove('active-btn');
        rangeGoma.classList.remove('expand');
    }else{
        if (clicPen){
            clicPen = false;
            penBtn.classList.remove('active-btn');
            rangePen.classList.remove('expand');
        }
        clicBorrar = true;
        borraBtn.classList.add('active-btn');
        rangeGoma.classList.add('expand');
        colorPen = backColor;
        ancho = gomaSize;
    }
});

// FILTROS
filtesBtn.forEach( filtro => { filtro.addEventListener('click', () => {
    let idFiltro = filtro.id;
    switch (idFiltro) {
        case 'sepia':
            picture.filterSepia(rangeFilter[0].value);
            break;
        case 'b&w':
            picture.filterBW(rangeFilter[1].value);
            break;
        case 'invert':
            picture.filterInvert();
            break;
        case 'brillo':
            picture.filterBright(rangeFilter[2].value);
            break;
        case 'binary':
            picture.filterBinary(rangeFilter[3].value);
            break;
        case 'satu':
            picture.filterSatu(rangeFilter[4].value);
            break;
        case 'blur':
            picture.filterBlur(rangeFilter[5].value);
            break;
    }
})})

// AMOUNT FILTER
rangeFilter.forEach( amount => { amount.addEventListener('change', () => {
    let idFiltro = amount.id;
    switch (idFiltro) {
        case 'sepiaAmonut':
            picture.filterSepia(amount.value);
            break;
        case 'b&wAmount':
            picture.filterBW(amount.value);
            break;
        case 'brilloAmount':
            picture.filterBright(amount.value);
            break;
        case 'binaryAmount':
            picture.filterBinary(amount.value);
            break;
        case 'satuAmount':
            picture.filterSatu(amount.value);
            break;
        case 'blurAmount':
            picture.filterBlur(amount.value);
            break;
    }
})})

colorInput.addEventListener('change', () => {
    if(clicPen)
        colorPen = colorInput.value;    
});
//////////////// MOUSE event

canvas.addEventListener ('mousedown', (e) => {
    mouseDown = true;
    mouseUp = false;
    pen = new Pen((e).offsetX, (e).offsetY, colorPen, ctx, ancho);
});

canvas.addEventListener ('mouseup', (e) => {
    mouseDown = false;
    mouseUp = true;
    pen = null;
});

canvas.addEventListener ('mousemove', (e) => {
    if((mouseDown && clicPen) || 
       (mouseDown && clicBorrar) ){
        pen.moveTo((e).offsetX, (e).offsetY);
        pen.draw();
    }
});

function clearCanvas(){
    ctx.fillStyle = backColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}




