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
    }

    draw(){

        // espera a que cargue la imagen y ejecuta el codigo
        this.img.onload = () => {
            let imgWidth = this.img.naturalWidth;
            let imgHeigth = this.img.naturalHeight;
            console.log(this.canvasWidth, this.canvasHeight);
            console.log(imgWidth, imgHeigth);

            if(imgWidth > imgHeigth){
                // resize
                this.width = this.canvasWidth;
                this.heigth =  Math.ceil(this.canvasHeight * this.width / this.canvasWidth);
                // this.heigth =  Math.ceil(this.canvasHeight * imgHeigth / imgWidth);
                console.log('resized',this.width,this.heigth);
                // re-posicionar
                this.posX = 0;
                this.posY = (this.canvasHeight - this.heigth)/2;
            } else {
                // resize
                this.width = Math.ceil(this.canvasWidth * this.heigth / this.canvasHeight);
                this.heigth = this.canvasHeight;
                // re-posicionar
                this.posX = (this.canvasHeight - this.width)/2;
                this.posY = 0;
            }
            
            // Dibujar la imagen en el canvas
            this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.heigth);
            
            // obtener los datos de la imagen
            this.imageData = this.ctx.getImageData(this.posX, this.posY, this.width, this.heigth);

            // guardo un BK de imageData
            this.bk = new ImageData(this.width, this.heigth);
            this.bk.data.set(this.imageData.data);
        };
    }

    clear(){
        // recuperamos el bk de la imagen
        this.imageData = new ImageData(this.width, this.heigth);
        this.imageData.data.set(this.bk.data);
        // redibujamos la imagen        
        this.ctx.putImageData(this.imageData, this.posX, this.posY);
    }

    ///////////////////////////////// FILTROS
    filterSepia(amount){
        // instancia objeto de calculo de filtro
        let calculator = new CalcSepia(amount);
        this.aplicarFiltro(calculator);
    }
    filterBW(amount){
        // instancia objeto de calculo de filtro
        let calculator = new CalcBW(amount);
        this.aplicarFiltro(calculator);
    }
    filterInvert(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcInvert(0.0);
        this.aplicarFiltro(calculator);
    }
    filterBright(amount){
        // instancia objeto de calculo de filtro
        let calculator = new CalcBright(amount);
        this.aplicarFiltro(calculator);
    }
    filterBinary(amount){
        // instancia objeto de calculo de filtro
        console.log(amount,(147) + (amount-50/2.5));
        let calculator = new CalcBinary(amount);
        this.aplicarFiltro(calculator);
    }
    filterSatu(amount){
        // instancia objeto de calculo de filtro
        let calculator = new CalcSatu(amount);
        this.aplicarFiltro(calculator);
    }
    filterBlur(amount){
        // instancia objeto de calculo de filtro
        let calculator = new CalcBlur(amount, this.imageData, this.width, this.heigth);
        this.aplicarFiltro(calculator);
    }
    aplicarFiltro(calculator){
        this.clear();

        let data = this.imageData.data;
        for (let x = 0; x < this.width; x++)
            for (let y = 0; y < this.heigth; y++) {
               let i = (x + y * this.width) * 4;

                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];
                // obtener valor del 
                let res = calculator.calcFilter(r,g,b,x,y);

                // aplicar al pixel el nuevo valor
                data[i]     = res['r'];
                data[i + 1] = res['g'];
                data[i + 2] = res['b'];
            }

        // Mostrar la imagen filtrada en el canvas
        this.ctx.putImageData(this.imageData, this.posX, this.posY);
    }
}