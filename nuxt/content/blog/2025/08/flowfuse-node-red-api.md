---
title: >-
  FlowFuse API for Industry: Automating Node-RED Instances, Devices, and CI/CD
  Tasks
navTitle: >-
  FlowFuse API for Industry: Automating Node-RED Instances, Devices, and CI/CD
  Tasks
---

FlowFuse includes an API that lets you manage Node-RED instances, edge devices, and deployments directly from your scripts or applications. While most people use the web interface, the API is a great option if you want to automate tasks or connect FlowFuse with other tools.

<!--more-->

In this guide, you’ll learn the basics of the FlowFuse API, along with practical examples you can start using right away.

## What is the FlowFuse API and Why Use It?

The FlowFuse API is a **REST-based interface** fully described using the **OpenAPI 3.0 Specification**, allowing you to explore its capabilities, test endpoints, and even auto-generate client libraries in multiple programming languages. It provides programmatic control over everything available in the FlowFuse platform, so instead of navigating the dashboard, you can manage Node-RED instances, devices, and deployments directly from scripts or applications.

This is particularly useful when you want to:

* Manage **multiple Node-RED instances or devices** simultaneously.
* **Automate repetitive tasks** such as starting, stopping, or updating instances.
* Build **custom notifications or alerts**.
* Implement **CI/CD pipelines** for testing and deploying flows automatically.
* Integrate FlowFuse with **external systems** like monitoring, alerting, or scheduling tools.

In short, the API provides greater flexibility, simplifies automation, and allows FlowFuse to fit seamlessly into your existing workflows.

## Getting Started with the FlowFuse API

Before you can use the API, you need:

1. **Your FlowFuse account**  
   You will need to authenticate using an API token, which you can generate from the FlowFuse platform.

### Generating an API Token

1. Log in to the FlowFuse platform.  
2. Open **User Settings → Security**.  
3. Switch to the **Tokens** tab and click **Add Token**.  
4. In the form that opens:  
   - Give the token a descriptive name (e.g., `automation-script`).  
   - (Optional) Check **Add Expiry Date** and choose a date if you want the token to automatically expire.  
   - Click **Create Token** to generate it.  

![FlowFuse platform token creation form showing fields for token name, expiry date, and create button.](/blog/2025/08/images/token-form.png){data-zoomable}
*FlowFuse platform token creation form showing fields for token name, expiry date, and create button.*

After creation, a dialog will open showing your **secret token**.  
Click **Copy to Clipboard** and store this token securely. It will only be shown once and provides full access to your account.

![Dialog showing the generated FlowFuse API token with copy-to-clipboard option.](/blog/2025/08/images/copy-token.png){data-zoomable}
*Dialog showing the generated FlowFuse API token with copy-to-clipboard option.*

### Exploring the FlowFuse API with Swagger

FlowFuse provides **Swagger/OpenAPI documentation** that gives you a complete overview of all available endpoints, along with request and response formats.

> **Note:** The Swagger UI is **read-only**. You cannot execute API calls directly from it. Its purpose is to **display all endpoints** after visiting the page, so you can plan and structure your API calls in Node-RED flows, scripts, or other applications.

![FlowFuse Swagger/OpenAPI documentation interface displaying endpoints for users, Node-RED instances, devices, deployments, and much more.](/blog/2025/08/images/flowfuse-swagger-api-docs.gif){data-zoomable}
*FlowFuse Swagger/OpenAPI documentation interface displaying endpoints for users, Node-RED instances, devices, deployments, and much more.*

#### How to Use the Swagger Docs

1. Open the [FlowFuse API documentation](https://app.flowfuse.com/api/static/index.html) in your browser.

2. Once loaded, you will see **all available endpoints**, organized by category:

   * **`/api/v1/user/`** – Retrieve user details
   * **`/api/v1/instances/`** – List and manage Node-RED instances
   * **`/api/v1/devices/`** – Manage edge devices
   * **`/api/v1/deployments/`** – Trigger or monitor deployments

3. **Click on each endpoint** to expand it and review the details, including:

   * Required parameters
   * Headers
   * Response schemas

4. Use this information to construct actual API requests in **Node-RED HTTP Request nodes**, `curl`, or other scripts.

### Making Your First API Call

Once you have your API token, you can start interacting with the FlowFuse API. Every request must include your token in the **Authorization** header.

#### Example: Get User Information

A good first step is to fetch your user details to verify that your token works. You can use `curl`, any HTTP client in your preferred programming language, or even do it directly within Node-RED using an **HTTP Request** node, as shown below.

**Steps in Node-RED:**

1. Drag an **Inject** node onto the canvas.
2. Drag an **HTTP Request** node and connect it to the Inject node.
3. Double-click the HTTP Request node and configure it:

   * Method: **GET**
   * URL: `https://app.flowfuse.com/api/v1/user/`
   * Check **Use authentication**, select **Bearer Authentication**, and enter your API token.
4. Connect a **Debug** node to the HTTP Request node to see the response.
5. Deploy the flow and click the Inject button.

> **Note:** When using API tokens in Node-RED flows, always store them in **environment variables** instead of directly in the node to prevent accidental exposure when sharing flows. See [FlowFuse Environment Variables](/blog/2023/01/environment-variables-in-node-red/) for more details.



::render-flow
---
height: 300
flow: "W3siaWQiOiI2ZmE0NDUzOGI5MzQ0MzhiIiwidHlwZSI6ImluamVjdCIsInoiOiI1MDI3Nzg0Njc1YmNmNGVlIiwibmFtZSI6IkdldCBVc2VyIERldGFpbHMiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwieCI6MTgwLCJ5Ijo3NDAsIndpcmVzIjpbWyI4YzdmMTMzNzNlMjljOTA3Il1dfSx7ImlkIjoiOGM3ZjEzMzczZTI5YzkwNyIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiNTAyNzc4NDY3NWJjZjRlZSIsIm5hbWUiOiIiLCJtZXRob2QiOiJHRVQiLCJyZXQiOiJ0eHQiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cHM6Ly9hcHAuZmxvd2Z1c2UuY29tL2FwaS92MS91c2VyLyIsInRscyI6IiIsInBlcnNpc3QiOmZhbHNlLCJwcm94eSI6IiIsImluc2VjdXJlSFRUUFBhcnNlciI6ZmFsc2UsImF1dGhUeXBlIjoiYmVhcmVyIiwic2VuZGVyciI6ZmFsc2UsImhlYWRlcnMiOltdLCJ4IjozOTAsInkiOjc0MCwid2lyZXMiOltbIjNhNTQxNjlkYzczN2I0NzUiXV19LHsiaWQiOiIzYTU0MTY5ZGM3MzdiNDc1IiwidHlwZSI6ImRlYnVnIiwieiI6IjUwMjc3ODQ2NzViY2Y0ZWUiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjU3MCwieSI6NzQwLCJ3aXJlcyI6W119XQ=="
---
::



Once triggered, the debug panel will show your user information as shown below with status code 200, confirming that your token works and your API connection is successful.

```json
{
  "email": "john.doe@example.com",
  "email_verified": true,
  "sso_enabled": true,
  "mfa_enabled": false,
  "tcs_accepted": "2024-01-01T00:00:00.000Z",
  "id": "john12345",
  "username": "johndoe",
  "name": "John Doe",
  "avatar": "https://app.flowfuse.com/avatar/john-avatar",
  "admin": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "suspended": false
}
```

## Automating DevOps Pipelines with the FlowFuse API

One of the most powerful features of the FlowFuse API is its ability to integrate directly with CI/CD pipelines. This makes it possible to trigger builds, deployments, or pipeline stages automatically—either from scripts or directly within Node-RED flows—reducing manual effort and accelerating development cycles.

To trigger a pipeline stage, you will use the following endpoint:

```
PUT /api/v1/pipelines/{pipelineId}/stages/{stageId}/deploy
```

This requires two pieces of information: the **pipeline ID** and the **stage ID**.
Before triggering a deployment, you first need to retrieve the list of pipelines for your application:

```
GET /api/v1/applications/{applicationId}/pipelines
```

This request returns all pipelines for the given application, including their **pipelineId** and the stages associated with them. Once you identify the correct **pipelineId** and **stageId**, you can use them in the `deploy` request to trigger the stage automatically.

### API Steps

Before triggering a stage, we first need to retrieve the pipeline details for the application. This will give us both the pipeline ID and the stage ID required for deployment.

**Step 1: Get Your Application ID**

1. Navigate to your application in **FlowFuse**.
2. Open the **Settings** page.
3. Copy the **Application ID** (you will need this in later steps).

**Step 2: Retrieve Pipelines for an Application**

1. Drag an **Inject** node to manually trigger the request.

2. Add an **HTTP Request** node and configure it as follows:

   * **Method:** `GET`
   * **URL:**

     ```
     /api/v1/applications/{applicationId}/pipelines
     ```

     Replace `{applicationId}` with the actual Application ID you copied in Step 1.
   * **Authentication:** Enable **Bearer Authentication** and set it to use your API token from the environment.

3. Connect the **Inject** node to the **HTTP Request** node, and then connect the **HTTP Request** node to a **Debug** node.

4. Deploy the flow and click the Inject button to retrieve the pipelines.

*The response will return a list of pipelines, each containing a unique **pipelineId**.*



::render-flow
---
height: 300
flow: "W3siaWQiOiI3YWQyYzJkOTk4YzYwYjM5IiwidHlwZSI6ImluamVjdCIsInoiOiI1MDI3Nzg0Njc1YmNmNGVlIiwibmFtZSI6IkdldCBQaXBlbGluZXMiLCJwcm9wcyI6W10sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJ4IjoyNDAsInkiOjQ4MCwid2lyZXMiOltbImRkYTE2ODQyN2ZjODQ3ZGYiXV19LHsiaWQiOiJkZGExNjg0MjdmYzg0N2RmIiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiI1MDI3Nzg0Njc1YmNmNGVlIiwibmFtZSI6IiIsIm1ldGhvZCI6IkdFVCIsInJldCI6InR4dCIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiJodHRwczovL2FwcC5mbG93ZnVzZS5jb20vYXBpL3YxL2FwcGxpY2F0aW9ucy97YXBwbGljYXRpb25JRH0vcGlwZWxpbmVzIiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiJiZWFyZXIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjQzMCwieSI6NDgwLCJ3aXJlcyI6W1siNGE4Yzg1MjBlMmQzM2UzNyJdXX0seyJpZCI6IjRhOGM4NTIwZTJkMzNlMzciLCJ0eXBlIjoiZGVidWciLCJ6IjoiNTAyNzc4NDY3NWJjZjRlZSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NTkwLCJ5Ijo0ODAsIndpcmVzIjpbXX1d"
---
::



**Step 3: Identify the Stage**

1. Review the pipeline details returned from Step 2.
2. Note the **pipelineId** and the **stageId** of the stage you want to trigger.

**Step 4: Trigger the Stage Deployment**

Once you have the `pipelineId` and `stageId`, you can trigger the deployment stage with a `PUT` request.

1. Add another **Inject** node to trigger the deployment.
2. Connect it to a new **HTTP Request** node and configure it as follows:

   * **Method:** `PUT`
   * **URL:**

     ```
     /api/v1/pipelines/{pipelineId}/stages/{stageId}/deploy
     ```

     Replace `{pipelineId}` and `{stageId}` with the values from Step 3.
   * **Authentication:** Use **Bearer Authentication** with your API token.
3. Connect the HTTP Request node to a **Debug** node to view the response.
4. Deploy the flow and click Inject.

If successful, you will receive a JSON response confirming that the deployment stage has been triggered.

```json
{"status":"importing"}
```

The FlowFuse API allows you to deploy a specific stage of a pipeline. It does not automatically move to the next stage, but you can create a workflow that monitors the status of each stage and triggers the next one once the current stage is complete.
In the following flow, the development stage is deployed every day at 10 PM. After that, the workflow checks the status of the next stage, the staging instance, before proceeding.



::render-flow
---
height: 300
flow: "W3siaWQiOiIxYWI5NDBlYjJlZjEwNzYwIiwidHlwZSI6Imh0dHAgcmVxdWVzdCIsInoiOiIzNzMyNmUyMGYyY2Y5ZmM1IiwibmFtZSI6IkRlcGxveSBEZXZlbG9wbWVudCBTdGFnZSIsIm1ldGhvZCI6IlBVVCIsInJldCI6InR4dCIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiJodHRwczovL2FwcC5mbG93ZnVzZS5jb20vYXBpL3YxL3BpcGVsaW5lcy97cGlwZWxpbmVJZH0vc3RhZ2VzL3tzdGFnZUlkfS9kZXBsb3kiLCJ0bHMiOiIiLCJwZXJzaXN0IjpmYWxzZSwicHJveHkiOiIiLCJpbnNlY3VyZUhUVFBQYXJzZXIiOmZhbHNlLCJhdXRoVHlwZSI6ImJlYXJlciIsInNlbmRlcnIiOmZhbHNlLCJoZWFkZXJzIjpbXSwieCI6MzgwLCJ5IjoyNjAsIndpcmVzIjpbWyIxYzEzYjBkNTA4OTEzZjZkIl1dfSx7ImlkIjoiMjkzMjIxZTJmYWZlZjlmZiIsInR5cGUiOiJodHRwIHJlcXVlc3QiLCJ6IjoiMzczMjZlMjBmMmNmOWZjNSIsIm5hbWUiOiJDaGVjayBTdGFnaW5nIEluc3RhbmNlIFN0YXR1cyIsIm1ldGhvZCI6IkdFVCIsInJldCI6Im9iaiIsInBheXRvcXMiOiJpZ25vcmUiLCJ1cmwiOiJodHRwczovL2FwcC5mbG93ZnVzZS5jb20vYXBpL3YxL3Byb2plY3RzLyR7aW5zdGFuY2VJZH0vc3RhdHVzIiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiJiZWFyZXIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjM3MCwieSI6MzgwLCJ3aXJlcyI6W1siMjQxOTJiZjIxZTUyZWRkMiJdXX0seyJpZCI6IjZmOTRiZmIwZDMxOTg1OTciLCJ0eXBlIjoiaHR0cCByZXF1ZXN0IiwieiI6IjM3MzI2ZTIwZjJjZjlmYzUiLCJuYW1lIjoiRGVwbG95IFN0YWdpbmcgU3RhZ2UiLCJtZXRob2QiOiJQVVQiLCJyZXQiOiJ0eHQiLCJwYXl0b3FzIjoiaWdub3JlIiwidXJsIjoiaHR0cHM6Ly9hcHAuZmxvd2Z1c2UuY29tL2FwaS92MS9waXBlbGluZXMve3BpcGVsaW5lSWR9L3N0YWdlcy97c3RhZ2VJZH0vZGVwbG95IiwidGxzIjoiIiwicGVyc2lzdCI6ZmFsc2UsInByb3h5IjoiIiwiaW5zZWN1cmVIVFRQUGFyc2VyIjpmYWxzZSwiYXV0aFR5cGUiOiJiZWFyZXIiLCJzZW5kZXJyIjpmYWxzZSwiaGVhZGVycyI6W10sIngiOjgwMCwieSI6MzgwLCJ3aXJlcyI6W1siYjI2N2MzYjBlY2JiZjBiZCJdXX0seyJpZCI6IjI0MTkyYmYyMWU1MmVkZDIiLCJ0eXBlIjoic3dpdGNoIiwieiI6IjM3MzI2ZTIwZjJjZjlmYzUiLCJuYW1lIjoiSXMgUnVubmluZz8iLCJwcm9wZXJ0eSI6InBheWxvYWQubWV0YS5zdGF0ZSIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiZXEiLCJ2IjoicnVubmluZyIsInZ0Ijoic3RyIn1dLCJjaGVja2FsbCI6InRydWUiLCJyZXBhaXIiOmZhbHNlLCJvdXRwdXRzIjoxLCJ4Ijo2MTAsInkiOjM4MCwid2lyZXMiOltbIjZmOTRiZmIwZDMxOTg1OTciLCI5Y2Y3Y2NiN2U3NDBiMzllIl1dfSx7ImlkIjoiN2FjZTJiZWQ0OGExNGNkYSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiMzczMjZlMjBmMmNmOWZjNSIsIm5hbWUiOiJUcmlnZ2VyIFBpcGVsaW5lIiwicHJvcHMiOltdLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiMDAgMjIgKiAqICoiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjoiMzAiLCJ0b3BpYyI6IiIsIngiOjI0MCwieSI6MjAwLCJ3aXJlcyI6W1siMWFiOTQwZWIyZWYxMDc2MCJdXX0seyJpZCI6ImIyNjdjM2IwZWNiYmYwYmQiLCJ0eXBlIjoiZGVidWciLCJ6IjoiMzczMjZlMjBmMmNmOWZjNSIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzUwLCJ5Ijo0NDAsIndpcmVzIjpbXX0seyJpZCI6IjFjMTNiMGQ1MDg5MTNmNmQiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiMzczMjZlMjBmMmNmOWZjNSIsIm5hbWUiOiJXYWl0IGZvciBTdGFnZSBDb21wbGV0ZSIsImZ1bmMiOiIvLyBDbGVhciBhbnkgZXhpc3RpbmcgaW50ZXJ2YWwgb3IgdGltZW91dCBmcm9tIGNvbnRleHRcbmxldCBleGlzdGluZ0ludGVydmFsID0gY29udGV4dC5nZXQoXCJpbnRlcnZhbElkXCIpO1xubGV0IGV4aXN0aW5nVGltZW91dCA9IGNvbnRleHQuZ2V0KFwidGltZW91dElkXCIpO1xuXG5pZiAoZXhpc3RpbmdJbnRlcnZhbCkge1xuICAgIGNsZWFySW50ZXJ2YWwoZXhpc3RpbmdJbnRlcnZhbCk7XG4gICAgY29udGV4dC5zZXQoXCJpbnRlcnZhbElkXCIsIG51bGwpO1xufVxuaWYgKGV4aXN0aW5nVGltZW91dCkge1xuICAgIGNsZWFyVGltZW91dChleGlzdGluZ1RpbWVvdXQpO1xuICAgIGNvbnRleHQuc2V0KFwidGltZW91dElkXCIsIG51bGwpO1xufVxuXG4vLyBJZiBzdGF0ZSA9IFwicnVubmluZ1wiLCBzdG9wIHBvbGxpbmcgY29tcGxldGVseVxuaWYgKG1zZy5wYXlsb2FkPy5tZXRhPy5zdGF0ZSA9PT0gXCJydW5uaW5nXCIpIHtcbiAgICBub2RlLnN0YXR1cyh7IGZpbGw6IFwiZ3JlZW5cIiwgc2hhcGU6IFwiZG90XCIsIHRleHQ6IFwiU3RhZ2UgcnVubmluZ1wiIH0pO1xuICAgIHJldHVybiBudWxsOyAvLyBzdG9wIGNvbXBsZXRlbHlcbn1cblxuLy8gIHNlbmQgdGhlIGZpcnN0IG1lc3NhZ2UgaW1tZWRpYXRlbHlcbm5vZGUuc2VuZChSRUQudXRpbC5jbG9uZU1lc3NhZ2UobXNnKSk7XG5cbi8vIFN0YXJ0IHBvbGxpbmcgaW50ZXJ2YWwgKHNlbmQgbXNnIGV2ZXJ5IDIgc2Vjb25kcylcbmxldCBpZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBub2RlLnNlbmQoUkVELnV0aWwuY2xvbmVNZXNzYWdlKG1zZykpOyAvLyBjbG9uZSBtc2cgdG8gYXZvaWQgc2lkZSBlZmZlY3RzXG59LCAyMDAwKTtcblxuLy8gQXV0by1jbGVhciBpbnRlcnZhbCBhZnRlciA2MCBzZWNvbmRzIHRvIGF2b2lkIGxlYWtzXG5sZXQgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgY29udGV4dC5zZXQoXCJpbnRlcnZhbElkXCIsIG51bGwpO1xuICAgIGNvbnRleHQuc2V0KFwidGltZW91dElkXCIsIG51bGwpO1xuICAgIG5vZGUuc3RhdHVzKHsgZmlsbDogXCJyZWRcIiwgc2hhcGU6IFwiZG90XCIsIHRleHQ6IFwiUG9sbGluZyBzdG9wcGVkICh0aW1lb3V0KVwiIH0pO1xufSwgNjAwMDApO1xuXG4vLyBTYXZlIGludGVydmFsIGFuZCB0aW1lb3V0IElEcyBpbiBjb250ZXh0XG5jb250ZXh0LnNldChcImludGVydmFsSWRcIiwgaWQpO1xuY29udGV4dC5zZXQoXCJ0aW1lb3V0SWRcIiwgdGltZW91dElkKTtcblxuLy8gVXBkYXRlIG5vZGUgc3RhdHVzIHRvIGluZGljYXRlIHBvbGxpbmcgaXMgYWN0aXZlXG5ub2RlLnN0YXR1cyh7IGZpbGw6IFwieWVsbG93XCIsIHNoYXBlOiBcInJpbmdcIiwgdGV4dDogXCJQb2xsaW5nLi4uXCIgfSk7XG5cbi8vIERvIG5vdCByZXR1cm4gYW55IG1lc3NhZ2UgaW1tZWRpYXRlbHkgKGFscmVhZHkgc2VudCBhYm92ZSlcbnJldHVybiBudWxsO1xuIiwib3V0cHV0cyI6MSwidGltZW91dCI6MCwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo0MTAsInkiOjMyMCwid2lyZXMiOltbIjI5MzIyMWUyZmFmZWY5ZmYiXV19LHsiaWQiOiI5Y2Y3Y2NiN2U3NDBiMzllIiwidHlwZSI6Imxpbmsgb3V0IiwieiI6IjM3MzI2ZTIwZjJjZjlmYzUiLCJuYW1lIjoibGluayBvdXQgMSIsIm1vZGUiOiJsaW5rIiwibGlua3MiOlsiYTU4ZTY0YTEyZGYwYzU1ZSJdLCJ4Ijo3MjUsInkiOjM0MCwid2lyZXMiOltdfSx7ImlkIjoiYTU4ZTY0YTEyZGYwYzU1ZSIsInR5cGUiOiJsaW5rIGluIiwieiI6IjM3MzI2ZTIwZjJjZjlmYzUiLCJuYW1lIjoibGluayBpbiAxIiwibGlua3MiOlsiOWNmN2NjYjdlNzQwYjM5ZSJdLCJ4IjoyNTUsInkiOjMyMCwid2lyZXMiOltbIjFjMTNiMGQ1MDg5MTNmNmQiXV19XQ=="
---
::



## Conclusion

The FlowFuse API puts you in control of your Node-RED infrastructure through code. Instead of managing instances manually, you can automate repetitive tasks, integrate with existing tools, and build custom workflows that fit your exact needs.

Whether you're managing a handful of instances or thousands of edge devices, the API scales with you. It's straightforward to get started—generate a token, make your first API call, and gradually automate more of your workflow as you go.

The real value comes from the time you save and the consistency you gain. Let the API handle the routine work while you focus on building great Node-RED applications.

Start today by generating your first API token and making a call — you’ll see how quickly FlowFuse can automate your Node-RED operations. [Sign up for free](https://app.flowfuse.com) and put your industrial workflows on autopilot.
