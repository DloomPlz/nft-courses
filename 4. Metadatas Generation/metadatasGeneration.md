# Intro

Bonjour et bienvenue pour la partie 4 de la formation sur le developement d'une collection de NFT pour les mercenaires du web3. Dans cette partie on va rentrer dans le vif du sujet car nous allons utiliser nos propres scripts Python et layers d'art pour generer nos metadatas (ou proprietes) de nos NFTs ! On verra dans la partie suivant la generation de nos images via nos metadatas.

## Explication de la procedure

Dans notre exemple, nous allons avoir plusieurs dossiers contenant tout notre art : Background - Outwear - Eyes - Face - Head - Skin, chacun avec leurs propres elements.
Chaque dossier contient un fichier `data.json`, qui contient la rarete de chaque element du type de layer.
La totalite de la rarete est 100 pour 100%.
Exemple avec background.
Il est possible de generer vos fichiers `data.json` via le script `createRarity.py`.
Pour cela il vous faut installer python ainsi qu'un IDE, comme Visual Studio Code, afin de voir votre code et facilement lancer le script.

Python : https://www.python.org/downloads/
Visual Studio Code : https://code.visualstudio.com/
Git Windows : https://git-scm.com/download/win
Git Mac : https://git-scm.com/download/mac
Code source : https://github.com/DloomPlz/nft-courses/

Une fois tout d'installes, redemarrez votre ordinateur.
Une fois redemarre, lancer visual studio code et ouvrez un terminal.
Si vous etes sur windows, lancez un nouveau terminal et tapez `py createRarity.py` (`python3 createRarity.py` pour Linux ou MacOs).
Cela devrait creer vos fichiers `data.json` dans vos dossier de layers.
Vous pouvez egalement checker si chaque total de rarete est bien egale a 100 ou si ils vous manques des fichiers dans les dossiers de layers via le script `checkRarity.py`.

Une fois tout nos layers, elements, et fichier `data.json` de rarete definis, nous pouvons proceder a la generation des metadatas via un script python.
Le but du script python est : pour chaque metadatas de NFT, recuperer dans chaque dossier de layer le fichier de rarete, et choisir l'element via un nombre choisi au hasard entre 0 et 100.

Nous avons du JSON qui est pour le moment vide mais que nous allons remplir et sauvegarder dans un fichier ensuite, qui portera le nom de l'ID du nft.

Chaque element choisi par le script est rajouter dans notre champ `attributes` qui va composer nos metadonnees de chaque NFT.
Une fois le champ attributes complete, il faut definir le nom ainsi que la description du NFT. Pour le nom, j'ai choisi `Neon #` puis l'ID du NFT, par exemple `Neon #1` pour le NFT numero 1.
Le champ image sera completer par la suite dans la partie IPFS via un autre script python.







