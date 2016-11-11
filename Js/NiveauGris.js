var NiveauGris=function(largeur,hauteur){
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.tab = new Array(hauteur);
    for(i=0;i<hauteur;i++)
        this.tab[i] = new Array(largeur);
    
    this.get = function(x,y){
        return this.tab[x][y];
    }
    this.set = function(x,y,value){
        this.tab[i][j]=value;
    }
    
    this.copie=function(){
        var cop = new NiveauGris(this.largeur, this.hauteur);
        for(i=0;i<this.hauteur;i++){
            for(j=0;j<this.largeur;j++){
                cop.set(i,j,this.get(i,j));
            }
        }
        return cop;
    }
    
    this.calcY1(i,j,b1,b2){
        if(i<0 || j<0 )
            return 0;
        else 
            return this.get(x,y-1) + b1 * this.calcY1(i,j-1,b1,b2)
            + this.calcY1(i,j-2,b1,b2);
    }
    
    this.deriche=function(alpha){
        this.niveauGris();
        var k=  (math.pow( 1- Math.exp( -alpha ),2 )) / 
            (1 + 2 / alpha * Math.exp(-alpha) - Math.exp( -2 * alpha));
        var b1= 2 * Math.exp(-alpha);
        var b2= -Math.exp(-2 * alpha);
        var y1=this.copie();
        var y2=this.copie();
        
        /* première étape */
        
        for(i=0;i<this.hauteur;i++)
            for(j=0;j<this.largeur;j++)
                y1.set(i,j,this.calcY1(i,j,b1,b2));
        for(i=hauteur-1;i>=0;i--)
            for(j=largeur-1;j>=0;j--)
                y2.set(i,j,this.calcY2());
    
}