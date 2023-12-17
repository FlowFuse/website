const fetch = require('node-fetch');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

async function updateCertifiedNodes() {
    const modulesJsonPath = '../certified-nr-nodes/modules.json';
    const certifiedNodesJsonPath = path.join(__dirname, '../src/_data/certifiedNodes.json');

    try {
        const modulesData = await fsPromises.readFile(modulesJsonPath, 'utf-8');
        const modules = JSON.parse(modulesData);

        let certifiedNodes = [];
        if (fs.existsSync(certifiedNodesJsonPath)) {
            const certifiedNodesData = await fsPromises.readFile(certifiedNodesJsonPath, 'utf-8');
            certifiedNodes = JSON.parse(certifiedNodesData);
        }

        const newCertifiedNodes = [];

        for (const module of modules) {
            let title = module.replace(/^(node-red-contrib-|node-red-node-|@flowfuse\/)/, '');
            title = title.split('-').map(word => word.toUpperCase()).join(' ');
            
            const npmResponse = await fetch(`https://registry.npmjs.org/${module}`);
            const npmData = await npmResponse.json();

            const data = {
                title: title,
                id: module,
                url: `https://flows.nodered.org/node/${module}`,
                description: npmData.description,
            };

            newCertifiedNodes.push(data);
        }

        if (JSON.stringify(certifiedNodes) !== JSON.stringify(newCertifiedNodes)) {
            await fsPromises.writeFile(certifiedNodesJsonPath, JSON.stringify(newCertifiedNodes, null, 2));
            console.log('Certified nodes data updated successfully.');
        } else {
            console.log('No changes detected in certified nodes data.');
        }

    } catch (error) {
        console.error('Failed to update certified nodes data:', error);
    }
}

updateCertifiedNodes();