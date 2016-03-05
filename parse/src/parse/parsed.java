package parse;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Scanner;

public class parsed {
	public static void main (String[] args) throws FileNotFoundException{
		Scanner s = new Scanner(new File("cla.txt"));
		ArrayList<String> list = new ArrayList<String>();
		while (s.hasNextLine()){
		    list.add(s.nextLine());
		}
		s.close();
		
		String cal = null;
		String type = null;
		int hStart = 0, hEnd = 0, mStart = 0, mEnd = 0;
		String location;
		String temp;
		int day = 0; //1=monday, 2=tuesday...
		
		int i=0;
		while (i<116){
			if (Character.isDigit(list.get(i).charAt(5)) && Character.isDigit(list.get(i).charAt(6)) && Character.isDigit(list.get(i).charAt(7))){
				if (!list.get(i).substring(0, 8).equals(cal)){
					cal = list.get(i).substring(0, 8);
					initializeFile(cal);
					type = list.get(i+1).substring(0, 3);
					temp = list.get(i+2);
					day=getDay(temp);
					temp = temp.substring(temp.indexOf(' ')+1);
					hStart = Integer.parseInt(temp.substring(0, temp.indexOf(':')));
					if (temp.substring(temp.indexOf(':')+3, temp.indexOf(':')+4).equals("P") && hStart != 12){
						hStart+=12;
					}
					mStart = Integer.parseInt(temp.substring(temp.indexOf(':')+1, temp.indexOf(':')+3));
					hEnd = Integer.parseInt(temp.substring(temp.lastIndexOf(':')-2, temp.lastIndexOf(':')).trim());
					if (temp.substring(temp.lastIndexOf(':')+3, temp.lastIndexOf(':')+4).equals("P") && hEnd != 12){
						hEnd+=12;
					}
					mEnd = Integer.parseInt(temp.substring(temp.lastIndexOf(':')+1, temp.lastIndexOf(':')+3));
					location = list.get(i+3);
					writeString(cal,type,hStart,mStart,hEnd,mEnd,location,day);
					i+=4;
				} else {
					type = list.get(i+1).substring(0, 3);
					temp = list.get(i+2);
					day=getDay(temp);
					temp = temp.substring(temp.indexOf(' ')+1);
					hStart = Integer.parseInt(temp.substring(0, temp.indexOf(':')));
						if (temp.substring(temp.indexOf(':')+3, temp.indexOf(':')+4).equals("P") && hStart != 12){
							hStart+=12;
						}
					mStart = Integer.parseInt(temp.substring(temp.indexOf(':')+1, temp.indexOf(':')+3));
					hEnd = Integer.parseInt(temp.substring(temp.lastIndexOf(':')-2, temp.lastIndexOf(':')).trim());
					if (temp.substring(temp.lastIndexOf(':')+3, temp.lastIndexOf(':')+4).equals("P") && hEnd != 12){
						hEnd+=12;
					}
					mEnd = Integer.parseInt(temp.substring(temp.lastIndexOf(':')+1, temp.lastIndexOf(':')+3));
					location = list.get(i+3);
					writeString(cal,type,hStart,mStart,hEnd,mEnd,location,day);
					i+=4;
				}
			} else if (list.get(i).contains("Academic")){
				i++;
			} else if (!list.get(i).equals(list.get(i-2))){
				temp = list.get(i);
				day=getDay(temp);
				temp = temp.substring(temp.indexOf(' ')+1);
				hStart = Integer.parseInt(temp.substring(0, temp.indexOf(':')));
				if (temp.substring(temp.indexOf(':')+3, temp.indexOf(':')+4).equals("P") && hStart != 12){
					hStart+=12;
				}
				mStart = Integer.parseInt(temp.substring(temp.indexOf(':')+1, temp.indexOf(':')+3));
				hEnd = Integer.parseInt(temp.substring(temp.lastIndexOf(':')-2, temp.lastIndexOf(':')).trim());
				if (temp.substring(temp.lastIndexOf(':')+3, temp.lastIndexOf(':')+4).equals("P") && hEnd != 12){
					hEnd+=12;
				}
				mEnd = Integer.parseInt(temp.substring(temp.lastIndexOf(':')+1, temp.lastIndexOf(':')+3));
				location = list.get(i+1);
				writeString(cal, type, hStart,mStart,hEnd,mEnd,location,day);
				i+=2;
			} else {
				i+=2;
			}
			
		}
		//System.out.println(list.get(0));
		writeString(cal);
	}
	
	public static void initializeFile(String ext){
		String file = ext + ".ics";
		PrintWriter writer = null;
		try {
			writer = new PrintWriter(file);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		writer.println("BEGIN:VCALENDAR\nMETHOD:PUBLISH\nVERSION:2.0\nX-WR-CALNAME:" + ext);
		writer.println("X-APPLE-CALENDAR-COLOR:#ff2351");
		writer.close();
	}
	public static void writeString(String file, String type, int hs, int ms, int he, int me, String loc, int day){
		try
		{
		    String filename = file + ".ics";
		    FileWriter fw = new FileWriter(filename,true); //the true will append the new data
		    String data = String.format("BEGIN:VEVENT\nDTEND;TZID=America/Toronto:201601%02dT%02d%02d00\n", 3+day,he,me);
		    fw.write(data);//appends the string to the file
		    data= String.format("SUMMARY:%s\n", type);
		    fw.write(data);
		    data = String.format("DTSTART;TZID=America/Toronto:201601%02dT%02d%02d00\nLOCATION:%s\nSEQUENCE:0\nRRULE:FREQ=WEEKLY;COUNT=13\nEND:VEVENT\n",3+day, hs,ms,loc);
		    fw.write(data);
		    fw.close();
		}
		catch(IOException ioe)
		{
		    System.err.println("IOException: " + ioe.getMessage());
		}
	}
	
	public static void writeString(String file){
		try
		{
		    String filename = file + ".ics";
		    FileWriter fw = new FileWriter(filename,true); //the true will append the new data
		    
		    fw.write("END:VCALENDAR");
		    fw.close();
		}
		catch(IOException ioe)
		{
		    System.err.println("IOException: " + ioe.getMessage());
		}
	}
	public static int getDay(String temp){
		if (temp.substring(0, 2).equals("Mo")){
			return 1;
		} else if (temp.substring(0, 2).equals("Tu")){
			return 2;
		} else if (temp.substring(0, 2).equals("We")){
			return 3;
		} else if (temp.substring(0, 2).equals("Th")){
			return 4;
		} else {
			return 5;
		}
	}
}
