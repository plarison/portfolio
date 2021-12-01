/* 
 * All java files for this project have been combined into a single file for this portfolio. 
 */
 
 /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hciproject;
import java.util.*;
import javax.swing.JFrame;

/**
 *
 * @author Paul
 */
public class HCIproject {
    
    public static ArrayList<AppObject> allApplications = new ArrayList<AppObject>();  //current list of applications
    public static ArrayList<Image> allImages = new ArrayList<Image>();           //current list of images
    public static ArrayList<AppObject> unusedList = new ArrayList<AppObject>();  //track unused apps
    public static int selectedImage;  //tracks the currently selected image
    public static int selectedApp;    //tracks the currently selected app
    public static String currentAppName;  //The name of the selected app
    public static double currentDiskSize;  //Disk size of the selected app, in MB
    public static int currentCores;   //Core count for the selected app
    public static double currentRAM;   //Memory usage for the selected app, in MB
    
    
    public static MainSystemPanel homePanel;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        

        
        //hardcoded apps and images
        Image image1, image2, image3;
        image1 = new Image();
        image2 = new Image();
        image3 = new Image();
        
        AppObject a, b, c, d, e;
        a = new AppObject();
        b = new AppObject();
        c = new AppObject();
        d = new AppObject();
        e = new AppObject();
        
        a.setName("MS Office");
        a.setDiskSize(2524.0);
        a.setCoresUsed(3);
        a.setRamSize(1399);
        
        b.setName("Firefox");
        b.setDiskSize(122);
        b.setCoresUsed(1);
        b.setRamSize(1577);
        
        c.setName("Acrobat");
        c.setDiskSize(682);
        c.setCoresUsed(2);
        c.setRamSize(889);
        
        d.setName("AutoCAD");
        d.setDiskSize(51229);
        d.setCoresUsed(6);
        d.setRamSize(32000);
        
        e.setName("Netbeans");
        e.setDiskSize(221);
        e.setCoresUsed(3);
        e.setRamSize(8000);        
        
        image1.setName("Sales Laptops");
        image1.addApplication(a, 200);
        image1.addApplication(b, 0);
        image1.addApplication(c, 100);
        
        image2.setName("Engineering Workstations");
        image2.addApplication(a, 200);
        image2.addApplication(b, 0);
        image2.addApplication(c, 100);
        image2.addApplication(d, 500);
        
        image3.setName("Training Desktops");
        image3.addApplication(b, 0);
        image3.addApplication(a, 0);
                
        
        //add apps and images to arraylists
        allApplications.add(a);
        allApplications.add(b);
        allApplications.add(c);
        allApplications.add(d);
        allApplications.add(e);
        
        allImages.add(image1);
        allImages.add(image2);
        allImages.add(image3);
        
        //Frame creation
        JFrame homeFrame = new JFrame("Image Management System");
        homePanel = new MainSystemPanel();
        homeFrame.setSize(560,689);
        homeFrame.setLocation(400, 200);
        homeFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        homeFrame.setResizable(true);
        homeFrame.add(homePanel);
        homeFrame.setVisible(true);
        
        
    }
    
        //Prints to console.  Still useful for debugging.
        public static void printImage(Image im){
            System.out.println("Printing contents of \"" + im.getName() + "\" image:");
            System.out.println("\tName \t\tRAM \tCores \tDisk Space \tExtra Disk Space");
            for(int i = 0; i < im.getNumberOfApplications(); i++){
                AppObject app;
                app = im.getApplication(i);
                
                System.out.print("\t" + app.getName() + "\t" + app.getDiskSize() + "\t" + 
                        app.getCoresUsed() + "\t" + app.getRamSize());
                System.out.println("\t\t" + im.getApplicationExtraData(i));
                
            }
            System.out.println("-------------------");
        } 
            
    
          
    
}

//////////////////////////////////////////////////////////////////////////////////////

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hciproject;

/**
 *
 * @author Paul
 */
public class AppObject {
    private String name;
    private int coresUsed;
    private double diskSize; //mb
    private double ramSize;  //mb 
    
    public AppObject() {
        name="";
        coresUsed=0;
        diskSize=0;
        ramSize=0;
    }
    
    public String toString() {
        String tmp = name + " [" + coresUsed + ", " + ramSize +"MB, "
                + diskSize +"MB]";
        return tmp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCoresUsed() {
        return coresUsed;
    }

    public void setCoresUsed(int coreUsed) {
        this.coresUsed = coreUsed;
    }

    public double getDiskSize() {
        return diskSize;
    }

    public void setDiskSize(double diskSize) {
        this.diskSize = diskSize;
    }

    public double getRamSize() {
        return ramSize;
    }

    public void setRamSize(double ramSize) {
        this.ramSize = ramSize;
    }
    
}

//////////////////////////////////////////////////////////////////////////////////////

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package hciproject;

import java.util.ArrayList;

/**
 *
 * @author Paul
 */
public class Image {
    private String name;
    private ArrayList<AppObject> apps;
    private ArrayList<Double> extraData;
    
    public Image(){
        name = ""; //the name won't be null, just empty
        
        apps = new ArrayList<>();
        extraData = new ArrayList<>();
    }
    
    public String toString() {
        String tmp = name;
        return tmp;
    }
    
    public void removeAllApplication(){
        apps.clear();
        extraData.clear();
    }
    
    public void addApplication(AppObject a, double d){
        apps.add(a);
        extraData.add(d);
    }
    
    public void removeApplication(int index){
        apps.remove(index);
        extraData.remove(index);
    }
    
    public void removeApplication(AppObject a){
        int index = apps.indexOf(a);
        removeApplication(index);
    }
    
    public void setApplicationData(int index, double d){
        extraData.set(index, d);
    }
    
    public void setApplicationData(AppObject a, double d){
        int index = apps.indexOf(a);
        setApplicationData(index, d);
    }
    
    public int getNumberOfApplications(){
        return apps.size();
    }
    
    public AppObject getApplication(int index){
        return apps.get(index);
    }
    
    public double getApplicationExtraData(int index){
        return extraData.get(index);
    }
    
    public double getApplicationExtraData(AppObject a){
        int index = apps.indexOf(a);
        return getApplicationExtraData(index);
    }
    
    public double getTotalExtraData(){
        double total = 0;
        for(int i = 0; i < apps.size(); i++) {
            total += extraData.get(i);
        }
        return total;
    }
            
    public int indexOf(AppObject a){
        return apps.indexOf(a);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}


//////////////////////////////////////////////////////////////////////////////////////

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package hciproject;

import java.awt.Color;
import javax.swing.*;


/**
 *
 * @author Paul
 */
public class MainSystemPanel extends javax.swing.JPanel {

    /**
     * Creates new form MainSystemPanel
     */
    public MainSystemPanel() {
        initComponents();
        
        
        this.appListRefresh();
        this.imageListRefresh();
        
        
    }
    
    public void appListRefresh(){   //updates the appsListBox
        
        //Calculate how many Images use each app
        for(int g = 0; g < HCIproject.allApplications.size(); g++) {  //iterate through all apps
            AppObject q = HCIproject.allApplications.get(g);
            String appName = HCIproject.allApplications.get(g).getName();
            int totalInstalls = 0;             
            
            //iterate through each image
            for(int h = 0; h < HCIproject.allImages.size(); h++) {                
                for(int i = 0; i < HCIproject.allImages.get(h).getNumberOfApplications(); i++) { 
                    AppObject a;
                    a = HCIproject.allImages.get(h).getApplication(i);               
                    if(appName.equals(a.getName())){
                        totalInstalls++;
                    }
                }
            }   
            
            if(totalInstalls==0){            
                HCIproject.unusedList.add(q);
            } else {
                HCIproject.unusedList.remove(q);
            }            
        }
        
        //Populate Apps List Box
        DefaultListModel appModel = (DefaultListModel) appsListBox.getModel();
        appModel.clear();
        for(int i = 0; i < HCIproject.allApplications.size(); i++) {
            AppObject a;
            a = HCIproject.allApplications.get(i);
            if(HCIproject.unusedList.contains(a)){
                appModel.addElement("*"+a.getName()); //mark unused apps with *
            } else {
                appModel.addElement(a.getName());
            }
        }
    }
    
    public void imageListRefresh(){
        //Populate Images List Box
        DefaultListModel imageModel = (DefaultListModel) imagesListBox.getModel();
        imageModel.clear();
        for(int i = 0; i < HCIproject.allImages.size(); i++) {
            Image a;
            a = HCIproject.allImages.get(i);
            imageModel.addElement(a);                        
        }
    }
    
    public void imageInfoRefresh(){
        //Generate list of applications on current image
                    DefaultListModel imageModel = (DefaultListModel) lboxAppsOnImage.getModel();   //installed apps list
                    imageModel.clear();  //clear old results
                    DefaultListModel imageModelb = (DefaultListModel) lboxAddSpace.getModel();   //extra data list
                    imageModelb.clear();  //clear old results
                    
                    //Loop through the apps on the image to populate both list boxes
                    for(int i = 0; i < HCIproject.allImages.get(HCIproject.selectedImage).getNumberOfApplications(); i++) {
                        AppObject a;
                        a = HCIproject.allImages.get(HCIproject.selectedImage).getApplication(i);
                        double b = HCIproject.allImages.get(HCIproject.selectedImage).getApplicationExtraData(i);
                        imageModel.addElement(a);
                        imageModelb.addElement(b);                        
                    }
                    
                    txtXtraSize.setText(Double.toString(HCIproject.allImages.get(HCIproject.selectedImage).getTotalExtraData()));  //populate extra data textbox
                    //Calculate Total Size 
                    double d = 0;
                    for(int i = 0; i < HCIproject.allImages.get(HCIproject.selectedImage).getNumberOfApplications(); i++) {            
                        d += HCIproject.allImages.get(HCIproject.selectedImage).getApplication(i).getDiskSize();             
                    }
                    d += HCIproject.allImages.get(HCIproject.selectedImage).getTotalExtraData();
                    txtTotalSize.setText(Double.toString(d));  //populate total size textbox
    }
    
    public Double calcTotal(){
        //Calculate Total Size 
            double d = 0;
            for(int i = 0; i < HCIproject.allImages.get(HCIproject.selectedImage).getNumberOfApplications(); i++) {            
                d += HCIproject.allImages.get(HCIproject.selectedImage).getApplication(i).getDiskSize();             
            }
            d += HCIproject.allImages.get(HCIproject.selectedImage).getTotalExtraData();
            txtTotalSize.setText(Double.toString(d));  //populate total size textbox
            return d;
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel11 = new javax.swing.JLabel();
        jScrollPane1 = new javax.swing.JScrollPane();
        imagesListBox = new javax.swing.JList<>();
        jLabel1 = new javax.swing.JLabel();
        btnAddImage = new javax.swing.JButton();
        jScrollPane2 = new javax.swing.JScrollPane();
        appsListBox = new javax.swing.JList<>();
        jLabel2 = new javax.swing.JLabel();
        btnDeleteApp = new javax.swing.JButton();
        btnDeleteImage = new javax.swing.JButton();
        btnAddAppToList = new javax.swing.JButton();
        jSeparator2 = new javax.swing.JSeparator();
        jLabel4 = new javax.swing.JLabel();
        jTextField1 = new javax.swing.JTextField();
        jButton1 = new javax.swing.JButton();
        jButton2 = new javax.swing.JButton();
        txtAppName = new javax.swing.JTextField();
        txtBasicSize = new javax.swing.JTextField();
        txtCores = new javax.swing.JTextField();
        txtMemSize = new javax.swing.JTextField();
        jLabel3 = new javax.swing.JLabel();
        jLabel5 = new javax.swing.JLabel();
        jLabel6 = new javax.swing.JLabel();
        jLabel7 = new javax.swing.JLabel();
        jScrollPane3 = new javax.swing.JScrollPane();
        lboxAppsOnImage = new javax.swing.JList<>();
        txtImageName = new javax.swing.JTextField();
        jLabel8 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        jScrollPane4 = new javax.swing.JScrollPane();
        lboxAddSpace = new javax.swing.JList<>();
        btnAppFromImage = new javax.swing.JButton();
        btnXData = new javax.swing.JButton();
        jSeparator1 = new javax.swing.JSeparator();
        btnSaveApp = new javax.swing.JButton();
        jLabel10 = new javax.swing.JLabel();
        btnAddAppToImage = new javax.swing.JButton();
        btnRename = new javax.swing.JButton();
        jLabel12 = new javax.swing.JLabel();
        txtTotalSize = new javax.swing.JTextField();
        jLabel13 = new javax.swing.JLabel();
        txtXtraSize = new javax.swing.JTextField();
        lblInstalls = new javax.swing.JLabel();
        txtInstalls = new javax.swing.JTextField();

        jLabel11.setText("jLabel11");

        setBackground(new java.awt.Color(204, 204, 204));
        setBorder(javax.swing.BorderFactory.createLineBorder(new java.awt.Color(0, 0, 0)));
        setMaximumSize(new java.awt.Dimension(540, 644));
        setMinimumSize(new java.awt.Dimension(540, 644));

        imagesListBox.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        imagesListBox.setModel(new DefaultListModel());
        imagesListBox.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        imagesListBox.setToolTipText("Lists available images");
        imagesListBox.setName("lstImageList"); // NOI18N
        imagesListBox.addListSelectionListener(new javax.swing.event.ListSelectionListener() {
            public void valueChanged(javax.swing.event.ListSelectionEvent evt) {
                imagesListBoxValueChanged(evt);
            }
        });
        jScrollPane1.setViewportView(imagesListBox);

        jLabel1.setFont(new java.awt.Font("Tahoma", 1, 24)); // NOI18N
        jLabel1.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel1.setText("Images");

        btnAddImage.setText("Add Image");
        btnAddImage.setToolTipText("Create new image");
        btnAddImage.setName("btnAddImage"); // NOI18N

        appsListBox.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        appsListBox.setModel(new DefaultListModel());
        appsListBox.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        appsListBox.setToolTipText("Lists available applications");
        appsListBox.setName("lstAppList"); // NOI18N
        appsListBox.addListSelectionListener(new javax.swing.event.ListSelectionListener() {
            public void valueChanged(javax.swing.event.ListSelectionEvent evt) {
                appsListBoxValueChanged(evt);
            }
        });
        jScrollPane2.setViewportView(appsListBox);

        jLabel2.setFont(new java.awt.Font("Tahoma", 1, 24)); // NOI18N
        jLabel2.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel2.setText("Applications");

        btnDeleteApp.setText("Delete App");
        btnDeleteApp.setToolTipText("Delete an application");
        btnDeleteApp.setEnabled(false);
        btnDeleteApp.setName("btnDelApp"); // NOI18N
        btnDeleteApp.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnDeleteAppActionPerformed(evt);
            }
        });

        btnDeleteImage.setText("Delete Image");
        btnDeleteImage.setToolTipText("Delete an image");
        btnDeleteImage.setEnabled(false);
        btnDeleteImage.setName("btnDelImage"); // NOI18N
        btnDeleteImage.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnDeleteImageActionPerformed(evt);
            }
        });

        btnAddAppToList.setText("Add App to List");
        btnAddAppToList.setToolTipText("Create new application");
        btnAddAppToList.setName("btnAddAppToList"); // NOI18N
        btnAddAppToList.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnAddAppToListActionPerformed(evt);
            }
        });

        jLabel4.setFont(new java.awt.Font("Tahoma", 1, 24)); // NOI18N
        jLabel4.setHorizontalAlignment(javax.swing.SwingConstants.CENTER);
        jLabel4.setText("IFSC 2340 Image Management Project");

        jTextField1.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jTextField1.setText("Please Load Organization");

        jButton1.setText("Load");
        jButton1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton1ActionPerformed(evt);
            }
        });

        jButton2.setText("Save ");

        txtAppName.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        txtAppName.setToolTipText("");
        txtAppName.addCaretListener(new javax.swing.event.CaretListener() {
            public void caretUpdate(javax.swing.event.CaretEvent evt) {
                txtAppNameCaretUpdate(evt);
            }
        });

        txtBasicSize.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        txtBasicSize.setToolTipText("");
        txtBasicSize.addCaretListener(new javax.swing.event.CaretListener() {
            public void caretUpdate(javax.swing.event.CaretEvent evt) {
                txtBasicSizeCaretUpdate(evt);
            }
        });

        txtCores.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        txtCores.addCaretListener(new javax.swing.event.CaretListener() {
            public void caretUpdate(javax.swing.event.CaretEvent evt) {
                txtCoresCaretUpdate(evt);
            }
        });

        txtMemSize.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        txtMemSize.setToolTipText("");
        txtMemSize.addCaretListener(new javax.swing.event.CaretListener() {
            public void caretUpdate(javax.swing.event.CaretEvent evt) {
                txtMemSizeCaretUpdate(evt);
            }
        });

        jLabel3.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel3.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel3.setText("Program Name:");

        jLabel5.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel5.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel5.setText("Size on Disk (MB):");

        jLabel6.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel6.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel6.setText("CPU Cores:");

        jLabel7.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel7.setHorizontalAlignment(javax.swing.SwingConstants.TRAILING);
        jLabel7.setText("RAM Usage (MB):");

        lboxAppsOnImage.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        lboxAppsOnImage.setModel(new DefaultListModel());
        lboxAppsOnImage.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        lboxAppsOnImage.setToolTipText("Applications that are installed on this image");
        lboxAppsOnImage.addListSelectionListener(new javax.swing.event.ListSelectionListener() {
            public void valueChanged(javax.swing.event.ListSelectionEvent evt) {
                lboxAppsOnImageValueChanged(evt);
            }
        });
        jScrollPane3.setViewportView(lboxAppsOnImage);

        txtImageName.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        txtImageName.addCaretListener(new javax.swing.event.CaretListener() {
            public void caretUpdate(javax.swing.event.CaretEvent evt) {
                txtImageNameCaretUpdate(evt);
            }
        });

        jLabel8.setFont(new java.awt.Font("Tahoma", 1, 14)); // NOI18N
        jLabel8.setText("Installed Applications:");

        jLabel9.setFont(new java.awt.Font("Tahoma", 1, 14)); // NOI18N
        jLabel9.setText("Extra (MB):");
        jLabel9.setToolTipText("");

        lboxAddSpace.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N
        lboxAddSpace.setModel(new DefaultListModel());
        lboxAddSpace.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        lboxAddSpace.setToolTipText("Disk space in addition to basic app size");
        lboxAddSpace.addListSelectionListener(new javax.swing.event.ListSelectionListener() {
            public void valueChanged(javax.swing.event.ListSelectionEvent evt) {
                lboxAddSpaceValueChanged(evt);
            }
        });
        jScrollPane4.setViewportView(lboxAddSpace);

        btnAppFromImage.setText("Remove App From Image");
        btnAppFromImage.setToolTipText("Delete app from only this image");
        btnAppFromImage.setEnabled(false);

        btnXData.setText("Edit X Data");
        btnXData.setToolTipText("Change extra data value for selected app");
        btnXData.setEnabled(false);
        btnXData.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnXDataActionPerformed(evt);
            }
        });

        btnSaveApp.setText("Save Changes");
        btnSaveApp.setEnabled(false);
        btnSaveApp.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnSaveAppActionPerformed(evt);
            }
        });

        jLabel10.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel10.setText("Name:");

        btnAddAppToImage.setText("Add to Image");
        btnAddAppToImage.setEnabled(false);

        btnRename.setText("Rename");
        btnRename.setToolTipText("");
        btnRename.setEnabled(false);
        btnRename.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btnRenameActionPerformed(evt);
            }
        });

        jLabel12.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel12.setText("Total MB:");

        txtTotalSize.setEditable(false);
        txtTotalSize.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N

        jLabel13.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        jLabel13.setText("Total Extra:");

        txtXtraSize.setEditable(false);
        txtXtraSize.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N

        lblInstalls.setFont(new java.awt.Font("Tahoma", 1, 12)); // NOI18N
        lblInstalls.setText("Images Using:");

        txtInstalls.setEditable(false);
        txtInstalls.setFont(new java.awt.Font("Tahoma", 0, 12)); // NOI18N

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jLabel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(jSeparator2)
                    .addComponent(jLabel4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 136, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGap(18, 18, 18)
                                .addComponent(jLabel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                .addGap(124, 124, 124))
                            .addGroup(layout.createSequentialGroup()
                                .addGap(12, 12, 12)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(btnAddAppToList, javax.swing.GroupLayout.PREFERRED_SIZE, 122, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(btnSaveApp, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(btnDeleteApp, javax.swing.GroupLayout.PREFERRED_SIZE, 120, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(btnAddAppToImage, javax.swing.GroupLayout.PREFERRED_SIZE, 122, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addComponent(jLabel6, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel7, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(lblInstalls, javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addComponent(jLabel5, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel3, javax.swing.GroupLayout.Alignment.TRAILING, javax.swing.GroupLayout.PREFERRED_SIZE, 114, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(txtMemSize, javax.swing.GroupLayout.DEFAULT_SIZE, 112, Short.MAX_VALUE)
                                    .addComponent(txtCores)
                                    .addComponent(txtBasicSize)
                                    .addComponent(txtAppName)
                                    .addComponent(txtInstalls))
                                .addGap(8, 8, 8))))
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                        .addComponent(jTextField1, javax.swing.GroupLayout.DEFAULT_SIZE, 346, Short.MAX_VALUE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(jButton1, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(jButton2, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE))
                                    .addGroup(layout.createSequentialGroup()
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addComponent(btnAddImage, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                            .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE)
                                            .addComponent(btnDeleteImage, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                            .addGroup(layout.createSequentialGroup()
                                                .addGap(61, 61, 61)
                                                .addComponent(txtImageName, javax.swing.GroupLayout.PREFERRED_SIZE, 159, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                .addComponent(btnRename, javax.swing.GroupLayout.PREFERRED_SIZE, 84, javax.swing.GroupLayout.PREFERRED_SIZE))
                                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                                .addGap(18, 18, 18)
                                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                                    .addComponent(btnAppFromImage, javax.swing.GroupLayout.PREFERRED_SIZE, 180, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                    .addGroup(layout.createSequentialGroup()
                                                        .addComponent(jLabel8)
                                                        .addGap(54, 54, 54)
                                                        .addComponent(jLabel9))
                                                    .addComponent(jLabel10)
                                                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
                                                        .addGroup(layout.createSequentialGroup()
                                                            .addComponent(jScrollPane3, javax.swing.GroupLayout.PREFERRED_SIZE, 205, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                            .addComponent(jScrollPane4, javax.swing.GroupLayout.PREFERRED_SIZE, 0, Short.MAX_VALUE))
                                                        .addGroup(layout.createSequentialGroup()
                                                            .addComponent(jLabel12)
                                                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                            .addComponent(txtTotalSize, javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
                                                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                                            .addComponent(jLabel13)
                                                            .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                                            .addComponent(txtXtraSize, javax.swing.GroupLayout.PREFERRED_SIZE, 56, javax.swing.GroupLayout.PREFERRED_SIZE))))))))
                                .addGap(10, 10, 10))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                    .addComponent(btnXData)
                                    .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, 502, javax.swing.GroupLayout.PREFERRED_SIZE))
                                .addGap(16, 16, 16)))
                        .addGap(0, 0, Short.MAX_VALUE)))
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(jLabel4, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jSeparator2, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jTextField1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jButton2)
                    .addComponent(jButton1))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(txtImageName, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel10)
                            .addComponent(btnRename))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel8)
                            .addComponent(jLabel9))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(jScrollPane4, javax.swing.GroupLayout.DEFAULT_SIZE, 171, Short.MAX_VALUE)
                            .addComponent(jScrollPane3)))
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 223, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(jLabel12)
                            .addComponent(txtTotalSize, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel13)
                            .addComponent(txtXtraSize, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(btnAddImage))))
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addGap(7, 7, 7)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(btnAppFromImage)
                            .addComponent(btnDeleteImage)))
                    .addGroup(layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(btnXData)))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jSeparator1, javax.swing.GroupLayout.PREFERRED_SIZE, 10, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 28, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(18, 18, 18)
                        .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(layout.createSequentialGroup()
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtAppName, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel3))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtBasicSize, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel5))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtCores, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel6))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtMemSize, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(jLabel7))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                                    .addComponent(txtInstalls, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                                    .addComponent(lblInstalls)))
                            .addGroup(layout.createSequentialGroup()
                                .addComponent(btnSaveApp)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(btnAddAppToList)
                                .addGap(9, 9, 9)
                                .addComponent(btnAddAppToImage)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                                .addComponent(btnDeleteApp))))
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 203, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap())
        );
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton1ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jButton1ActionPerformed

    private void btnDeleteAppActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnDeleteAppActionPerformed
        
        int deleteMe = appsListBox.getSelectedIndex();    //selected index from list box  
        String deleteAppName = HCIproject.allApplications.get(deleteMe).getName();  //selected name for image modification
                
        if (deleteMe != -1) {   //make sure something is selected
            //Confirmation pop-up:
        int result = JOptionPane.showConfirmDialog(null, "This will delete \"" + HCIproject.currentAppName + "\" and remove it from all images.  This action cannot be undone.", 
                "Delete \"" + HCIproject.currentAppName + "\"?", JOptionPane.WARNING_MESSAGE, JOptionPane.OK_CANCEL_OPTION);
                    
                if (result == 0) {  //result == 0 means 'OK'
                    //remove selection from allApplications list
                    HCIproject.allApplications.remove(deleteMe);
                    this.appListRefresh();

                    //iterate through images, removing all instances of the deleted app
                    for(int j = 0; j < HCIproject.allImages.size(); j++) {
                        Image m = HCIproject.allImages.get(j);
                        for(int k = 0; k < m.getNumberOfApplications(); k++) {
                            AppObject a = m.getApplication(k);
                            if(deleteAppName == a.getName()) {
                                HCIproject.allImages.get(j).removeApplication(k);                   
                            }
                        }
                    }
                    
                    //print to console to make sure apps are being removed from image objects
                    //for(int l = 0; l < HCIproject.allImages.size(); l++) {
                      //  HCIproject.printImage(HCIproject.allImages.get(l));                        
                //    }                
                
                    if(imagesListBox.getSelectedIndex()!=-1){
                    this.imageInfoRefresh();
                    txtXtraSize.setText(Double.toString(HCIproject.allImages.get(HCIproject.selectedImage).getTotalExtraData()));  //populate extra data textbox        
                    txtTotalSize.setText(Double.toString(this.calcTotal()));  //populate total size textbox   
                }
                }
            }
    }//GEN-LAST:event_btnDeleteAppActionPerformed

    private void btnRenameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnRenameActionPerformed
        //rename selected image
        String newName = txtImageName.getText();
        HCIproject.allImages.get(HCIproject.selectedImage).setName(newName);
        txtImageName.setBorder(BorderFactory.createEmptyBorder());  //clear border
        
        this.imageListRefresh();
    }//GEN-LAST:event_btnRenameActionPerformed

    private void txtAppNameCaretUpdate(javax.swing.event.CaretEvent evt) {//GEN-FIRST:event_txtAppNameCaretUpdate
        
        String input = txtAppName.getText();  //get value from textbox
        
        //If the value changes, enable save button and highlight the changed field
        if(input == null ? HCIproject.currentAppName != null : !input.equals(HCIproject.currentAppName)){
            btnSaveApp.setEnabled(true);
            txtAppName.setBorder(BorderFactory.createMatteBorder(2,2,2,2, Color.red));
        } else {  //if the value is or returns to the current value, disable save and highlight
            btnSaveApp.setEnabled(false);
            txtAppName.setBorder(BorderFactory.createEmptyBorder());
        }
        
    }//GEN-LAST:event_txtAppNameCaretUpdate

    private void txtBasicSizeCaretUpdate(javax.swing.event.CaretEvent evt) {//GEN-FIRST:event_txtBasicSizeCaretUpdate
        
        String input = txtBasicSize.getText();  //get value from textbox
        double size;  // store the input to a double
        
        try{
                size = Double.parseDouble(input);   //validate that input is a number
            }
            catch(Exception E){
                btnSaveApp.setEnabled(false);
                return;                
            }
        
        //If the value changes, enable save button and highlight the changed field
        if(size!=HCIproject.currentDiskSize){
            btnSaveApp.setEnabled(true);
            txtBasicSize.setBorder(BorderFactory.createMatteBorder(2,2,2,2, Color.red));            
        } else {  //if the value is or returns to the current value, disable save and highlight
            btnSaveApp.setEnabled(false);
            txtBasicSize.setBorder(BorderFactory.createEmptyBorder());
        }        
    }//GEN-LAST:event_txtBasicSizeCaretUpdate

    private void txtCoresCaretUpdate(javax.swing.event.CaretEvent evt) {//GEN-FIRST:event_txtCoresCaretUpdate
            
        String input = txtCores.getText();  //get value from textbox
        int size;  // store the input to a double
        
        try{
                size = Integer.parseInt(input);   //validate that input is a number
            }
            catch(Exception E){
                btnSaveApp.setEnabled(false);
                return;                
            }
        
        //If the value changes, enable save button and highlight the changed field
        if(size!=HCIproject.currentCores){
            btnSaveApp.setEnabled(true);
            txtCores.setBorder(BorderFactory.createMatteBorder(2,2,2,2, Color.red));            
        } else {  //if the value is or returns to the current value, disable save and highlight
            btnSaveApp.setEnabled(false);
            txtCores.setBorder(BorderFactory.createEmptyBorder());
        }        
    }//GEN-LAST:event_txtCoresCaretUpdate

    private void txtMemSizeCaretUpdate(javax.swing.event.CaretEvent evt) {//GEN-FIRST:event_txtMemSizeCaretUpdate
            
        String input = txtMemSize.getText();  //get value from textbox
        double size;  // store the input to a double
        
        try{
                size = Double.parseDouble(input);   //validate that input is a number
            }
            catch(Exception E){
                btnSaveApp.setEnabled(false);
                return;                
            }
        
        //If the value changes, enable save button and highlight the changed field
        if(size!=HCIproject.currentRAM){
            btnSaveApp.setEnabled(true);
            txtMemSize.setBorder(BorderFactory.createMatteBorder(2,2,2,2, Color.red));            
        } else {  //if the value is or returns to the current value, disable save and highlight
            btnSaveApp.setEnabled(false);
            txtMemSize.setBorder(BorderFactory.createEmptyBorder());
        }        
    }//GEN-LAST:event_txtMemSizeCaretUpdate

    private void btnSaveAppActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnSaveAppActionPerformed
            
        //ADD SAVE FUNCTION HERE
       
        
       
        //update UI after changes
        appsListBox.repaint();
        lboxAppsOnImage.repaint();
        //clear box borders and disable save button
        //clear any border colors
        txtAppName.setBorder(BorderFactory.createEmptyBorder());
        txtBasicSize.setBorder(BorderFactory.createEmptyBorder());
        txtCores.setBorder(BorderFactory.createEmptyBorder());
        txtMemSize.setBorder(BorderFactory.createEmptyBorder());
        btnSaveApp.setEnabled(false);
    }//GEN-LAST:event_btnSaveAppActionPerformed

    private void btnDeleteImageActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnDeleteImageActionPerformed
        
        HCIproject.selectedImage = imagesListBox.getSelectedIndex();  //get selected index from Image list box
        if (HCIproject.selectedImage != -1) {   //make sure something is selected
            //confirmation pop-up:
            String imName = HCIproject.allImages.get(HCIproject.selectedImage).getName();
            int result = JOptionPane.showConfirmDialog(null, "Are you sure you want to permanently delete\n\"" +
                    imName + "\"?\nThis action cannot be undone", "Delete \"" + imName + "\"?",
                JOptionPane.WARNING_MESSAGE, JOptionPane.OK_CANCEL_OPTION);
                if (result == 0) {  //result 0 means 'ok'                    
                    HCIproject.allImages.remove(HCIproject.selectedImage);  //deletes image at selected index
                    
                    //repopulate list box
                    this.imageListRefresh();
                    txtTotalSize.setText("");  //clear total data textbox
                    txtXtraSize.setText("");  //clear extra data textbox
                    txtImageName.setText("");  //clear image name
                    
                    //Clear listboxes                   
                    DefaultListModel imageModelb = (DefaultListModel) lboxAppsOnImage.getModel();   //installed apps list
                    imageModelb.clear();  //clear old results                    
                    DefaultListModel imageModelc = (DefaultListModel) lboxAddSpace.getModel();   //extra data list
                    imageModelc.clear();  //clear old results
                    
                    btnDeleteImage.setEnabled(false);  //disable button because the selection is gone
                    txtImageName.setBorder(BorderFactory.createEmptyBorder());      //prevent value change from turning box red             
                }
                                
            }
    }//GEN-LAST:event_btnDeleteImageActionPerformed

    private void txtImageNameCaretUpdate(javax.swing.event.CaretEvent evt) {//GEN-FIRST:event_txtImageNameCaretUpdate
        
        String input = txtImageName.getText();  //get value from textbox        
        
        if(HCIproject.selectedImage < imagesListBox.getLastVisibleIndex()){   //prevents errors from deleting last image on list
            
        //If the value changes, enable save button and highlight the changed field
        if(input == null ? HCIproject.currentAppName != null : !input.equals(HCIproject.allImages.get(HCIproject.selectedImage).getName())){
            btnRename.setEnabled(true);
            txtImageName.setBorder(BorderFactory.createMatteBorder(2,2,2,2, Color.red));
        } else {  //if the value is or returns to the current value, disable save and highlight
            btnRename.setEnabled(false);
            txtImageName.setBorder(BorderFactory.createEmptyBorder());
        } 
    } 
    }//GEN-LAST:event_txtImageNameCaretUpdate

    private void btnXDataActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnXDataActionPerformed
        
        Double x = 0.0;
        int imageAppIndex=lboxAppsOnImage.getSelectedIndex();  //get the selected app
        String xtraAppName = HCIproject.allImages.get(HCIproject.selectedImage).getApplication(imageAppIndex).getName();   //selected app name
        Double currentXtra = HCIproject.allImages.get(HCIproject.selectedImage).getApplicationExtraData(imageAppIndex);  //selected image name
        
        String input = JOptionPane.showInputDialog(null, "Enter new Extra Data value for \"" + xtraAppName + "\"\non the \""
                + HCIproject.allImages.get(HCIproject.selectedImage).getName() + "\" image?", currentXtra);  //popup to get new value
        
        try{
                x = Double.parseDouble(input);   //validate that input is a number
            }
            catch(Exception E){
                btnSaveApp.setEnabled(false);
                return;                
            }
        HCIproject.allImages.get(HCIproject.selectedImage).setApplicationData(imageAppIndex,x);
        
        //Generate list of applications on current image
                    this.imageInfoRefresh();
                    
                    txtXtraSize.setText(Double.toString(HCIproject.allImages.get(HCIproject.selectedImage).getTotalExtraData()));  //populate extra data textbox        
                    txtTotalSize.setText(Double.toString(this.calcTotal()));  //populate total size textbox  
        
        
    }//GEN-LAST:event_btnXDataActionPerformed

    private void lboxAppsOnImageValueChanged(javax.swing.event.ListSelectionEvent evt) {//GEN-FIRST:event_lboxAppsOnImageValueChanged
        int selected = lboxAppsOnImage.getSelectedIndex();
        lboxAddSpace.setSelectedIndex(selected);
        btnXData.setEnabled(true);
        btnAppFromImage.setEnabled(true);
    }//GEN-LAST:event_lboxAppsOnImageValueChanged

    private void lboxAddSpaceValueChanged(javax.swing.event.ListSelectionEvent evt) {//GEN-FIRST:event_lboxAddSpaceValueChanged
        int selected = lboxAddSpace.getSelectedIndex();
        lboxAppsOnImage.setSelectedIndex(selected);
        btnXData.setEnabled(true);
        btnAppFromImage.setEnabled(true);
    }//GEN-LAST:event_lboxAddSpaceValueChanged

    private void imagesListBoxValueChanged(javax.swing.event.ListSelectionEvent evt) {//GEN-FIRST:event_imagesListBoxValueChanged
            
        if(imagesListBox.getSelectedIndex()!=-1){  //make sure something is selected
            //Populate Image properties into text boxes (on button click)
            HCIproject.selectedImage = imagesListBox.getSelectedIndex();    //selected index from list box
        
            txtImageName.setText(HCIproject.allImages.get(HCIproject.selectedImage).getName());  //Populate name textbox        
            txtXtraSize.setText(Double.toString(HCIproject.allImages.get(HCIproject.selectedImage).getTotalExtraData()));  //populate extra data textbox        
            txtTotalSize.setText(Double.toString(this.calcTotal()));  //populate total size textbox       
        
            this.imageInfoRefresh();
            
            //adjust buttons because the selection cleared
            btnXData.setEnabled(false);
            btnAppFromImage.setEnabled(false);
            btnDeleteImage.setEnabled(true);
        }
    }//GEN-LAST:event_imagesListBoxValueChanged

    private void appsListBoxValueChanged(javax.swing.event.ListSelectionEvent evt) {//GEN-FIRST:event_appsListBoxValueChanged
        if(appsListBox.getSelectedIndex()!=-1){  //make sure something is selected

        //Populate AppObject properties into text boxes (on button click)
        HCIproject.selectedApp = appsListBox.getSelectedIndex();    //selected index from list box
        
        //save the loaded values for use by other functions
        HCIproject.currentAppName = HCIproject.allApplications.get(HCIproject.selectedApp).getName();
        HCIproject.currentDiskSize = HCIproject.allApplications.get(HCIproject.selectedApp).getDiskSize();
        HCIproject.currentCores = HCIproject.allApplications.get(HCIproject.selectedApp).getCoresUsed();
        HCIproject.currentRAM = HCIproject.allApplications.get(HCIproject.selectedApp).getRamSize();
        
        //Set text of each box to the appropriate string value
        txtAppName.setText(HCIproject.currentAppName);
        txtBasicSize.setText(String.valueOf(HCIproject.currentDiskSize));
        txtCores.setText(String.valueOf(HCIproject.currentCores));
        txtMemSize.setText(String.valueOf(HCIproject.currentRAM));
        
        //clear any border colors
        txtAppName.setBorder(BorderFactory.createEmptyBorder());
        txtBasicSize.setBorder(BorderFactory.createEmptyBorder());
        txtCores.setBorder(BorderFactory.createEmptyBorder());
        txtMemSize.setBorder(BorderFactory.createEmptyBorder());
        
        btnDeleteApp.setEnabled(true);
        btnAddAppToImage.setEnabled(true);
        
        //Calculate how many Images use this app
        int totalInstalls = 0; 
        for(int h = 0; h < HCIproject.allImages.size(); h++) {			
            for(int i = 0; i < HCIproject.allImages.get(h).getNumberOfApplications(); i++) {
                AppObject a;
                a = HCIproject.allImages.get(h).getApplication(i);
		if(HCIproject.currentAppName == a.getName()){
                    totalInstalls++;
                }
            }
        }
        txtInstalls.setText(Integer.toString(totalInstalls));
        if(totalInstalls == 0){
            lblInstalls.setText("*APP IS UNUSED");
        } else {
            lblInstalls.setText("Images Using:");
        }
        }
    }//GEN-LAST:event_appsListBoxValueChanged

    
    private void btnAddAppToListActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btnAddAppToListActionPerformed
        // TODO add your handling code here:
        String text = txtAppName.getText();

        DefaultListModel model = (DefaultListModel)appsListBox.getModel();

        AppObject app = new AppObject();
        
        //something must have been selected bcause the button is enabled
        //get the information from the textfields and store that into my Application object
        String s;
        s = txtAppName.getText(); //get what the user entered in the textfiedl, and place it into the object
        app.setName(s); //update the name of the application
        
        //update the disk size - again this should be a proper number
        double d;
        s = this.txtBasicSize.getText();
        d = Double.parseDouble(s);
        app.setDiskSize(d);
        
        //update the CPUs - the button is enabled, and so the text must be a number
        int i;
        s = this.txtCores.getText(); //get the cpu string that the user entered
        i = Integer.parseInt(s); //n exception should be thrown here
        app.setCoresUsed(i);
        
        //update the disk size - again this should be a proper number
        double dd;
        s = this.txtBasicSize.getText();
        dd = Double.parseDouble(s);
        app.setDiskSize(dd);
        
        model.addElement(text);
        HCIproject.allApplications.add(app);
        
        //need to force a repaint
        appsListBox.repaint(); //this may not be needed every time*/
    }//GEN-LAST:event_btnAddAppToListActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JList<String> appsListBox;
    private javax.swing.JButton btnAddAppToImage;
    private javax.swing.JButton btnAddAppToList;
    private javax.swing.JButton btnAddImage;
    private javax.swing.JButton btnAppFromImage;
    private javax.swing.JButton btnDeleteApp;
    private javax.swing.JButton btnDeleteImage;
    private javax.swing.JButton btnRename;
    private javax.swing.JButton btnSaveApp;
    private javax.swing.JButton btnXData;
    private javax.swing.JList<String> imagesListBox;
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel10;
    private javax.swing.JLabel jLabel11;
    private javax.swing.JLabel jLabel12;
    private javax.swing.JLabel jLabel13;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel8;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JScrollPane jScrollPane3;
    private javax.swing.JScrollPane jScrollPane4;
    private javax.swing.JSeparator jSeparator1;
    private javax.swing.JSeparator jSeparator2;
    private javax.swing.JTextField jTextField1;
    private javax.swing.JLabel lblInstalls;
    private javax.swing.JList<String> lboxAddSpace;
    private javax.swing.JList<String> lboxAppsOnImage;
    private javax.swing.JTextField txtAppName;
    private javax.swing.JTextField txtBasicSize;
    private javax.swing.JTextField txtCores;
    private javax.swing.JTextField txtImageName;
    private javax.swing.JTextField txtInstalls;
    private javax.swing.JTextField txtMemSize;
    private javax.swing.JTextField txtTotalSize;
    private javax.swing.JTextField txtXtraSize;
    // End of variables declaration//GEN-END:variables

    private void add(String text) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}


