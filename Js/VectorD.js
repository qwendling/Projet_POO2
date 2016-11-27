var VectorD=function(){
  this.TabPoint=new Array();
  this.add=function(p){
    this.TabPoint.push(p);
  }
  this.del=function(){
    this.TabPoint.pop();
  }
  this.debut=function(){
    return this.TabPoint[0];
  }
  this.fin=function(){
    return this.TabPoint[this.TabPoint.length - 1];
  }
  this.beginVect=function(p,img){
    this.add(p);
    img.tab2D[p.y][p.x];
    if(p.x+1 < img.largeur && img.tab2D[p.y][p.x+1]==255){
      this.continueVect(img,1,0);
      return;
    }
    if(p.x+1 < img.largeur && p.y+1 < img.hauteur && img.tab2D[p.y+1][p.x+1]==255){
      this.continueVect(img,1,1);
      return;
    }
    if(p.y+1 < img.hauteur && img.tab2D[p.y+1][p.x]==255){
      this.continueVect(img,0,1);
      return;
    }
    if(p.x-1 >= 0 && p.y+1 < img.hauteur &&img.tab2D[p.y+1][p.x-1]==255){
      this.continueVect(img,-1,1);
    }
  }
  this.continueVect=function(img,dx,dy){
    var p=this.fin();
    if(p.x+dx >=0 && p.x+dx < img.largeur && p.y+dy < img.hauteur && img.tab2D[p.y+dy][p.x+dx]==255){
      this.add(new Point(p.x+dx,p.y+dy));
      img.tab2D[p.y+dy][p.x+dx]=0;
      this.continueVect(img,dx,dy);
    }
  }
  this.draw=function(context){
    context.beginPath();
    context.moveTo(this.debut().x,this.debut().y);
    context.lineTo(this.fin().x,this.fin().y);
    context.stroke();
  }
}
