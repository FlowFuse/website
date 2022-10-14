---
title: Install FlowForge Docker on Google Cloud #11
subtitle: Step by step instructions to get FlowForge Docker running on Google Cloud
description: Step by step instructions to get FlowForge Docker running on Google Cloud
date: 2022-10-14
authors: ["rob-marcer"]
---

As part of our preparations for FlowForge 1.0 we have been testing various real world scenarios to see where we can add to our documentation and where we might be able to improve our releases to make the install process easier for users. As a benefit of that testing we have been able to hone various real world installation processes and we wanted to share one of those with you today.
<!--more-->

In this first of three articles, we are going to run through the process for installing FlowForge on Google Cloud Platform (GCP) within a virtual machine (VM) using Docker.

We have set ourselves the goal of delivering a production environment. We want this installation benefit from:

- Email alerts (emails to users when they are added to teams etc)
- HTTPS access to the install
- FlowForge [Device](https://flowforge.com/docs/user/concepts/#device) deployment via the included MQTT server that comes in our Docker build

We will follow up with a second article covering the process of getting HTTPS running then we will close out the series by covering how to use the [Devices](https://flowforge.com/docs/user/concepts/#device) features of FlowForge.

# Prerequisites

- A domain name - We've registered flowforge-demo.com to demonstrate these steps
- A DNS provider - Our Domain registrar provides a basic DNS service for free
- A GCP account - Google will often give you free service credits on sign up so setting up FlowForge on GCP should not cost you anything for at least a few weeks
- An email provider which will allow SMTP connections to send email - To manage users on your FlowForge platform you will need to be able to send emails to them. We have used a Google Workspace account for this purpose

# GCP VM Creation

Create a GCP account, once logged in navigate to Compute Engine then VM Instances. Select Create Instance you should now be [here](https://www.google.com/url?q=https://console.cloud.google.com/compute/instancesAdd?project).

Give your instance a name, select a Region and Zone. I have found that the default Machine configuration works fine but depending on your project you may wish to change the resources.

![GCP Create VM interface](images/1.png)

You now need to allow access to your FlowForge installation from the internet. In the Firewall section tick Allow HTTP traffic and Allow HTTPS traffic.

![GCP Create VM interface](images/2.png)

You will now need to assign a static external IP address to this VM. Click Advanced options, then Networking. Now scroll down until you see Network interfaces and click on default to expand that section. In External IPv4 address select Create IP Address, give it a name then press Reserve.

![GCP Create VM interface](images/3.png)

Once you have reserved your IP it will be shown in the External IPv4 address field, write it down as we will need it later to create the DNS records. Our IP address was 34.125.156.130.

![GCP Create VM interface](images/4.png)

You are now ready to create and boot your VM, scroll to the bottom of the page and press Create. It can take a minute or two for the VM to be ready to use.

# DNS Set Up

So that you can run FlowForge on your newly created GCP VM you will need to set up 2 DNS records. These records are slightly different to what is suggested in the FlowForge install docs. We were keen to be able to run other services on this domain so we set up the following records.

![DNS interface](images/5.png)

Depending on your DNS provider it can take seconds to hours for these records to become live. Our’s were in place very quickly, You can validate the DNS records on a Mac or Linux PC using the dig command.

![Dig command](images/6.png)

The DNS we need is now in place.

# FlowForge Docker Installation

The next step is to install the FlowForge Docker build on our GCP VM. If you return to GCP you should see that your VM is now up and running, you can now click on SSH to connect to your VM. This will open up a browser based SSH session to your VM.

![Access SSH in GCP](images/7.png)

Once you have a Secure Shell (SSH) session open, the first step is to install Docker using the following commands.

`sudo apt-get update`
  
	
`sudo apt-get install \
    		ca-certificates \
    		curl \
    		gnupg \
   		lsb-release`
      

`sudo mkdir -p /etc/apt/keyrings`


`curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`

`echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`
  

`sudo apt-get update`


`sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin`

You can read a lot more detail about what each these commands actually do [here](https://docs.docker.com/engine/install/debian/).

# Download FlowForge’s latest Docker build

The next step is to get the codebase for FlowForge onto your VM, to do so you will need to run the following commands. Please note that we are working with our 0.10.0 build, you will need to update the version number in the commands below if you are working with a newer build.

Install Wget so we can download FlowForge from Github.

`sudo apt-get install wget`

Use Wget to download the files we need.

`wget https://github.com/flowforge/docker-compose/archive/refs/tags/v0.10.0.tar.gz`

Make the directory where we will store FlowForge.

`sudo mkdir /opt/flowforge`

Uncompress FlowForge.

`tar zxf v0.10.0.tar.gz`

Copy Flowforge into the directy we created.

`sudo cp -r docker-compose-0.10.0/ /opt/flowforge`

You should now have all the code you need for FlowForge in the directory /opt/flowforge/docker-compose-0.10.0, it should look something like this.

![List command output](images/8.png)

# Configure FlowForge

We can now configure FlowForge on your VM. We are going to need to edit two files. Firstly we need to switch into the directory where we just placed FlowForge.

`cd /opt/flowforge/docker-compose-0.10.0`

Then we need to edit the flowforge.yml file, we're using Nano to do that.

`sudo nano /opt/flowforge/docker-compose-0.10.0/etc/flowforge.yml`

At the top of the file you need to update the domain and base_url to match your domain

![Domain config](images/9.png)

Next we will need to edit the Email Configuration section to match your SMTP provider. Set enabled to true then add in the details provider by your email provider. For example in this case I am using our Google Workspace account.

![Email config](images/10.png)

Finally, you need to update the public_url for your mqtt broker to match your DNS record.

![MQTT config](images/11.png)

You can now save and close that file, in Nano you can do that by pressing ‘control x’ then ‘y’ then the Return key.

Now we need to edit the docker-compose.yml file. We will use Nano again to do that.

`sudo nano /opt/flowforge/docker-compose-0.10.0/docker-compose.yml`

We need to edit the file to add in to the domain as follows.

![Virtual Hosts config](images/12.png)

Save and exit from that file, in Nano you can do that by pressing ‘control x’ then ‘y’ then the Return key.

# Start FlowForge

We are now ready to start up FlowForge for the first time, to do so we will use the following command.

`sudo docker compose up -d`

The build process will take a few minutes, once it’s completed let’s make sure all the docker containers are running.

`sudo docker ps`

![Docker PS output](images/13.png)

You should see 4 running Docker containers.

If everything went well you should now be able to access your FlowForge server via the DNS record you created.

![FF Login page](images/14.png)

Nice, you now have a working instance of FlowForge running on GCP but remember that all traffic is currently running on HTTP so we still have some work to do.

In the next article we will cover how to add HTTPS support to this FlowForge installation.
