<?php
  session_start();

  // デバッグ: セッションを確認
  error_log("reset_csrf.php: セッション開始");

  // CSRFトークンを削除して新しく発行
  unset($_SESSION['csrf_token']);
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

  // デバッグ: 新しいトークンをログに記録
  error_log("reset_csrf.php: 新しいCSRFトークン発行 - " . $_SESSION['csrf_token']);

  header("Content-Type: application/json");
  echo json_encode([
      "message" => "CSRFトークンをリセットしました",
      "new_csrf_token" => $_SESSION['csrf_token']
  ]);
  exit;
?>