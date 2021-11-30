public class Name {
    private String firstName;
    private String midName;
    private String lastName;
    
    
    
    ////////Set and Get
    public void setFirstName(String newFirst){
        firstName = newFirst;
    }
    
    public String getFirstName(){
        return firstName;
    }
    
     public void setMidName(String newMid){
        midName = newMid;
    }
    
    public String getMidName(){
        return midName;
    }
    
     public void setLastName(String newLast){
        lastName = newLast;
    }
    
    public String getLastName(){
        return lastName;
    }
    
    
    /////////Print methods
    public void printFullName(){
        System.out.println(firstName + " " + midName + " " + lastName);
    }
    
    public void printWithInitial(){
        System.out.print(firstName + " ");
        System.out.print(midName.charAt(0) + ". ");
        System.out.println(lastName);
    }
        
}