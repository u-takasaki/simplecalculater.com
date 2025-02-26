import { adjustResultWidth } from './modules/adjustResultWidth.js';
import { fetchCsrfToken, csrfToken } from './modules/csrf.js';
// import { resetCsrfToken } from './modules/csrf.js';

//document.querySelector("#resetCsrfButton").addEventListener("click", async function(){
//console.log("CSRFトークンをリセットします");
  //try{
    //await resetCsrfToken();
    //console.log("CSRFトークンがリセットされました");
  //} catch(error){
    //console.error("CSRFトークンのリセットに失敗", error);
  //}
//})

const firstInput = document.querySelector("[name='firstValue']");
const secondInput = document.querySelector("[name='secondValue']");
const operatorButtons = document.querySelectorAll(".operator");
const resultParagraph = document.querySelector(".resultParagraph");
const errorMessage = document.querySelector(".error-message");
const form = document.querySelector("form");

let selectedOperator = null;

document.addEventListener("DOMContentLoaded", async function(){
  await fetchCsrfToken();

  operatorButtons.forEach(button =>{
    button.addEventListener("click", function(event){
      event.preventDefault();//ボタンのデフォルト動作を防止

      operatorButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      selectedOperator = this.textContent;
    });
  });

  form.addEventListener("submit", function(event){
    event.preventDefault();

    let num1 = parseFloat(firstInput.value);
    let num2 = parseFloat(secondInput.value);

    if(isNaN(num1) || isNaN(num2)){
      errorMessage.textContent = "エラー: 数値を入力してください";
      return;
    }
    if(!selectedOperator){
      errorMessage.textContent = "エラー: 演算子を入力してください";
      return;
    }
    if(selectedOperator === "÷" && num2 === 0){
      errorMessage.textContent = "エラー: 0で割ることはできません";
      return;
    }

    let requestData = {
      firstValue: num1,
      secondValue: num2,
      operator: selectedOperator
    };

    fetch("../php/calculate.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify(requestData),
    })
    .then(response => response.json())
    .then(data =>{
      const resultElement = document.querySelector(".resultParagraph");
      const minWidth = 50;

      if(data.error){
        errorMessage.textContent = `エラー: ${data.error}`;
      } else{
        resultParagraph.textContent = `${data.result}`;
        adjustResultWidth(resultElement, minWidth);
      }
    })
    .catch(error =>{
      errorMessage.textContent = "エラー: サーバーとの通信に失敗しました";
    })
  })

  firstInput.addEventListener("input", function(event){
    
  });

  secondInput.addEventListener("input", function(event){
    
  })
});