class CalcBinary extends Operador{
    constructor(intensity){
        super();
        this.base = 127;
        // this.base = 147;
        this.intensity = parseInt(intensity)*10;
        console.log(this.intensity);
    }

    calcFilter(r,g,b){
        let prom = (r + g + b) / 3;
        let binary;
        if(prom + this.intensity > this.base)
            binary = 255;
        else
            binary = 0;
        return {'r':binary, 'g':binary, 'b':binary};
    }
}