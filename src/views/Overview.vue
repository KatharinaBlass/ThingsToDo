<template>
	<div class="wrapper">
		<button type="button" @click="logout">Logout</button>
		<h2 class="title">Things to do</h2>
		<TabSelect
			:options="tabs"
			v-model="activeTab"
			name="tab"
			:valid="true"
		/>
		<div id="dashboard">
		<ListCard
			v-for="(list, index) in filteredListDataCollection"
			:key="index"
			:title="list.title"
			:taskCount="list.size"
			:solvedTaskCount="list.checkedCount"
			:listId="list.id"
			@deleteListCard="deleteList(list.id)"
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
			v-model="newList"
			:tabs="tabs"
			@newToDoListConfigured="createNewList"
		/>
	</div>
</template>
<script>
import CreateDialog from '@/components/CreateDialog.vue'
import ListCard from '@/components/ListCard.vue'
import TabSelect from '@/components/TabSelect.vue'
import fbFunctions from '@/mixins/firebaseFunctions.js'
import baseFunctions from '@/mixins/baseFunctions.js'
const firebase = require('../firebaseConfig.js')


export default {
	name: 'Overview',
	components: {
		CreateDialog,
		ListCard,
		TabSelect,
	},
	data () {
		return {
			newList: {
				title: '',
				kategory: '',
			},
			dialogActive: false,
			listDataCollection: [],
			tabs: {
				'all': 'All',
				'privat': 'Privat',
				'uni': 'Uni',
				'work': 'Arbeit',
			},
			activeTab: 'all',
			user: JSON.parse(localStorage.getItem('user')),
		}
	},
	methods: {
		deleteList(list){
			this.$_deleteList(this.user.uid, list);
		},
		createNewList() {
			this.$_create(this.user.uid, this.newList);
			this.newList.title = '';
			this.newList.kategory = '';
		},
		listenToDbUpdates() {
			firebase.database.collection(this.user.uid).onSnapshot((snapshot) => {
				if(snapshot) {
					this.listDataCollection = snapshot.docs.map((doc)=>{
						const docData = doc.data();
						let checkedItemsCount = docData.todos.filter((each)=>{
							return each.checked == true
						}).length;
						return {
							id: doc.id,
							title: docData.name,
							kategory: docData.kategory,
							size: docData.todos.length,
							checkedCount: checkedItemsCount
						}
					});
				}
			});
		},
		logout() {
			firebase.firebase.auth()
			.signOut()
			.then(() => {
				this.$router.replace('sign-in');
			});
		}
	},
	computed: {
		filteredListDataCollection() {
			if (this.activeTab === 'all') {
				return this.listDataCollection
			} else
			return this.listDataCollection.filter((list)=>{
				return list.kategory === this.activeTab
			})
		}
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
