<template>
	<div class="wrapper">
		<h2 class="title">Things to do</h2>
		<div id="dashboard">
		<ListCard
			v-for="(list, index) in listDataCollection"
			:key="index"
			:title="list.title"
			:taskCount="list.size"
			:solvedTaskCount="list.checkedCount"
			:listId="list.id"
		/>
		</div>
		<button
			type="button"
			id="toggleDialogButton"
			@click="dialogActive=!dialogActive">
			+
		</button>
		<CreateDialog
			:active.sync="dialogActive"
			v-model="newListTitle"
			@newToDoListConfigured="createNewList"
		/>
	</div>
</template>
<script>
import CreateDialog from '@/components/CreateDialog.vue'
import ListCard from '@/components/ListCard.vue'
import fbFunctions from '@/mixins/firebaseFunctions.js'
import baseFunctions from '@/mixins/baseFunctions.js'
const firebase = require('../firebaseConfig.js')


export default {
	name: 'Overview',
	components: {
		CreateDialog,
		ListCard
	},
	data () {
		return {
			newListTitle: '',
			dialogActive: false,
			listDataCollection: []
		}
	},
	methods: {
		createNewList() {
			this.$_create(this.newListTitle);
		},
		listenToDbUpdates() {
			firebase.listCollection.onSnapshot((snapshot) => {
				console.log("onShapshot: ", snapshot);
				this.listDataCollection = snapshot.docs.map((doc)=>{
					const docData = doc.data();
					let checkedItemsCount = docData.todos.filter((each)=>{
						return each.checked == true
					}).length;
					return {
						id: doc.id,
						title: docData.name,
						size: docData.todos.length,
						checkedCount: checkedItemsCount
					}
				});
			});
		},
	},
	mixins: [fbFunctions, baseFunctions],
	created() {
		return this.listenToDbUpdates()
	}
}
</script>
<style lang="scss" scoped>
.wrapper {
    width: 90%;
    margin: auto;
    text-align: center;
}

#dashboard {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

#toggleDialogButton {
    margin: 8px;
    padding: 8px;
    background: white;
    border: none;
    border-radius: 4px;
    box-shadow: var(--defaultBoxShadow);
	width: 170px;
	cursor: pointer;
	font-size: 1.2rem;
    font-weight: lighter;
    color: var(--TextColor);
}
</style>
