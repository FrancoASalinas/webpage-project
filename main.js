const img = document.querySelector('.article--carousel--container--img');
const arrowButton = document.querySelectorAll('.arrow');
const dotButton = document.querySelectorAll('.dot')


class Carousel{
    constructor(imagen, arrayDeRutas){
        this.imagen = imagen;
        this.arrayDeRutas = [];
        this.srcActual = imagen.getAttribute('src');
        this.timeoutID = undefined;
    }
    crearArrayConNombres(array, n, nombre, extension){
        for (let i = 0; i < n; i++){
                array.push(`${nombre}${i}${extension}`)
        }
        return array
    }
    cambiarAtributoFromArray(domTarget, atributo, index, array){
        domTarget.setAttribute(`${atributo}`, `${array[index]}`)
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
                console.log('1');
                break;
            }
            else if(this.imagen.getAttribute('src') === array[i]){
                this.cambiarAtributoFromArray(this.imagen, 'src', i - 1, array);
                console.log('2');
                break;
            }
        }
    }
    setCarousel(){
        this.crearArrayConNombres(this.arrayDeRutas, 4, 'images/carousel', '.jpg' || '.jpeg');
        this.timeoutID = setInterval(function (){
             carousel.proximaImagen(carousel.arrayDeRutas);
            }, 5000)
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
            console.log(value)
        }
    }

}

const carousel = new Carousel(img);
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


