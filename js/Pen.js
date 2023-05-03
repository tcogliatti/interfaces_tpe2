class Pen {
    constructor(posX, posY, fill, ctx, style){
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.style = style;
    }
    moveTo(x, y){
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = x;
        this.posY = y;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.lineWidth = this.style;
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.ClosePath();
    }
    getColor(){
        return this.style;
    }
}