class CalcBorder extends Operador{
    constructor (imgDat, width, heigth){
        super();
        console.log('border detection');
        this.imgDat = imgDat;
        this.heigth = heigth;
        this.width = width;
        this.kernelX =  [[-1, 0, 1],
                         [-2, 0, 2],
                         [-1, 0, 1]];
        this.kernelY =  [[-1, -2, -1],
                         [0,   0,  0],
                         [1,   2,  1]];

    }

    calcFilter(r,g,b,x,y){
        let magX = 0;
        let magY = 0;
        for (let a = 0; a < 3; a++) {
            for (let b = 0; b < 3; b++) {
                let xn = x + a;
                let yn = y + b;

                let intensity = (this.imgDat.data[((xn + yn * this.width) * 4)] +
                                 this.imgDat.data[((xn + yn * this.width) * 4)  + 1] +
                                 this.imgDat.data[((xn + yn * this.width) * 4)  + 2]) / 3;

                magX += intensity * this.kernelX[a][b];
                magY += intensity * this.kernelY[a][b];
            }
        }
        let colour = parseInt(Math.sqrt((magX * magX) + (magY * magY)));
        return {
            'r': colour,
            'g': colour,
            'b': colour
        };
    }
}
