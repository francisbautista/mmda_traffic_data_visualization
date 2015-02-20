import sys, collections, os, time
from numpy import *

# Set filename list and prefixer for directory navigation
INPUT_FILE = "../data/status_filenames.txt"
DIR_PREFIX = "../data/daily_status/"
FN_LINE = "../output/collated_status.csv"
OUT_PREFIX = "../output/collated_station_"
OUT_HEADER = "#year,month,day,hour,qtr,lineID,stationID,statusN,statusS\n"

# Loop through filename list and add prefixer to each element
NAME_LIST = [DIR_PREFIX + s  for s in loadtxt(INPUT_FILE, dtype='a',unpack=False)]

def main():
	print "Running Line Selection Engine"
	line_number = raw_input('Enter a Line Number: ')
	processed_line_array = line_selection_engine(int(line_number))
	# station_isolation_engine(processed_line_array)
	sys.exit(1)

def station_isolation_engine(processed_line_array):
	fn = FN_LINE



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
				# temp_array=array([[year[i],month[i],day[i],hour[i],lineID[i],
				# stationID[i],statusN[i],statusS[i]]])
				# line_array = concatenate((line_array,temp_array))
				# Temporary Test File
				fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i]))
		total_percentage = (ctr/float(len(NAME_LIST)))*100
		current_file =" Currently reading \""+ fn + "\""
		sys.stdout.write(" of" + " Total. " + current_file+ "\r%d%%" % total_percentage)
		sys.stdout.flush()

	fp.close()
	print "Written to %s." % fn_out

if __name__ == '__main__':
	main()
