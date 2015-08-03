<?php
if(!isset($_FILES['file']) || ($_FILES['file']['tmp_name'] == ''))
        echo "Please choose a file.";
    else {
        $uploadfile =  $_FILES['file']['name'];
        $uploadfilename = $_FILES['file']['tmp_name'];  
    }
$location = 'uploaddata/';
if(move_uploaded_file($uploadfilename, $location.$uploadfile)){
echo 'File uploaded..';
} else {
echo 'Error to upload..';
}
?>