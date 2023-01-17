import json
import random
import string
import os
import copy


def getData():
    rootdir = 'assets'
    folders = [name for name in os.listdir(
        "assets") if os.path.isdir(os.path.join("assets", name))]
    for folderName in folders:
        rarityOverall = 0
        try:
            with open('assets/' + folderName + '/data.json') as json_file:
                # print(json_file)
                placeholder = json.load(json_file)
                # print(placeholder["attributes"])
                for entry in placeholder["attributes"]:
                    # print(entry.get("rarity"))
                    rarityOverall += entry.get("rarity")
                    if not (os.path.isfile(os.path.join('assets', folderName, entry.get("filename")))):
                        print(folderName, os.path.join(
                            'assets', folderName, entry.get("filename")), "doesnt exist")

                if rarityOverall != 100:
                    print("Data JSON in folder " + folderName +
                          " is different than 100 ---- " + str(rarityOverall))
        except:
            print("problem", folderName)


def main():
    getData()


if __name__ == '__main__':
    main()
