class CalcBright extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity;
    }

    calcFilter(r,g,b){
        let Nr = r + this.intensity;
        let Ng = g + this.intensity;
        let Nb = b + this.intensity;
        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
}