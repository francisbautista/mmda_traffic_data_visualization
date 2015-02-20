import sys, collections, os, time
from numpy import *

# Set filename list and prefixer for directory navigation
INPUT_FILE = "../data/status_filenames.txt"
DIR_PREFIX = "../data/daily_status/"
OUT_PREFIX = "../output/collated_station_"
OUT_HEADER = "#year,month,day,hour,qtr,lineID,stationID,statusN,statusS\n"

# Loop through filename list and add prefixer to each element
NAME_LIST = [DIR_PREFIX + s  for s in loadtxt(INPUT_FILE, dtype='a',unpack=False)]

def main():
	ctr = 0
	# Loop through each filename
	for fn in NAME_LIST[0:(len(NAME_LIST)-1)]:
		ctr = ctr + 1
		fn_out= "../output/collated_status.csv"
		fp=open(fn_out,'w')
		fp.write(OUT_HEADER)

		# Assign column names to filename cols
		year,month,day,hour,lineID,stationID,statusN,statusS = loadtxt(fn, usecols = (0,1,2,3,5,6,7,8,), unpack=True, delimiter=",", dtype=int, skiprows = 1)
		## MAKE ANOTHER FUNCTION TO PARSE BIGASS FILE

		for i in arange(len(year)):
			if(lineID[i]==4):
				fp.write("%d,%d,%d,%d,%2d,%3d,%d,%d\n" % (year[i],month[i],day[i],hour[i],lineID[i],stationID[i],statusN[i],statusS[i]))
				total_percentage = (ctr/float(len(NAME_LIST)))*100
				current_file =" Currently reading \""+ fn + "\""
				sys.stdout.write(" of" + " Total. " + current_file+ "\r%d%%" % total_percentage)
				sys.stdout.flush()
		fp.close()

	print "Written to %s." % fn_out
	sys.exit(1)

if __name__ == '__main__':
	main()
