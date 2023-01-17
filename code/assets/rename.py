import os

first = os.listdir()
print(first)

for file in os.listdir():

    if not os.path.isdir(file):
        # os.rename(file, file.replace("-", " ").replace("_", " ").title())
        continue
    else:
        print("IS A DIR : " + file)
        for f in os.listdir(file):

            try:
                if f.endswith('.png') or f.endswith('.Png'):
                    print(file + "/" + f)
                    os.rename(file + "/" + f, file + "/" + f.replace("-",
                                                                     " ").replace("_", " ").title().replace(".Png", ".png").replace("Data.json", "data.json"))
                    print(file + "/" + f)
            except FileNotFoundError:
                raise
