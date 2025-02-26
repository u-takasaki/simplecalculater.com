<?php
  function calculate2Object(float $num1, float $num2, string $operator): float{
    $result = null;
    switch($operator){
      case "+":
        $result = $num1 + $num2;
        break;
      case "-":
        $result = $num1 - $num2;
        break;
      case "×":
        $result = $num1 * $num2;
        break;
      case "÷":
        $result = $num1 / $num2;
        break;
      default:
        echo json_encode(["error" => "不正な演算子"]);
        exit;
    };

    return $result;
  };
?>