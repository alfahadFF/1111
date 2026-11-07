Option Explicit
Dim shell, fso, root, script
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)
script = fso.BuildPath(root, "launch-offline.vbs")
shell.Run "wscript.exe """ & script & """ primary", 0, False
