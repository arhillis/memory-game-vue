
    const Game = Vue.createApp({
        template: `
            <button @click="shuffleDeck">Shuffle</button>
            <div class="deck" v-if="cards.length > 0">
                <card v-for="card in Object.values(cards)" :card="card" @flip-card="flipCard">
                </card>
            </div>
        `,
        data(){
            return {
                moves: 0,
                mins: 0,
                secs: 0,
                playing: false,
                stars: 3,
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
                cards: [],
                faceUpCards: [],
                modalShown: false,
                matchedCards: 0
            }
        },
        methods: {
            shuffleDeck(){
                const faces = this.cards.length === 0 ? this.faces : Object.values(this.cards).map(card => card.face);
                let temp = [];

                    while(faces.length > 0){
                        const randomIndex = Math.floor(Math.random() * faces.length);
                        temp.push({face: faces.splice(randomIndex, 1)[0], matched: false, faceUp: false, id: faces.length})
                    }
                    this.cards = [...temp];
            },
            flipCard(id, faceUp){
                const cardIndex = this.cards.findIndex(card => card.id === id);
                this.cards[cardIndex].faceUp = faceUp;
            }
        },
        created(){
            this.shuffleDeck();
        }
    })

Game.component('card', {
    props: ['card'],
    template: `<div :class="[card.faceUp ? 'face-up' : '', 'card']" @click="flipCard">
                    {{card.face}}
                </div>`,
    methods: {
        flipCard(){
            this.$emit('flip-card', this.card.id, !this.card.faceUp);
        }
    }
})

Game.mount('.app');