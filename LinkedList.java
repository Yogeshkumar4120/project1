
import java.util.HashMap;
import java.util.HashSet;

class LinkedList {
	Node head; 
	Node tail;
	int size;
	
	class Node {
		int data;
		Node next;
		Node(int d)
		{
			data = d;
			next = null;
		}
	}

	public void traverse()
	{
		Node temp=this.head;
		while(temp!=null)
		{
			System.out.print(temp.data+" ");
			temp=temp.next;
		}
		System.out.println();
	}
	public void addLast(int item)
	{
		Node n=new Node(item);
		if(size==0)
		{
			this.head=n;
			this.tail=n;
		}
		else
		{
			this.tail.next=n;
			this.tail=n;
		}
		size++;
	}

	public Node getAt(int index)
	{
			Node temp=head;
		for(int i=0;i<index;i++)
		{
			temp=temp.next;
		}
		return temp;
	}

	public void reverse(int K)
	{
		int time=size/K;
		
		int tempK=K;
		for(int i=0;i<time;i++)
		{
			int first=tempK*i;
			int last=K*(i+1)-1;
		

			while (first<last) {
					Node left=getAt(first);
					Node right=getAt(last);
					int temp=left.data;
					left.data=right.data;
					right.data=temp;
			
					first++;
					last--;
			}


			
		}
		
	}

	
	public static void main(String args[])
	{
		LinkedList l=new LinkedList();
		l.addLast(10);
		l.addLast(20);
		l.addLast(30);
		l.addLast(40);
		l.addLast(50);
		l.addLast(60);
		l.traverse();
		l.reverse(3);
		l.traverse();
			
	}
}

