import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.sql.*;
import java.util.*;
public class LoginServlet extends HttpServlet
{
	public void service(HttpServletRequest req,HttpServletResponse res) throws ServletException,IOException 
	{
		PrintWriter out=res.getWriter();
		res.setContentType("text/html");
		String email=req.getParameter("email");
		String password=req.getParameter("password");
		try
		{
			Class.forName("com.mysql.jdbc.Driver");

			Connection c=DriverManager.getConnection("jdbc:mysql://localhost:3306/RentPePhone","root","rootroot");
			Statement s=c.createStatement();

			ResultSet rs=s.executeQuery("select * from logindetails where email='"+email+"' and password='"+password+"'");
			if(rs.next())
			{
				String name=rs.getString("name");
				String phoneno=rs.getString("phoneno");

				
				HttpSession se=req.getSession();
				se.setAttribute("email",email);
				se.setAttribute("name",name);
				se.setAttribute("phoneno",phoneno);
				RequestDispatcher rss = req.getRequestDispatcher("search.jsp");
				rss.forward(req,res);
			}
			else
			{
				out.println("<h1> You entered wrong details try again or forget the password</h1>");
				res.setHeader("Refresh","1;index.html");
			}
		}
		catch(Exception e)
		{
			out.println(e.getMessage());
		}
	}
}