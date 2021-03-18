import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.*;
import java.io.*;
import org.apache.commons.fileupload.FileItem;

@MultipartConfig(maxFileSize = 16177216)
public class UploadImage extends HttpServlet{
 
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
				PrintWriter out=resp.getWriter();
		String connectionURL = "jdbc:mysql://localhost:3306/rentpephone";
		String user = "root";
		String pass = "rootroot";
 
		int result = 0;
		Connection con = null;
		String part=req.getParameter("image");

		if(part==null)
		{
			out.println("hello");
			out.println(part);
		}
 
		if(part != null){
			out.println(part);
		}
			/*try{
				Class.forName("com.mysql.jdbc.Driver");
			    con = DriverManager.getConnection(connectionURL, user, pass);
			    
			    PreparedStatement ps = con.prepareStatement("insert into data(image) values(?)");
			    InputStream is = part.getInputStream();
			    ps.setBlob(1, is);
			    result = ps.executeUpdate();
			}
			catch(Exception e){
				e.printStackTrace();
			}	
			finally{
				if(con != null){
					try{
						con.close();
					}
					catch(Exception e){
						e.printStackTrace();
					}
				}
			}*/
		}
		
		
}