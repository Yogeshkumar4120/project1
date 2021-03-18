import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import java.util.*;
public class RegisterServlet extends HttpServlet
{
	public void service(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException 
	{
		PrintWriter out=res.getWriter();
		res.setContentType("text/html");
		String name=req.getParameter("name");
		String email=req.getParameter("email");
		String password=req.getParameter("password");
		String phone=req.getParameter("phone");
		try
		{
			Class.forName("com.mysql.jdbc.Driver");
			Connection c=DriverManager.getConnection("jdbc:mysql://localhost:3306/RentPePhone","root","rootroot");
			Statement s=c.createStatement();
			ResultSet rs=s.executeQuery("select * from logindetails where email='"+email+"' or phoneno='"+phone+"'");
			if(rs.next())
			{
				out.println("<h1>account already used.Try to login or register using different id</h1>");
			}
			else
			{
			String sss="insert into logindetails values('"+name+"','"+email+"','"+phone+"','"+password+"','0')";
			s.executeUpdate(sss);
			out.println("<h1>You have registered Successfully</h1>");
			}
			res.setHeader("Refresh","1;index.html");

		}
		catch(Exception e)
		{
			out.println(e.getMessage());
		}
	}
}