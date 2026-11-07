Option Explicit
Dim shell, fso, root, script
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
root = fso.GetParentFolderName(WScript.ScriptFullName)
script = fso.BuildPath(root, "launch-offline.vbs")
' Local UI preview: serves the copied files on this secondary without
' becoming an active/replicating host.
shell.Run "wscript.exe """ & script & """ secondary-local-preview", 0, False
