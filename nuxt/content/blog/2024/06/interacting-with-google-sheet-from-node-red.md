---
title: Interacting with Google Sheets from Node-RED
navTitle: Interacting with Google Sheets from Node-RED
---

Have you ever needed to integrate Google Sheets with your Node-RED application to track and manage data seamlessly? This guide will walk you through the process of integrating Google Sheets with Node-RED, enabling you to write, read, update, and delete data effortlessly.

<!--more-->

## What is the Google Sheet?

[Google Sheets](https://www.google.com/sheets/about/) is a cloud-based spreadsheet application developed by Google. It allows users to create, edit, and collaborate on spreadsheets in real-time over the Internet. This makes it an ideal option for easily and securely collaborating on data that is not large in size. In businesses, Google Sheets is commonly used for tasks such as analyzing daily profits, tracking expenses, and managing collaborative projects. However, for products or services with large user bases, businesses often prefer using databases, which are recommended for efficiently managing and scaling data operations.

## Prequisite

Before proceeding, make sure you have installed the following node from the pallet manager.

- [node-red-contrib-google-sheets](https://flows.nodered.org/node/node-red-contrib-google-sheets)

## Interacting with Google Sheets with Node-RED


To integrate Google Sheets with our application we must first enable the Google Sheets API, and create the service account in the Google Cloud, before proceeding, make sure you have the Google Cloud account created.

1. Open your browser and go to [Service accounts](https://console.cloud.google.com/projectselector2/apis/library/sheets?supportedpurview=project&authuser=0).
2. Create a new project by clicking the "CREATE PROJECT" button in the top right corner. Enter the project details such as project name and organization.

![Screenshot showing the 'CREATE PROJECT' button](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_1.png "Screenshot showing the 'CREATE PROJECT' button"){data-zoomable}

!["Screenshot showing the Form to create the project"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_2.png "Screenshot showing the Form to create the project"){data-zoomable}

3. Go to the main menu by clicking the menu icon in the top left, then select "APIs & Services."

!["Screenshot showing the 'APIs & Services' from the menu"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_3.png "Screenshot showing the 'APIs & Services' option from the main menu"){data-zoomable}

4. Click on "Enable APIs and Services" in the header.

!["Screenshot showing the 'Enable APIs and Services' option](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_4.png "Screenshot showing the 'Enable APIs and Services' option"){data-zoomable}

5. In the search bar, type "Google Sheets" and select it from the results.

!["Screenshot showing the Google Sheet in the search result](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_5.png "Screenshot showing the Google Sheet in the search result"){data-zoomable}

6. Click the "Enable" button to enable the Google Sheets API.

!["Screenshot showing the 'Enable' button"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_6.png "Screenshot showing the 'Enable' button"){data-zoomable}

7. Go back to the main menu and click on "IAM & Admin," then select "Service Accounts" from the left sidebar.

!["Screenshot showing the 'IAM & Admin' from the menu"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_7.png "Screenshot showing the 'IAM & Admin' from the menu"){data-zoomable}

8. Click on "Create Service Account" in the header. Enter the necessary details and click "Create" to proceed.

!["Screenshot showing the 'Create Service Account' option"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_8.png "Screenshot showing the 'Create Service Account' option"){data-zoomable}

!["Screenshot showing the 'Create' button"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_9.png "Screenshot showing the 'Create' button"){data-zoomable}

9. Select the Role from the "Owner" and click on the "Continue" button.

!["Screenshot showing the 'Continue' button"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_10.png "Screenshot showing the 'Continue' button"){data-zoomable}

10. Click "Done." Make sure to copy the generated service account email and save it for later use.

!["Screenshot showing the 'Done' button"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_11.png "Screenshot showing the 'Done' button"){data-zoomable}

!["Screenshot showing the created service account email"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_14.png "Screenshot showing the created service account email"){data-zoomable}

11. To generate a private key, click on the three dots icon on the right of the newly created service account and select "Manage keys."

!["Screenshot showing the three dot icon"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_15.png "Screenshot showing the three dot icon"){data-zoomable}

12. Click on "Add key," choose "Create new key," select "JSON" as the key type, and click "Create." Your private key will be generated and downloaded. 

!["Screenshot showing the 'Add key' and the 'Create new key'"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_15.png "Screenshot showing the 'Add key' and the 'Create new key'"){data-zoomable}

!["Screenshot showing the 'JSON' option and 'Create new key' button"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete-page_13.png "Screenshot showing the 'JSON' option and 'Create new key' button"){data-zoomable}

### Configuring the Google Sheet Node

Before proceeding, ensure you have added the [environment variable](/blog/2023/01/environment-variables-in-node-red/) for the private key that was generated. Additionally, grant the editor access to the sheet you want to interact with for that service account email we created in the above section.

1. Drag a GSheet node onto the canvas.
2. Double-click on the node and click on the pencil icon next to "creds."
3. Enter the environment variable added for the private key in the "creds" field and click "Add."
4. Go to the Google Sheet you want to interact with and copy its ID from the URL. The URL will be in this format: `https://docs.google.com/spreadsheets/d/<id_of_sheet>/`
5. Return to your Node-RED instance, double-click on the GSheet node again, and paste the spreadsheet ID into the "SpreadsheetID" field.
6. Enter the range of cells you want to work with using the syntax `<sheetname!first-cell-name:last-cell-name>`. For example, use `Sheet1!A1:C3` to specify that you are working with the "Sheet1" tab, starting from cell "A1" to cell "C3". This syntax allows you to define specific ranges such as a row (`A1:A5`), a column (`A1:E1`), or a block (`A1:C3`) within the spreadsheet.

### Writing Data to Cells

For demonstration purposes, I will write simulated sensor data which includes a timestamp and sensor data.

1. Drag the Inject node onto the canvas, and set `msg.payload` to `[$moment().format(), $random() * 100]` as a JSONata expression, and set it to repeat every 3 seconds of interval.
2. Double-click on the GSheet node, select the method to "Append Row" set the range to `<sheetname>!A2`, and replace `sheetname` with the name of your sheet. I have defined cell A2 because I want to start writing data from cell A2.
3. Drag the Debug node onto the canvas, which will help in debugging in case of any error.
4. Connect the output of the Inject node to the input of the GSheet node, and the output of the GSheet node to the input of the Debug node.

!["Image showing the write operation"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-write.gif "Image showing the write operation"){data-zoomable}

This flow generates a timestamp and a random number. The data is formatted as an array because I want the timestamp (the first item of the array) to be placed in column A and the random number (the second item of the array) to be placed in column B. If you want to insert data into additional columns, you can add more items to the array. For example, if you add a third item to the array, it will be placed in column C, a fourth item will be placed in column D, and so on.

### Reading Data from Cells

1. Drag an Inject node onto the canvas.
2. Drag another GSheet node onto the canvas, and set the method to "Get Cells" and the range to `<sheetname>!A2:C1000`, as I wanted to read data from cell A2 to the next 1000 cells.
3. Drag a Debug node onto the canvas.
4. Connect the output of the Inject node to the input of the GSheet node, and the output of the GSheet node to the input of the Debug node.

!["Image showing the read operation"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-read.gif "Image showing the read operation"){data-zoomable}

### Updating Data of Cells

1. Drag an Inject node onto the canvas, and set the updated value as the `msg.payload`.
2. Drag another GSheet node onto the canvas, and set the method to "Update Cells" and the range to `<sheetname>!A2`, as I wanted to update the value of cell A2.
3. Drag a Debug node onto the canvas.
4. Connect the output of the Inject node to the input of the GSheet node, and the output of the GSheet node to the input of the Debug node.

!["Image showing the update operation"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-update.gif "Image showing the update operation"){data-zoomable}

### Deleting Data from Cells

1. Drag an Inject node onto the canvas.
2. Drag another GSheet node onto the canvas, and set the method to "Clear Cells" and the range to `<sheetname>!A2:C50`, as I wanted to clear the first 50 records.
3. Drag a Debug node onto the canvas.
4. Connect the output of the Inject node to the input of the GSheet node, and the output of the GSheet node to the input of the Debug node.

!["Image showing the delete operation"](/blog/2024/06/images/interacting-with-google-sheet-from-node-red-delete.gif "Image showing the delete operation"){data-zoomable}

Below I have provided the complete flow that we have built through the guide, make sure to replace the environment variable with your environment variable added for the private key.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3ZDAyODI3NjE5Nzk1NzRjIiwidHlwZSI6ImluamVjdCIsInoiOiJiYWE1MGI4YTQ3NjJlYzFmIiwibmFtZSI6IldydGluZyBkYXRhIHRvIHRoZSBjZWxscyIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiW1x0IMKgIMKgJG1vbWVudCgpLFx0IMKgIMKgJHJhbmRvbSgpKjEwMFx0IMKgIMKgXHRdIiwicGF5bG9hZFR5cGUiOiJqc29uYXRhIiwieCI6MjQwLCJ5IjoxNDAsIndpcmVzIjpbWyJlZGEyMzM3N2Q5OGUxYTUxIl1dfSx7ImlkIjoiZWRhMjMzNzdkOThlMWE1MSIsInR5cGUiOiJHU2hlZXQiLCJ6IjoiYmFhNTBiOGE0NzYyZWMxZiIsImNyZWRzIjoiZDM4Y2I4MGFlODU3NGVhNiIsIm1ldGhvZCI6ImFwcGVuZCIsImFjdGlvbiI6IiIsInNoZWV0IjoiMVRFRVNoa3V4eHJiM1dINE5URnlrMUNPZUR5V3BnWDF3NkhOMDhaZXpDN3MiLCJjZWxscyI6IlNoZWV0MSFBMjpDMTAwMCIsImZsYXR0ZW4iOmZhbHNlLCJuYW1lIjoiIiwieCI6NTEwLCJ5IjoxNDAsIndpcmVzIjpbWyIzZTY3MGY1NzViODIyN2QwIl1dfSx7ImlkIjoiM2U2NzBmNTc1YjgyMjdkMCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiYWE1MGI4YTQ3NjJlYzFmIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzYwLCJ5IjoxNDAsIndpcmVzIjpbXX0seyJpZCI6IjJjOTE2YjFkNWMxMGRmZmUiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImJhYTUwYjhhNDc2MmVjMWYiLCJuYW1lIjoiUmVhZCB0aGUgY2VsbHMgZGF0YSIsInByb3BzIjpbXSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyMTAsInkiOjI2MCwid2lyZXMiOltbIjk0MWM3ZmU3YzdkYmNiY2QiXV19LHsiaWQiOiI5NDFjN2ZlN2M3ZGJjYmNkIiwidHlwZSI6IkdTaGVldCIsInoiOiJiYWE1MGI4YTQ3NjJlYzFmIiwiY3JlZHMiOiJkMzhjYjgwYWU4NTc0ZWE2IiwibWV0aG9kIjoiZ2V0IiwiYWN0aW9uIjoiIiwic2hlZXQiOiIxVEVFU2hrdXh4cmIzV0g0TlRGeWsxQ09lRHlXcGdYMXc2SE4wOFplekM3cyIsImNlbGxzIjoiU2hlZXQxIUEyOkMzIiwiZmxhdHRlbiI6ZmFsc2UsIm5hbWUiOiIiLCJ4Ijo0OTAsInkiOjI2MCwid2lyZXMiOltbImY5MTBkNzYzNzc4ODM2MWEiXV19LHsiaWQiOiJmOTEwZDc2Mzc3ODgzNjFhIiwidHlwZSI6ImRlYnVnIiwieiI6ImJhYTUwYjhhNDc2MmVjMWYiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NjAsInkiOjI2MCwid2lyZXMiOltdfSx7ImlkIjoiYzIwOTk3MzMzZjlkNGJkYSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYmFhNTBiOGE0NzYyZWMxZiIsIm5hbWUiOiJVcGRhdGluZyB0aGUgY2VsbHMgZGF0YSIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiW1x0IMKgIFwibm9uZVwiLFx0IMKgIFwibm9uZVwiXHQgwqAgwqBcdF0iLCJwYXlsb2FkVHlwZSI6Impzb25hdGEiLCJ4IjoyMjAsInkiOjM2MCwid2lyZXMiOltbImQ5Y2EyYTFlMDYxNGY3NjQiXV19LHsiaWQiOiJkOWNhMmExZTA2MTRmNzY0IiwidHlwZSI6IkdTaGVldCIsInoiOiJiYWE1MGI4YTQ3NjJlYzFmIiwiY3JlZHMiOiJkMzhjYjgwYWU4NTc0ZWE2IiwibWV0aG9kIjoidXBkYXRlIiwiYWN0aW9uIjoiIiwic2hlZXQiOiIxVEVFU2hrdXh4cmIzV0g0TlRGeWsxQ09lRHlXcGdYMXc2SE4wOFplekM3cyIsImNlbGxzIjoiU2hlZXQxIUEzNSIsImZsYXR0ZW4iOmZhbHNlLCJuYW1lIjoiIiwieCI6NTEwLCJ5IjozNjAsIndpcmVzIjpbWyI5ZmViZTYyOTg3MGI3YTU0Il1dfSx7ImlkIjoiOWZlYmU2Mjk4NzBiN2E1NCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiYWE1MGI4YTQ3NjJlYzFmIiwibmFtZSI6ImRlYnVnIDMiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzYwLCJ5IjozNjAsIndpcmVzIjpbXX0seyJpZCI6ImM5Y2VlYzk4NDRmYTc0YTkiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImJhYTUwYjhhNDc2MmVjMWYiLCJuYW1lIjoiRGVsZXRpbmcgdGhlIGNlbGxzIGRhdGEiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MjIwLCJ5Ijo0NjAsIndpcmVzIjpbWyJiOWNlZjljMzc2ZDFiZWEzIl1dfSx7ImlkIjoiYjljZWY5YzM3NmQxYmVhMyIsInR5cGUiOiJHU2hlZXQiLCJ6IjoiYmFhNTBiOGE0NzYyZWMxZiIsImNyZWRzIjoiZDM4Y2I4MGFlODU3NGVhNiIsIm1ldGhvZCI6ImNsZWFyIiwiYWN0aW9uIjoiIiwic2hlZXQiOiIxVEVFU2hrdXh4cmIzV0g0TlRGeWsxQ09lRHlXcGdYMXc2SE4wOFplekM3cyIsImNlbGxzIjoiU2hlZXQxIUEyOkMyMCIsImZsYXR0ZW4iOmZhbHNlLCJuYW1lIjoiIiwieCI6NTAwLCJ5Ijo0NjAsIndpcmVzIjpbWyJhMTc2NmI0OThlZmI1MGY0Il1dfSx7ImlkIjoiYTE3NjZiNDk4ZWZiNTBmNCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJiYWE1MGI4YTQ3NjJlYzFmIiwibmFtZSI6ImRlYnVnIDQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzgwLCJ5Ijo0NjAsIndpcmVzIjpbXX0seyJpZCI6ImQzOGNiODBhZTg1NzRlYTYiLCJ0eXBlIjoiZ2F1dGgiLCJuYW1lIjoiVW5rbm93biJ9XQ=="
---
::



## Conclusion

This guide demonstrated how to integrate Google Sheets with Node-RED for streamlined data management. We covered setting up the Google Sheets API, configuring Node-RED to interact with sheets, and performing actions like writing, reading, updating, and deleting data.