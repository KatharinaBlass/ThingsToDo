<template>
    <li class="entry">
        <label id="entryLabel">
            <input type="checkbox" :checked="checked" @change="$emit('check', $event)"/>
            <span id="checkbox"></span>
            <span id="entryText">{{text}}</span>
        </label>
        <button class="btn" id="entryCloseBtn" @click="$emit('deleteListItem', $event)">
            <img src="@/assets/close.svg" class="icon"/>
        </button>
    </li>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            default: false
        }
	}
}
</script>
<style lang="scss" scoped>
.entry {
	display: flex;
	margin: 1em 0;
	position: relative;
	transition: 0.2s;
	background: white;
	align-items: center;
	box-shadow: var(--defaultBoxShadow);

	&:last-child {
		border-bottom-left-radius: 2px;
		border-bottom-right-radius: 2px;
	}

	#entryLabel {
		flex: 1;
		padding: .9em;
		cursor: pointer;
		text-align: left;
		display: flex;
		align-items: center;
	}

    #entryCloseBtn {
        display: none;
        padding: 0 .5em;

        &:last-of-type {
            border-bottom-right-radius: 2px;
        }
    }

	&:hover {
		background: #e7e7e7; /* #d1e2e5  #f7eaea */
		#entryCloseBtn {
			display: inline;
		}
	}
}

#checkbox {
	display: inline-block;
	position: relative;
	width: 15px;
    height: 15px;
    border: 1px solid #025c7e;
    margin: 0 .7em 0 0;
}

input[type="checkbox"] {
	position: absolute;
    height: 1px;
    width: 1px;
    clip: rect(1px, 1px, 1px, 1px);

	&:checked + #checkbox {
		background: #025c7e;
		color: white;

		& + #entryText{
			color: #025c7e;
			text-decoration: line-through;
		}

		&:before {
			content: '✔';
			position: absolute;
			font-size: .7em;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
.icon {
	display: block;
	height: 24px;
}
</style>

