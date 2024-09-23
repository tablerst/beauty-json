@echo off

:: 设置环境变量并执行命令
set GOOS=wasip1
set GOARCH=wasm

:: 执行go build命令
go build -o main.wasm my.go

:: 检查命令执行结果
if %ERRORLEVEL% neq 0 (
    echo Build failed!
) else (
    echo Build succeeded!
)

pause