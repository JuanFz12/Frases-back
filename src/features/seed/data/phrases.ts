import { Phrase } from "src/features/phrases/entities/phrase.entity";

export const phrases: Omit<Phrase, 'id' | 'updatedAt'>[] = [
    { text: "La vida es un conjunto de pequeñas decisiones que forman nuestro destino.", color: "#FF5733" },
    { text: "Cada día es una nueva oportunidad para aprender algo que nos haga crecer.", color: "#33FF57" },
    { text: "El éxito no es la clave de la felicidad, la felicidad es la clave del éxito.", color: "#3357FF" },
    { text: "No esperes el momento perfecto, toma el momento y hazlo perfecto.", color: "#FF33A8" },
    { text: "Los desafíos son lo que hacen la vida interesante y superarlos es lo que le da sentido.", color: "#33FFF5" },
    { text: "La creatividad es la inteligencia divirtiéndose, nunca dejes de explorar nuevas ideas.", color: "#F5FF33" },
    { text: "El verdadero aprendizaje ocurre cuando nos atrevemos a salir de nuestra zona de confort.", color: "#FF8C33" },
    { text: "Cada error es una lección disfrazada de experiencia invaluable.", color: "#8C33FF" },
    { text: "La paciencia y la perseverancia tienen un efecto mágico ante los problemas más difíciles.", color: "#33FF8C" },
    { text: "Nunca subestimes el poder de una sonrisa y una palabra amable.", color: "#FF3380" },
    { text: "La vida no se trata de encontrarte a ti mismo, sino de crearte a ti mismo.", color: "#3380FF" },
    { text: "El tiempo es limitado, no lo malgastes viviendo la vida de otros.", color: "#80FF33" },
    { text: "El cambio es inevitable, pero el crecimiento es opcional, elige crecer.", color: "#FFB533" },
    { text: "La gratitud convierte lo que tenemos en suficiente y más.", color: "#B533FF" },
    { text: "No busques la felicidad en el exterior, encuentra la paz dentro de ti.", color: "#33FFB5" },
    { text: "Cada día trae nuevas oportunidades para acercarnos a nuestros sueños.", color: "#FF3333" },
    { text: "Las pequeñas acciones realizadas consistentemente producen grandes resultados.", color: "#33FF33" },
    { text: "Escucha más de lo que hablas, aprenderás más de lo que imaginas.", color: "#3333FF" },
    { text: "La confianza en uno mismo es el primer secreto del éxito.", color: "#FF33FF" },
    { text: "El amor y la compasión son necesidades, no lujos, cuida de ellos cada día.", color: "#33FFFF" },
];