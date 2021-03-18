import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import java.util.*;
import com.oreilly.servlet.*;
import javax.servlet.annotation.*;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
@WebServlet(urlPatterns={"/SaveData"})
@MultipartConfig(maxFileSize=16177216)
public class SaveData extends HttpServlet
{
	public void service(HttpServletRequest request,HttpServletResponse res) throws ServletException,IOException 
	{
		res.setContentType("text/html");
		PrintWriter out=res.getWriter();
		HttpSession session=request.getSession(false);
            
            String name=(String)session.getAttribute("name");

            String email=(String)session.getAttribute("email");
            String phoneno=(String)session.getAttribute("phoneno");
            Connection conn=null;
PreparedStatement pstmt = null;
ResultSet rs=null;
String url="jdbc:mysql://localhost:3306/rentpephone";



String phones=request.getParameter("phones"); 
String title=request.getParameter("title"); 
String Description=request.getParameter("Description");
 String time=request.getParameter("time");
String price=request.getParameter("price");



try{
Class.forName("com.mysql.jdbc.Driver").newInstance();
conn=DriverManager.getConnection(url, "root", "rootroot");

pstmt = conn.prepareStatement("insert into phonedetails(brand,title,description,time ,price,email,phoneno ) " + "values(?,?,?,?,?,?,?)");
pstmt.setString(1, phones);
pstmt.setString(2, title);
pstmt.setString(3, Description);
pstmt.setString(4, time);
pstmt.setString(5, price);
session.setAttribute("title",title);
          
pstmt.setString(6,email);
pstmt.setString(7,phoneno);
int count = pstmt.executeUpdate();
if(count>0)
{
	out.println("inserted successfully");
    res.setHeader("refresh","3;upload.html");

}
else
{
out.println("not successfully");
res.setHeader("refresh","3;Display.html");
}

}
catch(Exception ex)
{
    out.println(ex);
}
}
}
