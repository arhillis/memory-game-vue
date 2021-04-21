window.onload = () =>{

    const game = new Vue({
        el: '.container',
        data: {
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
            showModal: false
        }
    })
}