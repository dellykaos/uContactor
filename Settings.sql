GO
SET IDENTITY_INSERT [dbo].[ContactSettings] ON 

GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (1, N'PageSize', N'10', N'Page Size', N'', 9)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (2, N'AutoReplyMessage', N'<p>Dear <strong>%name%</strong></p>
<p>Thanks for contacting us.</p>
<p>Your message detail is:</p>
<p><strong>Subject:</strong></p>
<table border="1" cellpadding="5" width="457" height="8">
<tbody>
<tr>
<td>%subject%</td>
</tr>
</tbody>
</table>
<p><strong>Message:</strong></p>
<table border="1" cellpadding="5" width="721" height="19">
<tbody>
<tr>
<td>%message%</td>
</tr>
</tbody>
</table>
<p>We will be in touch soon.</p>
<p>Thanks<br />Delly</p>', N'Auto Reply Message', N'', 3)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (3, N'TemplateNode', N'1407', N'Auto Reply Template', N'*Fill with 0 to use auto reply template above', 4)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (4, N'SendNotificationTo', N'dellykaos@gmail.com,dellynyman@outlook.com', N'Send Notification To', N'*Use commas to include multiple email', 7)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (5, N'NotificationMessage', N'<p>You have new message from %name% with details:</p>
<p><strong>Subject:</strong></p>
<table border="1" cellpadding="5" width="457" height="8">
<tbody>
<tr>
<td>%subject%</td>
</tr>
</tbody>
</table>
<p><strong>Message:</strong></p>
<table border="1" cellpadding="5" width="721" height="19">
<tbody>
<tr>
<td>%message%</td>
</tr>
</tbody>
</table>
<p>Please reply this message as soon as possible</p>
<p>Thanks<br />Delly</p>', N'Notification Message', N'', 6)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (6, N'AutoReplySubject', N'Thanks for contacting us %name%', N'Auto Reply Subject', N'', 2)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (7, N'NotificationSubject', N'New message from %name%', N'Notification Subject', N'', 5)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (8, N'NotificationTemplateNode', N'1407', N'Notification Template', N'*Fill with 0 to use notification template above', 8)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (9, N'SenderEmail', N'noreply@gmail.com', N'Sender Email', N'', 0)
GO
INSERT [dbo].[ContactSettings] ([Id], [configName], [configValue], [configDisplayText], [configHelperText], [configSort]) VALUES (10, N'DisplayNameSender', N'Noreply You Website', N'Display Name Sender', N'', 1)
GO
SET IDENTITY_INSERT [dbo].[ContactSettings] OFF
GO
