const fbConfig = require('../firebaseConfig.js')

export default {
    methods: {
        $_save(id, todos){
            fbConfig.listCollection.doc(id).set({ todos }, { merge: true })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        },

        $_create(name){
            fbConfig.listCollection.add({
                name: name,
                todos: [],
            })
            .then(function(docRef) {
                console.log("Document successfully written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error creating document: ", error);
            });
        },

        $_deleteList(list){
            fbConfig.listCollection.doc(list).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
    }
}