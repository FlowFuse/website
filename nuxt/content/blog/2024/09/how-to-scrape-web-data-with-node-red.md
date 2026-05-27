---
title: How to Scrape Data from Websites Using Node-RED
navTitle: How to Scrape Data from Websites Using Node-RED
---

Web scraping has become an indispensable tool for monitoring news, tracking competitors, and gathering insights. In this guide, you'll learn how to harness the power of Node-RED for efficient web scraping, allowing you to extract and manage data from various websites with ease that are not exposed through an API.

<!--more-->

## What is Web Scraping?

Web scraping is a technique for automatically extracting data from websites. Instead of manually copying information from web pages, web scraping uses tools or scripts to access and retrieve data from the Internet efficiently. This process allows you to quickly gather large volumes of information, which is helpful for tasks such as tracking market trends, aggregating news, or collecting product details. By automating data collection, web scraping helps save time and reduce human error. It enables users to extract and analyze structured data from various sources, making it easier to compile and utilize information for research, business intelligence, or other purposes.

Web scraping can be helpful when APIs are unavailable or do not meet your requirements. It allows you to collect data directly from web pages, which can be beneficial for tasks like competitive analysis, market research, or tracking specific online content.

## How Does Web Scraping Works?

Web scraping involves systematically extracting data from websites using automated tools or scripts. The process begins with requesting a specific webpage. The response from the server is the HTML content of the page. This HTML code contains the structured information displayed on the webpage, organized in a format that describes the layout and content.

Once the HTML is received, the next step is parsing it. Parsing involves analyzing the HTML structure to identify and extract the data of interest. This may include navigating through nested elements, locating specific tags, and using selectors to target precise content such as text blocks, images, or links. The extracted data is then processed and stored in a format that suits the user's needs, whether a database, a CSV file, or another format suitable for analysis.

## Web scrapping with Node-RED 

In this section, we will guide you through the process of scraping data from publicly available websites using Node-RED and demonstrate how to extract data from a website specifically designed for scraping practice. For this example, we will scrape country data from the page at `https://www.scrapethissite.com/pages/simple/.`

### Sending Requests to a Webpage

To start scraping data, follow these steps to send an HTTP GET request to the webpage:

1. Drag the **inject** node onto the canvas. This node allows you to manually trigger the HTTP request or set it to fire at specific intervals.
2. Drag the **http request** node onto the canvas. Double-click it to configure and set the **Method** to `GET.` Enter the webpage URL you want to scrape (e.g., `https://www.scrapethissite.com/pages/simple/`).
3. Drag the **debug** node onto the canvas.
4. Connect the **inject** node's output to the input of the **http request** node and the **http request** node's output to the input of the **debug** node.
5. Click **Deploy** to save and deploy your flow.

Once deployed, click the **inject** button. You will see the raw HTML printed in the debug panel.

### Parsing and Extracting Data from HTML

Next, we need to process the raw HTML to extract meaningful data. This involves parsing the HTML content and identifying the specific information you want. To do this, first analyze the HTML structure of the webpage by opening the browser’s developer tools (press Ctrl + I or F12) and inspecting the elements to locate where the data is and in which HTML elements it resides.

#### Analyzing HTML Structure

Begin by analyzing the HTML structure of the webpage. Open your browser’s developer tools (press Ctrl + Shift + c ) and examine the elements to locate where the data resides and which HTML elements contain it. For example, on a page with a list of countries, each with its capital, population, and area, click on one of those countires elements to navigate to its HTML in the developer tools. Identify the selector that can be used to select those elements. On this webpage, the information about countries is contained within an element with the .countries class. You can use this class to extract all the data for the countries.

![Image showing the structure of the page and the data which we needed to extract](/blog/2024/09/images/html-structer-of-target-website.png){data-zoomable}
_Image showing the structure of the page and the data which we needed to extract_

#### Using Node-RED to extract data

1. Drag the **html** node onto the canvas.
2. Double-click the **html** node and enter the selector `.countries` into the "Selector" field.
3. Set the output to "only the text of element" and keep other settings default.
4. Drag the **debug** node onto the canvas.
5. Connect the output of the **http request** node to the input of the **html** node and the output of the **html** node to the input of the **debug** node.
6. Click **Deploy** to save and deploy your flow.

When you click the **inject** button, you will see the array containing the text content from each `.countries` div. While this data is a good starting point, it has yet to be in a format that is directly useful for analysis. To make the data more helpful, you'll need to transform it into objects with meaningful properties.

### Transforming Data into Structured Objects

You can use JavaScript in a Node-RED function node to transform data into structured objects. If you are familiar with JavaScript, this process will be straightforward. However, if you are not, you can use FlowFuse Expert to generate the necessary function. For more details, refer to our [LinkedIn Post](https://www.linkedin.com/posts/flowfuse_flowfuse-nodered-automation-activity-7226171132796637184-vKKt/?utm_source=share&utm_medium=member_desktop) for a quick guide. However, in this section, we will use a low-code approach to transform the data.

1. Drag a **Split** node onto the canvas and connect it to the **HTML** node. This **Split** node will split the input array into individual string messages.
2. Drag a **Change** node onto the canvas and connect it to the **Split** node. Set `msg.name` to the following JSONata expression to extract the country name:
    ```json
    $trim($split(payload, "Capital: ")[0])
    ```

3. Set `msg.payload` to the following Jsonata expression that will extract the capital and population from the string:
    ```json
    $split($split(payload, "Capital: ")[1], "Population: ")
    ```

4. Drag another **Change** node onto the canvas and connect it to the previous **Change** node. Set `msg.capital` to the following Jsonata expression to trim and extract the value of the capital from the previously split data array:
    ```json
    $trim(payload[0])
    ```

5. Set `msg.payload` to the following Jsonata expression to split the remaining string for area extraction:
    ```json
    $split(payload[1], "Area (km2): ")
    ```

6. Drag another **Change** node onto the canvas and connect it to the **Change** node from the previous step. Set `msg.population` to the following Jsonata expression to trim and convert the population value to a number:
    ```json
    $number($trim(payload[0]))
    ```

7. Set `msg.area` to the following Jsonata expression to trim and convert the area value to a number:
    ```json
    $number($trim(payload[1]))
    ```

8. Drag another **Change** node onto the canvas and connect it to the last **Change** node. Set `msg.payload` to the following JSON object:
    ```json
    {
      "name": name,
      "capital": capital,
      "population": population,
      "area": area
    }
    ```
9. Finally, drag a **Join** node onto the canvas and connect it to the previous **Change** node. This Join node will create an array of the objects we have created.

When you click the inject button again, you will see that the data is now structured and formatted. The output will contain objects with properties such as name, capital, population, and area. This data can now be displayed on the FlowFuse dashboard table. For more details, refer to the [FlowFuse table widget](https://dashboard.flowfuse.com/nodes/widgets/ui-table.html).



::render-flow
---
height: 200
flow: "W3siaWQiOiJjYzNjOTE5YWQ5ZjkzY2M2IiwidHlwZSI6ImluamVjdCIsInoiOiIzODBlMzdmZWQ3MmU2ODg1IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjI4MCwieSI6MjAwLCJ3aXJlcyI6W1siNDNiYTA0ZDYyM2E4YWE1NyJdXX0seyJpZCI6IjJkNjZiOWZhMjg1OGNmNWYiLCJ0eXBlIjoiaHRtbCIsInoiOiIzODBlMzdmZWQ3MmU2ODg1IiwibmFtZSI6IiIsInByb3BlcnR5IjoicGF5bG9hZCIsIm91dHByb3BlcnR5IjoicGF5bG9hZCIsInRhZyI6Ii5jb3VudHJ5IiwicmV0IjoidGV4dCIsImFzIjoic2luZ2xlIiwieCI6NjIwLCJ5IjoyMDAsIndpcmVzIjpbWyJjNGU5YTRjOC40ODdlNjgiXV19LHsiaWQiOiI0M2JhMDRkNjIzYThhYTU3IiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiIzODBlMzdmZWQ3MmU2ODg1IiwibmFtZSI6IiIsIm1ldGhvZCI6IkdFVCIsInJldCI6InR4dCIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiJodHRwczovL3d3dy5zY3JhcGV0aGlzc2l0ZS5jb20vcGFnZXMvc2ltcGxlLyIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4Ijo0NTAsInkiOjIwMCwid2lyZXMiOltbIjJkNjZiOWZhMjg1OGNmNWYiXV19LHsiaWQiOiI4ZTdiNDYyYTViNWEwNjRlIiwidHlwZSI6InVpLXRhYmxlIiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJncm91cCI6IjBjNDhmOGQ1NjAxNTdkM2MiLCJuYW1lIjoiIiwibGFiZWwiOiJ0ZXh0Iiwib3JkZXIiOjEsIndpZHRoIjowLCJoZWlnaHQiOjAsIm1heHJvd3MiOjAsInBhc3N0aHJ1IjpmYWxzZSwiYXV0b2NvbHMiOnRydWUsInNob3dTZWFyY2giOnRydWUsInNlbGVjdGlvblR5cGUiOiJub25lIiwiY29sdW1ucyI6W10sIm1vYmlsZUJyZWFrcG9pbnQiOiJzbSIsIm1vYmlsZUJyZWFrcG9pbnRUeXBlIjoiZGVmYXVsdHMiLCJ4IjoxODcwLCJ5IjoyMDAsIndpcmVzIjpbW11dfSx7ImlkIjoiYzRlOWE0YzguNDg3ZTY4IiwidHlwZSI6InNwbGl0IiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiU3BsaXQgQXJyYXkiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOiIxIiwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4Ijo4MTAsInkiOjIwMCwid2lyZXMiOltbIjFhMWU4YTBhLjhlN2IwNiJdXX0seyJpZCI6IjFhMWU4YTBhLjhlN2IwNiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMzgwZTM3ZmVkNzJlNjg4NSIsIm5hbWUiOiJFeHRyYWN0IE5hbWUiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJuYW1lIiwicHQiOiJtc2ciLCJ0byI6IiR0cmltKCRzcGxpdChwYXlsb2FkLCBcIkNhcGl0YWw6IFwiKVswXSkiLCJ0b3QiOiJqc29uYXRhIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJHNwbGl0KCRzcGxpdChwYXlsb2FkLCBcIkNhcGl0YWw6IFwiKVsxXSwgXCJQb3B1bGF0aW9uOiBcIikiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjEwMDAsInkiOjIwMCwid2lyZXMiOltbImNmZGI3YzFmLjkyMzRiIl1dfSx7ImlkIjoiY2ZkYjdjMWYuOTIzNGIiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiRXh0cmFjdCBDYXBpdGFsICYgUG9wdWxhdGlvbiIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImNhcGl0YWwiLCJwdCI6Im1zZyIsInRvIjoiJHRyaW0ocGF5bG9hZFswXSkiLCJ0b3QiOiJqc29uYXRhIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJHNwbGl0KHBheWxvYWRbMV0sIFwiQXJlYSAoa20yKTogXCIpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjoxMjQwLCJ5IjoyMDAsIndpcmVzIjpbWyJmYjkzZjg5Yi5iOTYxMzgiXV19LHsiaWQiOiJmYjkzZjg5Yi5iOTYxMzgiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjM4MGUzN2ZlZDcyZTY4ODUiLCJuYW1lIjoiRXh0cmFjdCBQb3B1bGF0aW9uICYgQXJlYSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBvcHVsYXRpb24iLCJwdCI6Im1zZyIsInRvIjoiJG51bWJlcigkdHJpbShwYXlsb2FkWzBdKSkiLCJ0b3QiOiJqc29uYXRhIn0seyJ0Ijoic2V0IiwicCI6ImFyZWEiLCJwdCI6Im1zZyIsInRvIjoiJG51bWJlcigkdHJpbShwYXlsb2FkWzFdKSkiLCJ0b3QiOiJqc29uYXRhIn0seyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoieyAgIFwibmFtZVwiOiBuYW1lLCAgIFwiY2FwaXRhbFwiOiBjYXBpdGFsLCAgIFwicG9wdWxhdGlvblwiOiBwb3B1bGF0aW9uLCAgIFwiYXJlYVwiOiBhcmVhfSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MTUxMCwieSI6MjAwLCJ3aXJlcyI6W1siMzQyMTY2YWM4NzI5ZTlkNyJdXX0seyJpZCI6IjM0MjE2NmFjODcyOWU5ZDciLCJ0eXBlIjoiam9pbiIsInoiOiIzODBlMzdmZWQ3MmU2ODg1IiwibmFtZSI6IiIsIm1vZGUiOiJhdXRvIiwiYnVpbGQiOiJvYmplY3QiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJwcm9wZXJ0eVR5cGUiOiJtc2ciLCJrZXkiOiJ0b3BpYyIsImpvaW5lciI6IlxcbiIsImpvaW5lclR5cGUiOiJzdHIiLCJhY2N1bXVsYXRlIjp0cnVlLCJ0aW1lb3V0IjoiIiwiY291bnQiOiIiLCJyZWR1Y2VSaWdodCI6ZmFsc2UsInJlZHVjZUV4cCI6IiIsInJlZHVjZUluaXQiOiIiLCJyZWR1Y2VJbml0VHlwZSI6IiIsInJlZHVjZUZpeHVwIjoiIiwieCI6MTcxMCwieSI6MjAwLCJ3aXJlcyI6W1siOGU3YjQ2MmE1YjVhMDY0ZSJdXX0seyJpZCI6IjBjNDhmOGQ1NjAxNTdkM2MiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiTXkgR3JvdXAiLCJwYWdlIjoiZDBkZWY3YTkxZDNiN2FhMSIsIndpZHRoIjoiMTIiLCJoZWlnaHQiOiIxIiwib3JkZXIiOjEsInNob3dUaXRsZSI6ZmFsc2UsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOiJ0cnVlIiwiZGlzYWJsZWQiOiJmYWxzZSJ9LHsiaWQiOiJkMGRlZjdhOTFkM2I3YWExIiwidHlwZSI6InVpLXBhZ2UiLCJuYW1lIjoiUGFnZSAxIiwidWkiOiJjMzg1ZGZjNTkwYjEzMDhkIiwicGF0aCI6Ii8xIiwiaWNvbiI6ImhvbWUiLCJsYXlvdXQiOiJncmlkIiwidGhlbWUiOiI2YmUwMzMyOTFkZDc2YjE3Iiwib3JkZXIiOjEsImNsYXNzTmFtZSI6IiIsInZpc2libGUiOmZhbHNlLCJkaXNhYmxlZCI6ZmFsc2V9LHsiaWQiOiJjMzg1ZGZjNTkwYjEzMDhkIiwidHlwZSI6InVpLWJhc2UiLCJuYW1lIjoiRGFzaGJvYXJkIiwicGF0aCI6Ii9kYXNoYm9hcmQiLCJpbmNsdWRlQ2xpZW50RGF0YSI6dHJ1ZSwiYWNjZXB0c0NsaWVudENvbmZpZyI6WyJ1aS1ub3RpZmljYXRpb24iLCJ1aS1jb250cm9sIiwidWktYnV0dG9uIl0sInNob3dQYXRoSW5TaWRlYmFyIjpmYWxzZSwic2hvd1BhZ2VUaXRsZSI6ZmFsc2UsIm5hdmlnYXRpb25TdHlsZSI6InRlbXBvcmFyeSIsInRpdGxlQmFyU3R5bGUiOiJkZWZhdWx0In0seyJpZCI6IjZiZTAzMzI5MWRkNzZiMTciLCJ0eXBlIjoidWktdGhlbWUiLCJuYW1lIjoiRGVmYXVsdCBUaGVtZSIsImNvbG9ycyI6eyJzdXJmYWNlIjoiIzIwMmMzNCIsInByaW1hcnkiOiIjMjAyYzM0IiwiYmdQYWdlIjoiI2VlZWVlZSIsImdyb3VwQmciOiIjZmZmZmZmIiwiZ3JvdXBPdXRsaW5lIjoiI2ZmZmZmZiJ9LCJzaXplcyI6eyJwYWdlUGFkZGluZyI6IjEycHgiLCJncm91cEdhcCI6IjEycHgiLCJncm91cEJvcmRlclJhZGl1cyI6IjRweCIsIndpZGdldEdhcCI6IjEycHgiLCJkZW5zaXR5IjoiZGVmYXVsdCJ9fV0="
---
::



![Left side: Image showing the countries table we created on the FlowFuse dashboard. Right side: The original webpage with countries.](/blog/2024/09/images/webscrapping-result.png){data-zoomable}
_Left side: Image showing the table we created on the FlowFuse dashboard. Right side: The original webpage with countries._

## Legal and Ethical Considerations

Web scraping can be a valuable tool for gathering data, but it's crucial to navigate the legal and ethical landscape responsibly. Adhere to websites' terms of service, respect intellectual property and data privacy laws, and avoid actions that could disrupt a site's operation or misuse the scraped data. By staying informed and adhering to best practices, you can harness the power of web scraping tools like Node-RED while remaining ethically and legally compliant.

## Conclusion

You’ve now learned to use Node-RED for web scraping, from sending requests and parsing HTML to transforming data into practical formats. This approach streamlines data collection from websites, making it easier to manage and analyze information efficiently.