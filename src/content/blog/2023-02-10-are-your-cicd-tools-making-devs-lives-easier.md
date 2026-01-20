---
title: Are your CICD and DevOps tools really making developers' lives easier?
excerpt: If you are responsible for your team’s CICD and DevOps tools, have you ever asked yourself if the tools you built are really making developers' lives easier? Or are they there just to reinforce the rules you've set?
date: 2023-02-10 00:00:00 +0900
tags: devops cicd
og_image: /assets/images/2023/devops.png
slug: 2023/02/10/are-your-cicd-tools-making-devs-lives-easier
---

![infinity symbol with the words plan, implement, integrate, test, release, configure, monitor and analyze written in it.](/assets/images/2023/devops.png)

_If you are responsible for your team’s CICD and DevOps tools, have you ever asked yourself if the tools you built are really making developers' lives easier? Or are they there just to reinforce the rules you've set?_

**It's your responsibility to make sure the tools and procedures you've implemented are truly helping software developers do their job.**

After setting your CICD tools, how frequently have you asked the developers for feedback? How many times have you changed/updated those based on feedback from the developers? Or are all your changes to support new requirements, infrastructure, and analysis tools?

You might think: _“My tools are running code analysis, and automated tests, so they are helping the developers catch errors early.”_. But are they?

I've discovered that one of the major reasons for bugs in many of my projects is that developers only test their code locally. My usual response to that was asking my team **“Why aren’t you deploying to the dev environment to test it?”.** And that would improve things for a while, then the same problem would come back.

Then, after a while, **I decided to change my approach, and ask the developers what they thought of the DevOps tools we had**, and some comments I heard were:

- Code analysis and test automation are good, but do we really need those just to deploy to the dev environment?
- The pipeline to deploy to the dev environment sometimes takes 15 minutes to complete.
- I constantly have to wait for other developers to finish their tests before I can deploy my code to the dev environment.

At first it wasn't easy to admit I was not noticing those pain points, but I've decided to accept it, and started tackling those.

**First: Make deployment to the dev environment as simple as possible.**

I already had all my validations running in pull requests and other environments. So, for the dev environment, let's just keep it simple with just build and deployment.

**Next: let’s shorten the time, by parallelizing all possible jobs.**

Unneeded jobs were already removed, but maybe we can deploy the backend and frontend in parallel as well as any other jobs that also need to be executed.

**Lastly: Why have only 1 dev environment? How about automating environment creation?**

For this, you can integrate it with your project management tool. Every time a developer moves a card to “in progress” it can automatically create a new environment. You will, of course, need Infrastructure as Code to do that.

After those changes, the deploys to dev environment were more frequent, and the quality improved. But the developers didn't change their attitude just because it was faster to deploy, it was the fact that they felt they were being heard, and they could see the actions their feedback triggered, and that motivated them to contribute more to finding solutions for the problems we had.

And remember the cases presented here are just examples, these were the pain points of some of my developers. It might not be the same case for your team.

**It's important to ask your team what they think. Do they find the tools and processes user-friendly and helpful, or are they a headache?**

Think about it – CICD tools are supposed to support developers, not control them. That's why it's so important to regularly get the developers' input and make sure your tools and processes are working for them. The ultimate goal is to make the development process as smooth and stress-free as possible.
