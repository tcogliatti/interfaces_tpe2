class CalcBlur extends Operador{
    constructor(intensity, imgDat, width, heigth){
        super();
        this.intensity = parseInt(intensity);
        this.imgDat = imgDat;
        this.heigth = heigth;
        this.width = width;
    }

    calcFilter(r,g,b,x,y){
        let sum = {'r':0, 'g':0, 'b':0};
        let count = 0;

        // primeras filas
        if(y < this.intensity){
            for(let iy = 0; iy < (y+this.intensity); iy++){
                let res = this.xIterations(x, iy, sum, count, this.intensity);
                sum = res['sum'];
                count = res['count'];
            }
        }
        // ultimas filas
        else if(this.heigth-1-y < this.intensity ){
            for(let iy = y-this.intensity; iy <= (this.heigth-1); iy++){
                let res = this.xIterations(x, iy, sum, count, this.intensity);
                sum = res['sum'];
                count = res['count'];
            }
        }
        // filas del medio
        else{
            for(let iy = y-this.intensity; iy < (y+this.intensity); iy++){
                let res = this.xIterations(x, iy, sum, count, this.intensity);
                sum = res['sum'];
                count = res['count'];
            }
        }
        return {
            'r': sum['r'] / count,
            'g': sum['g'] / count,
            'b': sum['b'] / count
        };
    }
    xIterations(x, iy, sum, count){
            // primeras columnas
            if(x < this.intensity)
                for(let ix = 0; ix <= (x+this.intensity); ix++){
                    sum = this.sumPixel(ix, iy, sum);
                    count++;
                }
            // ultimas columnas
            else if(this.width-1-x < this.intensity)
                for(let ix = x-this.intensity; ix <= (this.width-1); ix++){
                    sum = this.sumPixel(ix, iy, sum);
                    count++;
                }
            // columnas del medio
            else
                for(let ix = x-this.intensity; ix < x+this.intensity; ix++){
                    sum = this.sumPixel(ix, iy, sum);
                    count++;
                }

        return {'sum': sum, 'count': count};
    }
    sumPixel(x, y, sum){
        let data = this.imgDat.data;  
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