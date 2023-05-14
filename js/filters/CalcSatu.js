class CalcSatu extends Operador{
    constructor(intensity){
        super();
        this.intensity = intensity/100;
    }

    calcFilter(r,g,b){
        let Nr;
        let Ng;
        let Nb;
    
        if(r >= g && r >= b){
            Nr = r * (1+ this.intensity) <= 255 ? r * (1+ this.intensity) : 255;
            Ng = g * (1- this.intensity) >= 0   ? g * (1- this.intensity) : 0;
            Nb = b * (1- this.intensity) >= 0   ? b * (1- this.intensity) : 0;
        } else if(g >= r && g >= b){
            Nb = r * (1- this.intensity) >= 0   ? r * (1- this.intensity) : 0;
            Nr = g * (1+ this.intensity) <= 255 ? g * (1+ this.intensity) : 255;
            Nb = b * (1- this.intensity) >= 0   ? b * (1- this.intensity) : 0;
        } else if(b >= r && b >= g){
            Ng = r * (1- this.intensity) >= 0   ? r * (1- this.intensity) : 0;
            Ng = g * (1- this.intensity) >= 0   ? g * (1- this.intensity) : 0;
            Nr = b * (1+ this.intensity) <= 255 ? b * (1+ this.intensity) : 255;
        }
        
        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
}