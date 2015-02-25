import sys, collections, os, time
from numpy import *

# Set filename list and prefixer for directory navigation
INPUT_FILE = "../data/status_filenames.txt"
DIR_PREFIX = "../data/daily_status/"
FN_LINE = "../output/collated_status.csv"
OUT_PREFIX = "../output/collated_station_"
OUT_HEADER = "#year,month,day,hour,lineID,stationID,statusN,statusS\n"

# Loop through filename list and add prefixer to each element
NAME_LIST = [DIR_PREFIX + s  for s in loadtxt(INPUT_FILE, dtype='a',unpack=False)]

def main():
	print "Running LINE SELECTION ENGINE:"
	print "------------------------------"
	line_number = raw_input('Enter a Line Number: ')
	line_selection_engine(int(line_number))
	time.sleep(1)
	print "\n"
	print "Running STATION SELECTION ENGINE:"
	print "------------------------------"
	station_isolation_engine()
	time.sleep(1)
	sys.exit(1)

# Creates file for each station with write-append rules.
def station_writer(num,year,month,day,hour,lineID,stationID,statusN,statusS, loop_ctr ):
	if(os.path.isfile(OUT_PREFIX+str(num))==False):
		fp=open(OUT_PREFIX+str(num),'a')
		fp.write(OUT_HEADER)
	else:
		fp=open(OUT_PREFIX+str(num),'a')
	fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year,month,day,hour,lineID,stationID,statusN,statusS))
	fp.close()


def station_isolation_engine():
	# Map CSV cols to labels for manipulation
	year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(FN_LINE, usecols =(0,1,2,3,4,5,6,7,), unpack=True, delimiter=",", dtype=int, skiprows = 1)
	ctr = 0

	# Loop through each item of the file
	for i in arange(len(year)):
		ctr = ctr + 1

		# Loop through each station and check if it matches with current station
		for current_station in arange(19):
			if stationID[i]==current_station: # if stationID[0]==0
				station_writer(current_station, year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i], i)

		# Progress Bar
		percentage = ctr/float(len(year))*100
		sys.stdout.write("\r")
		progress = ""
		for i in range(100):
			if i < int(percentage):
				progress += "#"
			else:
				progress += " "
		sys.stdout.write("[ %s ] %.2f%%" % (progress, percentage))
		sys.stdout.flush()


#TODO Modify for stdout printing of progress bar
def line_selection_engine(line_number):
	ctr = 0
	# Loop through each filename
	fn_out= FN_LINE
	fp=open(fn_out,'w')
	fp.write(OUT_HEADER)
	# Loop through every filename in the list
	for fn in NAME_LIST[0:(len(NAME_LIST)-1)]:
		ctr = ctr + 1

		# Assign column names to CSV cols
		year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(fn, usecols = (0,1,2,3,5,6,7,8,), unpack=True, delimiter=",", dtype=int, skiprows = 1)

		# Loop through every element in each file and store
		for i in arange(len(year)):
			if(lineID[i]==line_number):
				fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i]))

		# Progress Bar
		total_percentage = (ctr/float(len(NAME_LIST)))*100
		current_file =" Currently reading \""+ fn + "\""
		bar_length=100
		hashes = '#' * int(total_percentage)
		spaces = ' ' * (bar_length - len(hashes))
		os.system('clear')
		print("\rPercent Completed: [{0}] {1}%".format(hashes + spaces, int(total_percentage)))
		print current_file
	fp.close()
	print "Written to %s." % fn_out




if __name__ == '__main__':
	main()
