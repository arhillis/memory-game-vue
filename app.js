
    const Game = Vue.createApp({
        data(){
            return {
                moves: 0,
                mins: 0,
                secs: 0,
                playing: false,
                faces: [
                    "fa-diamond",
                    "fa-paper-plane-o",
                    "fa-anchor",
                    "fa-bolt",
                    "fa-cube",
                    "fa-leaf",
                    "fa-bicycle",
                    "fa-bomb",
                    "fa-diamond",
                    "fa-paper-plane-o",
                    "fa-anchor",
                    "fa-bolt",
                    "fa-cube",
                    "fa-leaf",
                    "fa-bicycle",
                    "fa-bomb"
                ],
                modalShown: false,
                showCards: true
            }
        },
        methods: {
            showModal(){this.modalShown = true},
            hideModal(){this.modalShown = false},
            shuffleDeck(){
                const {faces} = this;
                let temp = [];
                
                while(faces.length > 0){
                    let random = Math.floor(Math.random() * faces.length);
                    temp.push(faces.splice(random, 1)[0]);//Pulls a random element out of the original array and pushes it to the temp array
                }

                this.faces = [...temp];
            },
            makeMove(){
                this.moves++;
            }
        }
        
    })

Game.component('card', {
    props: ['face', 'showCards'],
    template: `<li class="card" v-bind:class="{show: showCards}" @click="flipCard">
                <i class="fa" v-bind:class="[face]"></i>
            </li>`,
    methods: {
        flipCard(){
            console.log(this.face)
        }
    }
})

Game.mount('.container');