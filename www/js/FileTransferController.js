app.controller('MyCtrl', function($scope, $timeout, $cordovaFileTransfer) {
  $scope.downloadFile = function() {
    var url = "https://image-store.slidesharecdn.com/451f8148-12f5-4f41-a976-61ff2311de3e-original.png";
    var filename = url.split("/").pop();
    //alert(filename);
    var targetPath = cordova.file.externalRootDirectory + filename;
    var trustHosts = true
    var options = {};
   // alert(cordova.file.externalRootDirectory);
    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
        // Success!
      //  alert(JSON.stringify(result));
      }, function(error) {
        // Error
        alert(JSON.stringify(error));
      }, function (progress) {
      /*  $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })*/
        if (progress.lengthComputable) {
						var perc = Math.floor(progress.loaded / progress.total * 100);
						statusDom.innerHTML = perc + "% loaded...";
						myProgress.value=perc;
				} else {
				if(statusDom.innerHTML == "") {
				   statusDom.innerHTML = "Loading";
			} else {
				   statusDom.innerHTML += ".";
			}
		}
      });
 }
$scope.uploadFile = function() {
	    var url = "http://your.IP/serverfiletransfer/upload.php";
	    //target path may be local or url
	    var targetPath = "http://your.IP/serverfiletransfer/images/my.jpg";
        var filename = targetPath.split("/").pop();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg"
        };
        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("success");
            alert(JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
            $timeout(function () {
          		$scope.downloadProgress = (progress.loaded / progress.total) * 100;
        		})
        });
    }
});