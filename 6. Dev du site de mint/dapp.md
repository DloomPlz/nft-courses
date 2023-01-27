# Intro

Bonjour et bienvenue pour la partie 6 de la formation sur le developement d'une collection de NFT pour les mercenaires du web3. Dans cette partie on va pouvoir utiliser un template de site web que j'ai pu realiser et que je vous mets a disposition pour etre utiliser sur votre nouvelle collection.

Je ne vais pas vous montrer comment le coder mais surtout comment utiliser ma base existante pour fournir a vos investisseurs une interface pour connecter leur portefeuille, et mint vos NFTs.


# Mise en place du projet

Vous aurez besoin d'un compte github, je vous laisse en creer un via github.com.

Pour deployer notre site, nous allons utiliser Vercel qui est une solution en ligne pour pouvoir host votre site web.
Dans un premier temps vous allez creer un compte sur Vercel via ce lien : https://vercel.com/

Une fois sur votre interface, faites "Add New" puis "Project".

Ensuite cliquez sur "Import third party project..", puis copiez le lien de la DApp : https://github.com/DloomPlz/nft-courses/tree/master/code/dapp

Donnez lui un nom dans Repository Name puis appuyer sur le bouton Create.

Cela devrait deployer le projet vers votre github, donc si vous voulez ensuite modifier du code dans le projet ce sera la bas que ca devra etre fait.

Une fois deploye, nous allons mettre en place nos variable d'environnements, qui va nous permettre de rajouter l'addresse de votre smart contract.

Settings -> Environment Variables

Vous aurez besoin de setup 4 variables :
NODE_VERSION 16.16.0
NEXT_PUBLIC_SUPPLY=666
NEXT_PUBLIC_NODE=<NODE>
NEXT_PUBLIC_CONTRACT=<CONTRACT_ADDRESS>

Pour le node, vous pouvez aller en chercher sur `chainlist.org` selon la blockchain sur laquelle vous avez deployer votre contrat.

Pour votre addresse de contract, vous avez juste a copier l'addresse avec le bouton de copy situe a droite de l'addresse sur etherscan ou autre, puis de le mettre dedans.

Une fois que cela est fait, votre site est pret ! Il ne vous reste plus qu'a ouvrir le mint.

Pour cela, il faut connecter le wallet que vous avez utiliser pour deployer votre contrat (aka l'owner) sur etherscan (depend de la blockchain encore une fois sur laquelle vous avez deployer), allez dans la partie `Contract` puis `Write Contract`. 

Pour connecter votre wallet, appuyer sur connect wallet.
Il vous faudra pour la partie suivante minter 1 nfts qui vous servira a mettre en place la collection sur Opensea.
Pour cela, allez sur la partie `mintForOpensea` puis cliquez sur write et confirmez.
Pour ouvrir le mint : allez sur la partie `SetStep`, mettez 1 dans l'input, puis write et enfin confirmez sur votre wallet.

Voila le mint est ouvert et votre site est en ligne ! Gg.



