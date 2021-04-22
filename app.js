
    const Game = Vue.createApp({
        created(){
            this.shuffleDeck();
        },
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
                faceUpCards: [],
                modalShown: false,
                matchedCards: 0
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
            },
            flipCard(card){
                if(this.faceUpCards.length < 2){
                    card.faceUp = true;
                    this.faceUpCards.push(card);

                    if(this.faceUpCards.length === 2){
                        setTimeout(this.endTurn, 2000);
                    }
                }
            },
            endTurn(){
                const [firstCard, secondCard] = this.faceUpCards;
                if(firstCard.face === secondCard.face){
                    firstCard.matched = true;
                    secondCard.matched = true;
                }else{
                    firstCard.faceUp = false;
                    secondCard.faceUp = false;
                }

                this.faceUpCards = [];
                this.moves++;
            }
        }
        
    })

Game.component('card', {
    props: ['id', 'face', 'flipCard'],
    data(){
        return {
            faceUp: false,
            matched: false
        }
    }, 
    template: `<li class="card animated" v-bind:class="{show: faceUp, matched: matched}"  @click="flip">
                <i class="fa" v-bind:class="[face]"></i>
            </li>`,
    methods: {
        flip(){
            if(!this.faceUp){
                this.$emit("flipCard", this);
            }
            
        }
    }
})

Game.mount('.container');
window.onload = Game.shuffleDeck;