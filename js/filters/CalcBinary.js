class CalcBinary extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity;
    }

    calcFilter(r,g,b){
        let prom = (r + g + b)/3
        let binary;
        if(prom > this.intensity)
            binary = 255;
        else
            binary = 0;
        return {'r':binary, 'g':binary, 'b':binary};
    }
}