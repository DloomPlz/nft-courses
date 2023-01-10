# Intro 

Bonjour et bienvenue pour la partie 2 de la formation sur le developement d'une collection de NFT pour les mercenaires du web3, qui parlera du choix du nombre de NFTs pour votre collection ainsi que sur les proprietes (metadatas en anglais) de vos NFTs.

# Choix du nombre

Le nombre de NFTs dans une collection est une décision personnelle (ou d'equipe) et peut dépendre de divers facteurs, tels que la valeur des NFTs, leur utilite, leur rareté, le budget, l'etat du marche crypto et l'intérêt de vos acheteurs pour votre collection.

Il est interessant egalement de réfléchir à l'objectif de votre collection. Par exemple, est-ce que l'objectif est de faire une collection dite Profile Picture, dont le seul interet est d'avoir une image semblable aux autres acheteur dans le meme style et de faire partie d'une communaute ? Ou bien vos NFTs feront-ils partie d'un ecosysteme plus grand tel qu'un jeu on-chain ? Tout cela jouera sur votre choix.

# Les propriétés

Pensez à un NFT comme à un livre rare dans une bibliothèque. De la même manière qu'un livre rare comporte des informations inscrites sur la couverture intérieure (comme le titre, l'auteur et l'éditeur), un NFT est associé à des métadonnées qui fournissent des informations importantes sur le NFT.

Les métadonnées d'un NFT peuvent inclure des éléments tels que le nom et la description du NFT, l'artiste ou le créateur du NFT, la date de création du NFT et toute autre information pertinente. Ces métadonnées sont importantes car elles permettent d'identifier le NFT et de mettre en contexte sa valeur.

Vous pouvez également expliquer que les métadonnées d'un NFT sont stockées sur une blockchain, une base de données décentralisée et sécurisée qui stocke les informations de manière à ce qu'il soit pratiquement impossible de les modifier ou de les supprimer. Cela permet de garantir l'authenticité et la propriété du NFT.

Dans l'ensemble, les métadonnées d'un NFT sont comme la couverture intérieure d'un livre rare : elles fournissent des informations importantes sur le NFT et permettent d'établir sa valeur et son authenticité.

Les métadonnées sont généralement stockées sur la blockchain, ce qui permet d'obtenir des informations transparentes et vérifiables sur le NFT. Cela peut aider à établir l'authenticité et la valeur de l'actif. IPFS est le systeme de stockage le plus utilise pour les NFTs pour le moment.

## IPFS

IPFS (InterPlanetary File System) est un système de stockage de fichiers décentralisé qui peut être utilisé pour stocker les métadonnées d'un NFT. Au lieu de stocker les données sur un serveur central, l'IPFS les distribue sur un réseau de nœuds, ce qui contribue à rendre le système plus sûr et plus résilient. Cela peut être utile pour les NFT, car cela permet de stocker les métadonnées de manière sûre et vérifiable, ce qui contribue à établir la provenance et l'authenticité de l'actif. IPFS n'est qu'une des nombreuses technologies qui peuvent être utilisées pour stocker les métadonnées des NFT. Parmi les autres options figurent les bases de données distribuées et les serveurs centralisés traditionnels.


## Forme des metadonnees

Les metadonnes ou proprietes sont sous le format JSON.
JSON (JavaScript Object Notation) est un format de fichier utilisé pour stocker et transmettre des données. Il est basé sur un sous-ensemble du langage de programmation JavaScript et est facile à lire et à écrire pour les humains. JSON est couramment utilisé pour transmettre des données dans des applications web (par exemple, pour envoyer des données d'un serveur à un client afin qu'elles soient affichées sur une page web), et il est également utilisé pour stocker des données dans des bases de données.

Voici une liste des champs courants que vous pouvez trouver dans les métadonnées d'un NFT, ainsi qu'une brève explication de chacun :

    "id" : Ce champ identifie le NFT spécifique et est souvent une longue chaîne de lettres et de chiffres.

    "name" : Ce champ fournit le nom ou le titre du NFT.

    "description" : Ce champ donne une brève description, comprenant souvent des informations sur le contenu ou le thème du NFT.

    "image" : Ce champ fournit l'URL de l'image (ou videos ou autres medias) qui représente le NFT.

    "attributes" (attributs) : Ce champ énumère tous les attributs ou détails supplémentaires concernant le NFT, tels que sa rareté ou sa valeur. Il comprend tres souvent une list de chaque element de layers qui a ete choisis.

Voici un exemple des attributs du token #1 d'une collection NFTs tres connu des "Cool Cats", que vous pouvez trouver sous ce lien :

```
{
  "attributes": [
    {
      "trait_type": "body",
      "value": "blue cat skin"
    },
    {
      "trait_type": "hats",
      "value": "hat black"
    },
    {
      "trait_type": "shirt",
      "value": "winter red"
    },
    {
      "trait_type": "face",
      "value": "sunglasses blue"
    },
    {
      "trait_type": "tier",
      "value": "wild_1"
    }
  ]
}
```

Comme on peut le voir, un Cool Cats est compose de 5 layers : body - hats - shirt - face - tier.
Chaque layers possede une valeur, qui a surement ete tire via un algorithme de creation de metadatas, et un systeme de rarete.
On va voir tout ca dans la prochaine video ;).