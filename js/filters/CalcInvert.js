class CalcInvert extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity;
    }

    calcFilter(r,g,b){
        let Nr = 255 - r;
        let Ng = 255 - g;
        let Nb = 255 - b;
        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
}