import json
import random
import string
import os
import copy
import sys
import random
from PIL import Image

baseJson = {
    "name": "",
    "description": "",
    "image": "",
    "external_url": "",
    "attributes": [
    ]
}


def getData(folders):
    data = []
    for folderName in folders:
        with open('assets/' + folderName + '/data.json') as json_file:
            # print(json_file)
            placeholder = json.load(json_file)
            data.append(placeholder)
    return data


def checkRarity(rarities):
    choosen_rarity = random.randint(0, 100)

    # Get index of the object choosen
    for index, nb in enumerate(rarities):
        if (nb == 100):
            return index - 1
        if (choosen_rarity >= nb and choosen_rarity < rarities[index+1]):
            return index


def average(a, n):
    # Find sum of array element
    sum = 0
    for i in range(n):
        sum += a[i]
    return sum/n


def generateName(i):
    return "NFT NAME #" + str(i)


def generateDescription():
    return "DESCRIPTION"


def main():
    a_list = list(range(1, 51))
    print(len(a_list))
    random.shuffle(a_list)
    for i in range(50):

        folders = os.listdir("assets")
        # folders = ["Background", "Body", "Eyes", "Face", "Head", "Skin"]

        data = getData(folders)
        # For each entry in data, get its content
        assets = []
        choosen_rarities = []
        attributes = []

        for type_index, asset_type in enumerate(data):

            # Loop on each entries to get its rarity, and choose an entry randomly via its rarity percentage
            for x in list(asset_type.values()):
                if (type(x) != list):
                    continue
                rarities = []
                rarities.append(0)
                tmp_rarity = 0
                for entry in x:
                    tmp_rarity += entry.get("rarity")
                    rarities.append(tmp_rarity)

                index = checkRarity(rarities)

                # Keep rarity of choosen asset and calculate average rarity
                choosen_rarities.append(x[index].get("rarity"))
                assets.append(
                    {"data": x[index], "trait_type": folders[type_index]})

        try:
            name = generateName(str(a_list[i]))
            description = generateDescription()
        except:
            print(i)

        for asset in assets:
            attributes.append({"trait_type": asset.get(
                "trait_type"), "value": asset.get("data").get("name")})

        full_dict = copy.copy(baseJson)
        full_dict["name"] = name
        full_dict["description"] = description
        full_dict["attributes"] = attributes
        full_dict["image"] = str(a_list[i]) + ".png"
        full_dict["external_url"] = str(a_list[i]) + ".png"

        # print(full_dict)

        with open("metadatas/" + str(a_list[i]) + ".json", "w") as outfile:
            json.dump(full_dict, outfile, indent=4)


if __name__ == '__main__':
    main()
