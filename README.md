# wbuutilities

wbuutilities est un module qui permet d'eefectuer les requetes principalement vers dans backend Drupal.
La branche 2x est compatible avec vue 3.

## Installation

Il n'est pas disponible sur www.npmjs.com, donc vous devez telecharger le module.

```
npm install /{path-to-module}/wbuutilities
```

## Utilisation

Le protocole réseau <a href="https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol/2">HTTP/2</a> ne supporte pas les messages personnalisés, dans ce cas, vous devez utiliser l'entete "customStatusText". Nous recommendons cela pour les nouvelles applications car <a href="https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol">HTTP/1</a> est de moins à mons utiliser.
Nous distinguons plusieurs cas d'utilisation en fonction des besoins.

#### Utilisation basique.

Dans ce environement, nous disposons de 4 methodes :

- post(url, datas, configs) // ajout/mise à jour des données
- delete(url, datas, configs) //supprimer les données
- get(url, configs) // recuperation des données.
- postFile(url, file, id = null) // pour envoyer les fichiers.

```
import AjaxBasic from 'wbuutilities/src/Ajax/basic'
export default {
  ...AjaxBasic,
  // languageId:'fr', //si le serveur supporte la langue.
  TestDomain: 'http://habeuk.hbk', // le domain local ou les requetes seront envoyés.
  debug: true // affiche des informations supplementaire sur chaque requete.
}
```

Example pour un backend avec drupal :(src/rootConfig.js)

```
import AjaxBasic from 'wbuutilities/src/Ajax/basic'
export default {
  ...AjaxBasic,
  languageId:
    window.drupalSettings &&
    window.drupalSettings.path &&
    window.drupalSettings.path.currentLanguage
      ? window.drupalSettings.path.currentLanguage
      : null,
  TestDomain: 'http://habeuk.hbk',
  debug: true
}
```

Utilisation dans un fichier .vue

```
<script setup>
import Config from './rootConfig'
function LoadData() {
  Config.get('/booking-system/views-app-default')
    .then((response) => {
      console.log('results : ', response)
    })
    .catch((err) => {
      console.log('err : ', err)
    })
}
</script>

<template>
  <button @click="LoadData">Getdata from server</button>
</template>
```
