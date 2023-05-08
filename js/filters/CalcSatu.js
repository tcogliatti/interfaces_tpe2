class CalcSatu extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity;
    }

    calcFilter(r,g,b){
        let Nr;
        let Ng;
        let Nb;
        if(r >= g && r >= b){
            Nr = r * (1+ this.intensity);
            Ng = g * (1- this.intensity);
            Nb = b * (1- this.intensity);
        } else if(g >= r && g >= b){
            Nr = r * (1- this.intensity);
            Ng = g * (1+ this.intensity);
            Nb = b * (1- this.intensity);
        } else if(b >= r && b >= g){
            Nr = r * (1- this.intensity);
            Ng = g * (1- this.intensity);
            Nb = b * (1+ this.intensity);
        }
        
        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
}