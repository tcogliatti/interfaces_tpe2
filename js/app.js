//////////////////////////////// DOM capture elements
let canvas      = document.querySelector('#canvas');
let penBtn      = document.querySelector('#lapiz');
let borraBtn    = document.querySelector('#goma');
let colorInput  = document.querySelector('#color');
let clearBtn    = document.querySelector('#clear');
let saveBtn     = document.querySelector('#save');
let fileInput  = document.querySelector('#file_input');

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

//////////////////////////////// Principal

function main(){
    clearCanvas();
}


//////////////////////////////// Listeners de buttons

//////// BUTTONS event

// COLOR 
colorInput.addEventListener('change', () => {
    penColor = colorInput.value;
    console.log(penColor);
    clicBorrar = false;
    clicPen = true;
    colorPen = penColor;    
    ancho = 5;

});

// INPUT 
fileInput.addEventListener('change', () => {
    const img = new Image();
    //img.src = "./logo.png";
    img.src = URL.createObjectURL(file_input.files[0]);
    img.onload = () => {
        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0);

        // Obtener los datos de los píxeles de la imagen
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;

        // Mostrar la imagen filtrada en el canvas
        ctx.putImageData(imageData, 0, 0);
    };

});

// SAVE 
saveBtn.addEventListener('click', () =>{
    let link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

// CLEAR  
clearBtn.addEventListener('click', () =>{
    clearCanvas();
    console.log('clear');
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

//////////////// MOUSE event

canvas.addEventListener ('mousedown', (e) => {
    mouseDown = true;
    mouseUp = false;
    console.log('color de pen', colorPen);
    penColor = colorInput.value;
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




