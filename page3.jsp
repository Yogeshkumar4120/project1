<% 
int tot1 = Integer.parseInt(session.getAttribute("tot1").toString());

int tot2 = Integer.parseInt(session.getAttribute("tot2").toString());
%>

<table border=1>
<tr><td><b>Page 1:</b></td><td>Rs.<%=tot1%>/-</td></tr>
<tr><td><b>Page 2:</b></td><td>Rs.<%=tot2%>/-</td></tr>
<tr><td><b>Grand Total:</b></td><td>Rs.<%=tot1+tot2%>/-</td></tr>
</table>