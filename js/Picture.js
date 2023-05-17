class Picture {
    constructor(canvasWidth, canvasHeight, ctx, src){
        this.posX = 0;
        this.posY = 0;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = src;
        this.imageData = null;
        this.bk = null;
        this.width = null;
        this.heigth = null;
        this.operador = new Operador();
        this.screenshot = null;
    }

    draw(){
        // espera a que cargue la imagen y ejecuta el codigo
        this.img.onload = () => {
            let imgWidth = this.img.naturalWidth;
            let imgHeigth = this.img.naturalHeight;
            // Obtener ratio de escala
            let scaleRatio = Math.min(this.canvasWidth / imgWidth, this.canvasHeight / imgHeigth);
            this.width = imgWidth * scaleRatio;
            this.heigth = imgHeigth * scaleRatio;

            if((this.canvasWidth - imgWidth) < (this.canvasHeight - imgHeigth)){
                // resize a lo ancho
                this.width = this.canvasWidth;
                this.heigth =  Math.ceil(imgHeigth * scaleRatio);
                // re-posicionar
                this.posX = 0;
                this.posY = (this.canvasHeight - this.heigth)/2;
            } else {
                // resize a lo alto
                this.heigth = this.canvasHeight;
                this.width = Math.ceil(imgWidth * scaleRatio);
                // re-posicionar
                this.posX = (this.canvasWidth - this.width)/2;
                this.posY = 0;
            }
            
            // Dibujar la imagen en el canvas
            this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.heigth);
            
            // obtener los datos de la imagen
            this.imageData = this.ctx.getImageData(this.posX, this.posY, this.width, this.heigth);

            // guardo un BK de imageData
            this.bk = new ImageData(this.width, this.heigth);
            this.bk.data.set(this.imageData.data);
            this.getScreenShot();
        };
    }

    refreshImage(){
        // recuperamos el bk de la imagen
        this.imageData = new ImageData(this.width, this.heigth);
        this.imageData.data.set(this.bk.data);
        // redibujamos la imagen        
        this.ctx.putImageData(this.imageData, this.posX, this.posY);
        this.getScreenShot();
    }
    getScreenShot(){
        // tomamos un screenShot de imagenData
        this.screenshot = new ImageData(this.width, this.heigth);
        this.screenshot.data.set(this.imageData.data);
    }

    aplyScreenShot(){
        this.imageData = new ImageData(this.width, this.heigth);
        this.imageData.data.set(this.screenshot.data);
    }

    ///////////////////////////////// FILTROS
    /*
        Estos métodos son para activar los filtros
        Al activar el filtro se aplica el screenshot, que es sobre
        el cual se desarrolla el ajuste 
    */
    filterSepia(){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcSepia(null);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterBW(){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBW(null);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterInvert(){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcInvert(null);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterBright(amount){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBright(amount);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterBinary(amount){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBinary(amount);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterSatu(amount){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcSatu(amount);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterBlur(amount){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBlur(amount, this.screenshot, this.width, this.heigth);
        this.aplicarFiltro(calculator, this.screenshot);
    }
    filterBorder(){
        this.aplyScreenShot();
        this.getScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBorder(this.screenshot, this.width, this.heigth);
        this.aplicarFiltro(calculator, this.screenshot);
    }

    ///////////////////////////////// TUNNING FILTERS
    /*
        estos metodos permiten modificar la cantiad de efecto 
        sin aplicarlo hasta que se aplique otro efecto.
    */
    tunningFilterBright(amount){
        // vuelve al screenshot antes de aplicar el ajuste de filtro
        this.aplyScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBright(amount);
        this.aplicarFiltro(calculator, this.imageData);
    }
    tunningFilterBinary(amount){
        // vuelve al screenshot antes de aplicar el ajuste de filtro
        this.aplyScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBinary(amount);
        this.aplicarFiltro(calculator, this.imageData);
    }
    tunningFilterSatu(amount){
        // vuelve al screenshot antes de aplicar el ajuste de filtro
        this.aplyScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcSatu(amount);
        this.aplicarFiltro(calculator, this.imageData);
    }
    tunningFilterBlur(amount){
        // vuelve al screenshot antes de aplicar el ajuste de filtro
        this.aplyScreenShot();
        // instancia objeto de calculo de filtro
        let calculator = new CalcBlur(amount, this.imageData, this.width, this.heigth);
        this.aplicarFiltro(calculator, this.imageData);
    }

    // APLICAR FILTRO
    aplicarFiltro(calculator, imgDataToProcesess){ 
        let data = imgDataToProcesess.data;
        for (let x = 0; x < this.width; x++)
            for (let y = 0; y < this.heigth; y++) {
               let i = (x + y * this.width) * 4;
                // obtiene el pixel original
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                // aplica el calculo del filtro
                let res = calculator.calcFilter(r,g,b,x,y);
                // pisa el original con el pixel modificado
                data[i]     = res['r'];
                data[i + 1] = res['g'];
                data[i + 2] = res['b'];
            }
        // Mostrar la imagen filtrada en el canvas
        this.ctx.putImageData(imgDataToProcesess, this.posX, this.posY);
    }

}