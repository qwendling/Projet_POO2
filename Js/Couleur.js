var Couleur=function(r=0,g=0,b=0,opac=255){
	this.r=r;
	this.g=g;
	this.b=b;
	this.opac=opac;

	this.toString=function(){
		var buffer="("+this.r+","+this.g+","+this.b+","+this.opac+")";
		return buffer;
	}

	this.copie=function(){
		return new Couleur(this.r,this.g,this.b,this.opac);
	}

	this.coef=function(k){
		if(k*this.r>255)
			this.r=255;
		else if(k*this.r<0)
			this.r=0;
		else
			this.r=this.r*k;

		if(k*this.g>255)
			this.g=255;
		else if(k*this.g<0)
			this.g=0;
		else
			this.g=this.g*k;

		if(k*this.b>255)
			this.b=255;
		else if(k*this.b<0)
			this.b=0;
		else
			this.b=this.b*k;

	}

	this.intensite=function(){
		return (this.r+this.g+this.b)/3.;
	}

	this.niveauGris=function(){
		var i=this.intensite();
		this.r=parseInt(i);
		this.g=parseInt(i);
		this.b=parseInt(i);
	}

	this.seuil=function(s){
		var i=this.intensite();
		if(i<=s){
			this.r=0;
			this.g=0;
			this.b=0;
		}
		else{
			this.r=255;
			this.g=255;
			this.b=255;
		}
	}

	this.negate=function(){
		this.r=255-this.r;
		this.g=255-this.g;
		this.b=255-this.b;
	}

	this.memeCouleur=function(c){
		return this.r==c.r && this.g==c.g && this.b==c.b;
	}

	this.permuteComposante=function(c1,c2){
		var tmp=this[c1];
		this[c1]=this[c2];
		this[c2]=tmp;
	}

	this.ajouteCouleurPonderee=function(co,k){
		var c=new Couleur(co.r,co.g,co.b);
		c.coef(k);
		if((this.r+c.r)>255)
			this.r=255;
		else
			this.r+=c.r;
		if((this.g+c.g)>255)
			this.g=255;
		else
			this.g+=c.g;
		if((this.b+c.b)>255)
			this.b=255;
		else
			this.b+=c.b;


	}
}
