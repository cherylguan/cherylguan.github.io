const person = {
    firstName: 'Cheryl',
    lastName: 'Guan',
	
	fullName: function (){
		return this.firstName + ' ' + this.lastName;
	}
}

const calculator = {
    operand01: -1,
    operand02: -1,
	
	add: function (){
		return this.operand01 + this.operand02;
	},
	
	subtract: function (){
		return this.operand01 - this.operand02;
	}
}

calculator.multiply = function() {
	return calculator.operand01 * calculator.operand02;
}

function divider(title) {
    console.log("====================================");
    console.log(title);
    console.log("====================================");
}

calculator.operand01 = person.firstName.length;
calculator.operand02 = person.lastName.length;

divider('Person');
console.log(person.firstName);
console.log(person.lastName);
console.log(person.fullName());

divider('Calculator');
console.log('operand01 = ', calculator.operand01);
console.log('operand02 = ', calculator.operand02);
console.log('add = ', calculator.add());
console.log('subtract = ', calculator.subtract());
console.log('multiply = ', calculator.multiply());