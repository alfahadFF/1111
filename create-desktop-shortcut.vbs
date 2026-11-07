Option Explicit

Dim shell, fso, root, mode, launcher, title, desktop, shortcutPath, link
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

root = fso.GetParentFolderName(WScript.ScriptFullName)
mode = "primary"
If WScript.Arguments.Count > 0 Then mode = LCase(Trim(WScript.Arguments(0)))

Select Case mode
  Case "primary"
    launcher = fso.BuildPath(root, "launch-primary.vbs")
    title = "alfaprosys — الجهاز الرئيسي.lnk"
  Case "secondary"
    launcher = fso.BuildPath(root, "launch-secondary-standby.vbs")
    title = "alfaprosys — الجهاز الفرعي.lnk"
  Case "secondary-active"
    launcher = fso.BuildPath(root, "launch-secondary-active.vbs")
    title = "alfaprosys — تشغيل الفرعي.lnk"
  Case Else
    MsgBox "الاستخدام: create-desktop-shortcut.vbs primary أو secondary أو secondary-active", 48, "alfaprosys"
    WScript.Quit 1
End Select

If Not fso.FileExists(launcher) Then
  MsgBox "ملف التشغيل غير موجود:" & vbCrLf & launcher, 16, "alfaprosys"
  WScript.Quit 2
End If

' لا تستخدم Set هنا: SpecialFolders يعيد مساراً نصياً وليس كائناً.
desktop = shell.SpecialFolders("Desktop")
If Len(Trim(desktop)) = 0 Or Not fso.FolderExists(desktop) Then
  MsgBox "تعذر العثور على مجلد سطح المكتب لهذا المستخدم.", 16, "alfaprosys"
  WScript.Quit 3
End If

shortcutPath = fso.BuildPath(desktop, title)
Set link = shell.CreateShortcut(shortcutPath)
link.TargetPath = WScript.FullName
link.Arguments = """" & launcher & """"
link.WorkingDirectory = root
If fso.FileExists(fso.BuildPath(root, "alfaprosys.ico")) Then
  link.IconLocation = fso.BuildPath(root, "alfaprosys.ico") & ",0"
End If
link.Description = "تشغيل نظام alfaprosys أوفلاين"
link.Save

MsgBox "تم إنشاء اختصار alfaprosys على سطح المكتب:" & vbCrLf & shortcutPath, 64, "alfaprosys"
