# Intro

Bonjour et bienvenue pour la partie 4 de la formation sur le developement d'une collection de NFT pour les mercenaires du web3. Dans cette partie on va rentrer dans le vif du sujet car nous allons utiliser nos propres scripts Python et layers d'art pour generer nos metadatas (ou proprietes) de nos NFTs ! On verra dans la partie suivant la generation de nos images via nos metadatas.

## Explication de la procedure

Dans un premier temps nous allons avoir besoin de mettre en place nos differents layers ainsi que leurs elements.
Créez un dossier pour chaque type de trait (tel que "Base", "Eyes" ou "Hair") que vous souhaitez inclure dans votre NFT.

Dans notre exemple, nous allons avoir Background - Outwear - Eyes - Face - Head - Skin, chacun avec leurs propres elements.
Chaque dossier contient un fichier data.json, qui contient la rarete de chaque element du type de layer.
La totalite de la rarete est 100 pour 100%.
Par exemple, dans la categorie Background nous avons le Background Yellow a 17% de chance de rarete, Jasper etant le plus rare avec 4% de rarete.

Une fois tout nos layers, elements, et fichier data.json de rarete definis, nous pouvons proceder a la generation des metadatas via un script python.
Le but du script python est : pour chaque metadatas de NFT, recuperer dans chaque dossier de layer le fichier de rarete, et choisir l'element via un nombre choisi au hasard entre 0 et 100.

Nous avons du JSON qui est pour le moment vide mais que nous allons remplir et sauvegarder dans un fichier ensuite, qui portera le nom de l'ID du nft.

Chaque element choisi par le script est rajouter dans notre champ `attributes` qui va composer nos metadonnees de chaque NFT.
Une fois le champ attributes complete, il faut definir le nom ainsi que la description du NFT. Pour le nom, j'ai choisi `Neon #` puis l'ID du NFT, par exemple `Neon #1` pour le NFT numero 1.
Le champ image sera completer par la suite dans la partie IPFS via un autre script python.







