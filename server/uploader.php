<?php

// security check
include('security.php');

// initialize an empty array
$result = array();

// if a file is uploaded
if ($_FILES['file']) {

    $tid = @$_POST['tid'];
    // build the path: current directory + "documents" + transaction id
    $tpath = __DIR__ . '/documents/' . $tid;

    $fname = $_FILES['file']['name'];
    $tmp = $_FILES['file']['tmp_name'];

    // try to make the folder, if it doesnt exist
    @mkdir($tpath, 0777, true);

    // place uploaded file in the transaction folder
    if (move_uploaded_file($tmp, $tpath . '/' . $fname)) {
        $result['result'] = 1;
        // output file URL and name
        $result['name'] = $fname;
        // build the file URL
        $serverURL = str_replace('uploader.php', '', (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
        $result['url'] = $serverURL . '/documents/' . $tid . '/' . $fname;
    }
}

//output the result
echo json_encode($result);
