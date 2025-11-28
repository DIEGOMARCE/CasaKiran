# Script para limpiar puertos ocupados por Node.js
# Uso: .\limpiar-puertos.ps1

Write-Host "🔍 Buscando procesos en puertos 3000, 3001, 3002..." -ForegroundColor Cyan

$puertos = @(3000, 3001, 3002)
$procesosEncontrados = @()

foreach ($puerto in $puertos) {
    $conexiones = Get-NetTCPConnection -LocalPort $puerto -ErrorAction SilentlyContinue
    if ($conexiones) {
        $procesos = $conexiones | Select-Object -ExpandProperty OwningProcess -Unique
        foreach ($procesoId in $procesos) {
            if ($procesoId -ne 0) {
                $proceso = Get-Process -Id $procesoId -ErrorAction SilentlyContinue
                if ($proceso) {
                    $procesosEncontrados += [PSCustomObject]@{
                        Puerto = $puerto
                        PID = $procesoId
                        Nombre = $proceso.ProcessName
                    }
                }
            }
        }
    }
}

if ($procesosEncontrados.Count -eq 0) {
    Write-Host "✅ No hay procesos ocupando los puertos 3000-3002" -ForegroundColor Green
} else {
    Write-Host "`n📋 Procesos encontrados:" -ForegroundColor Yellow
    $procesosEncontrados | Format-Table -AutoSize
    
    Write-Host "`n🛑 Cerrando procesos..." -ForegroundColor Yellow
    foreach ($proc in $procesosEncontrados) {
        try {
            Stop-Process -Id $proc.PID -Force -ErrorAction Stop
            Write-Host "  ✅ Proceso $($proc.PID) ($($proc.Nombre)) en puerto $($proc.Puerto) cerrado" -ForegroundColor Green
        } catch {
            Write-Host "  ❌ Error al cerrar proceso $($proc.PID): $_" -ForegroundColor Red
        }
    }
    
    Write-Host "`n✅ Limpieza completada" -ForegroundColor Green
}

Write-Host "`n💡 Ahora puedes ejecutar 'npm run dev' sin problemas" -ForegroundColor Cyan








