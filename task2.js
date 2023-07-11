const productNum = (a,b) => a*b;
console.log(productNum(2,3));

const student = {
    name: 'Sudharshini',
    age: '24',
    printDets() {
        console.log('Name of student is: ' + this.name + ' Age of student is: ' + this.age)
    }
}

student.printDets();