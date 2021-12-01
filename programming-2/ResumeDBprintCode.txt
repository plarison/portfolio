Option Compare Database


Private Sub btnAddArcJob_Click()
'Archived jobs must be manually added

strJobArchName = [Forms]![frmPrintSelect]![txtArchName]
strJobName = ""

strSQL1 = "INSERT INTO tblJobList ( Job_Name, Scope_of_Work, Estimated_Start_Date, Estimated_Completion_Date, Actual_Start_Date, Actual_Completion_Date, [Size], Role ) " & _
          "SELECT MASTER_PJM_JOB.Job_Name, MASTER_PJM_JOB.Scope_of_Work, MASTER_PJM_JOB.Estimated_Start_Date, MASTER_PJM_JOB.Estimated_Completion_Date, MASTER_PJM_JOB.Actual_Start_Date, MASTER_PJM_JOB.Actual_Completion_Date, MASTER_PJM_JOB.Size, tblJobPrint.Role " & _
          "FROM tblJobPrint INNER JOIN MASTER_PJM_JOB ON tblJobPrint.[Job Index] = MASTER_PJM_JOB.Job_Index " & _
          "WHERE (((MASTER_PJM_JOB.Job_Name)='" & strJobArchName & "'));"
strSQL2 = "SELECT MASTER_PJM_JOB.Job_Name FROM MASTER_PJM_JOB WHERE (((MASTER_PJM_JOB.Job_Name)='" & strJobArchName & "'));"

Dim db As Database
Dim rs As Recordset

Set db = CurrentDb
Set rs = db.OpenRecordset(strSQL2, dbOpenDynaset)

Do Until rs.EOF
    If rs.Fields("Job_Name") <> "" Then
        strJobName = strJobName & rs.Fields("Job_Name")
    End If
        rs.MoveNext
Loop

If strJobName <> "" Then
    DoCmd.SetWarnings (False)
    DoCmd.RunSQL (strSQL1)
    DoCmd.SetWarnings (True)
    MsgBox ("Job has been added.")
    Me.subfrmExperience.Requery
    Me.subfrmExperience.SetFocus
    Me.txtArchName.Visible = False
    Me.btnAddArcJob.Visible = False
Else
    MsgBox ("Access could not add the job.")
End If

rs.Close
Set rs = Nothing

End Sub

Private Sub btnArchiveSearch_Click()

Dim db As Database
Dim rs As Recordset
Dim strArchName As String

strArchNo = Me.txtArchNo.Value
strArchName = ""

strSQL1 = "SELECT MASTER_PJM_JOB.Job, MASTER_PJM_JOB.Job_Name " & _
            "FROM MASTER_PJM_JOB " & _
            "WHERE (((MASTER_PJM_JOB.Job)='" & strArchNo & "'));"


If IsNull(Me.txtArchNo.Value) Then
    MsgBox ("Please enter job number.")
Else
    Set db = CurrentDb
    Set rs = db.OpenRecordset(strSQL1, dbOpenDynaset)
       
    Do Until rs.EOF
        If rs.Fields("Job_Name") <> "" Then
            strArchName = strArchName & rs.Fields("Job_Name")
        End If
            rs.MoveNext
    Loop
    
    If strArchName <> "" Then
        Me.txtArchName.Visible = True
        [Forms]![frmPrintSelect]![txtArchName] = strArchName
        Me.btnAddArcJob.Visible = True
    Else
        MsgBox ("Job not found.")
    End If
    
    rs.Close
    Set rs = Nothing

End If

End Sub

Private Sub btnDual_Click()

If Me.chkRole.Value = False Then
    DoCmd.OpenReport "rpt2Column", acViewPreview, , , acWindowNormal
Else
    DoCmd.OpenReport "rpt2ColumnWithRole", acViewPreview, , , acWindowNormal
End If

End Sub

Private Sub btnSingle_Click()

If Me.chkRole.Value = False Then
    DoCmd.OpenReport "rptOneColumnNoRole", acViewPreview, , , acWindowNormal
Else
    DoCmd.OpenReport "rptOneColumn", acViewPreview, , , acWindowNormal
End If

End Sub

Private Sub cboRespons_Change()

Dim db As Database
Dim rs As Recordset

strRole = "'" & Me.cboRespons.Value & "'"
strSQL = "SELECT tblresponsibilities.Role_name, tblresponsibilities.Responsibilities " & _
"FROM tblresponsibilities " & _
"WHERE (((tblresponsibilities.Role_name)=" & strRole & "));"


Set db = CurrentDb
Set rs = db.OpenRecordset(strSQL, dbOpenDynaset)

Do Until rs.EOF
    If rs.Fields("Responsibilities") <> "" Then
       strOutput = strOutput + rs.Fields("Responsibilities") & vbCrLf
    End If
       rs.MoveNext
Loop

Me.txtResponsList.Value = strOutput

rs.Close
Set rs = Nothing

DoCmd.SetWarnings (False)

strEmpNo = "'" & Me.Text25.Value & "'"
strSQL2 = "Delete * from [tblPrintResp]"
strSQL3 = "INSERT INTO tblPrintResp ( prtResp ) VALUES ('" & strOutput & "');"
strSQL4 = "UPDATE tblPrintResp SET tblPrintResp.CurrentRole = " & strRole & _
          "WHERE (((tblPrintResp.prtResp) Is Not Null));"
strSQL5 = "UPDATE tblPrintResp SET tblPrintResp.EmployeeNo = " & strEmpNo & _
          "WHERE (((tblPrintResp.prtResp) Is Not Null));"

DoCmd.RunSQL (strSQL2)
DoCmd.RunSQL (strSQL3)
DoCmd.RunSQL (strSQL4)
DoCmd.RunSQL (strSQL5)

DoCmd.SetWarnings (True)


End Sub

Private Sub cmbEmployeeSelect_AfterUpdate()

Dim rs As DAO.Recordset
    If Not IsNull(Me.cmbEmployeeSelect) Then
        'Save before move
        If Me.Dirty Then
            Me.Dirty = False
        End If
        'Search in the clone set
        Set rs = Me.Recordset.Clone
        rs.FindFirst "[Employee_number] = '" & Me.cmbEmployeeSelect & "'"
                
        If rs.NoMatch Then
            MsgBox "Record not found"
        Else
            'Display the found record in the form
            Me.Bookmark = rs.Bookmark
        End If
        Set rs = Nothing
    End If
    
            

End Sub

Private Sub txtResponsList_LostFocus()

DoCmd.SetWarnings (False)
 
strRole = "'" & [Forms]![frmPrintSelect]![cboRespons] & "'"
strNum = "'" & [Forms]![frmPrintSelect]![Text25] & "'"
strOutput = [Forms]![frmPrintSelect]![txtResponsList]


strSQL2 = "Delete * from [tblPrintResp]"
strSQL3 = "INSERT INTO tblPrintResp ( prtResp ) VALUES ('" & strOutput & "');"
strSQL4 = "UPDATE tblPrintResp SET tblPrintResp.CurrentRole = " & strRole & _
          "WHERE (((tblPrintResp.prtResp) Is Not Null));"
strSQL5 = "UPDATE tblPrintResp SET tblPrintResp.EmployeeNo = " & strNum & _
          "WHERE (((tblPrintResp.prtResp) Is Not Null));"


DoCmd.RunSQL (strSQL2)
DoCmd.RunSQL (strSQL3)
DoCmd.RunSQL (strSQL4)
DoCmd.RunSQL (strSQL5)

DoCmd.SetWarnings (True)

End Sub
