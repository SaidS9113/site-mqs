const mongoose = require('mongoose');

const uri = 'mongodb+srv://ssdev:s2WZNfTWAhTlIgx7@cluster0.mdnkb47.mongodb.net/sitemqs?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connexion MongoDB réussie');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB :', err.message);
  });
