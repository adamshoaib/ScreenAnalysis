### REACT JS OPEN AI Screen Analysis

With the Screen Capture and Analysis project, users can easily capture and examine on-screen content, making it a valuable tool for anyone working with applications. Instead of manually summarizing their screen's contents, users can effortlessly capture their screen and receive insightful analysis of the displayed data. This intuitive solution enhances productivity, especially for troubleshooting, documentation, or general comprehension of the information on the screen.

### Add Open AI API key before running the application.

1.  Get your Open AI API Key from https://platform.openai.com/api-keys.
2.  Create .env file inside the root folder (ame place where you have your package.json).
3.  Add line REACT_APP_OPENAI_KEY=<Your API Key here> (Replace <Your API Key here> with your open ai api key).
4.  Note: Make sure you have GPT 4 subscription, this application will not run for GPT 3 as it uses image analysis.

### TO Run the application

1. Naviagte to Project folder.
2. `npm install`
3. `npm start`

### How does the application work

1. Upon clicking the "Analyse My Screen" button, the application captures the current screen content and utilizes an OpenAI model to generate a descriptive summary for the captured image.
2. The react ref defines the container that will be captured for image analysis.
