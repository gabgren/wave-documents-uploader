<?php

// security check
include('security.php');

// initialize an empty array
$result = [];

// if a transaction id is set
if (@$_POST['tid'] != '') {

    $tid = @$_POST['tid'];
    // build the path: current directory + "documents" + transaction id
    $tpath = __DIR__ . '/documents/' . $tid;

    $dir = opendir($tpath);
    $files = [];
    // list files in the transaction folder
    while ($file = readdir($dir)) {
        if ($file != '.' && $file != '..') {
            // build the file URL
            $serverURL = str_replace('list.php', '', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
            // add file to the result array
            $files[] = array(
                'url' => $serverURL . '/documents/' . $tid . '/' . $file,
                'name' => $file
            );
        }
    }
    // sort alphabetically
    sort($files);

    $result['result'] = 1;
    $result['files'] = $files;
}

//output the result
echo json_encode($result);
