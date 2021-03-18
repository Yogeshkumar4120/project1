import java.util.*;
public class Main2
{
	public static void main(String... a)
	{
		Scanner sc=new Scanner(System.in);
		String str=sc.next();
		str=str.toLowerCase();
		int count=0;

		for(int i=0;i<str.length();i++)
		{
			if(str.charAt(i)>97 && str.charAt(i)<122)
			{
				count++;
			}
		}

		char[] ch=new char[count];
		int num=0;
		for(int i=0;i<str.length();i++)
		{
			if(str.charAt(i)>97 && str.charAt(i)<122)
			{
				ch[num]=str.charAt(i);
				num++;
			}
		}

		boolean isPal=true;
		int size=ch.length/2;
		for(int i=0;i<size;i++)
		{
			if(ch[i]!=ch[ch.length-i])
			{
				isPal=false;
				break;
			}
		}

		if(isPal)
		{
			System.out.println("palindrome");
		}
		else
		{
			System.out.println("not a palindrome");	
		}
	} 
}