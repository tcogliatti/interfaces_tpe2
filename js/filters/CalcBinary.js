class CalcBinary extends Operador{
    constructor(intensity){
        super();
        this.base = 100;
        // this.base = 147;
        this.intensity = parseInt(intensity);
        this.umbral = this.base + this.intensity;
        console.log(this.umbral);
    }

    calcFilter(r,g,b){
        let prom = (r + g + b)/3
        let binary;
        if(prom > this.umbral)
            binary = 255;
        else
            binary = 0;
        return {'r':binary, 'g':binary, 'b':binary};
    }
}