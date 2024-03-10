# Setting up your own documentation 🔧

To set up your own docs, after cloning the repo and installing dependencies, you need to do the following:

- Rename the `.env.development` file to `.env` and fill in the required environment variables. The AWS part would be discussed in the deployment section, but for now, fill in the `GITHUB_OWNER` and `GITHUB_REPO` variables with your GitHub username and the name of your own repo respectively.
- The `GITHUB_TOKEN` variable is a personal access token that would be used to access your repo. You can generate one via your GitHub settings page.
- Delete the `docs` folder. You wouldn't need it and can refer back to this one if you need to.
- You can also go ahead and delete the `funding.yml` file within `.github` folder, although **DON'T** delete the `workflows` folder within the same folder.

That's about it! Run `npm run dev` to start the app and you should be good to go! Easy, right? 🚀
