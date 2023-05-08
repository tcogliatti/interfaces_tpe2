class CalcBW extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity;
    }

    calcFilter(r,g,b){
        let gray = (r + g + b)/3;

        return {'r':gray, 'g':gray, 'b':gray};
    }
}