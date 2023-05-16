class CalcSatu extends Operador{
    constructor(intensity){
        super();
        this.intensity = parseInt(intensity)/100;
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
            Nr = r * (1- this.intensity) >= 0   ? r * (1- this.intensity) : 0;
            Ng = g * (1+ this.intensity) <= 255 ? g * (1+ this.intensity) : 255;
            Nb = b * (1- this.intensity) >= 0   ? b * (1- this.intensity) : 0;
        } else if(b >= r && b >= g){
            Nr = r * (1- this.intensity) >= 0   ? r * (1- this.intensity) : 0;
            Ng = g * (1- this.intensity) >= 0   ? g * (1- this.intensity) : 0;
            Nb = b * (1+ this.intensity) <= 255 ? b * (1+ this.intensity) : 255;
        }
        // if(r >= g && r >= b){
        //     Nr = r * (1+ this.intensity) <= 255 ? r * (1+ this.intensity) : 255;
        //     Ng = g * (1- this.intensity) >= 0   ? g * (1- this.intensity) : 0;
        //     Nb = b * (1- this.intensity) >= 0   ? b * (1- this.intensity) : 0;
        // } else if(g >= r && g >= b){
        //     Nr = r * (1- this.intensity) >= 0   ? r * (1- this.intensity) : 0;
        //     Ng = g * (1+ this.intensity) <= 255 ? g * (1+ this.intensity) : 255;
        //     Nb = b * (1- this.intensity) >= 0   ? b * (1- this.intensity) : 0;
        // } else if(b >= r && b >= g){
        //     Nr = r * (1- this.intensity) >= 0   ? r * (1- this.intensity) : 0;
        //     Ng = g * (1- this.intensity) >= 0   ? g * (1- this.intensity) : 0;
        //     Nb = b * (1+ this.intensity) <= 255 ? b * (1+ this.intensity) : 255;
        // }

        // Calcular la saturación a aplicar (entre -100 y 100)
        // const this.intensity = 50;

        // // Convertir la saturación a un factor (entre 0 y 2)
        // let factor = (259 * (this.intensity + 255)) / (255 * (259 - this.intensity));

        // // Convertir el color RGB a HSL
        // let hsl = this.rgbToHsl(r, g, b);

        // // Aplicar la saturación y volver a convertir a RGB
        // let newRgb = this.hslToRgb(hsl.h, factor * hsl.s, hsl.l);

        // // Asignar los nuevos valores RGB al píxel
        // return {'r':newRgb.r, 'g':newRgb.g, 'b':newRgb.b};


        return {'r':Nr, 'g':Ng, 'b':Nb};
    }
    // rgbToHsl(r, g, b) {
    //     r /= 255, g /= 255, b /= 255;
      
    //     let max = Math.max(r, g, b), min = Math.min(r, g, b);
    //     let h, s, l = (max + min) / 2;
      
    //     if (max == min) {
    //       h = s = 0;
    //     } else {
    //       let d = max - min;
    //       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    //       switch (max) {
    //         case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    //         case g: h = (b - r) / d + 2; break;
    //         case b: h = (r - g) / d + 4; break;
    //       }
    //       h /= 6;
    //     }
      
    //     return [h, s, l];
    //   }
    //   hslToRgb(h, s, l) {
    //     let r, g, b;
      
    //     if (s === 0) {
    //       r = g = b = l; // achromatic
    //     } else {
    //       const hue2rgb = (p, q, t) => {
    //         if (t < 0) t += 1;
    //         if (t > 1) t -= 1;
    //         if (t < 1 / 6) return p + (q - p) * 6 * t;
    //         if (t < 1 / 2) return q;
    //         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    //         return p;
    //       };
    //       const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    //       const p = 2 * l - q;
    //       r = hue2rgb(p, q, h + 1 / 3);
    //       g = hue2rgb(p, q, h);
    //       b = hue2rgb(p, q, h - 1 / 3);
    //     }
      
    //     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    //   }
}