Option Explicit

Dim fso, shell, root, node, serverFile, mode, cmd, env
Dim primaryIp, secondaryIp, port, replicaToken, browserUrl, checkUrl
Set fso = CreateObject("Scripting.FileSystemObject")
Set shell = CreateObject("WScript.Shell")
root = fso.GetParentFolderName(WScript.ScriptFullName)
mode = "primary"
If WScript.Arguments.Count > 0 Then mode = LCase(WScript.Arguments(0))

primaryIp = ConfigValue(root, "PRIMARY_IP", "192.168.137.1")
secondaryIp = ConfigValue(root, "SECONDARY_IP", "192.168.137.2")
port = ConfigValue(root, "PORT", "3030")
replicaToken = ConfigValue(root, "REPLICA_TOKEN", "")
node = root & "\runtime\node.exe"
serverFile = root & "\offline_server.js"
checkUrl = "http://127.0.0.1:" & port

If Not fso.FileExists(node) Then
  MsgBox "ملف التشغيل المحمول غير موجود: " & node, 16, "alfaprosys"
  WScript.Quit 1
End If
If Not fso.FileExists(serverFile) Then
  MsgBox "ملف الخادم المحلي غير موجود: " & serverFile, 16, "alfaprosys"
  WScript.Quit 1
End If

Select Case mode
  Case "primary"
    browserUrl = "http://localhost:" & port & "/"
  Case "secondary-standby"
    ' The standby serves as a replica; daily work stays on the primary host.
    browserUrl = "http://" & primaryIp & ":" & port & "/"
  Case "secondary-local-preview"
    ' Local UI preview only: use localhost so a changing LAN IP cannot break the local screen.
    browserUrl = "http://localhost:" & port & "/"
  Case "secondary-active"
    ' The secondary is the active host; use localhost for its own screen.
    ' The peer address remains separate and is used only for optional replication.
    browserUrl = "http://localhost:" & port & "/"
    ' Switching from standby to active requires a fresh process/environment.
    StopLocalServer checkUrl
    If HttpReady(checkUrl) Then
      MsgBox "تعذر إيقاف وضع الاستعداد الحالي. أغلق الخادم ثم أعد المحاولة.", 16, "alfaprosys"
      WScript.Quit 3
    End If
  Case Else
    MsgBox "وضع التشغيل غير معروف: " & mode, 16, "alfaprosys"
    WScript.Quit 1
End Select

' Cache-busting URL: لا يحتاج المستخدم إلى اختصارات لوحة المفاتيح أو
' مسح الكاش؛ كل تشغيل يطلب نسخة الأصول الحالية من الخادم.
browserUrl = browserUrl & "?alfa_build=176"

' The standby shortcut is also used when returning the secondary to standby.
' The local-preview mode also restarts the local server with standby flags so it
' can show the copied files without becoming an active/replicating host.
If (mode = "secondary-standby" Or mode = "secondary-local-preview") And HttpReady(checkUrl) Then
  StopLocalServer checkUrl
  If HttpReady(checkUrl) Then
    MsgBox "تعذر إيقاف الخادم المحلي. أغلق العملية ثم أعد المحاولة.", 16, "alfaprosys"
    WScript.Quit 3
  End If
End If

' If this role is already running, reuse it rather than starting a second copy.
If Not HttpReady(checkUrl) Then
  Set env = shell.Environment("Process")
  env("PORT") = port
  env("HOST") = "0.0.0.0"
  env("ALFA_DATA_DIR") = root & "\offline-data"
  env("ALFA_REPLICA_TOKEN") = replicaToken

  Select Case mode
    Case "primary"
      env("ALFA_NODE_NAME") = "primary"
      env("ALFA_PEER_URL") = "http://" & secondaryIp & ":" & port
    Case "secondary-standby"
      env("ALFA_NODE_NAME") = "secondary-standby"
      env("ALFA_PEER_URL") = ""
    Case "secondary-local-preview"
      env("ALFA_NODE_NAME") = "secondary-standby"
      env("ALFA_PEER_URL") = ""
    Case "secondary-active"
      env("ALFA_NODE_NAME") = "secondary-active"
      env("ALFA_PEER_URL") = "http://" & primaryIp & ":" & port
  End Select

  cmd = """" & node & """ """ & serverFile & """ " & port
  shell.Run cmd, 0, False
  If Not WaitForServer(checkUrl, 80) Then
    MsgBox "تعذر تشغيل الخادم المحلي على المنفذ " & port & ".", 16, "alfaprosys"
    WScript.Quit 2
  End If
End If

' Open the local system as an app window when Edge or Chrome is available.
' If neither browser is installed, keep the safe browser fallback.
OpenAppWindow browserUrl

Function FindAppBrowser()
  Dim candidates, i, candidate
  ' استخدم Chrome أولاً لأن الاختبار والمفتاح محفوظان فيه،
  ' ثم Edge كبديل إذا لم يكن Chrome مثبتاً.
  candidates = Array( _
    shell.ExpandEnvironmentStrings("%ProgramFiles(x86)%") & "\Google\Chrome\Application\chrome.exe", _
    shell.ExpandEnvironmentStrings("%ProgramFiles%") & "\Google\Chrome\Application\chrome.exe", _
    shell.ExpandEnvironmentStrings("%LocalAppData%") & "\Google\Chrome\Application\chrome.exe", _
    shell.ExpandEnvironmentStrings("%ProgramFiles(x86)%") & "\Microsoft\Edge\Application\msedge.exe", _
    shell.ExpandEnvironmentStrings("%ProgramFiles%") & "\Microsoft\Edge\Application\msedge.exe", _
    shell.ExpandEnvironmentStrings("%LocalAppData%") & "\Microsoft\Edge\Application\msedge.exe" _
  )
  FindAppBrowser = ""
  For i = 0 To UBound(candidates)
    candidate = candidates(i)
    If fso.FileExists(candidate) Then
      FindAppBrowser = candidate
      Exit Function
    End If
  Next
End Function

Sub OpenAppWindow(url)
  Dim browser, appCommand, secureOrigins
  browser = FindAppBrowser()
  secureOrigins = "http://" & primaryIp & ":" & port & ",http://" & secondaryIp & ":" & port
  If Len(browser) > 0 Then
    ' Chrome/Edge لا يعتبر عنوان LAN عبر HTTP سياقاً آمناً،
    ' لذلك نسمح لـ WebCrypto بالمفتاح المحلي على عناوين الجهازين فقط.
    appCommand = """" & browser & """" & " --new-window --app=""" & url & """" & _
      " --unsafely-treat-insecure-origin-as-secure=""" & secureOrigins & """" & _
      " --start-maximized --start-fullscreen --no-first-run"
    shell.Run appCommand, 1, False
  Else
    shell.Run url, 1, False
  End If
End Sub

Function ConfigValue(folder, wanted, fallback)
  Dim file, stream, line, parts, key, value
  ConfigValue = fallback
  file = fso.BuildPath(folder, "offline-network.conf")
  If Not fso.FileExists(file) Then Exit Function
  Set stream = fso.OpenTextFile(file, 1, False)
  Do Until stream.AtEndOfStream
    line = Trim(stream.ReadLine)
    If Len(line) > 0 And Left(line, 1) <> "#" And InStr(line, "=") > 0 Then
      parts = Split(line, "=", 2)
      key = Trim(parts(0))
      value = Trim(parts(1))
      If UCase(key) = UCase(wanted) And Len(value) > 0 Then
        ConfigValue = value
        Exit Do
      End If
    End If
  Loop
  stream.Close
End Function

Function HttpReady(baseUrl)
  Dim req
  HttpReady = False
  On Error Resume Next
  Set req = CreateObject("WinHttp.WinHttpRequest.5.1")
  If Err.Number <> 0 Then
    Err.Clear
    Set req = CreateObject("MSXML2.XMLHTTP.6.0")
  End If
  If Err.Number = 0 Then
    req.Open "GET", baseUrl & "/__ok?_=" & CStr(Timer), False
    If TypeName(req) = "WinHttpRequest" Then req.SetTimeouts 300, 700, 700, 1000
    req.Send
    If Err.Number = 0 Then HttpReady = (req.Status = 200)
  End If
  Err.Clear
  On Error GoTo 0
End Function

Function WaitForServer(baseUrl, attempts)
  Dim i
  WaitForServer = False
  For i = 1 To attempts
    If HttpReady(baseUrl) Then
      WaitForServer = True
      Exit Function
    End If
    WScript.Sleep 250
  Next
End Function

Sub StopLocalServer(baseUrl)
  Dim req, i
  If Not HttpReady(baseUrl) Then Exit Sub
  On Error Resume Next
  Set req = CreateObject("WinHttp.WinHttpRequest.5.1")
  If Err.Number <> 0 Then
    Err.Clear
    Set req = CreateObject("MSXML2.XMLHTTP.6.0")
  End If
  If Err.Number = 0 Then
    req.Open "GET", baseUrl & "/__shutdown?_=" & CStr(Timer), False
    If TypeName(req) = "WinHttpRequest" Then req.SetTimeouts 300, 700, 700, 1000
    req.Send
  End If
  Err.Clear
  On Error GoTo 0
  For i = 1 To 80
    If Not HttpReady(baseUrl) Then Exit For
    WScript.Sleep 250
  Next
End Sub
