const fbConfig = require('../firebaseConfig.js');

export default {
    methods: {
        $_save(userId, listId, todos){
            fbConfig.database.collection(userId).doc(listId).set({ todos }, { merge: true })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },

        $_create(userId, listConfig){
            fbConfig.database.collection(userId).add({
                name: listConfig.title,
                kategory: listConfig.kategory,
                todos: [],
            })
            .then(function(docRef) {
                console.log("Document successfully written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error creating document: ", error);
            });
        },

        $_deleteList(userId, listId){
            fbConfig.database.collection(userId).doc(listId).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    }
}