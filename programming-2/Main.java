import java.util.Scanner;

public class Main{
    public static void main(String args[]){
        
        Scanner keyboard = new Scanner(System.in);
        Name a, b;
        String input;
        
        a = new Name();
        System.out.println("Please enter first name:");
        input = keyboard.nextLine();
        a.setFirstName(input);
        System.out.println("Please enter middle name:");
        input = keyboard.nextLine();
        a.setMidName(input);
        System.out.println("Please enter last name:");
        input = keyboard.nextLine();
        a.setLastName(input);
       
        b = new Name();
        System.out.println("Please enter first name:");
        input = keyboard.nextLine();
        b.setFirstName(input);
        System.out.println("Please enter middle name:");
        input = keyboard.nextLine();
        b.setMidName(input);
        System.out.println("Please enter last name:");
        input = keyboard.nextLine();
        b.setLastName(input);
       
       
       
       
       a.printFullName();
       a.printWithInitial();
       b.printFullName();
       b.printWithInitial();
    }
    
}