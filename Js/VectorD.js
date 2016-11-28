var VectorD=function(){
  this.TabPoint=new Array();
  this.add=function(p){
    this.TabPoint.push(p);
  }
  this.del=function(){
    this.TabPoint.pop();
  }
  this.get=function(i){
    return this.TabPoint[i];
  }
  this.debut=function(){
    return this.TabPoint[0];
  }
  this.length=function(){
    return this.TabPoint.length;
  }
  this.fin=function(){
    return this.TabPoint[this.TabPoint.length - 1];
  }
  this.beginVect=function(p,img){
    this.add(p);
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

  this.estDiscret=function(precision){
    var p1=this.debut();
    var p2=this.fin();
    if(p1.x == p2.x && p1.y == p2.y){
      return true;
    }
    if(p1.x == p2.x){
      for(var i=0;i<this.length;i++){
        if(Math.abs(p1.x - this.get(i).x)>precision)
          return false;
      }
      return true;
    }
    if(p1.y == p2.y){
      for(var i=0;i<this.length;i++){
        if(Math.abs(p1.y - this.get(i).y)>precision)
          return false;
      }
      return true;
    }
    var a=(p2.y-p1.y)/(p2.x-p2.y);
    var b=p1.y - a*p1.x;
    var xdiff,ydiff;
    for(var i=1;i<this.length-1;i++){
      xdiff=this.get(i).x - (this.get(i).y-b)/a;
      ydiff=this.get(i).y - (a*this.get(i).x+b);
      if(xdiff*xdiff + ydiff*ydiff > precision*precision)
        return false;
      }
      return true;
    }
  }
