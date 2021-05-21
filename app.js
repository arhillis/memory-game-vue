
    const Game = Vue.createApp({
        template: `
            <panel :moves="moves"
                @shuffle-deck="shuffleDeck" 
                @restart-game="restartGame"
            ></panel>
            <deck :cards="cards" @flip-card="flipCard">
            </deck>
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
            flipCard(id){
                console.log(this.faceUpCards)
                if(this.faceUpCards.length < 2){
                    const cardIndex = this.cards.findIndex(card => card.id === id);
                    const card = this.cards[cardIndex];

                    this.cards[cardIndex].faceUp = true;      
                    this.faceUpCards.push(card);
                    this.takeTurn();       
                }                
            },
            takeTurn(){
                const [card1, card2] = this.faceUpCards;

                if(card2){
                    setTimeout(() => {
                        if(card1.face === card2.face){
                            card1.matched = true;
                            card2.matched = true;
                            this.matchedCards += 2;
                            if(this.matchedCards === this.cards.length)
                                this.endGame();
                        }else{
                            card2.faceUp = false;
                            card1.faceUp = false;
                        }
                        this.faceUpCards = [];
                        this.moves++;
                    }, 2000);
                    
                }
            },
            endGame(){
                console.log('Game Over!');
            },
            restartGame(){
                this.shuffleDeck();
                this.moves = 0;
            }
        },
        created(){
            this.shuffleDeck();
        }
    })

Game.component('panel', {
    props: ['moves'],
    template: `<div class="score-panel">
        <p class="moves-para">Moves: {{moves}}</p>
        <i class="fa fa-repeat" @click="$emit('restart-game')"></i>
    </div>`,

});

Game.component('deck', {
    props: ['cards'],
    template: `<div class="deck" v-if="cards.length > 0">
                    <card v-for="card in Object.values(cards)" :card="card" @flip-card="$emit('flip-card', card.id)">
                    </card>
                </div>`

})

Game.component('card', {
    props: ['card'],
    template: `<div :class="[card.faceUp ? 'face-up' : '', 'card']" @click="flipCard">
                    <i class="fa" :class="[card.face]"></i>
                </div>`,
    methods: {
        flipCard(){
            if(!this.card.faceUp)
                this.$emit('flip-card');
        }
    }
})

Game.mount('.app');