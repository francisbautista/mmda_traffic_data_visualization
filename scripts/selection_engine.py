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

def station_writer(num,year,month,day,hour,lineID,stationID,statusN,statusS, loop_ctr ):
	fp=open(OUT_PREFIX+str(num),'a')
	if(loop_ctr==0):
		fp.write(OUT_HEADER)
	fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year,month,day,hour,lineID,stationID,statusN,statusS))


def station_isolation_engine():
	year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(FN_LINE, usecols =(0,1,2,3,4,5,6,7,), unpack=True, delimiter=",", dtype=int, skiprows = 1)
	ctr = 0
	for i in arange(len(year)):
		ctr = ctr + 1
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
		for j in arange(19):
			if stationID[i]==j:
				station_writer(j, year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i], i)


#TODO Modify for stdout printing of progress bar
def line_selection_engine(line_number):
	ctr = 0
	# Loop through each filename
	fn_out= FN_LINE
	fp=open(fn_out,'w')
	fp.write(OUT_HEADER)
	for fn in NAME_LIST[0:(len(NAME_LIST)-1)]:
		ctr = ctr + 1

		# Assign column names to filename cols
		year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(fn, usecols = (0,1,2,3,5,6,7,8,), unpack=True, delimiter=",", dtype=int, skiprows = 1)

		for i in arange(len(year)):
			if(lineID[i]==line_number):
				fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i]))
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
