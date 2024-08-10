# Tic Tac Toe Game Deployment Guide

This guide will help you deploy your Tic Tac Toe game using Netlify.

## Prerequisites
- A GitHub (or GitLab/Bitbucket) account.
- A Netlify account: [Sign up or log in](https://www.netlify.com/).
- The Tic Tac Toe project files (`index.html`, `styles.css`, `script.js`).

## Deployment Steps

### 1. Deploy Using GitHub

1. **Sign Up and Log In**: Go to [Netlify](https://www.netlify.com/) and log in.
2. **Create a New Site**: Click "New site from Git".
3. **Link Git Repository**: Connect to your GitHub (or GitLab/Bitbucket) account, and select the repository containing your Tic Tac Toe project.
4. **Configure Build Settings**:
   - **Build Command**: Leave empty.
   - **Publish Directory**: Leave empty or enter `.` if necessary.
5. **Deploy**: Click "Deploy Site". Once complete, Netlify will provide a URL for your live site.

### 2. Alternative: Drag and Drop Deployment

1. **Prepare Project**: Ensure your project contains `index.html`, `styles.css`, and `script.js`.
2. **Deploy Manually**:
   - From the Netlify dashboard, click "New site from Git" > "Deploy manually".
   - Drag and drop your project folder (or zipped file) into the upload area.
3. **Access Site**: Netlify will provide a URL to access your deployed site.

## Optional Steps

- **Custom Domain**: Add a custom domain from your Netlify dashboard.
- **Continuous Deployment**: Set up automatic deployment from your Git repository when you push changes to the main branch.

## Troubleshooting

- **File Issues**: Ensure all necessary files are included and correctly linked.
- **Configuration**: Verify build settings if deployment fails.

## Conclusion

Your Tic Tac Toe game should now be live on the web! Netlify offers a robust, free solution for hosting static websites like this one.

For further customization and advanced features, visit the [Netlify documentation](https://docs.netlify.com/).
