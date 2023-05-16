class CalcBinary extends Operador{
    constructor(intensity){
        super();
        this.base = 140;
        // this.base = 147;
        this.intensity = parseInt(intensity)-25;
        console.log(this.intensity);
    }

    calcFilter(r,g,b){
        let prom = (r + g + b) / 3;
        let binary;
        if(prom > (this.base + this.intensity))
            binary = 255;
        else
            binary = 0;
        return {'r':binary, 'g':binary, 'b':binary};
    }
}