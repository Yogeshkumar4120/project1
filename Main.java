import java.util.*;
class Main
{


static void findMax(int arr1[])
{
   int[] arr2=new int[arr1.length];

   Arrays.sort(arr1);
   int count=0;
   for(int i=0;i<arr1.length/2+1;i++)
   {
        arr2[count++]=arr1[i];
        count++;
      
   }
   int rem=arr1.length-arr1.length/2;
  count=1;
   for(int i=arr1.length-1;i>=rem;i--)
   {
        arr2[count++]=arr1[i];
        count++;
   }

   for(int i=0;i<arr2.length;i++)
   {
    System.out.print(arr2[i]+"  ");
   }
}

public static void main(String[] args)
{
    int a[] = {5, 8, 1, 4, 2, 9, 3, 7,6};
    int K = 5;

    
  findMax(a);
}
}


