
    const Game = Vue.createApp({
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
                        temp.push({face: faces.splice(randomIndex, 1)[0], matched: false})
                    }
                    this.cards = [...temp];
            }
        },
        created(){
            this.shuffleDeck();
        }
    })



Game.mount('.app');