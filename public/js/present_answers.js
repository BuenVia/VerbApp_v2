// Answers
class ansSet {
    constructor(answer, correct) {
        this.answer = answer,
        this.correct = correct
    }
}

export const answers = {
    sectOne : {
        one: new ansSet("tener", null),
        two: new ansSet("querer", null),
        three: new ansSet("vivir", null),
        four: new ansSet("cantar", null),
        five: new ansSet("escribir", null),
        six: new ansSet("pensar", null)
    },
    sectTwo : {
        one: new ansSet("visito", null),
        two: new ansSet("visitas", null),
        three: new ansSet("visita", null),
        four: new ansSet("visitamos", null),
        five: new ansSet("visitáis", null),
        six: new ansSet("visitan", null)
    },
    sectThree : {
        one: new ansSet("bebo", null),
        two: new ansSet("bebes", null),
        three: new ansSet("bebe", null),
        four: new ansSet("bebe", null),
        five: new ansSet("bebemos", null),
        six: new ansSet("bebéis", null),
        seven: new ansSet("beben", null),
        eight: new ansSet("beben", null)
    },
    sectFour : {
        one: new ansSet('escriben', null),
        two: new ansSet('escribes', null),
        three: new ansSet('escribo', null),
        four: new ansSet('escribe', null)
    },
    sectFive : {
        one: new ansSet("Como pollo todos los días", null),
        two: new ansSet("Vengo aqui desde hace cuatro años", null),
        three: new ansSet("Esperamos desde hace una hora", null)
    },
    sectSix : {
        one: new ansSet("I can help your grandmother", null),
        two: new ansSet("We want to go shopping", null),
        three: new ansSet("The car costs a thousand pounds", null),
        four: new ansSet("Classes start at eight o'clock", null),
        five: new ansSet("I wake up at seven o'clock", null),
        six: new ansSet("We go to bed at ten o'clock", null)
    },
    sectSeven : {
        one: new ansSet("Yo pienso que él tiene un perro", null),
        two: new ansSet("Almuerzo a las once", null),
        three: new ansSet("Me duelen los dedos", null),
        four: new ansSet("Jugamos al baloncesto", null),
        five: new ansSet("No duermo bien cuando llueve", null)
    },
    sectEight : {
        one: new ansSet('sé', null),
        two: new ansSet('van', null),
        three: new ansSet('da', null),
        four: new ansSet('voy', null),
        five: new ansSet('sabe', null),
        six: new ansSet('doy', null)
    },
    sectNine : {
        one: new ansSet("Sé que tiene una hermana", null),
        two: new ansSet("Cuanda va al parque, juega al fútbol", null),
        three: new ansSet("Prefiero hacer mis debers en seguida", null)
    }
}
