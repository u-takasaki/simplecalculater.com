<?php
  session_start();
  
  header("Content-Type: application/json");
  include_once "calculaterFunctions.php";
  include_once "includes/sanitizeFunctions.php";
  include_once "includes/csrf.php";

  if(!validateCsrfToken()){
    echo json_encode(["error" => "CSRFトークンが無効です"]);
    exit;
  };

  $data = json_decode(file_get_contents("php://input"),true);

  //以下XSS無効化
  $data["firstValue"] = sanitize_input($data["firstValue"]);
  $data["secondValue"] = sanitize_input($data["secondValue"]);
  $data["operator"] = sanitize_input($data["operator"]);

  if(!isset($data["firstValue"], $data["secondValue"], $data["operator"])){
    echo json_encode(["error" =>"不正なリクエスト"]);
    exit;
  };

  $num1 = floatval($data["firstValue"]);
  $num2 = floatval($data["secondValue"]);
  $operator = $data["operator"];

  if(!is_numeric($num1) || !is_numeric($num2)){
    echo json_encode(["error" => "数値を入力してください"]);
    exit;
  }

  $validOperators = ["+", "-", "×", "÷"];
  if(!in_array($operator, $validOperators, true)){
    echo json_encode(["error" => "不正な演算子です"]);
    exit;
  }

  if($operator === "÷" && $num2 === 0){
    echo json_encode(["error" => "0で割ることはできません"]);
    exit;
  }

  

  $result = calculate2Object($num1, $num2, $operator);

  echo json_encode(["result" => $result]);
?>