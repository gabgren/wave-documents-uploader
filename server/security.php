<?php
// define a password for your upload server in the magic.txt file. that password will have to be entered in the chrome extension options page
$PASSWORD = @file_get_contents('magic.txt');

// allow only from Wave
header('Access-Control-Allow-Origin: https://next.waveapps.com', false);

// Check if password match from magic.txt file
if (@$_POST['magic'] != $PASSWORD) {
    echo json_encode(array('result' => 0));
}
