
# A Statistical Representation of Traffic Volume for a Specific Station per Time
*CS 159.32: Data Visualization Final Project by Francis Bautista and Eyana Mallari*

![System Screenshot](/fig/screenshot.png)

### Introduction
This project leveragaes historical traffic volume data collated by the MMDA and Dr. Reina Reyes to give a statistical representation of the **traffic volume** for a **specific station** for a **given line** at a **certain time**. It uses a donut-chart with day and time selectors to represent the statistical breakdown of the chances for the Northbound and Southbound traffic volumes.

It works with a d3.js front-end with data supplied from the [MMDA-Interaksyon](http://mmdatraffic.interaksyon.com/) website parsed and formatted using the included Python scripts.

### Directions for Use
1. Users select the line from the Line Dropdown
2. Users will then be able to select specific stations from the Station Dropdown
3. Day Select will drill-down to the specific day of the week, as traffic data varies as the week progresses.
4. Users can use the Time Slider to view traffic trends at a specific hour.

### Resources Used
* [Numpy Array Docs](http://docs.scipy.org/doc/numpy/reference/arrays.ndarray.html)
* [Numpy Loadtxt Docs](http://docs.scipy.org/doc/numpy/reference/generated/numpy.loadtxt.html)
* [D3 API Reference](https://github.com/mbostock/d3/wiki/API-Reference)
* [D3 Wiki](https://github.com/mbostock/d3/wiki)
* [MMDA-Interaksyon Data](http://mmdatraffic.interaksyon.com/)
