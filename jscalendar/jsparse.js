function qhacksparse(arr){
	String cal = null;
	String type = null;
	int hStart = 0, hEnd = 0, mStart = 0, mEnd = 0;
	String location;
	String temp;
	int day = 0; //1 = mon, 2 = tues...
	int i = 0;
	newCount = 1;
	while(i < 116){
		if (Character.isDigit(arr[i].charAt(5)) && Character.isDigit(arr[i].charAt(6)) && Character.isDigit(arr[i].charAt(7))){
			if (!arr[i].substring(0, 8).equals(cal)){
				cal = arr[i].substring(0, 8);
				initializeFile(cal, newCount);
				
				type = arr[i+1].substring(0, 3);
				temp = arr[i+2];
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
				location = arr[i+3];
				writeString(cal,type,hStart,mStart,hEnd,mEnd,location,day);
				newCount++;
				i+=4;
				
			}
			else{
				type = arr[i+1].substring(0, 3);
				temp = arr[i+1];
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
				location = arr[i+3];
				writeString(cal,type,hStart,mStart,hEnd,mEnd,location,day);
				i+=4;
			}
		
		
		}
		else if (arr[i].contains("Academic")){
			i++;
		}
		else if (!list.get(i).equals(list.get(i-2))){
			temp = arr[i];
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
			location = arr[i+1];
			writeString(cal, type, hStart,mStart,hEnd,mEnd,location,day);
			i+=2;
		}
		else{
			i+=2;
		}
	}
	writeString(cal);
}



function initializeFile(ext, newCount){
	vars['file' + newCount] += "BEGIN:VCALENDAR\nMETHOD:PUBLISH\nVERSION:2.0\nX-WR-CALNAME:" + ext + "\n";

	if(newCount == 1){
			COLOR = "FF0000";
		} 
		else if(newCount == 2){
			COLOR = "FF7F00";
		}
		else if(newCount == 3){
			COLOR = "FFFF00";}
		else if(newCount == 4){
			COLOR = "00FF00";}
		else if(newCount == 5){
			COLOR = "0000FF";}
		else if(newCount == 6){
			COLOR = "4B0082";}
		else{
			COLOR = "8F00FF";
		}
	vars['file' + newCount] += "X-APPLE-CALENDAR-COLOR:#" + COLOR + "\n";
}
function writeString(file, type, hs,  ms, he, me,  loc,day){
	vars['file' + newCount] += String.format("BEGIN:VEVENT\nDTEND;TZID=America/Toronto:201601%02dT%02d%02d00\n", 3+day,he,me);
	vars['file' + newCount] +=  String.format("SUMMARY:%s\n", type);
	vars['file' + newCount] += String.format("DTSTART;TZID=America/Toronto:201601%02dT%02d%02d00\nLOCATION:%s\nSEQUENCE:0\nRRULE:FREQ=WEEKLY;COUNT=13\nEND:VEVENT\n",3+day, hs,ms,loc);
}

function writeString( file){
	vars['file' + newCount] += "END:VCALENDAR\n"
}

function getDay( temp){
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