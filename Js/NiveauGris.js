    function addTab(tab1,tab2){
        if(tab1.largeur != tab2.largeur || tab1.hauteur != tab2.hauteur){
            console.log("tableau de taille différente !");
            return;
        }
        var i; var j;
        var newTab = new NiveauGris(tab1.largeur, tab1.hauteur);
        for(i=0;i<tab1.hauteur;i++){
            for(j=0;j<tab1.largeur;j++){
                newTab.set(i,j ,tab1.get(i,j) + tab2.get(i,j) );
            }
        }
        return newTab;
    }

    function multTab(tab,coeff){
        var i; var j;
        var newTab = new NiveauGris(tab.largeur, tab.hauteur);
        for(i=0;i<tab.hauteur;i++)
            for(j=0;j<tab.largeur;j++)
                newTab.set(i,j, tab.get(i,j) * coeff);
        return newTab;
    }

    function ModuleTab(tab1,tab2){
        var i; var j;
        var newTab = new NiveauGris(tab1.largeur,tab1.hauteur);
        for(i=0;i<tab1.hauteur;i++){
            for(j=0;j<tab1.largeur;j++){
                newTab.set(i,j, Math.sqrt( Math.pow(tab1.get(i,j),2) +
                                         Math.pow(tab2.get(i,j),2)) );
            }
        }
        return newTab;
    }

var NiveauGris=function(largeur,hauteur){
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.tab = new Array(hauteur);
    var i;
    for(i=0;i<hauteur;i++)
        this.tab[i] = new Array(largeur);
    
    this.get = function(x,y){
        return this.tab[x][y];
    }
    this.set = function(x,y,value){
        this.tab[x][y]=value;
    }
    this.copie=function(){
        var i; var j;
        var cop = new NiveauGris(this.largeur, this.hauteur);
        for(i=0;i<this.hauteur;i++){
            for(j=0;j<this.largeur;j++){
                cop.set(i,j,this.get(i,j));
            }
        }
        return cop;
    }
    
    this.toImage=function(){
        var img = new MonImage(this.largeur, this.hauteur);
        var i; var j; var tmp;
        for(i=0;i<this.hauteur;i++){
            for(j=0;j<this.largeur;j++){
                tmp = this.get(i,j);
                if(tmp >255)
                    tmp=255;
                img.tab2D[i][j] = new Couleur(tmp,tmp,tmp);
            }
        }
        return img;
        
    }
    
    this.calcY1=function(y1,i,j,b1,b2,a1,a2){
        var a;
        var b;
        var c;
        if(j-1 < 0){
            a = 0;
            c = 0;
        }
        else{
            a = y1.get(i,j-1);
            c = this.get(i,j-1)
        }
        if(j-2 < 0)
            b = 0;
        else
            b = y1.get(i,j-2);
        return  a1 * this.get(i,j) + a2 * c + b1 * a + b2 * b;
    }
    
    this.calcY2=function(y2,i,j,b1,b2,a3,a4){
        var a;
        var b;
        var c;
        var d;
        if(j + 1 >= this.largeur){
            a= 0;
            c=0
        }
        else{
            a = y2.get(i,j+1);
            c = this.get(i,j+1)
        }
        if(j + 2 >= this.largeur){
            b=0;
            d=0;
        }
        else{
            b=y2.get(i,j+2);
            d=this.get(i,j+2);
        }
        return a3 * c + a4 * d + b1 * a + b2 * b;
    }
    
    this.calc2Y1=function(y1,i,j,b1,b2,a5,a6,tab){
        var a;
        var b;
        var c;
        if(i-1 < 0){
            a = 0;
            c = 0;
        }
        else{
            a = y1.get(i-1,j);
            c = tab.get(i-1,j);
        }
        if(i-2 < 0)
            b = 0;
        else
            b = y1.get(i-2,j);
        return a5 * tab.get(i,j) + a6 * c + b1 * a + b2 * b;
    }
    
    this.calc2Y2=function(y2,i,j,b1,b2,a7,a8,tab){
        var a;
        var b;
        var c;
        var d;
        if(i + 1 >= this.hauteur){
            a= 0;
            c = 0;
        }
        else{
            a = y2.get(i+1,j);
            c = tab.get(i+1,j);
        }
        if(i + 2 >= this.hauteur){
            b=0;
            d = 0;
        }
        else{
            b=y2.get(i+2,j);
            d = tab.get(i+2,j);
        }
        return a7 * c + a8 * d + b1 * a + b2 * b;
    }
    
    this.deriche=function(alpha){
        var i; var j;
        var k=  (Math.pow( 1- Math.exp( -alpha ),2 )) / 
            (1 + 2 / alpha * Math.exp(-alpha) - Math.exp( -2 * alpha));
        var a1 =0;
        var a2 = 1;
        var a3 = -1;
        var a4 = 0;
        var a5 = k;
        var a6 = k * Math.exp( - alpha ) * (alpha -1);
        var a7 = k * Math.exp( - alpha) * (alpha + 1);
        var a8 = -k * Math.exp(-2 * alpha);
        var b1= 2 * Math.exp(-alpha);
        var b2= -Math.exp(-2 * alpha);
        var c1 = -1 * Math.pow( 1-Math.exp(-alpha) ,2);
        var y1= new NiveauGris(this.largeur, this.hauteur);
        var y2=new NiveauGris(this.largeur, this.hauteur);
        var tabTmp = new NiveauGris(this.largeur, this.hauteur);
        var tabTmp2 = new NiveauGris(this.largeur, this.hauteur);
        
        
        /*x'*/
        /* première étape */
        
        for(i=0;i<this.hauteur;i++)
            for(j=0;j<this.largeur;j++)
                y1.set(i,j,this.calcY1(y1,i,j,b1,b2,a1,a2));
        for(i=this.hauteur-1;i>=0;i--)
            for(j=this.largeur-1;j>=0;j--)
                y2.set(i,j,this.calcY2(y2,i,j,b1,b2,a3,a4));
        tabTmp.tab = (multTab( addTab(y1,y2) , c1)).tab;
        /* deuxième étape */
        
        for(i=0;i<this.hauteur;i++)
            for(j=0;j<this.largeur;j++)
                y1.set(i,j,this.calc2Y1(y1,i,j,b1,b2,a5,a6,tabTmp));
        for(i=this.hauteur-1;i>=0;i--)
            for(j=this.largeur-1;j>=0;j--)
                y2.set(i,j,this.calc2Y2(y2,i,j,b1,b2,a7,a8,tabTmp));
        tabTmp.tab = (addTab(y1,y2)).tab;
        
        /*y' */
                /* première étape */

        for(i=0;i<this.hauteur;i++)
            for(j=0;j<this.largeur;j++)
                y1.set(i,j,this.calcY1(y1,i,j,b1,b2,a5,a6));
        for(i=this.hauteur-1;i>=0;i--)
            for(j=this.largeur-1;j>=0;j--)
                y2.set(i,j,this.calcY2(y2,i,j,b1,b2,a7,a8));
        tabTmp2.tab = (addTab(y1,y2)).tab;
        /* deuxième étape */
        
        for(i=0;i<this.hauteur;i++)
            for(j=0;j<this.largeur;j++)
                y1.set(i,j,this.calc2Y1(y1,i,j,b1,b2,a1,a2,tabTmp2));
        for(i=this.hauteur-1;i>=0;i--)
            for(j=this.largeur-1;j>=0;j--)
                y2.set(i,j,this.calc2Y2(y2,i,j,b1,b2,a3,a4,tabTmp2));
        tabTmp2.tab = (multTab(addTab(y1,y2),c1)).tab;

        this.tab = (ModuleTab(tabTmp,tabTmp2)).tab;
        
    }
    
}