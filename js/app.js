//////////////////////////////// DOM capture elements
let canvas      = document.querySelector('#canvas');
let penBtn      = document.querySelector('#lapiz');
let borraBtn    = document.querySelector('#goma');
let colorInput  = document.querySelector('#color');
let clearBtn    = document.querySelector('#clear');
let saveBtn     = document.querySelector('#save');
let fileInput   = document.querySelector('#upload');
let cleanImg    = document.querySelector('#cleanImg'); 
let filtesBtn   = document.querySelectorAll('.filters');

//////////////////////////////// Setup global variables
let canvasWidth  = canvas.width;
let canvasHeight = canvas.height;
let ctx = canvas.getContext('2d');
let mouseUp = true;
let mouseDown = false;
let backColor = 'yellow';
let penColor = colorInput.value;
let ancho = 0;
let pen = null;
let clicPen = false;
let colorPen = null;
let picture = null;

//////////////////////////////// Principal

function main(){
    clearCanvas();
}


//////////////////////////////// Listeners de buttons

//////// BUTTONS event

// COLOR 
colorInput.addEventListener('change', () => {
    penColor = colorInput.value;
    clicBorrar = false;
    clicPen = true;
    colorPen = penColor;    
    ancho = 5;

});

// CARGAR IMAGEN 
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
    penBtn.classList.toggle('active_btn');

    if(borraBtn.classList.contains('active_btn'))
        borraBtn.classList.toggle('active_btn');
    if(clicPen)
        clicPen = false;
    else{
        clicBorrar = false;
        clicPen = true;
        colorPen = colorInput.value;   
        ancho = 5;
    }    
});

// ERASER
borraBtn.addEventListener('click', (e) => {
    borraBtn.classList.toggle('active_btn');

    if(penBtn.classList.contains('active_btn'))
        penBtn.classList.toggle('active_btn');
    if(clicBorrar)
        clicBorrar = false;
    else{
        clicBorrar = true;
        clicPen = false;
        colorPen = backColor;
        ancho = 15;
    }    
});


// FILTROS

filtesBtn.forEach( filtro => { filtro.addEventListener('click', () => {
    let idFiltro = filtro.id;
    switch (idFiltro) {
        case 'sepia':
            picture.filterSepia();
            break;
        case 'b&w':
            picture.filterBW();
            break;
        case 'invert':
            picture.filterInvert();
            break;
        case 'brillo':
            picture.filterBright();
            break;
        case 'binary':
            picture.filterBinary();
            break;
        case 'border':
            picture.filterBorder();
            break;
        case 'satu':
            picture.filterSatu();
            break;
        case 'blur':
            picture.filterBlur();
            break;
    }
})})

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




