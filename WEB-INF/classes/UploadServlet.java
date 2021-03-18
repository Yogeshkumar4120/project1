import java.io.*;  
import javax.servlet.ServletException;  
import javax.servlet.http.*;  
import com.oreilly.servlet.MultipartRequest;  
import java.sql.*;
public class UploadServlet extends HttpServlet {  
  
public void doPost(HttpServletRequest request, HttpServletResponse response)  
    throws ServletException, IOException {  
  
response.setContentType("text/html");  
PrintWriter out = response.getWriter();  


MultipartRequest m=new MultipartRequest(request,"/Users/yogesh/Desktop/RentPePhone");  
 String filename = m.getFilesystemName("fname");
out.println("successfully uploaded");
out.println("<br>");
String url="jdbc:mysql://localhost:3306/rentpephone";
try{
Class.forName("com.mysql.jdbc.Driver").newInstance();
Connection conn=DriverManager.getConnection(url, "root", "rootroot");
Statement s=conn.createStatement();
HttpSession session=request.getSession(false);
            
  String name=(String)session.getAttribute("name");

 String email=(String)session.getAttribute("email");
 String phoneno=(String)session.getAttribute("phoneno");
	String title=(String)session.getAttribute("title");
int x=s.executeUpdate("update phonedetails set image1='"+filename+"' where email='"+email+"' and title='"+title+"'");
}
catch(Exception e)
{

}
response.setHeader("refresh","3;search.jsp");
out.println("successfully uploaded");
out.println("<br>");

}  

}  