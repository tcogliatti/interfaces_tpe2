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

            if(imgWidth > imgHeigth){
                // resize
                this.width = this.canvasWidth;
                this.heigth =  Math.ceil(this.canvasHeight * imgHeigth / imgWidth);
                // re-posicionar
                this.posX = 0;
                this.posY = (this.canvasHeight - this.heigth)/2;
            } else {
                // resize
                this.width = Math.ceil(this.canvasWidth * imgWidth / imgHeigth);
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
    filterSepia(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcSepia(0.2);
        this.aplicarFiltro(calculator);
    }
    filterBW(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcBW(0.2);
        this.aplicarFiltro(calculator);
    }
    filterInvert(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcInvert(0.2);
        this.aplicarFiltro(calculator);
    }
    filterBright(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcBright(30);
        this.aplicarFiltro(calculator);
    }
    filterBinary(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcBinary(147);
        this.aplicarFiltro(calculator);
    }
    filterBorder(){
        this.clear();
        let cant = 30;

    }
    filterSatu(){
        // instancia objeto de calculo de filtro
        let calculator = new CalcSatu(0.1);
        this.aplicarFiltro(calculator);
    }
    aplicarFiltro(calculator){
        this.clear();

        let data = this.imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            // obtener valor del 
            let res = calculator.calcFilter(r,g,b);

            // aplicar al pixel el nuevo valor
            data[i]     = res['r'];
            data[i + 1] = res['g'];
            data[i + 2] = res['b'];
            }

        // Mostrar la imagen filtrada en el canvas
        this.ctx.putImageData(this.imageData, this.posX, this.posY);
    }

    ///////////////////////////////// BLUR
    filterBlur(){
        this.clear(); 

        let ratio = 2;
        let data = this.imageData.data;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.heigth; y++) {
               let prom = this.getMatrixProm(ratio, x, y);
               let i = (x + y * this.width) * 4;
               data[i]     = prom['r'];
               data[i + 1] = prom['g'];
               data[i + 2] = prom['b'];
            }
        }

        // Mostrar la imagen filtrada en el canvas
        this.ctx.putImageData(this.imageData, this.posX, this.posY);
    }
    getMatrixProm(ratio, x, y){
        let sum = {'r':0, 'g':0, 'b':0};
        let count = 0;

        // primeras filas
        if(y < ratio){
            // console.log('primeras filas', y, ratio);
            for(let iy = 0; iy < (y+ratio); iy++){
                let res = this.xIterations(x, iy, sum, count, ratio);
                sum = res['sum'];
                count = res['count'];
            }
        }
        // ultimas filas
        else if(this.heigth-1-y < ratio ){
            // console.log('ultimas filas', y, this.heigth,'desde',y-ratio,'hasta',(y+(this.heigth-1-y)));
            for(let iy = y-ratio; iy <= (this.heigth-1); iy++){
                let res = this.xIterations(x, iy, sum, count, ratio);
                sum = res['sum'];
                count = res['count'];
                // console.log(iy);
            }
        }
        // filas del medio
        else{
            // console.log(' filas del medio');
            // console.log('centro',y,'desde', y-(ratio+1), 'hasta', (y+(ratio+1)));
            for(let iy = y-ratio; iy < (y+ratio); iy++){
                let res = this.xIterations(x, iy, sum, count, ratio);
                sum = res['sum'];
                count = res['count'];
                // console.log(iy);

            }
        }
        return {
            'r': sum['r'] / count,
            'g': sum['g'] / count,
            'b': sum['b'] / count
        };
    }
    xIterations(x, iy, sum, count, ratio){
            // primeras columnas
            if(x < ratio)
                for(let ix = 0; ix <= (x+ratio); ix++){
                    sum = this.sumPixel(ix, iy, sum);
                    count++;
                }
            // ultimas columnas
            else if(this.width-1-x < ratio)
                for(let ix = x-ratio; ix <= (this.width-1); ix++){
                    sum = this.sumPixel(ix, iy, sum);
                    count++;
                }
            // columnas del medio
            else
                for(let ix = x-ratio; ix < x+ratio; ix++){
                    sum = this.sumPixel(ix, iy, sum);
                    count++;
                }

        return {'sum': sum, 'count': count};
    }
    sumPixel(x, y, sum){
        let data = this.imageData.data;  // obtenemos la informacion del backup asi no tenemos datos de input distorcionados
        let index = (x + y * this.width) * 4;
        let r = data[index + 0];
        let g = data[index + 1];
        let b = data[index + 2];
        sum['r'] += r;
        sum['g'] += g;
        sum['b'] += b;
        return sum;
    }
}