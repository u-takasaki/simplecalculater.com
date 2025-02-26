<?php 
  session_start();

  function generateCsrfToken():string {
    if(empty($_SESSION['csrf_token'])){
      $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
  }

  function validateCsrfToken():string|bool {
    if(!isset($_SESSION['csrf_token']) || !isset($_SERVER['HTTP_X_CSRF_TOKEN'])){
      return false;
    };
    return hash_equals($_SESSION['csrf_token'], $_SERVER['HTTP_X_CSRF_TOKEN']);
  };

  if($_SERVER['REQUEST_METHOD'] === 'GET'){
    header("Content-Type: application/json");
    echo json_encode(["csrf_token" => generateCsrfToken()]);
    exit;
  }
?>