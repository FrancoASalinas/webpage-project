const img = document.querySelector('.article--carousel--container--img');
const arrowButton = document.querySelectorAll('.arrow');
const dotButton = document.querySelectorAll('.dot');
const wpLink = document.querySelector('.wp--link');
const wpLinkMobile = document.querySelector('.wp--link__mobile');
const barsButton = document.querySelector('.header--button');
const headerMobile = document.querySelector('.header--nav__hidden')


class Carousel{
    constructor(imagen, nombre){
        this.imagen = imagen;
        this.arrayDeRutas = [];
        this.srcActual = imagen.getAttribute('src');
        this.timeoutID = undefined;
        this.nombre = nombre
    }
    crearArrayConNombres(array, n, extension){
        for (let i = 0; i < n; i++){
                array.push(`${this.nombre}${i}${extension}`)
        }
        return array;
    }
    cambiarAtributoFromArray(domTarget, atributo, index, array){
        domTarget.setAttribute(`${atributo}`, `${array[index]}`);
        this.mostrarIndice(dotButton);
        this.animar();
    }
    proximaImagen(array){
        for(let i = 0; i < array.length; i++){
            if(i === array.length -1){
                this.cambiarAtributoFromArray(this.imagen, 'src', 0, array);
                break;
            }
            else if(this.imagen.getAttribute('src') === array[i]){
                this.cambiarAtributoFromArray(this.imagen, 'src', i + 1, array);
                break;
            }
        }
    }
    imagenAnterior(array){
        for(let i = array.length -1; i >= 0; i--){
            if(i === 0){
                this.cambiarAtributoFromArray(this.imagen, 'src', array.length -1, array);
                break;
            }
            else if(this.imagen.getAttribute('src') === array[i]){
                this.cambiarAtributoFromArray(this.imagen, 'src', i - 1, array);
                break;
            }
        }
    }
    setCarousel(){
        this.crearArrayConNombres(this.arrayDeRutas, 4, '.jpg');
        this.mostrarIndice(dotButton);
        this.timeoutID = setInterval(function (){
             carousel.proximaImagen(carousel.arrayDeRutas);
            }, 5000);
        
    }
    clearInterval(){
        clearInterval(this.timeoutID)
    }
    cambiarImagen(button){
        let value = button.getAttribute('value');

        this.clearInterval()

        if(value === 'right'){
            this.proximaImagen(this.arrayDeRutas)
        } else if (value === 'left') {
            this.imagenAnterior(this.arrayDeRutas)
        } else if (typeof parseFloat(value) === 'number'){
            this.cambiarAtributoFromArray(this.imagen, 'src',`${value}`, this.arrayDeRutas)
        }
        this.timeoutID = setInterval(function (){
            carousel.proximaImagen(carousel.arrayDeRutas);
           }, 10000)
    }
    animar(){
        this.imagen.style.animation = '.5s linear fade';
        setTimeout(()=>{this.imagen.style.animation = ''},500)
    }
    mostrarIndice(boton){
        boton.forEach(button => {
            let value = parseFloat(button.getAttribute('value'))
            if (this.arrayDeRutas[value] === this.imagen.getAttribute(`src`)){
                button.style.backgroundColor = '#fff'
            } else {
                button.style.backgroundColor = '#3F4A3C'
            }
        })
    }
}

const carousel = new Carousel(img, 'images/carousel');
carousel.setCarousel();

arrowButton.forEach( arrow => {
    arrow.addEventListener('click', ()=>{
        carousel.cambiarImagen(arrow);
    })
}
)

dotButton.forEach(dot => {
    dot.addEventListener('click', () => {
        carousel.cambiarImagen(dot);
    })
})

wpLink.addEventListener('click', ()=>{
    navigator.clipboard.writeText(wpLink.getAttribute('value'));
    alert("número de telefono" + wpLink.getAttribute('value') + ' copiado');
})

wpLinkMobile.addEventListener('click', ()=>{
    navigator.clipboard.writeText(wpLink.getAttribute('value'));
    alert("número de telefono" + wpLink.getAttribute('value') + ' copiado');
})

barsButton.addEventListener('click', ()=>{
   if(headerMobile.style.display !== 'flex'){
    headerMobile.style.display = 'flex';
    headerMobile.style.animation = 'menu 1s linear'
   } else {
    headerMobile.style.display = 'none';
    headerMobile.style.animation = 'menu-reverse 1s linear'
   }
})




