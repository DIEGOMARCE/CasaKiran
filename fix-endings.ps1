Get-ChildItem -Recurse -File |
Where-Object {
    $_.Extension -match '\.(ts|tsx|js|jsx|json|md|txt|yml|yaml|env|ps1|sql)$' -and
    $_.FullName -notmatch 'node_modules|\.next|\.git'
} |
ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content) {
        # Eliminar TODAS las líneas vacías al final
        $cleaned = $content -replace '(\r\n|\n)+$', ''
        # Agregar UNA SOLA línea final
        $cleaned += "`r`n"
        Set-Content $_.FullName -Value $cleaned -NoNewline
        Write-Host "Limpiado: $($_.Name)"
    }
}
