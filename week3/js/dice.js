//============>>>>>>> Dice OBJECT <<<<<<<============//
const dice = {
    speed: 500,
    degree: 360,
    display: document.getElementById('dice-display'),

    roll() {
        
        this.clear();
        this.spin();
        this.addDots(Math.floor(6 * Math.random()) + 1);
    },

    clear() {
        this.display.innerHTML = '';
        setTimeout(() => {  
            this.display.style.transition = 'initial';
            this.display.style.transform = 'rotate(0deg)';
        }, this.speed);
    },

    spin() {
        this.display.style.transition = `all ${this.speed}ms ease-out`;
        this.display.style.transform = `rotate(${this.degree}deg)`;
    },

    addDots(num) {

        let dots = [];
        for(i=0; i<7; i++) dots[i] = document.createElement('div');

        // DOT 2
        dots[1].style.gridColumnStart = '3';

        // DOT 3
        dots[2].style.gridRowStart = '2';

        // DOT 4
        dots[3].style.gridRowStart = '2';
        dots[3].style.gridColumnStart = '2';

        // DOT 5
        dots[4].style.gridRowStart = '2';
        dots[4].style.gridColumnStart = '3';

        // DOT 6
        dots[5].style.gridRowStart = '3';

        // DOT 7
        dots[6].style.gridRowStart = '3';
        dots[6].style.gridColumnStart = '3';

        setTimeout(() => {
            switch(num) {
                case 1:
                    this.display.append(dots[3]);
                    break;

                case 2:
                    this.display.append(dots[1], dots[5]);
                    break;

                case 3:
                    this.display.append(dots[1], dots[3], dots[5]);
                    break;

                case 4:
                    this.display.append(dots[0], dots[1], dots[5], dots[6]);
                    break;

                case 5:
                    this.display.append(dots[0], dots[1], dots[3], dots[5], dots[6]);
                    break;

                case 6:
                    this.display.append(dots[0], dots[1], dots[2], dots[4], dots[5], dots[6]);
                    break;

                default:
                    console.log('Something went wrong in the switch statement.');
                    break;
            }
        }, this.speed);
    }
};