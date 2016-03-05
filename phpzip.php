
$rootPath = realpath('folder-to-zip');


$zip = new ZipArchive();
$zip->open('calendar.zip', ZipArchive::CREATE | ZipArchive::OVERWRITE);


$files = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($rootPath),
    RecursiveIteratorIterator::LEAVES_ONLY
);


{

    if (!$file->isDir())
    {

        $filePath = $file->getRealPath();
        $relativePath = substr($filePath, strlen($rootPath) + 1);
        $zip->addFile($filePath, $relativePath);
    }
}

$zip->close();