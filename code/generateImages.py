from time import sleep, perf_counter
from concurrent.futures import ThreadPoolExecutor

from sys import argv
from time import monotonic
from PIL import Image
import os
import json


metadatasFolder = './metadatas'
imagesFolder = './images/'
assetsFolder = './assets/'
traitOrder = ["Background", "Skin", "Body",
              "Head", "Eyes", "Face"]


def create_file(filename):
    f = os.path.join(metadatasFolder, filename)
    if os.path.isfile(f):
        file = open(f)
        # Load json from file
        try:
            data = json.load(file)
        except:
            print("Problem while loading", filename)
        # For each trait of json, take corresponding trait file and append it to new image 1080x1080
        img = Image.new('RGB', (1080, 1080), (0, 1, 1, 1))

        for attribute in traitOrder:
            # Loop on traitOrder, get the right value to paste
            currentTrait = {}

            for entry in data['attributes']:
                if (attribute == entry['trait_type']):
                    currentTrait = entry
            if (currentTrait == {}):
                continue
            path = ""
            try:
                path = currentTrait['value']
            except Exception:
                print(data['name'])
                print(currentTrait)
            if currentTrait['value'] == "Empty":
                continue
            try:
                attr = Image.open(assetsFolder + attribute +
                                  "/" + path + '.png').convert("RGBA")
                img.paste(attr, (0, 0), attr)
            except IOError:
                print("Error: File does not appear to exist.",
                      assetsFolder + attribute + "/" + path + '.png', filename)
                continue

        jsonFileName, e = os.path.splitext(filename)
        img.save(imagesFolder + jsonFileName + '.png', 'PNG', quality=100)
        print("Creating image", jsonFileName + '.png')
        # Save image in images folder
        file.close()


start = perf_counter()


meta = os.listdir(metadatasFolder)
lsorted = sorted(meta, key=lambda x: int(os.path.splitext(x)[0]))

with ThreadPoolExecutor() as executor:
    for filename in lsorted:
        f1 = executor.submit(create_file, filename)

finish = perf_counter()

print(f"It took {finish-start} second(s) to finish.")
