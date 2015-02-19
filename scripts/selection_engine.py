import sys, collections
from numpy import *

# Set filename list and prefixer for directory navigation
INPUT_FILE = "../data/status_filenames.txt"
DIR_PREFIX = "../data/daily_status/"

# Loop through filename list and add prefixer to each element
NAME_LIST = [DIR_PREFIX + s  for s in loadtxt(INPUT_FILE, dtype='a',unpack=False)]

def main():


	# Loop through each filename

		# Identify if station 4 data

		# Store station 4 data and concat to list

	sys.exit(1)

if __name__ == '__main__':
	main()
