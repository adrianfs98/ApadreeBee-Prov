const app = new Vue({
    data: {
        titulo: 'hello world',
        blocks: [
            'Traditional',
            'Mobile',
            'Reactive'
        ],
        frutas: [{
                nombre: 'platano',
                cantidad: 5
            },
            {
                nombre: 'pera',
                cantidad: 0
            },
            {
                nombre: 'naranja',
                cantidad: 3
            }
        ],
        typed_text: '',
        fondo: 'bg-warning',
        color: false
    },
    methods: {
        addFruit() {
            this.frutas.push({
                nombre: this.typed_text,
                cantidad: 0
            })
            this.typed_text = ''
            axios.get('/users')
                .then(res => {
                    console.log(res.data)
                })
        },
        getUsersFromDb: async function () {
            //This code connect with local api made with express node js
            let users = await axios.get('/users')
            console.log(users.data);
        }
    },
    computed: {
        //?las computed se ejecutan cada vez que alguna de sus dependecias se actualice(como por ejemplo aqui que estamos usando la cantidad de las frutas, su acutalizamos alguna cantidad este metodo se vuelve a ejecutar)
        sumFruits() {
            let total_frutas = 0
            for (const i in this.frutas) {
                total_frutas = total_frutas + this.frutas[i].cantidad
            }
            return total_frutas
        }
    }
}).$mount('#app')