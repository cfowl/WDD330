//============>>>>>>> Calculator OBJECT <<<<<<<============//
const calculator = {
    num1: 0,
    num2: 0,

    read() {
        this.num1 = parseFloat(document.getElementById('num1').value);
        this.num2 = parseFloat(document.getElementById('num2').value);
    },

    display(result) {
        document.getElementById('calc-display').textContent = result;
    },

    add() {
        this.read();
        const result = this.num1 + this.num2;
        this.display(result);
    },

    subtract() {
        this.read();
        const result = this.num1 - this.num2;
        this.display(result);
    },

    multiply() {
        this.read();
        const result = this.num1 * this.num2;
        this.display(result);
    },

    divide() {
        this.read();
        const result = this.num1 / this.num2;
        this.display(result);
    },

    power() {
        this.read();
        const result = this.num1 ** this.num2;
        this.display(result);
    }
};