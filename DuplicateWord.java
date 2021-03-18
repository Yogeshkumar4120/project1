import java.util.*;
public class DuplicateWord { 


static boolean areVowelsInOrder(String s)
    {
        int n = s.length();
 
        // ASCII Value 64 is less than
        // all the alphabets
        // so using it as a default value
        char c = (char)64;
 
        // check if the vowels in
        // the string are sorted or not
        for (int i = 0; i < n; i++) {
            if (s.charAt(i) == 'a' || s.charAt(i) == 'e'
                || s.charAt(i) == 'i' || s.charAt(i) == 'o'
                || s.charAt(i) == 'u') {
 
                // if the vowel is smaller than the previous
                // vowel
                if (s.charAt(i) < c)
                    return false;
                else {
 
                    // store the vowel
                    c = s.charAt(i);
                }
            }
        }
        return true;
    }  


    public static void main(String[] args) {   
    Scanner sc=new Scanner(System.in); 
        String string =sc.nextLine();  
        int count;    
            
          
         
            
      
        String words[] = string.split(" ");    
          	    
        for(int i = 0; i < words.length; i++) {    

            count = 1;    
            for(int j = i+1; j < words.length; j++) {    
                if(words[i].equals(words[j])) {    
                    count++;    
                    //Set words[j] to 0 to avoid printing visited word    
                    words[j] = "0";    
                }    
            }    
                
          
            if(count > 1 && words[i] != "0")    
            {
            	boolean ans=areVowelsInOrder(words[i]);
            	if(ans)
            	{
            		System.out.print(words[i]+" "+count);
            	}
            }    
        }    
    }    
}    