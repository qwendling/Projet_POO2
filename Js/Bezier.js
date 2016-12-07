var Bezier=function(){
  this.TabPoint;

  this.fromSetup=function(S){
    var Mcoord=new Matrix(2,S.length+1);
    Mcoord.set(0,0,S.debut().x);
    Mcoord.set(0,1,S.debut().y);
    for(var i=0;i<S.length;i++){
      Mcoord.set(i,0,S.get(i).end().x);
      Mcoord.set(i,1,S.get(i).end().y);
    }
    this.TabPoint=Mcoord.Bezier();
  }

  this.drawsvg=function(svg){
    var tmp=document.createElementNS('http://www.w3.org/2000/svg',"path");
    tmp.setAttribute('d',"M"+(this.TabPoint[0].x)+","+(this.TabPoint[0].y)+" C"
                            +(this.TabPoint[1].x)+","+(this.TabPoint[1].y)+" "
                            +(this.TabPoint[2].x)+","+(this.TabPoint[2].y)+" "
                            +(this.TabPoint[3].x)+","+(this.TabPoint[3].y));
    svg.appendChild(tmp);
  }
}
