class CalcSepia extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity;
    }

    calcFilter(r,g,b){
        let Nr = 0.393 * r + 0.769 * g + 0.189 * b;
        let Ng = 0.349 * r + 0.686 * g + 0.168 * b;
        let Nb = 0.272 * r + 0.534 * g + 0.131 * b;

        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
}