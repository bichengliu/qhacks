//None of the methods return anything... Oops
//var xyz is assumed to be golbal, not sure if that is possible, sorry

function qhacksparse(arr){
	var cal = null;
	var type = null;
	var hStart = 0, hEnd = 0, mStart = 0, mEnd = 0;
	var location;
	var temp;
	var day = 0; //1 = mon, 2 = tues...
	var i = 0;
	var subject = new Array;
	newCount = 1;
	while(i < arr.length()){
		if (!isNaN(arr[i].charAt(5)) && !isNaN(arr[i].charAt(6)) && !isNaN (arr[i].charAt(7))){
			if (!arr[i].substring(0, 8).equals(cal)){
				cal = arr[i].substring(0, 8);
				subject.push(cal);	
				initializeFile(cal, newCount);
				
				type = arr[i+1].substring(0, 3);
				temp = arr[i+2];
				day=getDay(temp);
				temp = temp.substring(temp.indexOf(' ')+1);
				hStart = parseInt(temp.substring(0, temp.indexOf(':')));
				if (temp.substring(temp.indexOf(':')+3, temp.indexOf(':')+4).equals("P") && hStart != 12){
					hStart+=12;
				}
				
				mStart = parseInt(temp.substring(temp.indexOf(':')+1, temp.indexOf(':')+3));
				hEnd = parseInt(temp.substring(temp.lastIndexOf(':')-2, temp.lastIndexOf(':')).trim());
				
				if (temp.substring(temp.lastIndexOf(':')+3, temp.lastIndexOf(':')+4).equals("P") && hEnd != 12){
					hEnd+=12;
				}
				mEnd = parseInt(temp.substring(temp.lastIndexOf(':')+1, temp.lastIndexOf(':')+3));
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
				hStart = parseInt(temp.substring(0, temp.indexOf(':')));
				if (temp.substring(temp.indexOf(':')+3, temp.indexOf(':')+4).equals("P") && hStart != 12){
					hStart+=12;
				}
				mStart = parseInt(temp.substring(temp.indexOf(':')+1, temp.indexOf(':')+3));
				hEnd = parseInt(temp.substring(temp.lastIndexOf(':')-2, temp.lastIndexOf(':')).trim());
				
				if (temp.substring(temp.lastIndexOf(':')+3, temp.lastIndexOf(':')+4).equals("P") && hEnd != 12){
					hEnd+=12;
				}
				mEnd = parseInt(temp.substring(temp.lastIndexOf(':')+1, temp.lastIndexOf(':')+3));
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
			hStart = parseInt(temp.substring(0, temp.indexOf(':')));
			
			if (temp.substring(temp.indexOf(':')+3, temp.indexOf(':')+4).equals("P") && hStart != 12){
				hStart+=12;
			}
			mStart = parseInt(temp.substring(temp.indexOf(':')+1, temp.indexOf(':')+3));
			hEnd = parseInt(temp.substring(temp.lastIndexOf(':')-2, temp.lastIndexOf(':')).trim());
			if (temp.substring(temp.lastIndexOf(':')+3, temp.lastIndexOf(':')+4).equals("P") && hEnd != 12){
				hEnd+=12;
			}

			mEnd = parseInt(temp.substring(temp.lastIndexOf(':')+1, temp.lastIndexOf(':')+3));
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



function initializeFile(ext, newCount, x){
	xyz += "BEGIN:VCALENDAR\nMETHOD:PUBLISH\nVERSION:2.0\nX-WR-CALNAME:" + ext + "\n";

	if(newCount == 1){
		colour = "FF0000";
	} else if(newCount == 2){
		colour = "FF7F00";
	} else if(newCount == 3){
		colour = "FFFF00";
	} else if(newCount == 4){
		colour = "00FF00";
	} else if(newCount == 5){
		colour = "0000FF";
	} else if(newCount == 6){
		colour = "4B0082";
	} else {
		colour = "8F00FF";
	}
	xyz += "X-APPLE-CALENDAR-COLOR:#" + colour + "\n";
}
function writeString(file, type, hs, ms, he, me, loc, day){
	xyz += "BEGIN:VEVENT\nDTEND;TZID=America/Toronto:201601" + zeroPad(3+day, 2) + "T" + zeroPad(he,2) + zeroPad(me,2) + "00\n";
	xyz += "SUMMARY:" + type + "\n";
	xyz += "DTSTART;TZID=America/Toronto:201601" + zeroPad(3+day) + "T" + zeroPad(hs,2) + zeroPad(ms, 2) + "00\nLOCATION:" + loc + "\nSEQUENCE:0\nRRULE:FREQ=WEEKLY;COUNT=13\nEND:VEVENT\n";
}

function writeString(file){
	xyz += "END:VCALENDAR\n$$$\n";
}

function getDay(temp){
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
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
//gg