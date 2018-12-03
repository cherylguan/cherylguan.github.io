const simpleObject = {
    sayName: function(){
		console.log('Simple Object');
    }
};

simpleObject.dynamicMethod = function(){
	console.log("Dynamic Method");
};

function FunctionObject() {

	this.privateFunction = function(){
		console.log('Private Function');
	}
 
	FunctionObject.prototype.sayName = function() {
		this.privateFunction();
	}
}

class CustomClass {
	constructor(){}
	
	sayName() {
		console.log("Custom Class");
	}
}

function loader(){
	const  objectLiteralButton = document.getElementById('simple-object-action');
	const  functionButton = document.getElementById('function-object-action');
	const  customClassButton = document.getElementById('custom-class-action');

	objectLiteralButton.onclick = function(){
		simpleObject.sayName = function(){
			const simpleObjectDisplay = document.getElementById('simple-object-display');
			simpleObjectDisplay.textContent = 'Simple Object';
			console.log('Simple Object');
		}
		
        simpleObject.sayName();
	}
	
	functionButton.onclick = function(){
        const functionObject = new FunctionObject();
		
		functionObject.privateFunction = function() {
			const functionObjectDisplay = document.getElementById("function-object-display");
			functionObjectDisplay.textContent = 'Private Function';
			console.log('Private Function');
		}
		
		functionObject.sayName();
	}
	
	customClassButton.onclick = function(){
        const customClass = new CustomClass();
		
		customClass.sayName = function() {
			const customClassDisplayDisplay = document.getElementById("custom-class-display");
			customClassDisplayDisplay.textContent = 'Custom Class';
			console.log('Custom Class');
		}
		
		customClass.sayName();
	}
}

window.onload = loader;


simpleObject.sayName();
simpleObject.dynamicMethod();


const functionObject = new FunctionObject();
functionObject.sayName();

console.log(functionObject.constructor.toString());

const customClass = new CustomClass();
customClass.sayName();