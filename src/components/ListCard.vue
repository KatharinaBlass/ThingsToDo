<template>
  <div class="card">
		<span :class="{ progressbar: true, border_top_right_radius: taskCount === solvedTaskCount }" :style="{ width: ((solvedTaskCount / taskCount) * 170) +'px' }"></span>
		<button id="deleteButton" @click="$emit('deleteListCard', $event)">
			<img src="@/assets/delete.svg" class="icon"/>
		</button>
		<router-link
			class="link"
			:to="{ name: 'todoList', params: { listId: listId }}"
		>
			<h3 class="cardTitle">{{ title }}</h3>
			<p>{{ taskCount }} Aufgaben</p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    title: {
		type: String,
		required: true
    },
    listId: {
		type: String,
		required: true
	},
	taskCount: {
		type: Number,
		required: true,
	},
	solvedTaskCount: {
		type: Number,
		required: true,
	}
  }
}
</script>
<style lang="scss" scoped>
  .card {
	width: 170px;
	height: 170px;
	margin: 1rem;
	border-radius: 4px;
	background: white;
	box-shadow: #627479 2px 2px 4px;
	text-align: left;
	position: relative;

	.progressbar {
		position: absolute;
		background: var(--primaryColor);
		height: 10px;
		border-top-left-radius: 4px;
	}

	#deleteButton {
		display: none;
		border: none;
		background: none;
		cursor: pointer;
		border-top-right-radius: 4px;
		position: absolute;
    right: 0;
    content: '';
    height: 24px;
    padding: 0;
    margin: 4px;

		.icon {
			height: inherit;
		}
	}

	&:hover {
		background: #e7e7e7;
		#deleteButton {
			display: flex;
		}
	}

	.border_top_right_radius {
		border-top-right-radius: 4px;
	}

	.link {
		text-decoration: none;
		color: var(--textColor);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		cursor: pointer;
		height: 100%;
		padding: .7rem;
	}

	.cardTitle {
		overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
		margin: 0;
	}

	p {
		margin: 8px 0;
	}
}
</style>
