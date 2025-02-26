<?php
  function sanitize_input(float|string $input):string {
    return htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
  }
?>