import os
import json

metadatasFolder = './metadatas'
# TO CHANGE DEPENDING ON NFT UP IPFS LINK
ipfsLink = "ipfs://bafybeidvsufkcszpvhmebbwuepjyll67y55g7gyicvq2h5rj3de64v6hiu"
newFolder = './metadatas'

# For each file in metadatas folder
for filename in os.listdir(metadatasFolder):
    f = os.path.join(metadatasFolder, filename)
    # checking if it is a file
    if os.path.isfile(f):
        file = open(f)
        # Load json from file
        data = json.load(file)

        jsonFileName, e = os.path.splitext(filename)

        data['image'] = ipfsLink + '/' + jsonFileName + '.png'
        data['external_url'] = ipfsLink + '/' + jsonFileName + '.png'

        with open(newFolder + "/" + jsonFileName + '.json', 'w') as outfile:
            json.dump(data, outfile)

        file.close()
