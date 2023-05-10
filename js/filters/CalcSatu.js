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
            Nr = r + this.intensity <= 255 ? r + this.intensity : 255;
            Ng = g - this.intensity >= 0 ? g - this.intensity : 0;
            Nb = b - this.intensity >= 0 ? b - this.intensity : 0;;
        } else if(g >= r && g >= b){
            Nr = r - this.intensity >= 0 ? r - this.intensity : 0;;
            Ng = g + this.intensity <= 255 ? g + this.intensity : 255;
            Nb = b - this.intensity >= 0 ? b - this.intensity : 0;;
        } else if(b >= r && b >= g){
            Nr = r - this.intensity >= 0 ? r - this.intensity : 0;;
            Ng = g - this.intensity >= 0 ? g - this.intensity : 0;;
            Nb = b + this.intensity <= 255 ? b + this.intensity : 255;
        }
        // if(r >= g && r >= b){
        //     Nr = r * (1+ this.intensity);
        //     Ng = g * (1- this.intensity);
        //     Nb = b * (1- this.intensity);
        // } else if(g >= r && g >= b){
        //     Nr = r * (1- this.intensity);
        //     Ng = g * (1+ this.intensity);
        //     Nb = b * (1- this.intensity);
        // } else if(b >= r && b >= g){
        //     Nr = r * (1- this.intensity);
        //     Ng = g * (1- this.intensity);
        //     Nb = b * (1+ this.intensity);
        // }
        
        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
}