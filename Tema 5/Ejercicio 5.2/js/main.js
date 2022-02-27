import {loadLevel} from './loaders.js';


const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;

loadLevel().
    then( level => {
            level.draw(context, 0);
            // código del ejercicio 6 
        
        
        
        // código del ejercicio 10
        // Añadir el código necesario para desplazar (scroll) el background del nivel 
        // hacia la izquierda. Se puede hacer en una sóla línea
        // Piensa cómo llamar periódicamente al método level.draw y con qué parámetros...
     



    });


