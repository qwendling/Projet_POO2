var UI = function(){
    
    this.btnSobel = document.getElementById("Filter");
    this.valVecto = document.getElementById("PrecVect");
    this.btnVect = document.getElementById("InputVect");
    this.valSeuil = document.getElementById("ValueSeuil");
    this.minusSeuil = document.getElementById("MinusSeuil");
    this.plusSeuil = document.getElementById("PlusSeuil");
    this.sliderSeuil = document.getElementById("SliderSeuil");
    this.btnSobel.style.visibility = "hidden";
    this.valVecto.style.visibility = "hidden";
    this.btnVect.style.visibility = "hidden";
    this.valSeuil.style.visibility = "hidden";
    this.minusSeuil.style.visibility = "hidden";
    this.plusSeuil.style.visibility = "hidden";
    this.sliderSeuil.style.visibility = "hidden";
    
    this.afterGo= function(){
        this.btnSobel.style.visibility = "visible";
        this.minusSeuil.style.visibility = "visible";
        this.plusSeuil.style.visibility = "visible";
        this.sliderSeuil.style.visibility = "visible";
        this.valSeuil.style.visibility = "visible";
    }
    
    this.afterFiltre= function(){
        this.valVecto.style.visibility = "visible";
        this.btnVect.style.visibility = "visible";
    }
}