$tag = "wavekasipat/ttb-interview:$(Get-Date -format "yyyyMMdd-HHmmss")"
Write-Output $tag
docker build -t $tag .
