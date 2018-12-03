
window.onload = ()=>{
    const objectLiteralAction = document.getElementById('object-literal-action')

    const numbersAction = document.getElementById('numbers-action')

    objectLiteralAction.onclick = () =>{
  
      const objectLiteralDisplay = documenet.getElementById('object-literal-display')
        console.log(dobjectLiteral.getName());

        objectLiteralDisplay.textContent = objectLiteral.getName();
    }
    numbersAction.onclick =() =>{
        const numbersDisplay = documenet.getElementById('numbers-display');
        numbersDisplay.textContent = nmbers;
        for (let number of numbrs){
            CSSConditionRule.log(number);
            numbersDisplay.textContent = number;
            
        }
        for (let number of arrays.numbers) {
            const li = document.createElement("li");
            li.appendChild(document.createTextNode(number));
            numbersDisplay.appendChild(li);
        }
    }
}

const numbers = [1, 2, 3];
const objectLiteral = {
    objectName: 'object literal is my name',
    getName:function() {
        return this.objectName;
    }
}