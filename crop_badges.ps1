
Add-Type -AssemblyName System.Drawing
$posterPath = "C:\Users\User\.gemini\antigravity\brain\5cb2f17b-8b41-4df7-9713-0912f433603f\media__1770422379651.jpg"
$outDir = "C:\Users\User\.gemini\antigravity\brain\5cb2f17b-8b41-4df7-9713-0912f433603f"
$img = [System.Drawing.Image]::FromFile($posterPath)

function CropAndSave($x, $y, $w, $h, $name) {
    # Center the crop based on providing middle point
    $rect = New-Object System.Drawing.Rectangle ($x - $w/2), ($y - $h/2), $w, $h
    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $savePath = Join-Path $outDir "$name.png"
    $bmp.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Saved $name to $savePath"
}

# Shields (Center Points)
# The row 1 center is likely slightly higher than 660. 
CropAndSave 130 655 160 210 "badge_elite"
CropAndSave 320 655 160 210 "badge_mercy_house"
CropAndSave 503 655 170 210 "badge_super_thrift"
CropAndSave 685 655 160 210 "badge_mercy_auto"
CropAndSave 868 655 160 210 "badge_elle_salon"

# Logos (Refined centers for Row 2)
CropAndSave 285 860 210 120 "logo_creeck"
CropAndSave 503 860 210 120 "logo_shivers"
CropAndSave 720 860 210 120 "logo_mad"

$img.Dispose()
