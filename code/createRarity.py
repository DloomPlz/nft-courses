import os
import json
import random

rootdir = 'assets'
for file in os.listdir(rootdir):
    d = os.path.join(rootdir, file)
    if os.path.isdir(d):
        # Create json base
        baseJson = {
            "trait_type": "",
            "attributes": [
            ]
        }

        baseJson["trait_type"] = os.path.basename(os.path.normpath(d))

        for filename in os.listdir(d):
            # print(d)
            f = os.path.join(d, filename)
            # checking if it is a file
            print(f)
            if os.path.isfile(f):
                name, extension = os.path.splitext(f)
                if (extension == ".png"):
                    name = os.path.basename(
                        os.path.normpath(f).replace(".png", ""))
                    filenamePath = f.replace(
                        "assets/", "").replace("assets\\", "")

                    attr = {
                        "name": name,
                        "filename": filename,
                    }
                    baseJson["attributes"].append(attr)

        emptyRarity = 0
        rarityMedian = int((100 - emptyRarity)/len(baseJson["attributes"]))
        rest = 0
        if emptyRarity == 0:
            rest = 100 - \
                ((rarityMedian * (len(baseJson["attributes"])) + emptyRarity))
        else:
            rest = 100 - \
                ((rarityMedian *
                 (len(baseJson["attributes"]) - 1)) + emptyRarity)
        for attr in baseJson["attributes"]:
            if "rarity" in attr:
                # If the rarity is already set
                continue
            attr["rarity"] = rarityMedian

        for j in range(len(baseJson["attributes"])):
            if rest <= 0:
                continue
            selectedIndex = random.randint(0, len(baseJson["attributes"])-1)
            print(selectedIndex, len(baseJson["attributes"]))
            baseJson["attributes"][selectedIndex]["rarity"] = baseJson["attributes"][selectedIndex]["rarity"] + 1
            rest = rest - 1

        with open(d + "/data.json", "w") as outfile:
            json.dump(baseJson, outfile, indent=4)
