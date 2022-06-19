class example {
    constructor (inf, yo, tu, el, nosotros, vosotros, ustedes) {
        this.inf = inf
        this.yo = yo
        this.tu = tu
        this.el = el
        this.nosotros = nosotros
        this.vosotros = vosotros
        this.ustedes = ustedes
    }
}

export const verbSet = [
    {
        tense: 'Present - Regular',
        info: "Verb endings change depending on who is performing the action.",
        types: [{
            type: 'Regular',
            examples: [{
                ending: '-AR',
                conj: new example('hablar', 'habl-o', 'habl-as', 'habl-a', 'habl-amos', 'habl-áis', 'habl-an')
            },
            {
                ending: '-ER',
                conj: new example('comer', 'com-o', 'com-es', 'com-e', 'com-emos', 'com-éis', 'com-en')
            },
            {
                ending: '-IR',
                conj: new example('vivir', 'viv-o', 'viv-es', 'viv-e', 'viv-imos', 'viv-ís', 'viv-en')
            }]
        }]
    },
    {
        tense: 'Present - Stem-Changing',
        info: "Some verbs change their form. These are known as stem-changing verbs.",
        types: [{
            type: 'Present - Stem-Changing Verbs',
            examples: [{
                ending: '-AR',
                conj: new example('pensar', 'pienso','piensas','piensa','pensaamos','pensáis','piensan')
            },
            {
                ending: '-ER',
                conj: new example('poder', 'puedo','puedes','puede','podemos','podéis','pueden')
            },
            {
                ending: '-IR',
                conj: new example('pedir', 'pido','pides','pide','pedimos','pediís','piden')
            }]
        }]
    },
    {
        tense: 'Present - Irregular',
        info: "Verb endings change depending on who is performing the action.",
        types: [{
            type: 'Irregular',
            examples: [{
                ending: '-AR',
                conj: new example('','','','','','', '')
            },
            {
                ending: '-ER',
                conj: new example('','','','','','', '')
            },
            {
                ending: '-IR',
                conj: new example('','','','','','', '')
            }]
        }]
    },
    {
        tense: 'Preterite - Regular',
        info: 'Preterite tense regular verb endings use the stem of the infinite verb and the endings are the following format:',
        types: [{
            type: 'Regular',
            examples: [{
                ending: '-AR',
                conj: new example('','-é','-aste','-ó','-amos','-asteis', '-aron')
            },
            {
                ending: '-ER & IR',
                conj: new example('','-í','-iste','-ió','imos','isteis', 'ieron')
            }]
        }]
    },
    {
        tense: 'Preterite - Irregular',
        info: 'There are a lot of irregular preterite verbs - they are best learned indiviually. The most common ones are:',
        types: [{
            type: 'Preterite - Irregular',
            examples: [{
                ending: 'Ser',
                conj: new example('','fui','fuiste','fui','fuimos','fuisteis', 'fueron')
            },
            {
                ending: 'Estar',
                conj: new example('','estuve','estuviste','estuvo','estuvimos','estuvisteis', 'estuvieron')
            },
            {
                ending: 'Ir',
                conj: new example('','fui','fuiste','fui','fuimos','fuisteis', 'fueron')
            },
            {
                ending: 'Hacer',
                conj: new example('','hice','hiciste','hizo','hicimos','hicisteis', 'hicieron')
            }]
        }]
    },
]

//  {
//     tense: '',
//     info: '',
//     types: [{
//         type: '',
//         examples: [{
//             ending: '-AR',
//             conj: new example('','','','','','', '')
//         },
//         {
//             ending: '-ER',
//             conj: new example('','','','','','', '')
//         },
//         {
//             ending: '-IR',
//             conj: new example('','','','','','', '')
//         }]
//     }]
// },