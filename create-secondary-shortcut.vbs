Option Explicit

Dim shell, fso, root, script
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

root = fso.GetParentFolderName(WScript.ScriptFullName)
script = fso.BuildPath(root, "create-desktop-shortcut.vbs")

If Not fso.FileExists(script) Then
  MsgBox "ملف إنشاء الاختصار غير موجود:" & vbCrLf & script, 16, "alfaprosys"
  WScript.Quit 1
End If

shell.Run """" & WScript.FullName & """ """ & script & """ secondary", 0, False
